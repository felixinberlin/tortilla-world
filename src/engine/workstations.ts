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
    return KITCHEN_WORKSTATIONS.cutting_station;
  }

  if (action === 'cook') {
    return KITCHEN_WORKSTATIONS.cooking_station;
  }

  if (action === 'mix' || action === 'beat') {
    return KITCHEN_WORKSTATIONS.preparation_station;
  }

  if (action === 'serve') {
    return KITCHEN_WORKSTATIONS.serving_station;
  }

  if (action === 'wash' || action === 'rinse' || action === 'drain') {
    return KITCHEN_WORKSTATIONS.washing_station;
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
    return ['knife'];
  }

  if (action === 'mix' || action === 'beat') {
    return ['whisk', 'fork', 'spoon'];
  }

  if (action === 'cook') {
    return ['spatula', 'pan'];
  }

  return [];
}
