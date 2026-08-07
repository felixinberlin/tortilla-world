/**
 * FILE: src/utils/recipeFormatDetector.ts
 *
 * PURPOSE:
 * Utility for detecting, parsing, and normalizing recipe files and objects across all 3 Tortilla World formats:
 * 1. Declarative Recipe (Recipe JSON with steps and requirements)
 * 2. Mascot Action Sequence (WorldAction[] or mascot sequence)
 * 3. Full Session Log (zustandInit, actions, events, zustandEnd)
 */

import type { Recipe } from '../types/Recipe';
import type { RecipeStep } from '../types/RecipeStep';
import type { WorldAction } from '../types/actions';
import type { RecordedAction, SerializedWorldState } from '../types/recording';
import type { SavedRecipe } from '../services/dbService';

export type RecipeFormatType = 'declarative' | 'mascot_sequence' | 'full_session_log' | 'unknown';

export interface FullSessionLogData {
  version?: string;
  title?: string;
  recordedAt?: string;
  zustandInit?: SerializedWorldState;
  actions: RecordedAction[] | WorldAction[];
  events?: unknown[];
  zustandEnd?: SerializedWorldState;
  metadata?: Record<string, unknown>;
}

export interface DetectedRecipeInfo {
  type: RecipeFormatType;
  typeLabel: string;
  title: string;
  stepOrActionCount: number;
  declarativeRecipe: Recipe | null;
  mascotSequence: WorldAction[] | null;
  fullSessionLog: FullSessionLogData | null;
  rawFormat: 'recipeJson' | 'mascotSequence' | 'fullSessionLog' | 'unknown';
}

export function getFormatLabel(type: RecipeFormatType): string {
  switch (type) {
    case 'declarative':
      return 'Declarative Recipe';
    case 'mascot_sequence':
      return 'Mascot Action Sequence';
    case 'full_session_log':
      return 'Full Session Log';
    default:
      return 'Unknown Format';
  }
}

/**
 * Inspects any unknown data structure (file upload or DB object) and identifies its recipe format type.
 */
