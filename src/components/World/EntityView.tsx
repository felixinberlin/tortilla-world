/**
 * FILE: EntityView.tsx
 *
 * PURPOSE:
 * Generic entity renderer component.
 *
 * RESPONSIBILITY:
 * - Renders entities based on entity type via a renderer registry.
 * - Handles drag-and-drop interactions or static read-only presentation.
 */

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { Entity } from '../../types/world';
import { EntityIcon } from './EntityIcon';
import { EntityStateBadge } from './EntityStateBadge';
import { entityRendererRegistry, type EntityRendererProps } from './rendererRegistry';

/**
 * Default Entity Renderer used when no custom renderer is registered for an entity type.
 */
export const DefaultEntityRenderer: React.FC<EntityRendererProps> = ({ entity, containerId }) => {
  return (
    <>
      <span className="entity-view__icon">
        <EntityIcon entity={entity} />
      </span>
      <span className="entity-view__name">{entity.name}</span>
      <EntityStateBadge entity={entity} containerId={containerId} />
    </>
  );
};

interface EntityViewProps {
  entity: Entity;
  containerId?: string;
  readOnly?: boolean;
}

/**
 * Inner component for interactive draggable entities (must be used inside a DndContext).
 */
const DraggableEntityView: React.FC<EntityViewProps> = ({ entity, containerId }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: entity.id,
  });

  const style: React.CSSProperties = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 1000 : 1,
        cursor: 'grab',
      }
    : {
        cursor: 'grab',
      };

  const CustomRenderer = entityRendererRegistry[entity.type];
  const RendererComponent = CustomRenderer || DefaultEntityRenderer;

  const className = [
    'entity-view',
    `entity-view--type-${entity.type}`,
    isDragging ? 'entity-view--dragging' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      data-entity-id={entity.id}
      data-ingredient-id={entity.ingredientId || entity.id}
      className={className}
    >
      <RendererComponent entity={entity} containerId={containerId} readOnly={false} />
    </div>
  );
};

export const EntityView: React.FC<EntityViewProps> = ({ entity, containerId, readOnly = false }) => {
  if (readOnly) {
    const CustomRenderer = entityRendererRegistry[entity.type];
    const RendererComponent = CustomRenderer || DefaultEntityRenderer;

    const className = [
      'entity-view',
      `entity-view--type-${entity.type}`,
      'entity-view--readonly',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        data-entity-id={entity.id}
        data-ingredient-id={entity.ingredientId || entity.id}
        className={className}
      >
        <RendererComponent entity={entity} containerId={containerId} readOnly />
      </div>
    );
  }

  return <DraggableEntityView entity={entity} containerId={containerId} />;
};
