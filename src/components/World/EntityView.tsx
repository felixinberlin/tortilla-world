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

const STANDARD_WORKSTATION_ORDER = ['sink', 'board', 'bowl', 'burner', 'burner1', 'burner2', 'plate', 'trash'];

/**
 * Default Entity Renderer used when no custom renderer is registered for an entity type.
 */
export const DefaultEntityRenderer: React.FC<EntityRendererProps> = ({ entity, containerId, readOnly }) => {
  const { t } = useTranslation();
  const containers = useStore(worldStore, (state) => state.containers);

  const workstationList = React.useMemo(() => {
    const keys = Object.keys(containers).filter((id) => id !== 'despensa');
    return keys.sort((a, b) => {
      const idxA = STANDARD_WORKSTATION_ORDER.indexOf(a);
      const idxB = STANDARD_WORKSTATION_ORDER.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });
  }, [containers]);

  const currentIndex = containerId ? workstationList.indexOf(containerId) : -1;
  const prevContainerId = currentIndex > 0 ? workstationList[currentIndex - 1] : null;
  const nextContainerId =
    currentIndex >= 0 && currentIndex < workstationList.length - 1
      ? workstationList[currentIndex + 1]
      : null;

  const ingKey = entity.ingredientId || entity.id;
  const toolKey = entity.id;

  const translatedIng = t(`ingredients.${ingKey}`);
  const translatedTool = t(`tools.${toolKey}`);

  let displayName = entity.name;
  const isMixtureEntity = ingKey === 'mixture' || entity.ingredientId === 'mixture';

  if (!isMixtureEntity && translatedIng && !translatedIng.startsWith('ingredients.')) {
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
      {containerId && containerId !== 'despensa' && !readOnly && (
        <div className="entity-nav-buttons">
          <button
            type="button"
            className="entity-take-btn"
            title={t('ui.takeMe') || '🤲 Llévame'}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              const mascot = worldStore.getState().entities['chef'];
              const rawHolding = mascot?.state?.holdingEntityIds as string[] | undefined;
              const singleHolding = mascot?.state?.holdingEntityId as string | undefined;
              const currentHolding = Array.isArray(rawHolding) && rawHolding.length > 0
                ? rawHolding
                : singleHolding
                ? [singleHolding]
                : [];

              if (currentHolding.length < 2) {
                worldStore.getState().dispatch({
                  type: 'MASCOT_GRAB',
                  payload: {
                    entityId: entity.id,
                    sourceContainerId: containerId,
                    mascotId: 'chef',
                  },
                });
              } else {
                worldStore.getState().dispatch({
                  type: 'UPDATE_ENTITY_STATE',
                  payload: {
                    entityId: 'chef',
                    changes: { speechMessage: '¡Mis manos están llenas! 🤲 / My hands are full!' },
                  },
                });
                setTimeout(() => {
                  worldStore.getState().dispatch({
                    type: 'UPDATE_ENTITY_STATE',
                    payload: { entityId: 'chef', changes: { speechMessage: undefined } },
                  });
                }, 2500);
              }
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <span className="take-btn-icon">🤲</span>
            <span className="take-btn-text">{t('ui.takeMe') || 'Llévame'}</span>
          </button>
          <button
            type="button"
            className="entity-nav-btn nav-prev"
            title={prevContainerId ? `Move to ${prevContainerId}` : undefined}
            aria-label={prevContainerId ? `Move to ${prevContainerId}` : 'Move to previous'}
            disabled={!prevContainerId}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (prevContainerId) {
                worldStore.getState().dispatch({
                  type: 'MOVE_ENTITY',
                  payload: {
                    entityId: entity.id,
                    targetContainerId: prevContainerId,
                    sourceContainerId: containerId,
                  },
                });
              }
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            ◀
          </button>
          <button
            type="button"
            className="entity-nav-btn nav-next"
            title={nextContainerId ? `Move to ${nextContainerId}` : undefined}
            aria-label={nextContainerId ? `Move to ${nextContainerId}` : 'Move to next'}
            disabled={!nextContainerId}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (nextContainerId) {
                worldStore.getState().dispatch({
                  type: 'MOVE_ENTITY',
                  payload: {
                    entityId: entity.id,
                    targetContainerId: nextContainerId,
                    sourceContainerId: containerId,
                  },
                });
              }
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            ▶
          </button>
          {containerId !== 'trash' && (
            <button
              type="button"
              className="entity-delete-btn"
              title="Move to trash"
              aria-label="Move to trash"
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
        </div>
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
