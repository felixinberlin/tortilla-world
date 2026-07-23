/**
 * FILE: useSceneDragAndDrop.ts
 *
 * PURPOSE:
 * React hook connecting drag/drop events with the game world.
 *
 * RESPONSIBILITY:
 * - Handles DnD lifecycle using dnd-kit sensors.
 * - Translates UI drag actions into pure MOVE_ENTITY actions.
 *
 * SHOULD NOT:
 * - Decide game rules or directly mutate state.
 */

import { useSensors, useSensor, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';

export function useSceneDragAndDrop() {
  // 1. Initialize dnd-kit sensors for mouse/touch and keyboard inputs
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  // 2. Intercept the drop and dispatch a pure WorldAction
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // If dropped outside any valid droppable area, do nothing
    if (!over) return;

    const entityId = String(active.id);
    const targetContainerId = String(over.id);

    // Dispatch the intent. The ContainerRules engine inside worldStore
    // will intercept this and silently reject it if the container is full
    // or doesn't accept this entity type.
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId,
        targetContainerId,
      },
    });
  };

  return {
    sensors,
    handleDragEnd,
  };
}