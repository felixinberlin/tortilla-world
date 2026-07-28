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
        icon?: string;
        ingredientId?: string;
        state?: Record<string, unknown>;
      };
      containerId: string;
    };
  }
  | {
    type: 'TOGGLE_BURNER';
    payload: {
      containerId: string;
      cookCondition?: string;
      isOn?: boolean;
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
      customName?: string;
      cookCondition?: string;
    };
  }
  | {
    type: 'USE_INGREDIENT';
    payload: {
      entityId: string;
      usedIn?: string;
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
  }
  | {
    type: 'MASCOT_CLEAR_GAZE';
    payload: {
      mascotId?: string;
    };
  }
  | {
      type: 'TOGGLE_HEAT';
      payload: {
        containerId: string;
        cookCondition?: string;
        isOn?: boolean;
      };
    }
  | {
      type: 'SET_TEMPERATURE';
      payload: {
        containerId: string;
        temperature: number | string;
      };
    }
  | {
      type: 'WASH_CONTAINER_CONTENTS';
      payload: {
        containerId: string;
      };
    }
  | {
      type: 'CUT_CONTAINER_CONTENTS';
      payload: {
        containerId: string;
      };
    }
  | {
      type: 'PEEL_CONTAINER_CONTENTS';
      payload: {
        containerId: string;
      };
    }
  | {
      type: 'MIX_CONTAINER_CONTENTS';
      payload: {
        containerId: string;
        customName?: string;
      };
    }
  | {
      type: 'COOK_CONTAINER_CONTENTS';
      payload: {
        containerId: string;
        cooking?: CookingMethod;
        customName?: string;
        cookCondition?: string;
      };
    }
  | {
      type: 'RESET_WORLD';
      payload?: Record<string, never>;
    };


export type WorldEvent =
  | {
      type: 'INGREDIENT_CONSUMED';
      payload: {
        entityId: string;
        consumedBy?: string;
      };
    }
  | {
      type: 'CONTAINER_HEAT_TOGGLED';
      payload: {
        containerId: string;
        isOn: boolean;
        cookCondition?: string;
      };
    }
  | {
      type: 'CONTAINER_WASHED';
      payload: {
        containerId: string;
        entityIds: string[];
      };
    }
  | {
      type: 'CONTAINER_CUT';
      payload: {
        containerId: string;
        entityIds: string[];
      };
    }
  | {
      type: 'CONTAINER_PEELED';
      payload: {
        containerId: string;
        entityIds: string[];
      };
    }
  | {
      type: 'CONTAINER_MIXED';
      payload: {
        containerId: string;
        entityIds: string[];
        mixtureId?: string;
        customName?: string;
      };
    }
  | {
      type: 'CONTAINER_COOKED';
      payload: {
        containerId: string;
        entityIds: string[];
        customName?: string;
        cookCondition?: string;
      };
    }
  | {
      type: 'CONTAINER_TEMPERATURE_SET';
      payload: {
        containerId: string;
        temperature: number | string;
      };
    };