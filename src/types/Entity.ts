export type EntityType = 'character' | 'ingredient' | 'kitchen-object'

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface Entity {
  id: string            // unique per physical instance — NOT the same as ingredientId
  type: EntityType
  ingredientId: string  // catalog id used to look up name/icon; for non-ingredient
                         // entities (mascot, kitchen-objects) this equals `id`
  position: Position
  size: Size
  state: string          // behavior state: 'idle' | 'walking' | 'carrying' etc
  listId: string | null  // the single list this entity currently lives in (null = unplaced)
}

export interface EntityRelationship {
  sourceId: string
  targetId: string
  type: string
}