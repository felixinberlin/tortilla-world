/**
 * FILE: tools.ts
 *
 * PURPOSE:
 * Defines first-class tool entity models and categories.
 *
 * RESPONSIBILITY:
 * - Represents tools as reusable world objects used by kitchen workstations and actions.
 */

export type ToolCategory = 'cutting' | 'mixing' | 'cooking' | 'utility';

export type ToolCatalogItem = {
  id: string;
  name: string;
  icon: string;
  category: ToolCategory;
};
