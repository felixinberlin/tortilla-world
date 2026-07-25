/**
 * FILE: ContainerView.tsx
 *
 * PURPOSE:
 * Displays a world container and its owned entities.
 *
 * RESPONSIBILITY:
 * - Renders container title and its inner entities via EntityView.
 * - Acts as a droppable target for drag-and-drop actions.
 */

import React from 'react';
import { useStore } from 'zustand';
import { useDroppable } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import type { Container, Entity } from '../../types/world';
import { EntityView } from './EntityView';
import './World.scss';

interface ContainerViewProps {
  key?: string | number;
  container: Container;
}

export const ContainerView: React.FC<ContainerViewProps> = ({ container }) => {
  const entities = useStore(worldStore, (state) => state.entities);

  // Set up dnd-kit droppable binding for this container
  const { setNodeRef, isOver } = useDroppable({
    id: container.id,
  });

  const containerEntities = container.entityIds
    .map((id: string) => entities[id])
    .filter((e: Entity | undefined): e is Entity => Boolean(e));

  const getWorkstationBadge = (id: string) => {
    switch (id) {
      case 'sink': return 'Washing Area 💧';
      case 'board': return 'Cutting Workspace 🔪';
      case 'bowl': return 'Preparation 🥣';
      case 'pan': return 'Cooking Heat 🍳';
      case 'pan2': return 'Cooking Heat 🍳';
      case 'plate': return 'Serving Stage 🍽️';
      case 'despensa': return 'Pantry 🧺';
      default: return 'Workstation 📦';
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      data-container-id={container.id}
      className={`container-view container-view--${container.id} ${isOver ? 'container-view--drag-over' : ''}`}
    >
      <div className="container-view__header">
        <h3 className="container-view__title">{container.name}</h3>
        <span className="container-view__badge">{getWorkstationBadge(container.id)}</span>
      </div>
      <div className="container-view__items">
        {containerEntities.map((entity: Entity) => (
          <EntityView key={entity.id} entity={entity} containerId={container.id} />
        ))}
        {containerEntities.length === 0 && (
          <span className="container-view__empty-hint">Drop entities here</span>
        )}
      </div>
    </div>
  );
};