export function detectRecipeFormat(data: unknown): DetectedRecipeInfo {
  if (!data || (typeof data !== 'object' && !Array.isArray(data))) {
    return {
      type: 'unknown',
      typeLabel: getFormatLabel('unknown'),
      title: 'Unknown Format',
      stepOrActionCount: 0,
      declarativeRecipe: null,
      mascotSequence: null,
      fullSessionLog: null,
      rawFormat: 'unknown',
    };
  }

  const obj = data as Record<string, unknown>;

  // Check 1: Database SavedRecipe with formats
  if (obj.formats && typeof obj.formats === 'object') {
    const formats = obj.formats as Record<string, unknown>;
    const title = (obj.title as string) || 'Saved Recipe';

    if (formats.recipeJson && typeof formats.recipeJson === 'object') {
      const r = formats.recipeJson as Record<string, unknown>;
      if (Array.isArray(r.steps)) {
        return {
          type: 'declarative',
          typeLabel: getFormatLabel('declarative'),
          title: r.name ? (r.name as string) : title,
          stepOrActionCount: r.steps.length,
          declarativeRecipe: formats.recipeJson as unknown as Recipe,
          mascotSequence: (formats.mascotSequence as WorldAction[]) || null,
          fullSessionLog: (formats.fullSessionLog as FullSessionLogData) || null,
          rawFormat: 'recipeJson',
        };
      }
    }

    if (formats.mascotSequence && Array.isArray(formats.mascotSequence) && formats.mascotSequence.length > 0) {
      return {
        type: 'mascot_sequence',
        typeLabel: getFormatLabel('mascot_sequence'),
        title,
        stepOrActionCount: formats.mascotSequence.length,
        declarativeRecipe: null,
        mascotSequence: formats.mascotSequence as WorldAction[],
        fullSessionLog: (formats.fullSessionLog as FullSessionLogData) || null,
        rawFormat: 'mascotSequence',
      };
    }

    if (formats.fullSessionLog && typeof formats.fullSessionLog === 'object') {
      const log = formats.fullSessionLog as Record<string, unknown>;
      if (Array.isArray(log.actions) && log.actions.length > 0) {
        return {
          type: 'full_session_log',
          typeLabel: getFormatLabel('full_session_log'),
          title: (log.title as string) || title,
          stepOrActionCount: log.actions.length,
          declarativeRecipe: null,
          mascotSequence: null,
          fullSessionLog: formats.fullSessionLog as FullSessionLogData,
          rawFormat: 'fullSessionLog',
        };
      }
    }
  }

  // Check 2: Full Session Log (zustandInit or initialRecordingState + actions)
  if ((obj.zustandInit || obj.initialRecordingState || obj.version) && Array.isArray(obj.actions)) {
    const actions = obj.actions as RecordedAction[];
    return {
      type: 'full_session_log',
      typeLabel: getFormatLabel('full_session_log'),
      title: (obj.title as string) || 'Full Session Log',
      stepOrActionCount: actions.length,
      declarativeRecipe: null,
      mascotSequence: actions as unknown as WorldAction[],
      fullSessionLog: obj as unknown as FullSessionLogData,
      rawFormat: 'fullSessionLog',
    };
  }

  // Check 3: Declarative Recipe JSON (object with steps)
  if (Array.isArray(obj.steps)) {
    const steps = obj.steps as RecipeStep[];
    const isStepBased = steps.every((s) => s && typeof s === 'object' && typeof (s as unknown as Record<string, unknown>).action === 'string');

    if (isStepBased) {
      const title = (obj.name as string) || (obj.title as string) || (obj.id as string) || 'Declarative Recipe';
      return {
        type: 'declarative',
        typeLabel: getFormatLabel('declarative'),
        title,
        stepOrActionCount: steps.length,
        declarativeRecipe: obj as unknown as Recipe,
        mascotSequence: null,
        fullSessionLog: null,
        rawFormat: 'recipeJson',
      };
    }
  }

  // Check 4: Wrapped Mascot Action Sequence (object with actions or mascotSequence or actionLog array)
  const candidateArray = (obj.actions || obj.mascotSequence || obj.actionLog) as unknown[];
  if (Array.isArray(candidateArray) && candidateArray.length > 0) {
    const isActionBased = candidateArray.every((item) => item && typeof item === 'object' && typeof (item as Record<string, unknown>).type === 'string');

    if (isActionBased) {
      const title = (obj.title as string) || (obj.name as string) || 'Mascot Action Sequence';
      return {
        type: 'mascot_sequence',
        typeLabel: getFormatLabel('mascot_sequence'),
        title,
        stepOrActionCount: candidateArray.length,
        declarativeRecipe: null,
        mascotSequence: candidateArray as WorldAction[],
        fullSessionLog: null,
        rawFormat: 'mascotSequence',
      };
    }
  }

  // Check 5: Array of items
  if (Array.isArray(data) && data.length > 0) {
    // Check if array of steps
    const firstItem = data[0] as Record<string, unknown>;
    if (firstItem && typeof firstItem === 'object') {
      if (typeof firstItem.action === 'string') {
        const syntheticRecipe: Recipe = {
          id: 'uploaded_declarative_recipe',
          name: 'Uploaded Declarative Recipe',
          requirements: {},
          steps: data as RecipeStep[],
        };
        return {
          type: 'declarative',
          typeLabel: getFormatLabel('declarative'),
          title: 'Uploaded Declarative Recipe',
          stepOrActionCount: data.length,
          declarativeRecipe: syntheticRecipe,
          mascotSequence: null,
          fullSessionLog: null,
          rawFormat: 'recipeJson',
        };
      }

      if (typeof firstItem.type === 'string') {
        return {
          type: 'mascot_sequence',
          typeLabel: getFormatLabel('mascot_sequence'),
          title: 'Action Sequence',
          stepOrActionCount: data.length,
          declarativeRecipe: null,
          mascotSequence: data as WorldAction[],
          fullSessionLog: null,
          rawFormat: 'mascotSequence',
        };
      }
    }
  }

  return {
    type: 'unknown',
    typeLabel: getFormatLabel('unknown'),
    title: 'Unknown Format',
    stepOrActionCount: 0,
    declarativeRecipe: null,
    mascotSequence: null,
    fullSessionLog: null,
    rawFormat: 'unknown',
  };
}

/**
 * Builds a database SavedRecipe payload supporting saving in any mode.
 */
