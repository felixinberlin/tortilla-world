/**
 * FILE: stateEngine.ts
 *
 * PURPOSE:
 * Core physics and property transfer engine logic for Tortilla World.
 *
 * RESPONSIBILITY:
 * - Manages property transfers (e.g. flavor infusion) between entities without consuming source entities.
 * - Processes automatic heat tick environmental flavor transfer when a heated container holds liquid mediums and aromatic ingredients.
 * - Preserves independent state and entity identity.
 */

import type { Entity, Container, FlavorNote } from '../types/world';

export interface InfuseOptions {
  sourceEntityId: string;
  targetEntityId: string;
  property: 'flavor';
  intensity: number;
}

const LIQUID_MEDIUM_CATALOG_IDS = new Set([
  'oil',
  'water',
  'milk',
  'butter',
  'broth',
  'vinegar',
  'sauce',
  'cream',
  'aceite',
  'agua',
  'leche',
  'mantequilla',
  'caldo',
]);

const AROMATIC_CATALOG_IDS = new Set([
  'garlic',
  'rosemary',
  'chili',
  'onion',
  'thyme',
  'basil',
  'ginger',
  'pepper',
  'cinnamon',
  'vanilla',
  'herb',
  'spice',
  'parsley',
  'oregano',
  'ajo',
  'romero',
  'cebolla',
  'pimienta',
]);

/**
 * Derives the source catalog ID of an entity (e.g., 'garlic' from 'garlic_1').
 */
export function getEntityCatalogId(entity: Entity): string {
  if (entity.ingredientId) return entity.ingredientId.toLowerCase();
  const base = entity.id.split('_')[0] || entity.name;
  return base.toLowerCase();
}

/**
 * Checks if an entity behaves as a liquid medium capable of receiving infused properties.
 */
export function isLiquidMedium(entity: Entity): boolean {
  if (entity.state?.isMedium === true) return true;
  const catalogId = getEntityCatalogId(entity);
  return LIQUID_MEDIUM_CATALOG_IDS.has(catalogId);
}

/**
 * Checks if an entity is an aromatic ingredient that can infuse flavor notes into a medium.
 */
export function isAromaticIngredient(entity: Entity): boolean {
  if (entity.state?.isAromatic === true) return true;
  const catalogId = getEntityCatalogId(entity);
  return AROMATIC_CATALOG_IDS.has(catalogId);
}

type DraftState = {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
};

/**
 * Executes property transfer (flavor infusion) from source entity to target entity.
 * Source entity remains in the world state, while remainingFlavor decreases and target flavorProfile updates.
 */
export function infuseEntityInDraft(
  draft: DraftState,
  sourceEntityId: string,
  targetEntityId: string,
  _property: 'flavor',
  intensity: number
): boolean {
  const sourceEntity = draft.entities[sourceEntityId];
  const targetEntity = draft.entities[targetEntityId];

  if (!sourceEntity || !targetEntity) return false;

  const sourceRemaining =
    typeof sourceEntity.state?.remainingFlavor === 'number'
      ? sourceEntity.state.remainingFlavor
      : 1.0;

  if (sourceRemaining <= 0) return false;

  const transferAmount = Math.min(sourceRemaining, intensity);
  const newRemaining = Math.max(0, Number((sourceRemaining - transferAmount).toFixed(2)));

  const sourceCatalogId = getEntityCatalogId(sourceEntity);

  const currentProfile: FlavorNote[] = Array.isArray(targetEntity.state?.flavorProfile)
    ? targetEntity.state.flavorProfile.map((n) => ({ ...n }))
    : [];

  const existingIndex = currentProfile.findIndex((n) => n.sourceCatalogId === sourceCatalogId);

  if (existingIndex >= 0) {
    const updatedIntensity = Math.min(
      1.0,
      Number((currentProfile[existingIndex].intensity + transferAmount).toFixed(2))
    );
    currentProfile[existingIndex] = {
      ...currentProfile[existingIndex],
      intensity: updatedIntensity,
    };
  } else {
    currentProfile.push({
      sourceCatalogId,
      intensity: Number(transferAmount.toFixed(2)),
    });
  }

  // Mutate source entity immutably in draft
  sourceEntity.state = {
    ...sourceEntity.state,
    remainingFlavor: newRemaining,
  };

  // Mutate target entity immutably in draft
  targetEntity.state = {
    ...targetEntity.state,
    flavorProfile: currentProfile,
  };

  return true;
}

/**
 * Runs physics tick loop (HEAT_TICK) for heated containers containing liquid mediums and aromatic ingredients.
 */
export function processHeatTickInDraft(draft: DraftState, containerId?: string): void {
  const targetContainers = containerId
    ? draft.containers[containerId]
      ? [draft.containers[containerId]]
      : []
    : Object.values(draft.containers).filter((c) => Boolean(c.isOn));

  for (const container of targetContainers) {
    if (!container || !container.entityIds || container.entityIds.length === 0) continue;

    const containerEntities = container.entityIds
      .map((id) => draft.entities[id])
      .filter((e): e is Entity => Boolean(e));

    const mediums = containerEntities.filter(isLiquidMedium);
    const aromatics = containerEntities.filter((e) => {
      const remaining = typeof e.state?.remainingFlavor === 'number' ? e.state.remainingFlavor : 1.0;
      return isAromaticIngredient(e) && remaining > 0;
    });

    if (mediums.length === 0 || aromatics.length === 0) continue;

    const defaultIntensity = 0.7;

    for (const aromatic of aromatics) {
      for (const medium of mediums) {
        if (aromatic.id === medium.id) continue;
        infuseEntityInDraft(draft, aromatic.id, medium.id, 'flavor', defaultIntensity);
      }
    }
  }
}
