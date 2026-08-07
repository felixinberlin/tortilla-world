/**
 * FILE: src/utils/sessionLogUtils.ts
 *
 * PURPOSE:
 * Utility functions for filtering and serializing session log state snapshots.
 * Ensures that Full Session Logs (zustandInit / zustandEnd) only retain ingredients
 * that were actually used or manipulated during the recorded recipe session.
 */

import type { Entity, Container } from '../types/world';
import type { RecordedAction, SerializedWorldState } from '../types/recording';

export function filterUnusedIngredientsFromState(
  worldSnapshot: SerializedWorldState | null,
  recordedActions: RecordedAction[]
): SerializedWorldState {
  if (!worldSnapshot || !worldSnapshot.entities) {
    return worldSnapshot || { entities: {}, containers: {} };
  }

  const { entities, containers } = worldSnapshot;

  // Set of entity IDs used in actions or active workstation containers
  const usedEntityIds = new Set<string>();

  // 1. Inspect recorded actions for referenced entity IDs
  recordedActions.forEach((action) => {
    const payload = (action.payload || {}) as Record<string, unknown>;

    if (payload.entityId && typeof payload.entityId === 'string') {
      usedEntityIds.add(payload.entityId);
    }

    if (payload.entity && typeof payload.entity === 'object') {
      const ent = payload.entity as { id?: string; ingredientId?: string };
      if (ent.id) usedEntityIds.add(ent.id);
      if (ent.ingredientId) usedEntityIds.add(ent.ingredientId);
    }

    if (payload.ingredientId && typeof payload.ingredientId === 'string') {
      usedEntityIds.add(payload.ingredientId);
    }

    // Container actions (mix, cook, etc.)
    if (payload.containerId && typeof payload.containerId === 'string') {
      const container = containers[payload.containerId];
      if (container && container.entityIds) {
        container.entityIds.forEach((id) => usedEntityIds.add(id));
      }
    }
  });

  // 2. Also consider entities that are in active workstation containers (non-despensa/storage)
  Object.entries(containers || {}).forEach(([containerId, container]) => {
    if (
      containerId !== 'despensa' &&
      containerId !== 'storage' &&
      containerId !== 'pantry' &&
      container.entityIds
    ) {
      container.entityIds.forEach((id) => usedEntityIds.add(id));
    }
  });

  // 3. Filter entities: keep all non-ingredient entities (tools, workstations, containers, mascot),
  // and for ingredient entities, keep ONLY those in usedEntityIds.
  const filteredEntities: Record<string, Entity> = {};
  const keptEntityIds = new Set<string>();

  Object.entries(entities).forEach(([id, entity]) => {
    const isIngredient =
      entity.type === 'ingredient' ||
      Boolean(entity.ingredientId) ||
      id.includes('potato') ||
      id.includes('patata') ||
      id.includes('egg') ||
      id.includes('huevo') ||
      id.includes('onion') ||
      id.includes('cebolla') ||
      id.includes('oil') ||
      id.includes('aceite') ||
      id.includes('salt') ||
      id.includes('sal') ||
      id.includes('pepper') ||
      id.includes('mixture');

    if (!isIngredient) {
      filteredEntities[id] = entity;
      keptEntityIds.add(id);
    } else if (usedEntityIds.has(id)) {
      filteredEntities[id] = entity;
      keptEntityIds.add(id);
    }
  });

  // 4. Filter container entityIds to only include kept entity IDs
  const filteredContainers: Record<string, Container> = {};
  Object.entries(containers || {}).forEach(([containerId, container]) => {
    filteredContainers[containerId] = {
      ...container,
      entityIds: (container.entityIds || []).filter((id) => keptEntityIds.has(id)),
    };
  });

  return {
    entities: filteredEntities,
    containers: filteredContainers,
  };
}

import { ingredients as catalogIngredients } from '../data/catalog/ingredients';
import { catalogTools } from '../data/catalog/tools';
import type { UsedIngredientInfo } from '../store/slices/recordSlice';

export function extractUsedIngredientsFromActions(
  actions: Array<{ type: string; payload?: Record<string, unknown> }>
): UsedIngredientInfo[] {
  const result: UsedIngredientInfo[] = [];
  const seenIds = new Set<string>();

  for (const act of actions || []) {
    if (!act || !act.payload) continue;
    const p = act.payload;
    let rawEntityId: string | undefined;

    if (act.type === 'MOVE_ENTITY') {
      const target = p.targetContainerId as string | undefined;
      if (target && target !== 'despensa') {
        rawEntityId = p.entityId as string | undefined;
      }
    } else if (act.type === 'ADD_ENTITY') {
      const target = p.containerId as string | undefined;
      if (target && target !== 'despensa') {
        const ent = p.entity as { id?: string; ingredientId?: string } | undefined;
        rawEntityId = ent?.ingredientId || ent?.id;
      }
    } else if (['PREPARE_INGREDIENT', 'COOK_INGREDIENT', 'USE_INGREDIENT'].includes(act.type)) {
      rawEntityId = p.entityId as string | undefined;
    }

    if (rawEntityId) {
      const baseId = rawEntityId.split('_')[0] || rawEntityId;
      if (!seenIds.has(baseId)) {
        seenIds.add(baseId);
        const catalogIng = catalogIngredients.find((i) => i.id === baseId || i.id === rawEntityId);
        const catalogTool = catalogTools.find((t) => t.id === baseId || t.id === rawEntityId);

        const cleanName =
          catalogIng?.name ||
          catalogTool?.name ||
          baseId.charAt(0).toUpperCase() + baseId.slice(1).replace(/_/g, ' ');
        const icon = catalogIng?.icon || catalogTool?.icon || '📦';

        result.push({
          id: baseId,
          name: cleanName,
          icon,
        });
      }
    }
  }

  return result;
}

