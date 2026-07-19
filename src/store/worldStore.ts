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
  full: { id: 'full', title: 'All ingredients', seedFromCatalog: true },
  despensa: { id: 'despensa', title: 'Despensa' },
  kitchen: { id: 'kitchen', title: 'Kitchen' },
  trash: { id: 'trash', title: 'Basura' },
}

const despensaIngredients = ['onion', 'potato', 'oil', 'egg']

const fullIngredients = ingredientCatalog.filter(
  (ingredient) => !despensaIngredients.includes(ingredient.id)
)

export const useWorldStore = create<WorldState>((set) => ({
  lists: initialLists,

  entities: {
    ...Object.fromEntries(
      fullIngredients.map((ingredient, index) => [
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
    ...Object.fromEntries(
      despensaIngredients.map((id, index) => [
        id,
        {
          id,
          type: 'ingredient' as const,
          position: { x: 0, y: index },
          size: { width: 1, height: 1 },
          state: 'despensa',
        },
      ]),
    ),
  },

  relationships: [],

  addList: (list) =>
    set((world) => ({
      lists: { ...world.lists, [list.id]: list },
    })),

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
      if (!entity) return world
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
      if (!entity) return world
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