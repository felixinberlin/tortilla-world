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
import type { WorldAction } from '../types/world';
import { actionLog } from './middleware/actionLog';
import { defaultEntities, defaultContainers } from './defaults';
import { createEntitySlice } from './slices/entitySlice';
import { createContainerSlice } from './slices/containerSlice';
import { createMascotSlice } from './slices/mascotSlice';
import type { WorldStateStore } from './types';

export const worldStore = createStore<WorldStateStore>()(
  devtools(
    actionLog(
      immer((set, get, api) => ({
        ...createEntitySlice(set, get, api),
        ...createContainerSlice(set, get, api),
        ...createMascotSlice(set, get, api),

        entities: defaultEntities,
        containers: defaultContainers,

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
          }
        },
      }))
    ),
    { name: 'tortilla-world' }
  )
);
