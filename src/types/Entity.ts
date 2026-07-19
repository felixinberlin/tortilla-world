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
  id: string
  type: EntityType
  position: Position
  size: Size
  state: string        // behavior state: 'idle' | 'walking' | 'carrying' etc
  lists: string[]      // which lists this entity currently belongs to
}

export interface EntityRelationship {
  sourceId: string
  targetId: string
  type: string
}