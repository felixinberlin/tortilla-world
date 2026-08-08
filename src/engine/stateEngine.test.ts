import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import {
  isLiquidMedium,
  isAromaticIngredient,
  getEntityCatalogId,
} from './stateEngine';

describe('Flavor Infusion and Ingredient Persistence Engine', () => {
  beforeEach(() => {
    worldStore.getState().dispatch({ type: 'RESET_WORLD' });

    // Setup containers for tests
    const store = worldStore.getState();
    store.addWorkstationContainer({
      id: 'pan1',
      name: 'Sartén',
      type: 'burner',
      entityIds: [],
      rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
      isOn: true,
    });
    store.addWorkstationContainer({
      id: 'plato',
      name: 'Plato',
      type: 'plate',
      entityIds: [],
      rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
    });
    store.addWorkstationContainer({
      id: 'tabla',
      name: 'Tabla',
      type: 'board',
      entityIds: [],
      rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
    });
  });

  it('correctly identifies catalog IDs, liquid mediums, and aromatic ingredients', () => {
    const garlic = { id: 'garlic_1', name: 'Garlic', type: 'ingredient' as const, ingredientId: 'garlic' };
    const oil = { id: 'oil_1', name: 'Olive Oil', type: 'ingredient' as const, ingredientId: 'oil' };
    const plate = { id: 'plate_1', name: 'Plate', type: 'container' as const };

    expect(getEntityCatalogId(garlic)).toBe('garlic');
    expect(getEntityCatalogId(oil)).toBe('oil');

    expect(isAromaticIngredient(garlic)).toBe(true);
    expect(isLiquidMedium(oil)).toBe(true);
    expect(isLiquidMedium(garlic)).toBe(false);
    expect(isAromaticIngredient(plate)).toBe(false);
  });

  it('executes INFUSE_ENTITY action transferring flavor notes without consuming source entity', () => {
    const store = worldStore.getState();

    // Setup pan with oil and garlic
    store.dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'oil_1', name: 'Olive Oil', type: 'ingredient', ingredientId: 'oil' },
        containerId: 'pan1',
      },
    });

    store.dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'garlic_1', name: 'Garlic', type: 'ingredient', ingredientId: 'garlic' },
        containerId: 'pan1',
      },
    });

    // Dispatch explicit INFUSE_ENTITY action using instance IDs
    worldStore.getState().dispatch({
      type: 'INFUSE_ENTITY',
      payload: {
        sourceEntityId: 'garlic_1',
        targetEntityId: 'oil_1',
        property: 'flavor',
        intensity: 0.7,
      },
    });

    const state = worldStore.getState();
    const garlic = state.entities.garlic_1;
    const oil = state.entities.oil_1;
    const pan = state.containers.pan1;

    // Source entity remains in container
    expect(pan.entityIds).toContain('garlic_1');

    // Garlic remainingFlavor decreases
    expect(garlic.state?.remainingFlavor).toBe(0.3);

    // Oil acquires garlic flavor note in flavorProfile
    expect(oil.state?.flavorProfile).toEqual([
      { sourceCatalogId: 'garlic', intensity: 0.7 },
    ]);
  });

  it('accumulates multiple flavor sources in target flavorProfile array', () => {
    const store = worldStore.getState();

    store.dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'oil_1', name: 'Olive Oil', type: 'ingredient', ingredientId: 'oil' },
        containerId: 'pan1',
      },
    });

    store.dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'garlic_1', name: 'Garlic', type: 'ingredient', ingredientId: 'garlic' },
        containerId: 'pan1',
      },
    });

    store.dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'rosemary_1', name: 'Rosemary', type: 'ingredient', ingredientId: 'rosemary' },
        containerId: 'pan1',
      },
    });

    // Infuse garlic first
    store.dispatch({
      type: 'INFUSE_ENTITY',
      payload: {
        sourceEntityId: 'garlic_1',
        targetEntityId: 'oil_1',
        property: 'flavor',
        intensity: 0.6,
      },
    });

    // Infuse rosemary second
    store.dispatch({
      type: 'INFUSE_ENTITY',
      payload: {
        sourceEntityId: 'rosemary_1',
        targetEntityId: 'oil_1',
        property: 'flavor',
        intensity: 0.4,
      },
    });

    const oil = worldStore.getState().entities.oil_1;

    expect(oil.state?.flavorProfile).toEqual([
      { sourceCatalogId: 'garlic', intensity: 0.6 },
      { sourceCatalogId: 'rosemary', intensity: 0.4 },
    ]);
  });

  it('preserves flavorProfile on target entity after source entity is moved out via MOVE_ENTITY', () => {
    const store = worldStore.getState();

    store.dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'oil_1', name: 'Olive Oil', type: 'ingredient', ingredientId: 'oil' },
        containerId: 'pan1',
      },
    });

    store.dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'garlic_1', name: 'Garlic', type: 'ingredient', ingredientId: 'garlic' },
        containerId: 'pan1',
      },
    });

    // Infuse flavor
    store.dispatch({
      type: 'INFUSE_ENTITY',
      payload: {
        sourceEntityId: 'garlic_1',
        targetEntityId: 'oil_1',
        property: 'flavor',
        intensity: 0.7,
      },
    });

    // Update garlic doneness independently
    store.dispatch({
      type: 'UPDATE_ENTITY_STATE',
      payload: {
        entityId: 'garlic_1',
        patch: { doneness: 'golden_brown' },
      },
    });

    // Move garlic out to plate
    store.dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId: 'garlic_1',
        targetContainerId: 'plato',
        sourceContainerId: 'pan1',
      },
    });

    const state = worldStore.getState();

    // Garlic moved to plato
    expect(state.containers.pan1.entityIds).not.toContain('garlic_1');
    expect(state.containers.plato.entityIds).toContain('garlic_1');

    // Garlic state retained
    expect(state.entities.garlic_1.state?.doneness).toBe('golden_brown');

    // Oil in pan1 retains its flavorProfile
    expect(state.entities.oil_1.state?.flavorProfile).toEqual([
      { sourceCatalogId: 'garlic', intensity: 0.7 },
    ]);
  });

  it('runs the full example execution sequence from Section 4 of the spec', () => {
    const store = worldStore.getState();

    // 1. Move 'oil_1' into 'pan1'
    store.dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'oil_1', name: 'Olive Oil', type: 'ingredient', ingredientId: 'oil' },
        containerId: 'pan1',
      },
    });

    // 2. Move 'garlic_1' into 'pan1'
    store.dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'garlic_1', name: 'Garlic', type: 'ingredient', ingredientId: 'garlic' },
        containerId: 'pan1',
      },
    });

    // 3. TOGGLE_HEAT -> Turn on 'pan1' heat
    store.dispatch({
      type: 'TOGGLE_HEAT',
      payload: { containerId: 'pan1', isOn: true },
    });

    // 4. HEAT_TICK -> garlic_1 transfers flavor to oil_1, garlic cooks to golden_brown
    store.dispatch({ type: 'HEAT_TICK', payload: { containerId: 'pan1' } });

    store.dispatch({
      type: 'UPDATE_ENTITY_STATE',
      payload: {
        entityId: 'garlic_1',
        patch: { doneness: 'golden_brown' },
      },
    });

    let state = worldStore.getState();
    expect(state.entities.oil_1.state?.flavorProfile).toEqual([
      { sourceCatalogId: 'garlic', intensity: 0.7 },
    ]);
    expect(state.entities.garlic_1.state?.remainingFlavor).toBe(0.3);
    expect(state.entities.garlic_1.state?.doneness).toBe('golden_brown');

    // 5. MOVE_ENTITY -> Move 'garlic_1' from 'pan1' to 'plato'
    store.dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId: 'garlic_1',
        targetContainerId: 'plato',
        sourceContainerId: 'pan1',
      },
    });

    // 6. MOVE_ENTITY -> Move 'potato_1' into 'pan1'
    store.dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'potato_1', name: 'Potato', type: 'ingredient', ingredientId: 'potato' },
        containerId: 'pan1',
      },
    });

    // 7. MOVE_ENTITY -> Move 'garlic_1' from 'plato' into 'tabla' (used as garnish)
    store.dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId: 'garlic_1',
        targetContainerId: 'tabla',
        sourceContainerId: 'plato',
      },
    });

    state = worldStore.getState();

    // Verification of persistent state across entities and containers
    expect(state.entities.oil_1.state?.flavorProfile).toEqual([
      { sourceCatalogId: 'garlic', intensity: 0.7 },
    ]);
    expect(state.containers.pan1.entityIds).toContain('oil_1');
    expect(state.containers.pan1.entityIds).toContain('potato_1');
    expect(state.containers.pan1.entityIds).not.toContain('garlic_1');
    expect(state.containers.tabla.entityIds).toContain('garlic_1');
    expect(state.entities.garlic_1.state?.doneness).toBe('golden_brown');
  });
});
