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
import { useStore } from 'zustand';
import { useDraggable } from '@dnd-kit/core';
import type { Entity } from '../../types/world';
import { EntityIcon } from './EntityIcon';
import { EntityStateBadge } from './EntityStateBadge';
import { entityRendererRegistry, type EntityRendererProps } from './rendererRegistry';
import { useTranslation } from '../../i18n/useTranslation';
import { worldStore } from '../../store/worldStore';
import { getEntityFocusClass } from '../../systems/focus';

/**
 * Default Entity Renderer used when no custom renderer is registered for an entity type.
 */
export const DefaultEntityRenderer: React.FC<EntityRendererProps> = ({ entity, containerId }) => {
  const { t } = useTranslation();
  const ingKey = entity.ingredientId || entity.id;
  const toolKey = entity.id;

  const translatedIng = t(`ingredients.${ingKey}`);
  const translatedTool = t(`tools.${toolKey}`);

  let displayName = entity.name;
  if (translatedIng && !translatedIng.startsWith('ingredients.')) {
    // If entity.name has icon prefix, e.g., "🥔 Potatoes"
    const hasIconPrefix = entity.icon && entity.name.startsWith(entity.icon);
    displayName = hasIconPrefix ? `${entity.icon} ${translatedIng}` : translatedIng;
  } else if (translatedTool && !translatedTool.startsWith('tools.')) {
    displayName = translatedTool;
  }

  return (
    <>
      <span className="entity-view__icon">
        <EntityIcon entity={entity} />
      </span>
      <span className="entity-view__name">{displayName}</span>
      <EntityStateBadge entity={entity} containerId={containerId} />
      {containerId && containerId !== 'despensa' && containerId !== 'trash' && (
        <button
          type="button"
          className="entity-delete-btn"
          title="Move to trash"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            worldStore.getState().dispatch({
              type: 'MOVE_ENTITY',
              payload: {
                entityId: entity.id,
                targetContainerId: 'trash',
                sourceContainerId: containerId,
              },
            });
          }}
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          ×
        </button>
      )}
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
  const focusTarget = useStore(worldStore, (state) => state.focusTarget);
  const focusClass = getEntityFocusClass(entity.id, containerId, focusTarget);

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
    focusClass,
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
  const focusTarget = useStore(worldStore, (state) => state.focusTarget);
  const focusClass = getEntityFocusClass(entity.id, containerId, focusTarget);

  if (readOnly) {
    const CustomRenderer = entityRendererRegistry[entity.type];
    const RendererComponent = CustomRenderer || DefaultEntityRenderer;

    const className = [
      'entity-view',
      focusClass,
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
