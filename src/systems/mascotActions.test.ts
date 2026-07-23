import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { clearActionLog, getActionLog } from '../store/middleware/actionLog';
import {
  flipTortilla,
  moveTortillaTo,
  grabIngredient,
  dropIngredient,
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
      pan: {
        id: 'pan',
        name: 'Pan',
        type: 'pan',
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

  it('triggers flip action and logs in store action log', () => {
    flipTortilla('chef');

    const state = worldStore.getState();
    expect(state.entities.chef.state?.state).toBe('flipping');
    expect(state.entities.chef.state?.isFlipping).toBe(true);

    const log = getActionLog();
    expect(log.map((l) => l.action)).toContain('MASCOT_FLIP');
  });

  it('moves Tortilla gaze to a specified container', () => {
    moveTortillaTo('pan', 'chef');

    const state = worldStore.getState();
    expect(state.entities.chef.state?.gazingAt).toBe('pan');

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

    // Then drop into pan
    dropIngredient('pan', undefined, 'chef');

    const state = worldStore.getState();
    // Held item cleared
    expect(state.entities.chef.state?.holdingEntityId).toBeUndefined();
    // Pan now has a potato copy (because source was immutable despensa)
    expect(state.containers.pan.entityIds.length).toBe(1);

    const log = getActionLog();
    const actions = log.map((l) => l.action);
    expect(actions).toContain('MASCOT_GRAB');
    expect(actions).toContain('MASCOT_DROP');
  });
});
