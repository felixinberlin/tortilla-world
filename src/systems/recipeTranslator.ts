/**
 * FILE: recipeTranslator.ts
 *
 * PURPOSE:
 * Translator system converting human-recorded world actions into mascot-guided recipes
 * and executable mascot action sequences.
 *
 * RESPONSIBILITY:
 * - Infers source/target containers and entity locations for human actions.
 * - Injects explicit Mascot focus, grab, move, and drop actions for raw human interactions.
 * - Generates clean, declarative Recipe definitions (with requirements & steps) compatible with RecipeRunner.
 */

import type { RecordedAction } from '../types/recording';
import type { Recipe } from '../types/Recipe';
import type { RecipeStep } from '../types/RecipeStep';
import type { WorldAction } from '../types/actions';

export interface TranslatorOptions {
  recipeName?: string;
  recipeId?: string;
  mascotId?: string;
  defaultSourceContainer?: string;
}

/**
 * Utility to extract clean entity name or catalog ID from an entityId.
 */
function cleanEntityName(entityId?: string): string {
  if (!entityId) return 'item';
  return entityId
    .replace(/_\d+$/, '')
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase();
}

/**
 * Translates human-recorded actions into an expanded mascot-guided action sequence
 * where mascot focus, grab, move, and drop actions are explicitly interleaved.
 */
export function translateHumanActionsToMascotActions(
  actions: readonly (RecordedAction | WorldAction | unknown)[],
  options: TranslatorOptions = {}
): RecordedAction[] {
  const mascotId = options.mascotId || 'chef';
  const defaultSource = options.defaultSourceContainer || 'despensa';

  // Track entity locations in simulated containers
  const entityLocations: Record<string, string> = {};
  const translated: RecordedAction[] = [];

  let nowMs = Date.now();

  const addAction = (type: string, payload: Record<string, unknown>) => {
    translated.push({
      type,
      payload,
      timestampMs: nowMs,
    });
    nowMs += 300;
  };

  for (const rawAct of actions) {
    if (!rawAct) continue;
    const act = (typeof rawAct === 'object' && 'action' in rawAct && rawAct.action ? rawAct.action : rawAct) as RecordedAction;
    const { type, payload = {} } = act;

    switch (type) {
      case 'MOVE_ENTITY': {
        const entityId = (payload.entityId as string) || '';
        const targetContainerId = (payload.targetContainerId as string) || 'board';
        const sourceContainerId =
          (payload.sourceContainerId as string) || entityLocations[entityId] || defaultSource;

        // 1. Mascot moves to source container
        addAction('MASCOT_MOVE', { mascotId, targetContainerId: sourceContainerId });

        // 2. Mascot grabs ingredient
        addAction('MASCOT_GRAB', { mascotId, entityId, sourceContainerId });

        // 3. Mascot moves to target container
        addAction('MASCOT_MOVE', { mascotId, targetContainerId });

        // 4. Mascot drops ingredient
        addAction('MASCOT_DROP', { mascotId, targetContainerId });

        // 5. Actual entity movement
        addAction('MOVE_ENTITY', { entityId, targetContainerId, sourceContainerId });

        // Update entity location
        if (entityId) {
          entityLocations[entityId] = targetContainerId;
        }
        break;
      }

      case 'ADD_ENTITY': {
        const entity = payload.entity as { id?: string; name?: string } | undefined;
        const entityId = entity?.id || '';
        const containerId = (payload.containerId as string) || defaultSource;

        addAction('MASCOT_MOVE', { mascotId, targetContainerId: containerId });
        addAction('ADD_ENTITY', payload);

        if (entityId) {
          entityLocations[entityId] = containerId;
        }
        break;
      }

      case 'REMOVE_ENTITY': {
        const entityId = (payload.entityId as string) || '';
        const currentLoc = entityLocations[entityId] || defaultSource;

        addAction('MASCOT_MOVE', { mascotId, targetContainerId: currentLoc });
        addAction('REMOVE_ENTITY', payload);

        delete entityLocations[entityId];
        break;
      }

      case 'TOGGLE_BURNER': {
        const containerId = (payload.containerId as string) || 'burner1';
        addAction('MASCOT_MOVE', { mascotId, targetContainerId: containerId });
        addAction('TOGGLE_BURNER', payload);
        break;
      }

      case 'PREPARE_INGREDIENT': {
        const entityId = (payload.entityId as string) || '';
        const currentLoc = entityLocations[entityId] || 'board';

        addAction('MASCOT_MOVE', { mascotId, targetContainerId: currentLoc });
        addAction('PREPARE_INGREDIENT', payload);
        break;
      }

      case 'COOK_INGREDIENT': {
        const entityId = (payload.entityId as string) || '';
        const currentLoc = entityLocations[entityId] || 'pan';

        addAction('MASCOT_MOVE', { mascotId, targetContainerId: currentLoc });
        addAction('COOK_INGREDIENT', payload);
        break;
      }

      case 'MASCOT_FLIP': {
        addAction('MASCOT_FLIP', { mascotId });
        break;
      }

      case 'RESET_WORLD': {
        addAction('RESET_WORLD', {});
        addAction('MASCOT_CLEAR_GAZE', { mascotId });
        // Reset entity locations map
        for (const k of Object.keys(entityLocations)) {
          delete entityLocations[k];
        }
        break;
      }

      default: {
        // Pass through any existing mascot actions or custom actions
        addAction(type, payload);
        break;
      }
    }
  }

  return translated;
}

