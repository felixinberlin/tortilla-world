/**
 * FILE: RecipeStep.ts
 *
 * PURPOSE:
 * Defines declarative steps for recipes.
 *
 * RESPONSIBILITY:
 * - Replaces hardcoded recipe logic with pure data declarations.
 * - Supports cooking actions (prepare, cook, mix, flip, serve, move, grab, drop, wait, speak, celebrate).
 */

export type PreparationStyle = 'whole' | 'peeled' | 'sliced' | 'diced' | 'minced' | 'beaten' | string;
export type CookingMethod = 'raw' | 'fried' | 'boiled' | 'burned' | 'heat' | string;

export type RecipeStep =
  | {
      action: 'prepare' | 'cut';
      target?: string;
      ingredient?: string;
      preparation?: PreparationStyle;
      style?: PreparationStyle;
      containerId?: string;
    }
  | {
      action: 'cook';
      target?: string;
      ingredient?: string;
      method: CookingMethod;
      containerId?: string;
    }
  | {
      action: 'mix' | 'beat';
      inputs?: string[];
      output?: string;
      targetContainerId?: string;
    }
  | {
      action: 'flip';
      target?: string;
      mascotId?: string;
    }
  | {
      action: 'serve';
      target?: string;
      containerId?: string;
    }
  | {
      action: 'move';
      ingredient?: string;
      target?: string;
      source?: string;
    }
  | {
      action: 'grab';
      ingredient: string;
      source?: string;
    }
  | {
      action: 'drop';
      target?: string;
      positionIndex?: number;
    }
  | {
      action: 'wait';
      durationMs?: number;
    }
  | {
      action: 'speak';
      message: string;
      mascotId?: string;
    }
  | {
      action: 'celebrate';
      mascotId?: string;
    };
