/**
 * FILE: IngredientList.tsx
 *
 * PURPOSE:
 * Displays a collection/container of ingredients.
 *
 * RESPONSIBILITY:
 * - Renders ingredients belonging to a specific list.
 * - Delegates individual rendering to IngredientListItem.
 *
 * DOMAIN:
 * Represents UI for containers like pantry, kitchen, recipe.
 */

import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import type { Entity } from '../../types/world';

export function IngredientList({ containerEntityIds }: { containerEntityIds: string[] }) {
  const entities = useStore(worldStore, (state) => state.entities);

  const containerEntities = containerEntityIds
    .map((id: string) => entities[id])
    .filter((e: Entity | undefined): e is Entity => Boolean(e));

  return (
    <div>
      {containerEntities.map((entity: Entity) => (
        <div key={entity.id}>{entity.name}</div>
      ))}
    </div>
  );
}