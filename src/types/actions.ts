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
      type: 'INIT_WORLD';
      payload: {
        entities: Record<string, import('./world').Entity>;
        containers: Record<string, import('./world').Container>;
      };
    }
  | {
      type: 'TRANSFORM_ENTITY';
      payload: {
        entityId: string;
        newState: Record<string, unknown>;
      };
    };