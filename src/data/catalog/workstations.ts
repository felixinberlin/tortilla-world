/**
 * FILE: workstations.ts
 *
 * PURPOSE:
 * Static registry of kitchen workstations.
 *
 * RESPONSIBILITY:
 * - Defines all workstations in the kitchen and their supported actions/capabilities.
 */

import type { Workstation, WorkstationId } from '../../types/workstations';

export const KITCHEN_WORKSTATIONS: Record<WorkstationId, Workstation> = {
  pantry: {
    id: 'pantry',
    name: 'Pantry',
    purpose: 'Store ingredients',
    supportedActions: ['take', 'store', 'move', 'grab'],
    defaultContainerId: 'despensa',
  },
  washing_station: {
    id: 'washing_station',
    name: 'Washing Station',
    purpose: 'Clean ingredients',
    supportedActions: ['wash', 'rinse', 'drain'],
    defaultContainerId: 'sink',
  },
  cutting_station: {
    id: 'cutting_station',
    name: 'Cutting Station',
    purpose: 'Change ingredient preparation',
    supportedActions: ['prepare', 'cut', 'peel'],
    defaultContainerId: 'board',
    requiredTools: ['knife'],
    optionalTools: ['peeler', 'mandoline', 'grater'],
  },
  preparation_station: {
    id: 'preparation_station',
    name: 'Preparation Station',
    purpose: 'Combine ingredients',
    supportedActions: ['crack', 'beat', 'whisk', 'mix', 'season', 'knead'],
    defaultContainerId: 'bowl',
    requiredTools: [],
    optionalTools: ['fork', 'whisk', 'spoon'],
  },
  cooking_station: {
    id: 'cooking_station',
    name: 'Cooking Station',
    purpose: 'Apply heat',
    supportedActions: ['heat', 'fry', 'boil', 'steam', 'grill', 'bake', 'roast', 'cook'],
    defaultContainerId: 'pan',
    requiredTools: ['pan'],
    optionalTools: ['pot', 'spatula'],
  },
  serving_station: {
    id: 'serving_station',
    name: 'Serving Station',
    purpose: 'Finish recipes',
    supportedActions: ['plate', 'garnish', 'serve'],
    defaultContainerId: 'plate',
  },
};
