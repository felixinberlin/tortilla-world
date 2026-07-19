import { create } from 'zustand'
import type { Entity, EntityRelationship, Position } from '../types/Entity'
import type { List } from '../types/IngredientList'
import { ingredients as ingredientCatalog } from '../data/catalog/ingredients'
import { recipe as concebolla } from '../data/catalog/recipes/concebolla'

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

const kitchenIngredients = concebolla.ingredients
  .filter((i): i is NonNullable<typeof i> => i !== undefined)
  .map((i) => i.id)

const initialLists: Record<string, List> = {
  despensa: { id: 'despensa', title: 'Despensa', seedFromCatalog: true },
  kitchen: { id: 'kitchen', title: 'Kitchen', seedIngredients: kitchenIngredients },
  fire: { id: 'fire', title: 'Fire', seedIngredients: ['oil'] },
  trash: { id: 'trash', title: 'Basura' },
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
        state: 'idle',
        lists: [],
      },
    ]),
  ),

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
          (r) => r.sourceId !== entityId && r.targetId !== entityId,
        ),
      }
    }),

  updateEntity: (entityId, changes) =>
    set((world) => {
      const entity = world.entities[entityId]
      if (!entity) return world
      return { entities: { ...world.entities, [entityId]: { ...entity, ...changes } } }
    }),

  setEntityPosition: (entityId, position) =>
    set((world) => {
      const entity = world.entities[entityId]
      if (!entity) return world
      return { entities: { ...world.entities, [entityId]: { ...entity, position } } }
    }),

  addRelationship: (relationship) =>
    set((world) => ({
      relationships: [...world.relationships, relationship],
    })),

  removeRelationship: (relationship) =>
    set((world) => ({
      relationships: world.relationships.filter(
        (c) =>
          c.sourceId !== relationship.sourceId ||
          c.targetId !== relationship.targetId ||
          c.type !== relationship.type,
      ),
    })),
}))