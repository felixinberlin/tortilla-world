import { useWorldStore } from '../store/worldStore'
import type { Entity, Position } from '../types/Entity'

export const MASCOT_ID = 'tortilla'

export type MascotState = 'idle' | 'walking' | 'carrying' | 'cooking' | 'celebrating'

/**
 * Pure: where an ingredient's list memberships should end up after the
 * mascot carries it from one list to another.
 * Returns null if the ingredient isn't actually in fromListId — same
 * "invalid move" contract as resolveListReorder in interaction.ts.
 */
export function resolveCarry(entity: Entity, fromListId: string, toListId: string): string[] | null {
  if (!entity.lists.includes(fromListId)) return null

  const withoutSource = entity.lists.filter((id) => id !== fromListId)
  return withoutSource.includes(toListId) ? withoutSource : [...withoutSource, toListId]
}

/**
 * Thin, stateful wrapper around the world store for mascot behavior.
 * The rules above stay pure and testable; this class just sequences
 * store reads/writes and state transitions, the same "commit step"
 * role applyListOrders plays for drag-and-drop.
 *
 * Renders independently of Scene (see components/Mascot) but writes
 * straight into worldStore, so any change it makes shows up in the
 * scene through the normal reactive subscriptions.
 */
export class Tortilla {
  private get entity(): Entity {
    const entity = useWorldStore.getState().entities[MASCOT_ID]
    if (!entity) {
      throw new Error(`Mascot entity "${MASCOT_ID}" is missing from the world store`)
    }
    return entity
  }

  get position(): Position {
    return this.entity.position
  }

  get state(): MascotState {
    return this.entity.state as MascotState
  }

  private setState(state: MascotState) {
    useWorldStore.getState().updateEntity(MASCOT_ID, { state })
  }

  /** Starts walking toward a point. The component animates the visual move; call `arrived()` when it's done. */
  walkTo(target: Position) {
    this.setState('walking')
    useWorldStore.getState().setEntityPosition(MASCOT_ID, target)
  }

  /** Call from the component's onAnimationComplete once the walk animation finishes. */
  arrived() {
    if (this.state === 'walking') this.setState('idle')
  }

  /** Carries an ingredient from one list to another. Returns false if the move was invalid. */
  carryIngredient(ingredientId: string, fromListId: string, toListId: string): boolean {
    const world = useWorldStore.getState()
    const ingredient = world.entities[ingredientId]
    if (!ingredient) return false

    const nextLists = resolveCarry(ingredient, fromListId, toListId)
    if (!nextLists) return false

    this.setState('carrying')
    world.updateEntity(ingredientId, { lists: nextLists })
    this.setState('idle')
    return true
  }

  /**
   * The onion joke: deletes the ingredient entity outright, then gloats
   * about it. This is destructive — the entity (and its relationships)
   * is gone from worldStore, not just hidden. Bringing it back means
   * reconstructing and re-adding an entity via addEntity.
   */
  banish(ingredientId: string): boolean {
    const world = useWorldStore.getState()
    const ingredient = world.entities[ingredientId]
    if (!ingredient) return false

    world.removeEntity(ingredientId)
    this.setState('celebrating')
    return true
  }

  cook() {
    this.setState('cooking')
  }

  idle() {
    this.setState('idle')
  }
}

export const tortilla = new Tortilla()