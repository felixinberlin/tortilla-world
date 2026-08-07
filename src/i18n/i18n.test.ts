/**
 * FILE: i18n.test.ts
 *
 * PURPOSE:
 * Unit tests for the Tortilla World i18n translation system.
 */

import { describe, it, expect } from 'vitest';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';

describe('i18n Locale Dictionaries', () => {
  it('contains matching top-level keys in English, Spanish, and German dictionaries', () => {
    const enKeys = Object.keys(en).sort();
    const esKeys = Object.keys(es).sort();
    const deKeys = Object.keys(de).sort();
    expect(enKeys).toEqual(esKeys);
    expect(enKeys).toEqual(deKeys);
  });

  it('contains valid text strings for app title and recipe database', () => {
    expect(en.app.title).toBe('Tortilla World');
    expect(es.app.title).toBe('Tortilla World');
    expect(de.app.title).toBe('Tortilla World');
    expect(en.database.confirmDeleteTitle).toContain('Confirm Firestore Deletion');
    expect(es.database.confirmDeleteTitle).toContain('Confirmar Eliminación');
    expect(de.database.confirmDeleteTitle).toContain('Löschen aus Firestore bestätigen');
  });
});
