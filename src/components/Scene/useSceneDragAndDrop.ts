// src/components/Scene/useSceneDragAndDrop.ts
import { useState } from 'react';
import { useSensors, useSensor, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';

export function useSceneDragAndDrop() {
  const [activeEntityId, setActiveEntityId] = useState<string | null>(null);

  // 1. Initialize dnd-kit sensors with distance constraint for crisp dragging
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveEntityId(String(event.active.id));
  };

  // 2. Intercept the drop and dispatch a pure WorldAction
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveEntityId(null);
    const { active, over } = event;

    if (!over) return;

    const entityId = String(active.id);
    const targetContainerId = String(over.id);

    // Dispatch intent to worldStore
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
    activeEntityId,
    handleDragStart,
    handleDragEnd,
  };
}