/**
 * Translates human-recorded world actions into a declarative Recipe object
 * that can be saved as a recipe file or executed directly via RecipeRunner.
 */
export function translateHumanActionsToRecipe(
  actions: readonly (RecordedAction | WorldAction | unknown)[],
  options: TranslatorOptions = {}
): Recipe {
  const recipeId = options.recipeId || `translated-recipe-${Date.now()}`;
  const name = options.recipeName || 'Recorded Kitchen Recipe';

  const requirementsMap: Record<string, { entityId: string; amount: number; unit: string; name: string }> = {};
  const steps: RecipeStep[] = [];

  const entityLocations: Record<string, string> = {};

  steps.push({
    action: 'speak',
    message: `Starting ${name}`,
  });

  for (const rawAct of actions) {
    if (!rawAct) continue;
    const act = (typeof rawAct === 'object' && 'action' in rawAct && rawAct.action ? rawAct.action : rawAct) as RecordedAction;
    const { type, payload = {} } = act;

    switch (type) {
      case 'MOVE_ENTITY': {
        const entityId = (payload.entityId as string) || '';
        const target = (payload.targetContainerId as string) || 'board';
        const source = (payload.sourceContainerId as string) || entityLocations[entityId] || 'despensa';

        const cleanName = cleanEntityName(entityId);
        if (cleanName && !requirementsMap[cleanName]) {
          requirementsMap[cleanName] = {
            entityId: cleanName,
            amount: 1,
            unit: 'unidad',
            name: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
          };
        }

        steps.push({
          action: 'move',
          ingredient: cleanName || entityId,
          source,
          target,
        });

        if (entityId) {
          entityLocations[entityId] = target;
        }
        break;
      }

      case 'PREPARE_INGREDIENT': {
        const entityId = (payload.entityId as string) || '';
        const preparation = (payload.preparation as string) || 'sliced';
        const cleanName = cleanEntityName(entityId);
        const containerId = entityLocations[entityId] || 'board';

        steps.push({
          action: 'prepare',
          ingredient: cleanName || entityId,
          preparation,
          containerId,
        });
        break;
      }

      case 'COOK_INGREDIENT': {
        const entityId = (payload.entityId as string) || '';
        const cooking = (payload.cooking as string) || 'fried';
        const cleanName = cleanEntityName(entityId);
        const containerId = entityLocations[entityId] || 'pan';

        steps.push({
          action: 'cook',
          ingredient: cleanName || entityId,
          method: cooking,
          containerId,
        });
        break;
      }

      case 'TOGGLE_BURNER': {
        const containerId = (payload.containerId as string) || 'burner1';
        steps.push({
          action: 'instruction',
          text: `Toggle heat on ${containerId}`,
        });
        break;
      }

      case 'MASCOT_FLIP': {
        steps.push({
          action: 'flip',
          target: 'pan',
          instruction: 'Flip tortilla in pan',
        });
        break;
      }

      case 'USE_INGREDIENT': {
        const entityId = (payload.entityId as string) || '';
        const cleanName = cleanEntityName(entityId);
        steps.push({
          action: 'mix',
          inputs: [cleanName || entityId],
          targetContainerId: 'bowl',
        });
        break;
      }

      default:
        // Ignore unhandled non-recipe world state metadata actions
        break;
    }
  }

  steps.push({
    action: 'celebrate',
  });

  return {
    id: recipeId,
    name,
    requirements: requirementsMap,
    steps,
  };
}
