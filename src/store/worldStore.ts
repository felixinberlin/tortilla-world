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

const fireIngredients = ['oil']

const initialLists: Record<string, List> = {
  despensa: { id: 'despensa', title: 'Despensa', seedFromCatalog: true },
  kitchen: { id: 'kitchen', title: 'Kitchen', seedIngredients: kitchenIngredients, consumesOnDrag: true },
  fire: { id: 'fire', title: 'Fire', seedIngredients: fireIngredients, consumesOnDrag: true },
  trash: { id: 'trash', title: 'Basura', consumesOnDrag: true },
}

/**
 * Build the initial entity instances for one ingredient. An ingredient
 * always has a pantry instance in despensa. If the same ingredient is also
 * pre-placed in another list (e.g. it's part of the starter kitchen recipe),
 * that's a SEPARATE physical instance with its own id — the two must never
 * share identity, or moving one would drag the other along with it.
 */
function buildInitialInstances(ingredientId: string, index: number): Entity[] {
  const instances: Entity[] = [
    {
      id: `${ingredientId}#despensa`,
      type: 'ingredient',
      ingredientId,
      position: { x: 0, y: index },
      size: { width: 1, height: 1 },
      state: 'idle',
      listId: 'despensa',
    },
  ]

  for (const list of Object.values(initialLists)) {
    if (list.id !== 'despensa' && list.seedIngredients?.includes(ingredientId)) {
      instances.push({
        id: `${ingredientId}#${list.id}`,
        type: 'ingredient',
        ingredientId,
        position: { x: 0, y: index },
        size: { width: 1, height: 1 },
        state: 'idle',
        listId: list.id,
      })
    }
  }

  return instances
}

const mascot: Entity = {
  id: 'tortilla',
  type: 'character',
  ingredientId: 'tortilla',
  position: { x: 40, y: 40 },
  size: { width: 72, height: 72 },
  state: 'idle',
  listId: null,
}

export const useWorldStore = create<WorldState>((set) => ({
  lists: initialLists,

  entities: {
    ...Object.fromEntries(
      ingredientCatalog
        .flatMap((ingredient, index) => buildInitialInstances(ingredient.id, index))
        .map((entity) => [entity.id, entity]),
    ),
    [mascot.id]: mascot,
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