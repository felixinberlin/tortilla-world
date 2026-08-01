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
import type { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import { updateMascotGaze } from '../../systems/gaze';

export function useSceneDragAndDrop() {
  // 1. Initialize dnd-kit sensors for mouse/touch and keyboard inputs
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    const entityId = String(event.active.id);
    updateMascotGaze('chef', { type: 'entity', entityId });
    worldStore.getState().dispatch({
      type: 'FOCUS_ENTITY',
      payload: { entityId, isUserOverride: true },
    });
    window.dispatchEvent(new CustomEvent('open-ingredients-list'));
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (event.over) {
      const containerId = String(event.over.id);
      updateMascotGaze('chef', { type: 'entity', entityId: containerId });
      worldStore.getState().dispatch({
        type: 'FOCUS_CONTAINER',
        payload: { containerId, isUserOverride: true },
      });
    }
  };

  // 2. Intercept the drop and dispatch a pure WorldAction
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Dispatch event to close ingredient list once dropped/placed
    window.dispatchEvent(new CustomEvent('close-ingredients-list'));

    // If dropped outside any valid droppable area, clear gaze
    if (!over) {
      updateMascotGaze('chef', null);
      // Clear user override after 1.5s
      setTimeout(() => {
        if (worldStore.getState().userOverride) {
          worldStore.getState().clearFocus(false);
        }
      }, 1500);
      return;
    }

    const entityId = String(active.id);
    const targetContainerId = String(over.id);

    updateMascotGaze('chef', { type: 'entity', entityId: targetContainerId });

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

    // Reset user override after drop action completes
    setTimeout(() => {
      if (worldStore.getState().userOverride) {
        worldStore.getState().clearFocus(false);
      }
    }, 1500);
  };

  return {
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}