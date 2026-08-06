/**
 * FILE: ingredientCapabilities.ts
 *
 * PURPOSE:
 * Structured catalog of ingredient capability schemas for grounding AI cooking logic
 * and preventing invalid action hallucinations (e.g., "peeling salt" or "slicing raw egg").
 *
 * RESPONSIBILITY:
 * - Maps ingredient IDs to allowed capabilities, required tools, workstations, and state prerequisites.
 * - Enforces the principle that omission implies false (unlisted actions are strictly disallowed).
 */

import type { IngredientCapabilityCatalogItem } from '../../types/IngredientCapability';

export const INGREDIENT_CAPABILITIES_CATALOG: Record<string, IngredientCapabilityCatalogItem> = {
  potato: {
    id: 'potato',
    name: 'Potatoes',
    capabilities: {
      peel: {
        tools: ['peeler', 'knife'],
        workstation: 'cutting_station',
      },
      slice: {
        tools: ['knife', 'mandoline'],
        workstation: 'cutting_station',
        requires: {
          preparation: ['peeled'],
        },
      },
      dice: {
        tools: ['knife'],
        workstation: 'cutting_station',
        requires: {
          preparation: ['peeled'],
        },
      },
      cut: {
        tools: ['knife'],
        workstation: 'cutting_station',
        requires: {
          preparation: ['peeled'],
        },
      },
      fry: {
        workstation: 'pan',
      },
      boil: {
        workstation: 'pot',
      },
    },
  },

  egg: {
    id: 'egg',
    name: 'Eggs',
    capabilities: {
      crack: {
        tools: ['hands', 'bowl'],
        workstation: 'preparation_station',
      },
      beat: {
        tools: ['whisk', 'fork'],
        workstation: 'preparation_station',
        requires: {
          preparation: ['cracked'],
        },
      },
      whisk: {
        tools: ['whisk', 'fork'],
        workstation: 'preparation_station',
        requires: {
          preparation: ['cracked'],
        },
      },
      fry: {
        workstation: 'pan',
        requires: {
          preparation: ['cracked'],
        },
      },
      boil: {
        workstation: 'pot',
      },
      peel: {
        tools: ['hands'],
        requires: {
          cooking: ['boiled'],
        },
      },
    },
  },

  salt: {
    id: 'salt',
    name: 'Salt',
    capabilities: {
      season: {},
      dissolve: {},
      mix: {},
    },
  },

  onion: {
    id: 'onion',
    name: 'Onion',
    capabilities: {
      peel: {
        tools: ['knife', 'hands'],
        workstation: 'cutting_station',
      },
      slice: {
        tools: ['knife'],
        workstation: 'cutting_station',
        requires: {
          preparation: ['peeled'],
        },
      },
      dice: {
        tools: ['knife'],
        workstation: 'cutting_station',
        requires: {
          preparation: ['peeled'],
        },
      },
      cut: {
        tools: ['knife'],
        workstation: 'cutting_station',
        requires: {
          preparation: ['peeled'],
        },
      },
      fry: {
        workstation: 'pan',
      },
    },
  },

  oil: {
    id: 'oil',
    name: 'Olive Oil',
    capabilities: {
      pour: {},
      heat: {
        workstation: 'pan',
      },
      season: {},
      mix: {},
    },
  },

  garlic: {
    id: 'garlic',
    name: 'Garlic',
    capabilities: {
      peel: {
        tools: ['hands', 'knife'],
        workstation: 'cutting_station',
      },
      mince: {
        tools: ['knife'],
        workstation: 'cutting_station',
        requires: {
          preparation: ['peeled'],
        },
      },
      slice: {
        tools: ['knife'],
        workstation: 'cutting_station',
        requires: {
          preparation: ['peeled'],
        },
      },
      fry: {
        workstation: 'pan',
      },
    },
  },

  chorizo: {
    id: 'chorizo',
    name: 'Chorizo',
    capabilities: {
      slice: {
        tools: ['knife'],
        workstation: 'cutting_station',
      },
      dice: {
        tools: ['knife'],
        workstation: 'cutting_station',
      },
      fry: {
        workstation: 'pan',
      },
    },
  },
};
