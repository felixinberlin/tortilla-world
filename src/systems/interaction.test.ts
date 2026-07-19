import { describe, it, expect } from 'vitest'
import { resolveListReorder } from './interaction'

describe('resolveListReorder', () => {
    it('moves an item from full to empty', () => {
        const result = resolveListReorder(
            { activeId: 'full::potato', overId: 'empty::egg' },
            { full: ['potato', 'egg'], empty: ['egg'] },
        )
        expect(result).toEqual({ full: ['egg'], empty: ['potato', 'egg'] })
    })

    it('reorders within the same list', () => {
        const result = resolveListReorder(
            { activeId: 'full::egg', overId: 'full::potato' },
            { full: ['potato', 'egg'], empty: [] },
        )
        expect(result?.full).toEqual(['egg', 'potato'])
    })

    it('returns null when the item is not in the source list', () => {
        const result = resolveListReorder(
            { activeId: 'full::onion', overId: 'empty::egg' },
            { full: ['potato'], empty: ['egg'] },
        )
        expect(result).toBeNull()
    })

    it('moves an item between two arbitrary non-full/empty lists', () => {
        const result = resolveListReorder(
            { activeId: 'empty2::onion', overId: 'empty3::garlic' },
            { full: [], empty: [], empty2: ['onion'], empty3: ['garlic'] },
        )
        expect(result).toEqual({
            full: [],
            empty: [],
            empty2: [],
            empty3: ['onion', 'garlic'],
        })
    })

    it('drops into an empty list with no items to land on', () => {
        const result = resolveListReorder(
            { activeId: 'full::potato', overId: 'empty3' },
            { full: ['potato'], empty: [], empty2: [], empty3: [] },
        )
        expect(result).toEqual({ full: [], empty: [], empty2: [], empty3: ['potato'] })
    })

    it('blocks moving an item into a list that already has it', () => {
        const result = resolveListReorder(
            { activeId: 'full::potato', overId: 'empty::potato' },
            { full: ['potato'], empty: ['potato'] },
        )
        expect(result).toBeNull()
    })

    it('blocks moving into an empty-looking target that already contains the item', () => {
        // Dropping on blank space in a list still resolves to that list's container id,
        // so the duplicate check must apply even without a specific item to land on.
        const result = resolveListReorder(
            { activeId: 'full::potato', overId: 'empty' },
            { full: ['potato'], empty: ['potato'] },
        )
        expect(result).toBeNull()
    })

    it('allows a duplicate when the item opts out of the uniqueness rule', () => {
        const result = resolveListReorder(
            { activeId: 'full::pan', overId: 'empty::pan' },
            { full: ['pan'], empty: ['pan'] },
            () => false, // e.g. a kitchen object, not an ingredient
        )
        expect(result).toEqual({ full: [], empty: ['pan', 'pan'] })
    })

    it('does not block reordering an item within its own list', () => {
        const result = resolveListReorder(
            { activeId: 'full::potato', overId: 'full::onion' },
            { full: ['potato', 'onion'] },
        )
        expect(result?.full).toEqual(['onion', 'potato'])
    })
})