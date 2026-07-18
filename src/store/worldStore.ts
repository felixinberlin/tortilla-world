import { create } from 'zustand'
import type { Entity, EntityRelationship, Position } from '../types/Entity'
import { ingredients as ingredientCatalog } from '../data/ingredients'

interface WorldState {
  entities: Record<string, Entity>
  relationships: EntityRelationship[]
  addEntity: (entity: Entity) => void
  removeEntity: (entityId: string) => void
  updateEntity: (entityId: string, changes: Partial<Omit<Entity, 'id'>>) => void
  setEntityPosition: (entityId: string, position: Position) => void
  addRelationship: (relationship: EntityRelationship) => void
  removeRelationship: (relationship: EntityRelationship) => void
}

export const useWorldStore = create<WorldState>((set) => ({
  entities: Object.fromEntries(
    ingredientCatalog.map((ingredient, index) => [
      ingredient.id,
      {
        id: ingredient.id,
        type: 'ingredient' as const,
        position: { x: 0, y: index },
        size: { width: 1, height: 1 },
        state: 'full',
      },
    ]),
  ),
  relationships: [],

  addEntity: (entity) =>
    set((world) => ({
      entities: { ...world.entities, [entity.id]: entity },
    })),

  removeEntity: (entityId) =>
    set((world) => {
      const { [entityId]: _removedEntity, ...entities } = world.entities

      return {
        entities,
        relationships: world.relationships.filter(
          (relationship) =>
            relationship.sourceId !== entityId && relationship.targetId !== entityId,
        ),
      }
    }),

  updateEntity: (entityId, changes) =>
    set((world) => {
      const entity = world.entities[entityId]

      if (!entity) {
        return world
      }

      return {
        entities: {
          ...world.entities,
          [entityId]: { ...entity, ...changes },
        },
      }
    }),

  setEntityPosition: (entityId, position) =>
    set((world) => {
      const entity = world.entities[entityId]

      if (!entity) {
        return world
      }

      return {
        entities: {
          ...world.entities,
          [entityId]: { ...entity, position },
        },
      }
    }),

  addRelationship: (relationship) =>
    set((world) => ({
      relationships: [...world.relationships, relationship],
    })),

  removeRelationship: (relationship) =>
    set((world) => ({
      relationships: world.relationships.filter(
        (candidate) =>
          candidate.sourceId !== relationship.sourceId ||
          candidate.targetId !== relationship.targetId ||
          candidate.type !== relationship.type,
      ),
    })),
}))