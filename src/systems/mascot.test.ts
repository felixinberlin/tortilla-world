import { describe, it, expect, beforeEach } from 'vitest'
import { resolveCarry, Tortilla, MASCOT_ID } from './mascot'
import { useWorldStore } from '../store/worldStore'
import type { Entity } from '../types/Entity'

function makeEntity(id: string, lists: string[]): Entity {
  return {
    id,
    type: 'ingredient',
    position: { x: 0, y: 0 },
    size: { width: 1, height: 1 },
    state: 'idle',
    lists,
  }
}

describe('resolveCarry', () => {
  it('moves the ingredient from the source list to the target list', () => {
    const entity = makeEntity('onion', ['kitchen'])
    expect(resolveCarry(entity, 'kitchen', 'fire')).toEqual(['fire'])
  })

  it('returns null when the ingredient is not in the source list', () => {
    const entity = makeEntity('onion', ['despensa'])
    expect(resolveCarry(entity, 'kitchen', 'fire')).toBeNull()
  })

  it('does not duplicate the target list if the ingredient is already in it', () => {
    const entity = makeEntity('onion', ['kitchen', 'fire'])
    expect(resolveCarry(entity, 'kitchen', 'fire')).toEqual(['fire'])
  })

  it('preserves list memberships unrelated to the move', () => {
    const entity = makeEntity('onion', ['despensa', 'kitchen'])
    expect(resolveCarry(entity, 'kitchen', 'fire')).toEqual(['despensa', 'fire'])
  })
})

describe('Tortilla.banish', () => {
  beforeEach(() => {
    useWorldStore.setState({
      entities: {
        [MASCOT_ID]: makeEntity(MASCOT_ID, []),
        onion: makeEntity('onion', ['despensa', 'kitchen']),
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