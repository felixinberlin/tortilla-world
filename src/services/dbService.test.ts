/**
 * FILE: dbService.test.ts
 *
 * PURPOSE:
 * Unit tests for Firestore recipe normalization, ingredient indexing, and sanitization.
 */

import { describe, it, expect } from 'vitest';
import { normalizeIngredientIds, sanitizeForFirestore } from './dbService';

describe('dbService helpers', () => {
  it('normalizes string and object ingredients into clean lowercase ID lists', () => {
    const raw = [
      'Garlic ',
      'EGG',
      { id: 'Potato' },
      { ingredientId: 'ONION' },
      { entityId: '  Salt ' },
      'egg', // duplicate
    ];

    const normalized = normalizeIngredientIds(raw);

    expect(normalized).toEqual(['garlic', 'egg', 'potato', 'onion', 'salt']);
  });

  it('sanitizes undefined values recursively for Firestore compatibility', () => {
    const dirtyData = {
      title: 'Tortilla de Patatas',
      description: undefined,
      author: 'Chef',
      tags: ['classic', undefined],
      nested: {
        field1: 'value',
        field2: undefined,
      },
    };

    const clean = sanitizeForFirestore(dirtyData);

    expect(clean).toEqual({
      title: 'Tortilla de Patatas',
      author: 'Chef',
      tags: ['classic'],
      nested: {
        field1: 'value',
      },
    });
  });
});
