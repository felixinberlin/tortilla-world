// src/components/Scene/useSceneDragAndDrop.ts

import { useSensor, useSensors, PointerSensor, KeyboardSensor, type DragEndEvent } from '@dnd-kit/core';
import { useWorldStore, type WorldState } from '../../store/worldStore';
import type { Container, Entity } from '../../types/world';

export const useSceneDragAndDrop = () => {
  const containers = useWorldStore((state: WorldState) => state.containers);
  const entities = useWorldStore((state: WorldState) => state.entities);
  const dispatch = useWorldStore((state: WorldState) => state.dispatch);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    }),
    useSensor(KeyboardSensor)
  );

  const getEntitiesForContainer = (containerId: string): Entity[] => {
    const container = containers[containerId];
    if (!container) return [];
    return container.entityIds
      .map((id) => entities[id])
      .filter((e): e is Entity => Boolean(e));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const entityId = String(active.id);
    const targetContainerId = String(over.id);
    const entity = entities[entityId];

    if (!entity) return;

    dispatch({
      type: 'MOVE_ENTITY',
      timestamp: Date.now(),
      payload: {
        entityId,
        fromContainerId: entity.containerId,
        toContainerId: targetContainerId
      }
    });
  };

  return {
    containers: Object.values(containers) as Container[],
    entities,
    sensors,
    getEntitiesForContainer,
    handleDragEnd
  };
};