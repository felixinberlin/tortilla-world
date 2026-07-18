import { useWorldStore } from '../store/worldStore'
import type { Entity, Position } from '../types/Entity'

export function calculateDistance(first: Position, second: Position) {
  return Math.hypot(second.x - first.x, second.y - first.y)
}

export function moveTo(entity: Entity, target: Position) {
  useWorldStore.getState().setEntityPosition(entity.id, target)
}
