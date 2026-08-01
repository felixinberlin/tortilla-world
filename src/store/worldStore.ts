/**
 * FILE: worldStore.ts
 *
 * PURPOSE:
 * Central Zustand store for the game world composed from modular slices with Immer middleware.
 *
 * RESPONSIBILITY:
 * - Owns world state (entities, containers).
 * - Integrates slices and middleware (devtools, actionLog, immer).
 * - Dispatches actions to slice methods.
 */

import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { WorldAction, WorldEvent } from '../types/world';
import { eventStore } from '../systems/EventStore';
import { actionLog } from './middleware/actionLog';
import { defaultEntities, defaultContainers } from './defaults';
import { createEntitySlice } from './slices/entitySlice';
import { createContainerSlice } from './slices/containerSlice';
import { createMascotSlice } from './slices/mascotSlice';
import { createRecordSlice } from './slices/recordSlice';
import { createFocusSlice } from './slices/focusSlice';
import { inferFocusFromAction } from '../systems/focus';
import type { WorldStateStore } from './types';

const eventListeners = new Set<(event: WorldEvent) => void>();

export const worldStore = createStore<WorldStateStore>()(
  devtools(
    actionLog(
      immer((set, get, api) => ({
        ...createEntitySlice(set, get, api),
        ...createContainerSlice(set, get, api),
        ...createMascotSlice(set, get, api),
        ...createRecordSlice(set, get, api),
        ...createFocusSlice(set, get, api),

        // Deep clone initial state to avoid reference mutations
        entities: JSON.parse(JSON.stringify(defaultEntities)),
        containers: JSON.parse(JSON.stringify(defaultContainers)),
        events: [],
        activeRecipeName: 'Tortilla Española Clásica',
        activeRecipeId: 'concebolla',

        setActiveRecipeName: (name: string) => {
          set({ activeRecipeName: name }, false, 'SET_ACTIVE_RECIPE_NAME');
        },

        setActiveRecipeId: (recipeId: string) => {
          set({ activeRecipeId: recipeId }, false, 'SET_ACTIVE_RECIPE_ID');
        },

        emitEvent: (event: WorldEvent) => {
          set(
            (draft) => {
              draft.events.push(event);
            },
            false,
            event.type
          );
          eventListeners.forEach((listener) => listener(event));
        },

        onEvent: (listener: (event: WorldEvent) => void) => {
          eventListeners.add(listener);
          return () => {
            eventListeners.delete(listener);
          };
        },

        resetWorld: () => {
          set((draft) => {
            draft.entities = JSON.parse(JSON.stringify(defaultEntities));
            draft.containers = JSON.parse(JSON.stringify(defaultContainers));
            draft.events = [];
          }, false, 'RESET_WORLD');
          get().clearFocus();
        },

        dispatch: (action: WorldAction) => {
          eventStore.emit(action);
          const store = get();

          // Record action if recording is currently active
          if (store.isRecording) {
            store.recordAction(action);
          }

          // Automatically infer focus target from world actions unless userOverride is active
          const focusInferred = inferFocusFromAction(action);
          if (focusInferred && !store.userOverride) {
            store.setFocus({
              containerId: focusInferred.containerId,
              entityIds: focusInferred.entityIds,
              mode: 'focused',
            });
          }

          switch (action.type) {
            case 'MOVE_ENTITY':
              store.moveEntity(
                action.payload.entityId,
                action.payload.targetContainerId,
                action.payload.positionIndex
              );
              break;
            case 'TOGGLE_BURNER':
            case 'TOGGLE_HEAT': {
              let updatedIsOn = false;
              let containerExists = false;
              const currentCondition = action.payload.cookCondition;

              set(
                (draft) => {
                  const targetContainer = draft.containers[action.payload.containerId];
                  if (targetContainer) {
                    const nextIsOn =
                      typeof action.payload.isOn === 'boolean'
                        ? action.payload.isOn
                        : !targetContainer.isOn;
                    targetContainer.isOn = nextIsOn;
                    if (nextIsOn) {
                      if (currentCondition) {
                        targetContainer.cookCondition = currentCondition;
                        targetContainer.timer = currentCondition;
                      }
                    } else {
                      delete targetContainer.cookCondition;
                      delete targetContainer.timer;
                    }
                    updatedIsOn = targetContainer.isOn;
                    containerExists = true;
                  }
                },
                false,
                action.type
              );

              if (containerExists) {
                get().emitEvent({
                  type: 'CONTAINER_HEAT_TOGGLED',
                  payload: {
                    containerId: action.payload.containerId,
                    isOn: updatedIsOn,
                    cookCondition: currentCondition,
                  },
                });
              }
              break;
            }
            case 'COOK_INGREDIENT':
              store.cookIngredient(action.payload.entityId, action.payload.cooking);
              if (action.payload.customName || action.payload.cookCondition) {
                set(
                  (draft) => {
                    const ent = draft.entities[action.payload.entityId];
                    if (ent) {
                      if (action.payload.customName) {
                        ent.name = action.payload.customName;
                      }
                      if (action.payload.cookCondition) {
                        ent.state = {
                          ...ent.state,
                          cookCondition: action.payload.cookCondition,
                        };
                      }
                    }
                  },
                  false,
                  'COOK_INGREDIENT_CUSTOM'
                );
              }
              break;
            case 'ADD_ENTITY':
              store.addEntity(action.payload.entity, action.payload.containerId);
              break;

            case 'REMOVE_ENTITY':
              store.removeEntity(action.payload.entityId);
              break;

            case 'EMPTY_TRASH': {
              const trashedIds = [...(get().containers.trash?.entityIds || [])];
              store.emptyTrash();
              get().emitEvent({
                type: 'TRASH_EMPTIED',
                payload: { entityIds: trashedIds },
              });
              break;
            }

            case 'UPDATE_ENTITY_STATE':
              store.updateEntityState(action.payload.entityId, action.payload.changes);
              break;

            case 'PREPARE_INGREDIENT':
              store.prepareIngredient(action.payload.entityId, action.payload.preparation);
              break;

            case 'USE_INGREDIENT':
              store.useIngredient(action.payload.entityId, action.payload.usedIn);
              break;

            case 'MASCOT_FLIP':
              store.mascotFlip(action.payload.mascotId);
              break;

            case 'MASCOT_MOVE':
              store.mascotMove(action.payload.targetContainerId, action.payload.mascotId);
              break;

            case 'MASCOT_GRAB':
              store.mascotGrab(
                action.payload.entityId,
                action.payload.sourceContainerId,
                action.payload.mascotId
              );
              break;

            case 'MASCOT_DROP':
              store.mascotDrop(
                action.payload.targetContainerId,
                action.payload.positionIndex,
                action.payload.mascotId
              );
              break;

            case 'MASCOT_CLEAR_GAZE':
              store.mascotClearGaze(action.payload.mascotId);
              break;

            case 'WASH_CONTAINER_CONTENTS': {
              const targetContainer = get().containers[action.payload.containerId];
              if (targetContainer) {
                const entityIds = [...targetContainer.entityIds];
                entityIds.forEach((id) => {
                  get().transformIngredient(id, 'wash');
                });
                get().emitEvent({
                  type: 'CONTAINER_WASHED',
                  payload: {
                    containerId: action.payload.containerId,
                    entityIds,
                  },
                });
              }
              break;
            }

            case 'CUT_CONTAINER_CONTENTS': {
              const targetContainer = get().containers[action.payload.containerId];
              if (targetContainer) {
                const entityIds = [...targetContainer.entityIds];
                entityIds.forEach((id) => {
                  get().transformIngredient(id, 'cut');
                });
                get().emitEvent({
                  type: 'CONTAINER_CUT',
                  payload: {
                    containerId: action.payload.containerId,
                    entityIds,
                  },
                });
              }
              break;
            }

            case 'PEEL_CONTAINER_CONTENTS': {
              const targetContainer = get().containers[action.payload.containerId];
              if (targetContainer) {
                const entityIds = [...targetContainer.entityIds];
                entityIds.forEach((id) => {
                  get().transformIngredient(id, 'peel');
                });
                get().emitEvent({
                  type: 'CONTAINER_PEELED',
                  payload: {
                    containerId: action.payload.containerId,
                    entityIds,
                  },
                });
              }
              break;
            }

            case 'MIX_CONTAINER_CONTENTS': {
              const containerId = action.payload.containerId;
              const targetContainer = get().containers[containerId];
              if (targetContainer) {
                const inputEntityIds = [...targetContainer.entityIds];
                let mixtureId: string | undefined;

                if (inputEntityIds.length > 0) {
                  // Check auto-generated sequential default name count
                  const existingMixtures = Object.values(get().entities).filter(
                    (e) =>
                      e.id.startsWith('mixture_') ||
                      e.ingredientId === 'mixture' ||
                      e.name.toLowerCase().includes('mixture')
                  );
                  const defaultName = `mixture_${existingMixtures.length + 1}`;
                  const customNameInput = action.payload.customName?.trim();
                  const finalName = customNameInput || defaultName;
                  mixtureId = `mixture_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

                  // 1. Add mixture entity to container
                  get().addEntity(
                    {
                      id: mixtureId,
                      name: finalName,
                      type: 'ingredient',
                      ingredientId: 'mixture',
                      state: {
                        preparation: 'mixed',
                        cooking: 'raw',
                        status: 'mixed',
                        components: inputEntityIds,
                      },
                    },
                    containerId
                  );

                  // 2. Mark input ingredients as consumed / used in mixture
                  inputEntityIds.forEach((id) => {
                    get().useIngredient(id, mixtureId);
                  });
                }

                // 3. Emit event
                get().emitEvent({
                  type: 'CONTAINER_MIXED',
                  payload: {
                    containerId,
                    entityIds: inputEntityIds,
                    mixtureId,
                    customName: action.payload.customName,
                  },
                });
              }
              break;
            }

            case 'COOK_CONTAINER_CONTENTS': {
              const containerId = action.payload.containerId;
              const targetContainer = get().containers[containerId];
              if (targetContainer) {
                const entityIds = [...targetContainer.entityIds];
                const cookCondition =
                  action.payload.cookCondition ||
                  targetContainer.cookCondition ||
                  targetContainer.timer;
                const activeRecipeName = get().activeRecipeName || 'Tortilla Española Clásica';
                const customName = action.payload.customName?.trim();
                const cookingMethod = action.payload.cooking || 'cooked';

                if (entityIds.length > 0) {
                  entityIds.forEach((id) => {
                    const entity = get().entities[id];
                    if (!entity) return;

                    const isMixture =
                      entity.id.startsWith('mixture_') ||
                      entity.ingredientId === 'mixture' ||
                      entity.name.toLowerCase().includes('mixture');

                    if (isMixture) {
                      const finalName = customName || activeRecipeName;
                      set(
                        (draft) => {
                          const ent = draft.entities[id];
                          if (ent) {
                            ent.name = finalName;
                            ent.status = 'cooked';
                            ent.state = {
                              ...ent.state,
                              cooking: cookingMethod,
                              status: 'cooked',
                              cookCondition,
                            };
                          }
                        },
                        false,
                        'COOK_MIXTURE'
                      );
                    } else {
                      get().cookIngredient(id, cookingMethod);
                      set(
                        (draft) => {
                          const ent = draft.entities[id];
                          if (ent) {
                            if (customName) {
                              ent.name = customName;
                            }
                            ent.state = {
                              ...ent.state,
                              cookCondition,
                            };
                          }
                        },
                        false,
                        'COOK_ENTITY_CUSTOM'
                      );
                    }
                  });
                }

                get().emitEvent({
                  type: 'CONTAINER_COOKED',
                  payload: {
                    containerId,
                    entityIds,
                    customName,
                    cookCondition,
                  },
                });
              }
              break;
            }

            case 'SET_FOCUS':
              store.setFocus(
                {
                  containerId: action.payload.containerId,
                  entityIds: action.payload.entityIds,
                  mode: action.payload.mode ?? 'focused',
                },
                action.payload.isUserOverride
              );
              break;

            case 'CLEAR_FOCUS':
              store.clearFocus(action.payload?.isUserOverride);
              break;

            case 'FOCUS_CONTAINER':
              store.setFocus(
                {
                  containerId: action.payload.containerId,
                  entityIds: action.payload.entityIds,
                  mode: 'focused',
                },
                action.payload.isUserOverride
              );
              break;

            case 'FOCUS_ENTITY':
              store.setFocus(
                {
                  containerId: action.payload.containerId,
                  entityIds: [action.payload.entityId],
                  mode: 'focused',
                },
                action.payload.isUserOverride
              );
              break;

            case 'RESET_WORLD':
              store.resetWorld();
              break;
          }
        },
      }))
    ),
    { name: 'tortilla-world' }
  )
);

// if (import.meta.env.DEV) {
//   (window as any).worldStore = worldStore;
// }