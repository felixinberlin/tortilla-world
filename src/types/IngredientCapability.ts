/**
 * FILE: IngredientCapability.ts
 *
 * PURPOSE:
 * Contract definitions for ingredient-specific cooking capabilities, tools, and prerequisites.
 *
 * RESPONSIBILITY:
 * - Defines capability requirements (preparation, cooking, temperature).
 * - Defines capability structure (tools, workstation, prerequisites).
 * - Defines extended ingredient with capabilities interface.
 */

export interface ActionRequirement {
  preparation?: string[];
  cooking?: string[];
  temperature?: string[];
}

export interface CapabilityDefinition {
  tools?: string[];
  workstation?: string;
  requires?: ActionRequirement;
}

export interface IngredientCapabilities {
  [action: string]: CapabilityDefinition;
}

export interface IngredientCapabilityCatalogItem {
  id: string;
  name?: string;
  capabilities: IngredientCapabilities;
}

export interface IngredientActionValidationResult {
  valid: boolean;
  reason?: string;
  missingPrerequisites?: {
    type: 'preparation' | 'cooking' | 'tool' | 'capability';
    expected: string[];
    actual?: string;
  };
}
