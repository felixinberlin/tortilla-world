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
import { actionLog } from './middleware/actionLog';
import { defaultEntities, defaultContainers } from './defaults';
import { createEntitySlice } from './slices/entitySlice';
import { createContainerSlice } from './slices/containerSlice';
import { createMascotSlice } from './slices/mascotSlice';
import type { WorldStateStore } from './types';

const eventListeners = new Set<(event: WorldEvent) => void>();

export const worldStore = createStore<WorldStateStore>()(
  devtools(
    actionLog(
      immer((set, get, api) => ({
        ...createEntitySlice(set, get, api),
        ...createContainerSlice(set, get, api),
        ...createMascotSlice(set, get, api),

        // Deep clone initial state to avoid reference mutations
        entities: JSON.parse(JSON.stringify(defaultEntities)),
        containers: JSON.parse(JSON.stringify(defaultContainers)),
        events: [],

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
        },

        dispatch: (action: WorldAction) => {
          const store = get();
          switch (action.type) {
            case 'MOVE_ENTITY':
              store.moveEntity(
                action.payload.entityId,
                action.payload.targetContainerId,
                action.payload.positionIndex
              );
              break;
            case 'TOGGLE_BURNER': {
              set((draft) => {
                const burner = draft.containers[action.payload.containerId];
                burner.isOn = !burner.isOn;
              });

              break;
            }
            case 'ADD_ENTITY':
              store.addEntity(action.payload.entity, action.payload.containerId);
              break;

            case 'REMOVE_ENTITY':
              store.removeEntity(action.payload.entityId);
              break;

            case 'UPDATE_ENTITY_STATE':
              store.updateEntityState(action.payload.entityId, action.payload.changes);
              break;

            case 'PREPARE_INGREDIENT':
              store.prepareIngredient(action.payload.entityId, action.payload.preparation);
              break;

            case 'COOK_INGREDIENT':
              store.cookIngredient(action.payload.entityId, action.payload.cooking);
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