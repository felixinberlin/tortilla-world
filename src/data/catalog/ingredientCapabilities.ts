/**
 * FILE: ingredientCapabilities.ts
 *
 * PURPOSE:
 * Structured catalog of ingredient capability schemas for grounding AI cooking logic
 * and preventing invalid action hallucinations (e.g., "peeling salt" or "slicing raw egg").
 *
 * RESPONSIBILITY:
 * - Maps ingredient IDs to allowed capabilities and ingredient-specific state prerequisites.
 * - Enforces the principle that omission implies false (unlisted actions are strictly disallowed).
 * - Execution metadata (workstations, tools) is resolved via the central Action Catalog (src/data/catalog/actions.ts).
 */

import type { IngredientCapabilityCatalogItem } from '../../types/IngredientCapability';

export const INGREDIENT_CAPABILITIES_CATALOG: Record<string, IngredientCapabilityCatalogItem> = {
  potato: {
    id: 'potato',
    name: 'Potatoes',
    capabilities: {
      wash: {},
      peel: {},
      slice: {
        requires: {
          preparation: ['peeled'],
        },
      },
      dice: {
        requires: {
          preparation: ['peeled'],
        },
      },
      cut: {
        requires: {
          preparation: ['peeled'],
        },
      },
      fry: {},
      boil: {},
      mix: {},
      combine: {},
    },
  },

  egg: {
    id: 'egg',
    name: 'Eggs',
    capabilities: {
      crack: {},
      beat: {
        requires: {
          preparation: ['cracked'],
        },
      },
      whisk: {
        requires: {
          preparation: ['cracked'],
        },
      },
      fry: {
        requires: {
          preparation: ['cracked'],
        },
      },
      boil: {},
      peel: {
        requires: {
          cooking: ['boiled'],
        },
      },
      separate: {},
      cut: {
        requires: {
          cooking: ['boiled', 'cooked', 'fried'],
        },
      },
      slice: {
        requires: {
          cooking: ['boiled', 'cooked', 'fried'],
        },
      },
      mix: {},
      combine: {},
    },
  },

  yolk: {
    id: 'yolk',
    name: 'Yolk',
    capabilities: {
      beat: {},
      fry: {},
      mix: {},
    },
  },

  egg_white: {
    id: 'egg_white',
    name: 'Egg White',
    capabilities: {
      whisk: {},
      beat: {},
      fry: {},
      mix: {},
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
      wash: {},
      peel: {},
      slice: {
        requires: {
          preparation: ['peeled'],
        },
      },
      dice: {
        requires: {
          preparation: ['peeled'],
        },
      },
      cut: {
        requires: {
          preparation: ['peeled'],
        },
      },
      fry: {},
      mix: {},
      combine: {},
    },
  },

  oil: {
    id: 'oil',
    name: 'Olive Oil',
    capabilities: {
      pour: {},
      heat: {},
      season: {},
      mix: {},
    },
  },

  garlic: {
    id: 'garlic',
    name: 'Garlic',
    capabilities: {
      wash: {},
      peel: {},
      mince: {
        requires: {
          preparation: ['peeled'],
        },
      },
      slice: {
        requires: {
          preparation: ['peeled'],
        },
      },
      cut: {
        requires: {
          preparation: ['peeled'],
        },
      },
      fry: {},
    },
  },

  chorizo: {
    id: 'chorizo',
    name: 'Chorizo',
    capabilities: {
      wash: {},
      slice: {},
      dice: {},
      cut: {},
      fry: {},
    },
  },

  tomato: {
    id: 'tomato',
    name: 'Tomato',
    capabilities: {
      wash: {},
      slice: {},
      dice: {},
      cut: {},
      fry: {},
      boil: {},
    },
  },

  pepper: {
    id: 'pepper',
    name: 'Bell Pepper',
    capabilities: {
      wash: {},
      slice: {},
      dice: {},
      cut: {},
      fry: {},
    },
  },
};
