/**
 * FILE: workstations.ts
 *
 * PURPOSE:
 * Static registry of kitchen workstations.
 *
 * RESPONSIBILITY:
 * - Defines all workstations in the kitchen and their supported actions/capabilities.
 */

import type { Workstation, WorkstationId, WorkstationKit, WorkstationKitId } from '../../types/workstations';
import { defaultContainers } from '../../store/defaults';

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
    defaultContainerId: 'burner1',
    requiredTools: ['pan'],
    optionalTools: ['pot', 'spatula'],
    isOn: false,
  },
  serving_station: {
    id: 'serving_station',
    name: 'Serving Station',
    purpose: 'Finish recipes',
    supportedActions: ['plate', 'garnish', 'serve'],
    defaultContainerId: 'plate',
  },
};

export const WORKSTATION_KITS: Record<WorkstationKitId, WorkstationKit> = {
  compact: {
    id: 'compact',
    name: 'Compact Kit',
    description: 'Minimalist setup with 1 cutting board, 1 burner, bowl, sink, and trash.',
    containers: {
      despensa: defaultContainers.despensa,
      sink: defaultContainers.sink,
      board: defaultContainers.board,
      bowl: defaultContainers.bowl,
      burner1: defaultContainers.burner1,
      plate: defaultContainers.plate,
      trash: defaultContainers.trash,
    },
  },
  base: {
    id: 'base',
    name: 'Base Kit',
    description: 'Standard kitchen setup with dual burners, cutting board, bowl, sink, plate, and trash.',
    containers: {
      despensa: defaultContainers.despensa,
      sink: defaultContainers.sink,
      board: defaultContainers.board,
      bowl: defaultContainers.bowl,
      burner1: defaultContainers.burner1,
      burner2: defaultContainers.burner2,
      plate: defaultContainers.plate,
      trash: defaultContainers.trash,
    },
  },
  empty: {
    id: 'empty',
    name: 'Empty Kit',
    description: 'Empty workspace canvas containing basic pantry, plate, and trash.',
    containers: {
      despensa: defaultContainers.despensa,
      plate: defaultContainers.plate,
      trash: defaultContainers.trash,
    },
  },
};
