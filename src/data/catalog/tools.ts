/**
 * FILE: tools.ts
 *
 * PURPOSE:
 * Catalog of reusable kitchen tools as first-class entities.
 */

import type { ToolCatalogItem } from '../../types/tools';

export const catalogTools: ToolCatalogItem[] = [
  { id: 'knife', name: 'Chef Knife', icon: '🔪', category: 'cutting' },
  { id: 'peeler', name: 'Vegetable Peeler', icon: '🥔', category: 'cutting' },
  { id: 'whisk', name: 'Whisk', icon: '🥣', category: 'mixing' },
  { id: 'fork', name: 'Fork', icon: '🍴', category: 'mixing' },
  { id: 'spatula', name: 'Spatula', icon: '🍳', category: 'cooking' },
  { id: 'grater', name: 'Grater', icon: '🧀', category: 'cutting' },
  { id: 'mandoline', name: 'Mandoline', icon: '🔪', category: 'cutting' },
  { id: 'spoon', name: 'Spoon', icon: '🥄', category: 'mixing' },
];
