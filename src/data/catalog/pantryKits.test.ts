/**
 * FILE: pantryKits.test.ts
 *
 * PURPOSE:
 * Unit tests for Pantry Kits catalog resolution, entity instantiation, and worldStore integration.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { PANTRY_KITS, resolvePantryWorkspace, instantiatePantryEntities } from './pantryKits';
import { worldStore } from '../../store/worldStore';

describe('Pantry Kits Catalog & Instantiation Engine', () => {
  beforeEach(() => {
    worldStore.getState().resetWorld('base');
  });

  it('contains expected base, tortilla, and empty pantry kits', () => {
    expect(PANTRY_KITS.base_pantry).toBeDefined();
    expect(PANTRY_KITS.tortilla_pantry).toBeDefined();
    expect(PANTRY_KITS.empty_pantry).toBeDefined();
  });

  it('resolves valid kit by ID or falls back to base_pantry', () => {
    const tortillaKit = resolvePantryWorkspace('tortilla_pantry');
    expect(tortillaKit.id).toBe('tortilla_pantry');

    const unknownKit = resolvePantryWorkspace('unknown_kit_xyz');
    expect(unknownKit.id).toBe('base_pantry');
  });

  it('instantiates entities correctly for tortilla_pantry', () => {
    const kit = PANTRY_KITS.tortilla_pantry;
    const { entities, despensaEntityIds } = instantiatePantryEntities(kit);

    expect(despensaEntityIds.length).toBeGreaterThan(0);
    expect(Object.keys(entities).length).toBeGreaterThan(0);

    // Verify entity IDs in despensa match entities map
    despensaEntityIds.forEach((id) => {
      expect(entities[id]).toBeDefined();
    });
  });

  it('updates store via setPantryKit atomic action', () => {
    const store = worldStore.getState();
    store.setPantryKit('empty_pantry');

    const updatedState = worldStore.getState();
    expect(updatedState.activePantryKitId).toBe('empty_pantry');
    expect(updatedState.containers.despensa?.entityIds.length).toBe(0);
  });

  it('respects pantryKitId when resetting the world', () => {
    worldStore.getState().resetWorld('compact', undefined, 'tortilla_pantry');

    const state = worldStore.getState();
    expect(state.activeKitId).toBe('compact');
    expect(state.activePantryKitId).toBe('tortilla_pantry');
    expect(state.containers.despensa?.entityIds.length).toBeGreaterThan(0);
  });
});
