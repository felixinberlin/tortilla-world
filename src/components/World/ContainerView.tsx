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

import React, { useState, useMemo } from 'react';
import { useStore } from 'zustand';
import { useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { worldStore } from '../../store/worldStore';
import type { Container, Entity } from '../../types/world';
import { EntityView } from './EntityView';
import { useTranslation } from '../../i18n/useTranslation';
import { getContainerFocusClass } from '../../systems/focus';
import { recipes } from '../../data/catalog/recipes';
import { getRecipeWorkstationIds } from '../../systems/recipeWorkstations';
import './World.scss';

interface ContainerViewProps {
  key?: string | number;
  container: Container;
}

export const ContainerView: React.FC<ContainerViewProps> = ({ container }) => {
  const { t } = useTranslation();
  const entities = useStore(worldStore, (state) => state.entities);
  const focusTarget = useStore(worldStore, (state) => state.focusTarget);
  const activeRecipeId = useStore(worldStore, (state) => state.activeRecipeId);
  const mascot = useStore(worldStore, (state) => state.entities['chef']);

  const activeRecipeName = useStore(worldStore, (state) => state.activeRecipeName);

  const [mixCustomName, setMixCustomName] = useState('');
  const [cookConditionInput, setCookConditionInput] = useState('');
  const [cookedCustomName, setCookedCustomName] = useState('');

  const activeRecipe = useMemo(
    () => recipes.find((r) => r.id === activeRecipeId) || recipes[0],
    [activeRecipeId]
  );

  const defaultDishName = activeRecipeName || activeRecipe?.name || 'Tortilla Española Clásica';
  const [plateCustomName, setPlateCustomName] = useState('');

  const containerEntities = container.entityIds
    .map((id: string) => entities[id])
    .filter((e: Entity | undefined): e is Entity => Boolean(e));

  const rawHolding = mascot?.state?.holdingEntityIds as string[] | undefined;
  const singleHolding = mascot?.state?.holdingEntityId as string | undefined;

  const holdingEntityIds: string[] = Array.isArray(rawHolding) && rawHolding.length > 0
    ? rawHolding
    : singleHolding
    ? [singleHolding]
    : [];

  const isHoldingItems = holdingEntityIds.length > 0;

  const isPlate = container.id === 'plate' || container.id === 'plato' || container.type === 'plate';
  const displayPlateName = plateCustomName !== '' ? plateCustomName : (containerEntities[0]?.name || defaultDishName);

  const recipeWorkstationIds = useMemo(
    () => getRecipeWorkstationIds(activeRecipe),
    [activeRecipe]
  );

  const isBeingUsed =
    Boolean(container.isOn) ||
    focusTarget.containerId === container.id ||
    mascot?.state?.targetContainerId === container.id ||
    mascot?.state?.sourceContainerId === container.id;

  const focusClass = getContainerFocusClass(container.id, focusTarget, {
    container,
    recipeWorkstationIds,
    isBeingUsed,
  });

  // Set up dnd-kit droppable binding for this container
  const { setNodeRef, isOver } = useDroppable({
    id: container.id,
  });

  const isMixturePresent = containerEntities.some(
    (e) => e.id.includes('mixture') || e.name.toLowerCase().includes('mixture')
  );

  const getWorkstationBadge = (id: string) => {
    switch (id) {
      case 'sink': return t('workstations.sink');
      case 'board': return t('workstations.board');
      case 'bowl': return t('workstations.bowl');
      case 'burner': return t('workstations.burner');
      case 'burner1': return t('workstations.burner1');
      case 'burner2': return t('workstations.burner2');
      case 'plate': return t('workstations.plate');
      case 'trash': return t('workstations.trash');
      case 'despensa': return t('workstations.despensa');
      default: return t('workstations.default');
    }
  };

  const [showConfirmTrash, setShowConfirmTrash] = useState(false);

  const containerOnFireClass = container.isOn ? 'container-onFire' : '';
  const dispatch = useStore(worldStore, (state) => state.dispatch);

  const isCookingArea =
    container.type === 'burner' ||
    container.id.includes('burner') ||
    container.id.includes('pan') ||
    container.id.includes('stove');
  const isSink = container.type === 'sink' || container.id.includes('sink');
  const isCuttingBoard =
    container.type === 'board' ||
    container.id.includes('board') ||
    container.id.includes('cutting');
  const isBowl = container.type === 'bowl' || container.id.includes('bowl');
  const isTrash = container.id === 'trash' || container.type === 'trash' || container.id === 'papelera' || container.id === 'basura';

  return (
    <div
      ref={setNodeRef}
      data-container-id={container.id}
      onClick={() => {
        dispatch({
          type: 'FOCUS_CONTAINER',
          payload: { containerId: container.id, isUserOverride: true },
        });
      }}
      className={`${focusClass} ${container.isOn ? 'container-view--on' : ''} ${containerOnFireClass} container-view container-view--${container.id} ${isOver ? 'container-view--drag-over' : ''} ${isMixturePresent ? 'container-view--mixture' : ''}`}
    >
      <div className="container-view__header">
        <h3 className="container-view__title">{container.name}</h3>
        <span className="container-view__badge">{getWorkstationBadge(container.id)}</span>
        {isTrash && container.entityIds.length > 0 && (
          showConfirmTrash ? (
            <div
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'var(--card-bg, #ffffff)',
                border: '1px solid #ef4444',
                borderRadius: '6px',
                padding: '3px 8px',
                fontSize: '0.8rem',
              }}
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <span style={{ fontWeight: 600, color: '#b91c1c' }}>{t('ui.confirmEmptyTrash')}</span>
              <button
                type="button"
                className="confirm-empty-trash-btn"
                aria-label={t('ui.yesEmpty')}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  dispatch({ type: 'EMPTY_TRASH' });
                  dispatch({
                    type: 'UPDATE_ENTITY_STATE',
                    payload: { entityId: 'chef', changes: { speechMessage: undefined } },
                  });
                  setShowConfirmTrash(false);
                }}
                style={{
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                ✅ {t('ui.yesEmpty')}
              </button>
              <button
                type="button"
                className="cancel-empty-trash-btn"
                aria-label={t('ui.cancel')}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  dispatch({
                    type: 'UPDATE_ENTITY_STATE',
                    payload: { entityId: 'chef', changes: { speechMessage: undefined } },
                  });
                  setShowConfirmTrash(false);
                }}
                style={{
                  backgroundColor: '#6b7280',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                ❌ {t('ui.cancel')}
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="empty-trash-btn"
              title={t('ui.emptyTrash')}
              aria-label={t('ui.emptyTrash')}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowConfirmTrash(true);
                dispatch({
                  type: 'MASCOT_MOVE',
                  payload: { mascotId: 'chef', targetContainerId: 'trash' },
                });
                dispatch({
                  type: 'UPDATE_ENTITY_STATE',
                  payload: {
                    entityId: 'chef',
                    changes: {
                      speechMessage: t('ui.confirmEmptyTrash'),
                      targetContainerId: 'trash',
                      gazingAt: { type: 'entity', entityId: 'trash' },
                    },
                  },
                });
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              style={{
                marginLeft: 'auto',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
              }}
            >
              🗑️ {t('ui.emptyTrash')}
            </button>
          )
        )}
        {(container.cookCondition || container.timer) && (
          <span className="container-view__badge container-view__badge--timer" title="Active Cooking Target">
            ⏱️ {container.cookCondition || container.timer}
          </span>
        )}
        {isCookingArea && (
          <button
            type="button"
            className={`burner-toggle ${container.isOn ? 'burner-toggle--on' : ''}`}
            title="Toggle Heat"
            aria-label={container.isOn ? t('ui.heatOff') : t('ui.heatOn')}
            onClick={(e) => {
              e.stopPropagation();
              dispatch({
                type: 'TOGGLE_HEAT',
                payload: {
                  containerId: container.id,
                  cookCondition: cookConditionInput.trim() || undefined,
                  isOn: !container.isOn,
                },
              });
            }}
          />
        )}
      </div>

      {(isCookingArea || isSink || isCuttingBoard || isBowl || isPlate || (!isPlate && containerEntities.length > 0) || container.id !== 'despensa') && (
        <div className="container-view__actions">
          {container.id !== 'despensa' && (
            <div className="container-view__leave-row">
              <button
                type="button"
                className={`container-action-btn leave-here-btn ${isHoldingItems ? 'leave-here-btn--highlight' : ''}`}
                title={t('ui.leaveHere') || 'Dejar aquí'}
                aria-label={t('ui.leaveHere') || 'Dejar aquí'}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isHoldingItems) {
                    dispatch({
                      type: 'UPDATE_ENTITY_STATE',
                      payload: {
                        entityId: 'chef',
                        changes: {
                          speechMessage: t('ui.nothingInHands') || '¡No tengo nada en las manos!',
                          targetContainerId: container.id,
                          gazingAt: { type: 'entity', entityId: container.id },
                        },
                      },
                    });
                    setTimeout(() => {
                      dispatch({
                        type: 'UPDATE_ENTITY_STATE',
                        payload: { entityId: 'chef', changes: { speechMessage: undefined } },
                      });
                    }, 2500);
                    return;
                  }
                  dispatch({
                    type: 'MASCOT_DROP',
                    payload: {
                      targetContainerId: container.id,
                      mascotId: 'chef',
                    },
                  });
                }}
              >
                👇 {t('ui.leaveHere') || 'Dejar aquí'}
                {isHoldingItems && (
                  <span className="holding-count-badge">
                    ({holdingEntityIds.length})
                  </span>
                )}
              </button>
            </div>
          )}

          {isCookingArea && (
            <div className="container-view__action-group">
              <div className="container-view__field-group">
                <label className="container-view__input-label">
                  🎯 {t('ui.targetLabel')}
                </label>
                <div className="container-view__input-row">
                  <input
                    type="text"
                    className="container-view__input container-view__input--lg"
                    placeholder={t('ui.targetPlaceholder')}
                    value={cookConditionInput}
                    onChange={(e) => setCookConditionInput(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    type="button"
                    className={`container-action-btn toggle-heat-btn ${container.isOn ? 'container-action-btn--active' : ''}`}
                    aria-label={container.isOn ? t('ui.heatOff') : t('ui.heatOn')}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({
                        type: 'TOGGLE_HEAT',
                        payload: {
                          containerId: container.id,
                          cookCondition: cookConditionInput.trim() || undefined,
                          isOn: !container.isOn,
                        },
                      });
                    }}
                  >
                    🔥 {container.isOn ? t('ui.heatOff') : t('ui.heatOn')}
                  </button>
                </div>
              </div>

              <div className="container-view__field-group">
                <label className="container-view__input-label">
                  🍳 {t('ui.mixtureNamePlaceholder')}
                </label>
                <div className="container-view__input-row">
                  <input
                    type="text"
                    className="container-view__input container-view__input--lg"
                    placeholder={t('ui.mixtureNamePlaceholder')}
                    value={cookedCustomName}
                    onChange={(e) => setCookedCustomName(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    type="button"
                    className="container-action-btn cook-btn"
                    aria-label={t('verbs.cook')}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!container.isOn) {
                        dispatch({
                          type: 'TOGGLE_HEAT',
                          payload: { containerId: container.id, isOn: true },
                        });
                      }
                      dispatch({
                        type: 'COOK_CONTAINER_CONTENTS',
                        payload: {
                          containerId: container.id,
                          customName: cookedCustomName.trim() || undefined,
                          cookCondition: cookConditionInput.trim() || container.cookCondition || container.timer,
                        },
                      });
                    }}
                  >
                    🍳 {t('verbs.cook')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {isSink && (
            <button
              type="button"
              className="container-action-btn wash-btn"
              aria-label={t('verbs.wash')}
              onClick={(e) => {
                e.stopPropagation();
                dispatch({
                  type: 'WASH_CONTAINER_CONTENTS',
                  payload: { containerId: container.id },
                });
              }}
            >
              🧼 {t('verbs.wash')}
            </button>
          )}

          {isCuttingBoard && (
            <div className="container-view__button-row">
              <button
                type="button"
                className="container-action-btn cut-btn"
                aria-label={t('verbs.cut')}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({
                    type: 'CUT_CONTAINER_CONTENTS',
                    payload: { containerId: container.id },
                  });
                }}
              >
                🔪 {t('verbs.cut')}
              </button>
              <button
                type="button"
                className="container-action-btn peel-btn"
                aria-label={t('verbs.peel')}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({
                    type: 'PEEL_CONTAINER_CONTENTS',
                    payload: { containerId: container.id },
                  });
                }}
              >
                🥔 {t('verbs.peel')}
              </button>
            </div>
          )}

          {isBowl && (
            <div className="container-view__action-group">
              <div className="container-view__input-row">
                <input
                  type="text"
                  className="container-view__input"
                  placeholder={t('ui.mixtureNamePlaceholder')}
                  value={mixCustomName}
                  onChange={(e) => setMixCustomName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.stopPropagation();
                      const trimmedName = mixCustomName.trim();
                      if (containerEntities.length === 1 && (containerEntities[0].ingredientId === 'mixture' || containerEntities[0].id.includes('mixture'))) {
                        if (trimmedName) {
                          dispatch({
                            type: 'UPDATE_ENTITY_STATE',
                            payload: {
                              entityId: containerEntities[0].id,
                              changes: { name: trimmedName },
                            },
                          });
                        }
                      } else {
                        dispatch({
                          type: 'MIX_CONTAINER_CONTENTS',
                          payload: {
                            containerId: container.id,
                            customName: trimmedName || undefined,
                          },
                        });
                      }
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  type="button"
                  className="container-action-btn mix-btn"
                  aria-label={t('verbs.mix')}
                  onClick={(e) => {
                    e.stopPropagation();
                    const trimmedName = mixCustomName.trim();
                    if (containerEntities.length === 1 && (containerEntities[0].ingredientId === 'mixture' || containerEntities[0].id.includes('mixture'))) {
                      if (trimmedName) {
                        dispatch({
                          type: 'UPDATE_ENTITY_STATE',
                          payload: {
                            entityId: containerEntities[0].id,
                            changes: { name: trimmedName },
                          },
                        });
                      }
                    } else {
                      dispatch({
                        type: 'MIX_CONTAINER_CONTENTS',
                        payload: {
                          containerId: container.id,
                          customName: trimmedName || undefined,
                        },
                      });
                    }
                  }}
                >
                  🥣 {t('verbs.mix')}
                </button>
              </div>
            </div>
          )}

          {containerEntities.some((e) => !e.state?.consumed && e.ingredientId === 'egg') && (
            <button
              type="button"
              className="container-action-btn separate-btn"
              aria-label={t('verbs.separate') || 'Separate'}
              onClick={(e) => {
                e.stopPropagation();
                dispatch({
                  type: 'SEPARATE_CONTAINER_CONTENTS',
                  payload: { containerId: container.id },
                });
              }}
            >
              🥚 {t('verbs.separate') || 'Separate'}
            </button>
          )}

          {isPlate && containerEntities.length > 0 && (
            <div className="container-view__action-group">
              <div className="container-view__field-group">
                <label className="container-view__input-label">
                  🍽️ {t('ui.finalNameLabel')}
                </label>
                <div className="container-view__input-row">
                  <input
                    type="text"
                    className="container-view__input container-view__input--lg"
                    placeholder={t('ui.finalNamePlaceholder')}
                    value={displayPlateName}
                    onChange={(e) => setPlateCustomName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.stopPropagation();
                        const newName = (plateCustomName || displayPlateName).trim();
                        if (newName) {
                          containerEntities.forEach((ent) => {
                            dispatch({
                              type: 'UPDATE_ENTITY_STATE',
                              payload: {
                                entityId: ent.id,
                                changes: { name: newName },
                              },
                            });
                          });
                        }
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    type="button"
                    className="container-action-btn save-dish-name-btn"
                    aria-label={t('ui.save')}
                    onClick={(e) => {
                      e.stopPropagation();
                      const newName = (plateCustomName || displayPlateName).trim();
                      if (newName) {
                        containerEntities.forEach((ent) => {
                          dispatch({
                            type: 'UPDATE_ENTITY_STATE',
                            payload: {
                              entityId: ent.id,
                              changes: { name: newName },
                            },
                          });
                        });
                      }
                    }}
                  >
                    ✏️ {t('ui.save')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {!isPlate && containerEntities.length > 0 && (
            <button
              type="button"
              className="container-action-btn serve-plate-btn"
              aria-label={t('ui.serveToPlate')}
              onClick={(e) => {
                e.stopPropagation();
                containerEntities.forEach((ent) => {
                  dispatch({
                    type: 'MOVE_ENTITY',
                    payload: {
                      entityId: ent.id,
                      targetContainerId: 'plate',
                    },
                  });
                });
              }}
            >
              🍽️ {t('ui.serveToPlate')}
            </button>
          )}
        </div>
      )}

      <div className="container-view__items">
        <AnimatePresence mode="popLayout">
          {containerEntities.map((entity: Entity) => {
            const isMixture = entity.id.includes('mixture') || entity.name.toLowerCase().includes('mixture');
            return (
              <motion.div
                key={entity.id}
                layout
                initial={
                  isMixture
                    ? { scale: 0.1, rotate: -180, opacity: 0 }
                    : { scale: 0.8, opacity: 0, y: -10 }
                }
                animate={
                  isMixture
                    ? {
                      scale: [0.2, 1.15, 1],
                      rotate: [-180, 10, 0],
                      opacity: 1,
                      transition: { duration: 0.65, ease: 'easeOut' },
                    }
                    : { scale: 1, rotate: 0, opacity: 1, y: 0 }
                }
                exit={{
                  scale: 0,
                  rotate: 180,
                  opacity: 0,
                  filter: 'blur(4px)',
                  transition: { duration: 0.5, ease: 'easeInOut' },
                }}
                transition={{ duration: 0.35 }}
              >
                <EntityView entity={entity} containerId={container.id} />
              </motion.div>
            );
          })}
        </AnimatePresence>
        {containerEntities.length === 0 && (
          <span className="container-view__empty-hint">{t('ui.emptyContainerHint')}</span>
        )}
      </div>
    </div>
  );
};
