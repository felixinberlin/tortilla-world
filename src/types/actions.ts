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
    };