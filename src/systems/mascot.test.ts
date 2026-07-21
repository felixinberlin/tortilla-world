import { describe, it, expect, beforeEach } from 'vitest'
import { resolveCarry, Tortilla, MASCOT_ID } from './mascot'
import { useWorldStore } from '../store/worldStore'
import type { Entity } from '../types/Entity'

function makeEntity(id: string, listId: string | null): Entity {
  return {
    id,
    type: 'ingredient',
    ingredientId: id,
    position: { x: 0, y: 0 },
    size: { width: 1, height: 1 },
    state: 'idle',
    listId,
  }
}

describe('resolveCarry', () => {
  it('moves the ingredient from the source list to the target list', () => {
    const entity = makeEntity('onion', 'kitchen')
    expect(resolveCarry(entity, 'kitchen', 'fire')).toBe('fire')
  })

  it('returns null when the ingredient is not in the source list', () => {
    const entity = makeEntity('onion', 'despensa')
    expect(resolveCarry(entity, 'kitchen', 'fire')).toBeNull()
  })

  it('is a no-op move when already in the target list', () => {
    const entity = makeEntity('onion', 'fire')
    expect(resolveCarry(entity, 'fire', 'fire')).toBe('fire')
  })
})

describe('Tortilla.banish', () => {
  beforeEach(() => {
    useWorldStore.setState({
      entities: {
        [MASCOT_ID]: { ...makeEntity(MASCOT_ID, null), type: 'character' },
        onion: makeEntity('onion', 'despensa'),
      },
      relationships: [],
    })
  })

  it('deletes the ingredient entity from the world store entirely', () => {
    new Tortilla().banish('onion')
    expect(useWorldStore.getState().entities.onion).toBeUndefined()
  })

  it('sets the mascot state to celebrating', () => {
    new Tortilla().banish('onion')
    expect(useWorldStore.getState().entities[MASCOT_ID].state).toBe('celebrating')
  })

  it('returns false and leaves state untouched for an unknown ingredient', () => {
    const result = new Tortilla().banish('unicorn-meat')
    expect(result).toBe(false)
    expect(useWorldStore.getState().entities[MASCOT_ID].state).toBe('idle')
  })
})