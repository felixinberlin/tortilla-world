/**
 * FILE: WorkstationSelector.test.tsx
 *
 * PURPOSE:
 * Unit tests for WorkstationSelector logic, kit switching, and dynamic workstation creation.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../../store/worldStore';
import { WORKSTATION_KITS } from '../../data/catalog/workstations';

describe('WorkstationSelector & Workstation Store Operations', () => {
  beforeEach(() => {
    // Reset kitchen world store to base state before each test
    worldStore.getState().resetWorld();
  });

  it('contains valid catalog definition for base and profi kit presets', () => {
    expect(WORKSTATION_KITS.base).toBeDefined();
    expect(WORKSTATION_KITS.profi).toBeDefined();
    expect(WORKSTATION_KITS.base.name).toBe('Base Kit');
    expect(WORKSTATION_KITS.profi.name).toBe('Profi Kit');
  });

  it('allows switching active workstation kit preset via setWorkstationKit', () => {
    expect(worldStore.getState().activeKitId).toBe('base');

    worldStore.getState().setWorkstationKit('profi');
    expect(worldStore.getState().activeKitId).toBe('profi');

    // Verify profi kit workstations are loaded in store
    const containers = worldStore.getState().containers;
    expect(Object.keys(containers).length).toBeGreaterThan(0);
  });

  it('supports dynamically adding workstation containers via ADD_CONTAINER', () => {
    const initialContainersCount = Object.keys(worldStore.getState().containers).length;

    worldStore.getState().dispatch({
      type: 'ADD_CONTAINER',
      payload: { workstationType: 'board' },
    });

    const newContainers = worldStore.getState().containers;
    expect(Object.keys(newContainers).length).toBe(initialContainersCount + 1);

    // Verify newly added cutting board container exists
    const addedBoard = Object.values(newContainers).find((c) => c.name.includes('Tabla'));
    expect(addedBoard).toBeDefined();
    expect(addedBoard?.type).toBe('board');
  });

  it('supports removing workstation containers and evacuating contents to pantry', () => {
    // Add board workstation
    worldStore.getState().dispatch({
      type: 'ADD_CONTAINER',
      payload: { workstationType: 'board' },
    });

    const containers = worldStore.getState().containers;
    const addedBoard = Object.values(containers).find((c) => c.id !== 'board' && c.type === 'board');
    expect(addedBoard).toBeDefined();

    if (addedBoard) {
      const firstIngredient = Object.values(worldStore.getState().entities).find((e) => e.type === 'ingredient');
      expect(firstIngredient).toBeDefined();

      if (firstIngredient) {
        // Move ingredient into the added board
        worldStore.getState().moveEntity(firstIngredient.id, addedBoard.id);

        // A new entity copy is spawned into addedBoard from despensa
        const spawnedEntityIds = worldStore.getState().containers[addedBoard.id].entityIds;
        expect(spawnedEntityIds.length).toBe(1);
        const spawnedId = spawnedEntityIds[0];

        // Remove the container
        worldStore.getState().dispatch({
          type: 'REMOVE_CONTAINER',
          payload: { containerId: addedBoard.id },
        });

        // Verify container is removed and spawned entity is evacuated to despensa
        expect(worldStore.getState().containers[addedBoard.id]).toBeUndefined();
        expect(worldStore.getState().containers.despensa.entityIds).toContain(spawnedId);
      }
    }
  });
});
