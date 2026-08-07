import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { clearActionLog, getActionLog } from '../store/middleware/actionLog';
import { loadRecipe } from './recipeLoader';
import { getRecipeRequirementsArray } from '../types/Recipe';
import {
  flipTortilla,
  moveTortillaTo,
  grabIngredient,
  dropIngredient,
  speakTortilla,
  equipTool,
  unequipTool,
  runTortillaPotatoScript,
  runFollowRecipeScript,
} from './mascotActions';

function seedWorld() {
  worldStore.setState({
    entities: {
      potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient' },
      chef: { id: 'chef', name: 'Chef Tortilla 🍳', type: 'mascot', state: {} },
    },
    containers: {
      despensa: {
        id: 'despensa',
        name: 'Despensa',
        type: 'storage',
        entityIds: ['potato'],
        rules: { isImmutable: true },
      },
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'burner',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
      board: {
        id: 'board',
        name: 'Board',
        type: 'board',
        entityIds: [],
        rules: { maxCapacity: 3 },
      },
    },
  });
}

describe('mascotActions system', () => {
  beforeEach(() => {
    seedWorld();
    clearActionLog();
  });

  it('triggers speech bubble on Tortilla mascot', () => {
    speakTortilla('¡Hola, Tortilla!', 0, 'chef');

    const state = worldStore.getState();
    expect(state.entities.chef.state?.speechMessage).toBe('¡Hola, Tortilla!');
  });

  it('equips and unequips tools on Tortilla mascot', () => {
    equipTool('knife', 'chef');
    let state = worldStore.getState();
    expect(state.entities.chef.state?.equippedToolId).toBe('knife');

    unequipTool('chef');
    state = worldStore.getState();
    expect(state.entities.chef.state?.equippedToolId).toBeUndefined();
  });

  it('triggers flip action and logs in store action log', () => {
    flipTortilla('chef');

    const state = worldStore.getState();
    expect(state.entities.chef.state?.state).toBe('flipping');
    expect(state.entities.chef.state?.isFlipping).toBe(true);

    const log = getActionLog();
    expect(log.map((l) => l.action)).toContain('MASCOT_FLIP');
  });

  it('moves Tortilla gaze to a specified container', () => {
    moveTortillaTo('burner1', 'chef');

    const state = worldStore.getState();
    expect(state.entities.chef.state?.gazingAt).toEqual({ type: 'entity', entityId: 'burner1' });

    const log = getActionLog();
    expect(log.map((l) => l.action)).toContain('MASCOT_MOVE');
  });

  it('allows Tortilla to grab an ingredient from a container', () => {
    grabIngredient('potato', 'despensa', 'chef');

    const state = worldStore.getState();
    expect(state.entities.chef.state?.holdingEntityId).toBe('potato');
    expect(state.entities.chef.state?.sourceContainerId).toBe('despensa');

    const log = getActionLog();
    expect(log.map((l) => l.action)).toContain('MASCOT_GRAB');
  });

  it('allows Tortilla to drop held ingredient into a target container obeying container rules', () => {
    // First grab potato from immutable despensa
    grabIngredient('potato', 'despensa', 'chef');

    // Then drop intoburner1
    dropIngredient('burner1', undefined, 'chef');

    const state = worldStore.getState();
    // Held item cleared
    expect(state.entities.chef.state?.holdingEntityId).toBeUndefined();
    //burner1 now has a potato copy (because source was immutable despensa)
    expect(state.containers.burner1.entityIds.length).toBe(1);

    const log = getActionLog();
    const actions = log.map((l) => l.action);
    expect(actions).toContain('MASCOT_GRAB');
    expect(actions).toContain('MASCOT_DROP');
  });

  it('clears holdingEntityId when drop is possible and retains it when drop is blocked', () => {
    // 1. Fill board to capacity (maxCapacity = 3)
    worldStore.setState({
      ...worldStore.getState(),
      entities: {
        ...worldStore.getState().entities,
        i1: { id: 'i1', ingredientId: 'i1', name: 'I1', type: 'ingredient' },
        i2: { id: 'i2', ingredientId: 'i2', name: 'I2', type: 'ingredient' },
        i3: { id: 'i3', ingredientId: 'i3', name: 'I3', type: 'ingredient' },
      },
      containers: {
        ...worldStore.getState().containers,
        board: {
          id: 'board',
          name: 'Board',
          type: 'board',
          entityIds: ['i1', 'i2', 'i3'],
          rules: { maxCapacity: 3 },
        },
      },
    });

    // 2. Grab potato from despensa
    grabIngredient('potato', 'despensa', 'chef');
    expect(worldStore.getState().entities.chef.state?.holdingEntityId).toBe('potato');

    // 3. Attempt to drop into full board -> should be blocked and Tortilla continues grabbing/holding it
    dropIngredient('board', undefined, 'chef');
    expect(worldStore.getState().entities.chef.state?.holdingEntityId).toBe('potato');
    expect(worldStore.getState().containers.board.entityIds).toEqual(['i1', 'i2', 'i3']);

    // 4. Drop into non-fullburner1 -> allowed, Tortilla stops grabbing it (holdingEntityId cleared)
    dropIngredient('burner1', undefined, 'chef');
    expect(worldStore.getState().entities.chef.state?.holdingEntityId).toBeUndefined();
    expect(worldStore.getState().containers.burner1.entityIds.length).toBe(1);
  });

  it('runs full async script sequence: move ➔ grab ➔ move ➔ drop ➔ flip ➔ return home', async () => {
    await runTortillaPotatoScript('chef', 10);

    const state = worldStore.getState();
    expect(state.containers.board.entityIds.length).toBe(1);

    const log = getActionLog().map((l) => l.action).filter((a) => a !== 'RESET_MASCOT_FLIP');
    expect(log).toEqual([
      'MASCOT_MOVE',
      'MASCOT_GRAB',
      'MASCOT_MOVE',
      'MASCOT_DROP',
      'MASCOT_FLIP',
      'MASCOT_CLEAR_GAZE', // "return home" now dispatches MASCOT_CLEAR_GAZE, not MASCOT_MOVE('')
    ]);
  });

  it('maintains holding state while moving across containers during grab -> move -> drop', () => {
    // 1. Grab potato at despensa
    grabIngredient('potato', 'despensa', 'chef');
    let state = worldStore.getState();
    expect(state.entities.chef.state?.holdingEntityId).toBe('potato');
    expect(state.entities.chef.state?.targetContainerId).toBe('despensa');

    // 2. Move mascot to board while carrying potato
    moveTortillaTo('board', 'chef');
    state = worldStore.getState();
    expect(state.entities.chef.state?.holdingEntityId).toBe('potato');
    expect(state.entities.chef.state?.targetContainerId).toBe('board');

    // 3. Drop potato into board
    dropIngredient('board', undefined, 'chef');
    state = worldStore.getState();
    expect(state.entities.chef.state?.holdingEntityId).toBeUndefined();
    expect(state.entities.chef.state?.targetContainerId).toBe('board');
    expect(state.containers.board.entityIds.length).toBe(1);
  });

  it('syncs mascot target container and gaze when MOVE_ENTITY action is dispatched', () => {
    worldStore.getState().moveEntity('potato', 'board');
    const state = worldStore.getState();
    expect(state.entities.chef.state?.targetContainerId).toBe('board');
    expect(state.entities.chef.state?.gazingAt).toEqual({ type: 'entity', entityId: 'board' });
  });

  it('runs follow recipe script: processes all recipe ingredients through workstations', async () => {
    // Seed default entities for all recipe ingredients
    worldStore.setState({
      ...worldStore.getState(),
      entities: {
        ...worldStore.getState().entities,
        potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        egg: { id: 'egg', ingredientId: 'egg', name: 'Egg', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        oil: { id: 'oil', ingredientId: 'oil', name: 'Oil', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        onion: { id: 'onion', ingredientId: 'onion', name: 'Onion', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        salt: { id: 'salt', ingredientId: 'salt', name: 'Salt', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        pepper: { id: 'pepper', ingredientId: 'pepper', name: 'Pepper', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      },
      containers: {
        ...worldStore.getState().containers,
        board: { id: 'board', name: 'Board', type: 'board', entityIds: [], rules: { maxCapacity: 10 } },
        sink: { id: 'sink', name: 'Sink', type: 'sink', entityIds: [], rules: { maxCapacity: 10 } },
        bowl: { id: 'bowl', name: 'Bowl', type: 'bowl', entityIds: [], rules: { maxCapacity: 10 } },
        burner1: { id: 'burner1', name: 'burner1', type: 'burner', entityIds: [], rules: { maxCapacity: 10 } },
        plate: { id: 'plate', name: 'Plate', type: 'plate', entityIds: [], rules: { maxCapacity: 10 } },
      },
    });

    const recipe = loadRecipe('concebolla');
    await runFollowRecipeScript('concebolla', 'chef', 'board', 5);

    const state = worldStore.getState();
    const serveStep = recipe.steps.find((s) => s.action === 'serve');
    const targetContainerId = serveStep?.containerId || 'plate';
    expect(state.containers[targetContainerId].entityIds.length).toBeGreaterThanOrEqual(1);

    // Dynamically derive ingredient catalog IDs from active recipe requirements
    const requirements = getRecipeRequirementsArray(recipe);
    const requiredIngredientIds = Array.from(new Set(requirements.map((req) => req.entityId)));
    const allWorldEntities = Object.values(state.entities);
    const allIngredientCatalogIds = allWorldEntities.map((e) => e?.ingredientId || e?.id);
    requiredIngredientIds.forEach((id) => {
      expect(allIngredientCatalogIds.some((cid) => cid === id)).toBe(true);
    });
  });

  it('allows dragging an ingredient directly to Tortilla so she carries it in her free arm', () => {
    // Dispatch MOVE_ENTITY with targetContainerId = 'chef'
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'chef' },
    });

    const state = worldStore.getState();
    const chefState = state.entities.chef.state;
    expect(chefState?.holdingEntityId).toBe('potato');
    expect(chefState?.holdingEntityIds).toEqual(['potato']);
  });

  it('supports carrying up to 2 items simultaneously (two free arms)', () => {
    worldStore.setState({
      ...worldStore.getState(),
      entities: {
        ...worldStore.getState().entities,
        onion: { id: 'onion', ingredientId: 'onion', name: 'Onion', type: 'ingredient' },
        egg: { id: 'egg', ingredientId: 'egg', name: 'Egg', type: 'ingredient' },
      },
    });

    // First ingredient to chef
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'chef' },
    });

    // Second ingredient to chef
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'onion', targetContainerId: 'chef' },
    });

    const state = worldStore.getState();
    const chefState = state.entities.chef.state;
    expect(chefState?.holdingEntityIds).toEqual(['potato', 'onion']);

    // Attempting a 3rd item when hands are full
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'egg', targetContainerId: 'chef' },
    });

    const updatedState = worldStore.getState();
    // Hands remain capped at 2 items
    expect(updatedState.entities.chef.state?.holdingEntityIds).toEqual(['potato', 'onion']);
  });

  it('allows clicking "take me" on an ingredient in a workstation to make Tortilla grab it', () => {
    // Put potato in cutting board first
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'board' },
    });

    const boardEntityIds = worldStore.getState().containers.board.entityIds;
    expect(boardEntityIds.length).toBeGreaterThan(0);
    const actualEntityId = boardEntityIds[0];

    // Click "take me" button -> dispatches MASCOT_GRAB
    worldStore.getState().dispatch({
      type: 'MASCOT_GRAB',
      payload: { entityId: actualEntityId, sourceContainerId: 'board', mascotId: 'chef' },
    });

    const state = worldStore.getState();
    expect(state.containers.board.entityIds).not.toContain(actualEntityId);
    expect(state.entities.chef.state?.holdingEntityIds).toEqual([actualEntityId]);
  });
});
