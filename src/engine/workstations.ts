/**
 * FILE: workstations.ts (Engine)
 *
 * PURPOSE:
 * Logic to map recipe steps and cooking actions to workstations and required tools.
 *
 * RESPONSIBILITY:
 * - Decides which workstation should handle an action.
 * - Determines required and available tools for an action.
 */

import type { RecipeStep } from '../types/RecipeStep';
import type { Workstation } from '../types/workstations';
import { KITCHEN_WORKSTATIONS } from '../data/catalog/workstations';
import { getActionDefinition } from '../data/catalog/actions';

/**
 * Automatically determines the appropriate Workstation for a given RecipeStep.
 */
export function findWorkstationForStep(step: RecipeStep): Workstation {
  const action = step.action;

  if (action === 'prepare' || action === 'cut') {
    const prep = (step.preparation || step.style || '').toLowerCase();
    if (['beaten', 'whisked', 'kneaded', 'seasoned', 'cracked'].includes(prep)) {
      return KITCHEN_WORKSTATIONS.preparation_station;
    }
  }

  const actionDef = getActionDefinition(action);
  if (actionDef?.workstation) {
    if (actionDef.workstation === 'sink' || actionDef.workstation === 'washing_station') {
      return KITCHEN_WORKSTATIONS.washing_station;
    }
    if (actionDef.workstation === 'cutting_station') {
      return KITCHEN_WORKSTATIONS.cutting_station;
    }
    if (actionDef.workstation === 'preparation_station') {
      return KITCHEN_WORKSTATIONS.preparation_station;
    }
    if (actionDef.workstation === 'cooking_station' || actionDef.workstation === 'pan' || actionDef.workstation === 'pot') {
      return KITCHEN_WORKSTATIONS.cooking_station;
    }
    if (actionDef.workstation === 'serving_station') {
      return KITCHEN_WORKSTATIONS.serving_station;
    }
    if (actionDef.workstation === 'pantry') {
      return KITCHEN_WORKSTATIONS.pantry;
    }
  }

  if (action === 'move' || action === 'grab' || action === 'drop') {
    return KITCHEN_WORKSTATIONS.pantry;
  }

  return KITCHEN_WORKSTATIONS.cutting_station;
}

/**
 * Determines the tool requirements for a given RecipeStep.
 */
export function findToolsForStep(step: RecipeStep): string[] {
  const action = step.action;

  if (action === 'prepare' || action === 'cut') {
    const prep = (step.preparation || step.style || '').toLowerCase();
    if (prep === 'peeled') {
      return ['peeler', 'knife'];
    }
    if (prep === 'beaten' || prep === 'whisked') {
      return ['whisk', 'fork'];
    }
    if (prep === 'grated') {
      return ['grater'];
    }
    if (prep === 'sliced' || prep === 'diced' || prep === 'minced') {
      return ['knife'];
    }
  }

  const actionDef = getActionDefinition(action);
  if (actionDef?.tools && actionDef.tools.length > 0) {
    return actionDef.tools;
  }

  return [];
}
