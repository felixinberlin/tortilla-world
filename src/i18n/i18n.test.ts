/**
 * FILE: i18n.test.ts
 *
 * PURPOSE:
 * Unit tests for the Tortilla World i18n translation system.
 */

import { describe, it, expect } from 'vitest';
import en from './locales/en.json';
import es from './locales/es.json';

describe('i18n Locale Dictionaries', () => {
  it('contains matching top-level keys in English and Spanish dictionaries', () => {
    const enKeys = Object.keys(en).sort();
    const esKeys = Object.keys(es).sort();
    expect(enKeys).toEqual(esKeys);
  });

  it('contains valid text strings for app title and recipe database', () => {
    expect(en.app.title).toBe('Tortilla World');
    expect(es.app.title).toBe('Tortilla World');
    expect(en.database.confirmDeleteTitle).toContain('Confirm Firestore Deletion');
    expect(es.database.confirmDeleteTitle).toContain('Confirmar Eliminación');
  });
});
