/**
 * FILE: actions.ts
 *
 * PURPOSE:
 * Defines world actions/events.
 *
 * RESPONSIBILITY:
 * - Creates the communication contract between systems and store.
 */

import type { EntityType } from './world';
import type { PreparationStyle, CookingMethod } from './RecipeStep';

export type WorldAction =
  | {
      type: 'MOVE_ENTITY';
      payload: {
        entityId: string;
        targetContainerId: string;
        positionIndex?: number;
      };
    }
  | {
      type: 'ADD_ENTITY';
      payload: {
        entity: {
          id: string;
          name: string;
          type: EntityType;
          state?: Record<string, unknown>;
        };
        containerId: string;
      };
    }
  | {
      type: 'REMOVE_ENTITY';
      payload: {
        entityId: string;
      };
    }
  | {
      type: 'UPDATE_ENTITY_STATE';
      payload: {
        entityId: string;
        changes: Record<string, unknown>;
      };
    }
  | {
      type: 'PREPARE_INGREDIENT';
      payload: {
        entityId: string;
        preparation: PreparationStyle;
      };
    }
  | {
      type: 'COOK_INGREDIENT';
      payload: {
        entityId: string;
        cooking: CookingMethod;
      };
    }
  | {
      type: 'MASCOT_FLIP';
      payload: {
        mascotId?: string;
      };
    }
  | {
      type: 'MASCOT_MOVE';
      payload: {
        mascotId?: string;
        targetContainerId: string;
      };
    }
  | {
      type: 'MASCOT_GRAB';
      payload: {
        mascotId?: string;
        entityId: string;
        sourceContainerId?: string;
      };
    }
  | {
      type: 'MASCOT_DROP';
      payload: {
        mascotId?: string;
        targetContainerId: string;
        positionIndex?: number;
      };
    };
