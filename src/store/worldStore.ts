import { create } from 'zustand'
import type { Entity, EntityRelationship, Position } from '../types/Entity'
import type { List } from '../types/IngredientList'
import { ingredients as ingredientCatalog } from '../data/catalog/ingredients'

interface WorldState {
  lists: Record<string, List>
  entities: Record<string, Entity>
  relationships: EntityRelationship[]

  addList: (list: List) => void
  removeList: (listId: string) => void

  addEntity: (entity: Entity) => void
  removeEntity: (entityId: string) => void
  updateEntity: (entityId: string, changes: Partial<Omit<Entity, 'id'>>) => void
  setEntityPosition: (entityId: string, position: Position) => void

  addRelationship: (relationship: EntityRelationship) => void
  removeRelationship: (relationship: EntityRelationship) => void
}

const initialLists: Record<string, List> = {
  full: { id: 'full', title: 'Full list', seedFromCatalog: true },
  kitchen: { id: 'kitchen', title: 'kitchen list' },
  despensa: { id: 'despensa', title: 'despensa list 2', seedFromCatalog: true },
  trash: { id: 'trash', title: 'basura list 3' },
}

export const useWorldStore = create<WorldState>((set) => ({
  lists: initialLists,

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

  addList: (list) =>
    set((world) => ({
      lists: { ...world.lists, [list.id]: list },
    })),

  // Note: removing a list does not touch entities currently sitting in it.
  // Their `state` still points at the removed list id, so they'd stop
  // appearing in any panel until moved. Revisit this once there's a real
  // "delete a list" UI action and we know what should happen to its contents.
  removeList: (listId) =>
    set((world) => {
      const { [listId]: _removedList, ...lists } = world.lists
      return { lists }
    }),

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