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
      action: 'prepare' | 'cut' | 'peel' | 'wash';
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
      method?: CookingMethod;
      /** Local vessel alias from recipe.vessels (e.g. 'big_pan', 'small_pan') */
      vessel?: string;
      /** Escape hatch — direct container id, overrides vessel */
      containerId?: string;
      duration?: number;
      until?: string | string[];
      temperature?: string | number;
      instruction?: string;
      mascotId?: string;
      unit?: string;
    }
  | {
      action: 'wash' | 'rinse' | 'drain';
      target?: string;
      ingredient?: string;
      containerId?: string;
    }
  | {
      action: 'mix' | 'beat' | 'combine';
      inputs?: string[];
      ingredients?: string[];
      output?: string;
      targetContainerId?: string;
    }
  | {
      action: 'instruction';
      text?: string;
      instruction?: string;
      mascotId?: string;
    }
  | {
      action: 'flip';
      target?: string;
      instruction?: string;
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