export function buildSavedRecipePayload(
  title: string,
  description: string,
  author: string,
  detectedInfo: DetectedRecipeInfo,
  options: {
    saveMascotFormat?: boolean;
    saveRecipeJsonFormat?: boolean;
    saveSessionLogFormat?: boolean;
  } = {}
): Omit<SavedRecipe, 'createdAt' | 'updatedAt'> {
  const formats: SavedRecipe['formats'] = {};

  if (options.saveRecipeJsonFormat !== false && detectedInfo.declarativeRecipe) {
    formats.recipeJson = detectedInfo.declarativeRecipe as unknown as Record<string, unknown>;
  }

  if (options.saveMascotFormat !== false && detectedInfo.mascotSequence) {
    formats.mascotSequence = detectedInfo.mascotSequence;
  }

  if (options.saveSessionLogFormat !== false && detectedInfo.fullSessionLog) {
    formats.fullSessionLog = detectedInfo.fullSessionLog as unknown as Record<string, unknown>;
  }

  // Fallback: ensure at least the detected primary format is stored
  if (Object.keys(formats).length === 0) {
    if (detectedInfo.type === 'declarative' && detectedInfo.declarativeRecipe) {
      formats.recipeJson = detectedInfo.declarativeRecipe as unknown as Record<string, unknown>;
    } else if (detectedInfo.type === 'mascot_sequence' && detectedInfo.mascotSequence) {
      formats.mascotSequence = detectedInfo.mascotSequence;
    } else if (detectedInfo.type === 'full_session_log' && detectedInfo.fullSessionLog) {
      formats.fullSessionLog = detectedInfo.fullSessionLog as unknown as Record<string, unknown>;
    }
  }

  return {
    id: `recipe_${Date.now()}`,
    title: title.trim() || detectedInfo.title || 'Custom Recipe',
    description: description.trim() || 'Saved recipe from Tortilla World.',
    author: author.trim() || 'Chef Tortilla',
    ingredients: ['egg', 'potato'],
    tags: ['custom', detectedInfo.type],
    hasMascotSupport: Boolean(formats.mascotSequence && formats.mascotSequence.length > 0),
    formats,
  };
}

/**
 * Converts declarative RecipeSteps into WorldActions for playback engines.
 */
export function convertDeclarativeStepsToActions(steps: RecipeStep[]): WorldAction[] {
  const actions: WorldAction[] = [];

  for (const step of steps) {
    switch (step.action) {
      case 'move':
        actions.push({
          type: 'MOVE_ENTITY',
          payload: {
            entityId: step.ingredient || 'ingredient',
            targetContainerId: step.target || 'board',
          },
        });
        break;
      case 'prepare':
      case 'cut':
      case 'peel':
        actions.push({
          type: 'PREPARE_INGREDIENT',
          payload: {
            entityId: step.ingredient || 'ingredient',
            preparation: step.style || step.preparation || 'sliced',
          },
        });
        break;
      case 'cook':
        actions.push({
          type: 'COOK_INGREDIENT',
          payload: {
            entityId: step.ingredient || 'ingredient',
            cooking: step.method || 'fried',
          },
        });
        break;
      case 'mix':
      case 'beat':
      case 'combine':
        actions.push({
          type: 'UPDATE_ENTITY_STATE',
          payload: {
            entityId: step.targetContainerId || 'bowl',
            changes: { mixed: true, output: step.output || 'mixture' },
          },
        });
        break;
      case 'flip':
        actions.push({
          type: 'MASCOT_FLIP',
          payload: {
            mascotId: 'MsTortilla',
          },
        });
        break;
      case 'serve':
        actions.push({
          type: 'MOVE_ENTITY',
          payload: {
            entityId: step.target || 'plate',
            targetContainerId: 'plato',
          },
        });
        break;
      default:
        if ((step as unknown as Record<string, unknown>).ingredient) {
          actions.push({
            type: 'MOVE_ENTITY',
            payload: {
              entityId: (step as unknown as Record<string, unknown>).ingredient as string,
              targetContainerId: (step as unknown as Record<string, unknown>).target as string || 'board',
            },
          });
        }
        break;
    }
  }

  return actions;
}

/**
 * Extracts playable WorldActions and initial state snapshot from any detected recipe format.
 */
export function getPlayableActionsFromFormat(info: DetectedRecipeInfo): {
  actions: WorldAction[];
  zustandInit?: SerializedWorldState;
  declarativeRecipe?: Recipe;
} {
  if (info.type === 'mascot_sequence' && info.mascotSequence) {
    return { actions: info.mascotSequence };
  }

  if (info.type === 'full_session_log' && info.fullSessionLog) {
    return {
      actions: (info.fullSessionLog.actions || []) as WorldAction[],
      zustandInit: info.fullSessionLog.zustandInit,
    };
  }

  if (info.type === 'declarative' && info.declarativeRecipe) {
    return {
      actions: convertDeclarativeStepsToActions(info.declarativeRecipe.steps || []),
      declarativeRecipe: info.declarativeRecipe,
    };
  }

  return { actions: [] };
}

