/**
 * FILE: src/data/catalog/vessels.ts
 *
 * PURPOSE:
 * Catalog of all cooking vessels available in the kitchen world.
 *
 * RESPONSIBILITY:
 * - Single source of truth for vessel definitions.
 * - Automatically generates cooking_area_* containers in defaults.ts.
 * - Add a vessel here → it appears in the world with zero other changes.
 */

import type { VesselCatalogItem } from "../../../types/vessels";

export const catalogVessels: VesselCatalogItem[] = [
  {
    id: 'sarten',
    name: 'Sartén',
    icon: '🍳',
    containerType: 'pan',
    capacity: 5,
  },
  {
    id: 'sarten_grande',
    name: 'Sartén Grande',
    icon: '🥘',
    containerType: 'pan',
    capacity: 8,
  },
  {
    id: 'wok',
    name: 'Wok',
    icon: '🫕',
    containerType: 'pan',
    capacity: 6,
  },
  {
    id: 'oven',
    name: 'Horno',
    icon: '🔥',
    containerType: 'oven',
    capacity: 6,
  },
];