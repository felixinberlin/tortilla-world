/**
 * FILE: actions.ts (Catalog)
 *
 * PURPOSE:
 * Central Action Catalog defining generic cooking action execution metadata
 * (workstations, tools, default duration, heat requirements).
 *
 * RESPONSIBILITY:
 * - Single source of truth for generic cooking action behavior and workstation/tool requirements.
 * - Separates action metadata from ingredient capability definitions.
 */

import type { ActionDefinition, ActionCatalog } from '../../types/IngredientCapability';

export const ACTION_CATALOG: ActionCatalog = {
  wash: {
    id: 'wash',
    name: 'Wash',
    workstation: 'sink',
    tools: [],
    duration: 10,
  },
  rinse: {
    id: 'rinse',
    name: 'Rinse',
    workstation: 'sink',
    tools: [],
    duration: 10,
  },
  drain: {
    id: 'drain',
    name: 'Drain',
    workstation: 'sink',
    tools: [],
    duration: 10,
  },
  clean: {
    id: 'clean',
    name: 'Clean',
    workstation: 'sink',
    tools: [],
    duration: 10,
  },
  peel: {
    id: 'peel',
    name: 'Peel',
    workstation: 'cutting_station',
    tools: ['peeler', 'knife'],
    duration: 15,
  },
  slice: {
    id: 'slice',
    name: 'Slice',
    workstation: 'cutting_station',
    tools: ['knife', 'mandoline'],
    duration: 20,
  },
  dice: {
    id: 'dice',
    name: 'Dice',
    workstation: 'cutting_station',
    tools: ['knife'],
    duration: 20,
  },
  cut: {
    id: 'cut',
    name: 'Cut',
    workstation: 'cutting_station',
    tools: ['knife'],
    duration: 15,
  },
  mince: {
    id: 'mince',
    name: 'Mince',
    workstation: 'cutting_station',
    tools: ['knife'],
    duration: 25,
  },
  crack: {
    id: 'crack',
    name: 'Crack',
    workstation: 'preparation_station',
    tools: ['hands', 'bowl'],
    duration: 10,
  },
  beat: {
    id: 'beat',
    name: 'Beat',
    workstation: 'preparation_station',
    tools: ['whisk', 'fork'],
    duration: 30,
  },
  whisk: {
    id: 'whisk',
    name: 'Whisk',
    workstation: 'preparation_station',
    tools: ['whisk', 'fork'],
    duration: 30,
  },
  fry: {
    id: 'fry',
    name: 'Fry',
    workstation: 'pan',
    requiresHeat: true,
    duration: 60,
  },
  boil: {
    id: 'boil',
    name: 'Boil',
    workstation: 'pot',
    requiresHeat: true,
    duration: 120,
  },
  separate: {
    id: 'separate',
    name: 'Separate',
    workstation: 'preparation_station',
    tools: ['hands', 'separator', 'bowl'],
    duration: 20,
  },
  season: {
    id: 'season',
    name: 'Season',
    workstation: 'preparation_station',
    tools: [],
    duration: 5,
  },
  serve: {
    id: 'serve',
    name: 'Serve',
    workstation: 'serving_station',
    tools: [],
    duration: 10,
  },
  dissolve: {
    id: 'dissolve',
    name: 'Dissolve',
    workstation: 'preparation_station',
    tools: [],
    duration: 10,
  },
  mix: {
    id: 'mix',
    name: 'Mix',
    workstation: 'preparation_station',
    tools: ['whisk', 'fork', 'spoon'],
    duration: 30,
  },
  pour: {
    id: 'pour',
    name: 'Pour',
    workstation: 'preparation_station',
    tools: [],
    duration: 5,
  },
  heat: {
    id: 'heat',
    name: 'Heat',
    workstation: 'pan',
    requiresHeat: true,
    duration: 30,
  },
  cook: {
    id: 'cook',
    name: 'Cook',
    workstation: 'pan',
    requiresHeat: true,
    tools: ['spatula', 'pan'],
    duration: 60,
  },
};

/**
 * Retrieves the action definition for a given action string.
 */
export function getActionDefinition(action: string): ActionDefinition | undefined {
  if (!action) return undefined;
  const lowered = action.toLowerCase().trim();
  if (ACTION_CATALOG[lowered]) return ACTION_CATALOG[lowered];

  // Alias lookups
  if (lowered === 'whisk') return ACTION_CATALOG.whisk || ACTION_CATALOG.beat;
  if (lowered === 'chop') return ACTION_CATALOG.cut;
  if (lowered === 'saute') return ACTION_CATALOG.fry;

  return undefined;
}
