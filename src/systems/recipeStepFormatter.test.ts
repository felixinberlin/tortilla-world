/**
 * FILE: recipeStepFormatter.test.ts
 *
 * PURPOSE:
 * Unit tests for Grammar Helpers and Grammar-Aware Recipe Step Formatter.
 */

import { describe, it, expect } from 'vitest';
import { formatRecipeStep, formatRecipeSteps } from './recipeStepFormatter';
import { noun, verb, joinList } from '../i18n/grammar';
import type { RecipeStep } from '../types/RecipeStep';

describe('Grammar Helpers', () => {
  it('noun helper provides metadata for known terms in German, Spanish, English', () => {
    const dePotato = noun('potato', 'de');
    expect(dePotato.singular).toBe('Kartoffel');
    expect(dePotato.plural).toBe('Kartoffeln');

    const esPotato = noun('potato', 'es');
    expect(esPotato.plural).toBe('patatas');

    const enPotato = noun('potato', 'en');
    expect(enPotato.plural).toBe('potatoes');
  });

  it('noun helper provides fallback for unknown terms', () => {
    const unknownNoun = noun('dragonfruit', 'en');
    expect(unknownNoun.singular).toBe('dragonfruit');
    expect(unknownNoun.plural).toBe('dragonfruits');
  });

  it('verb helper provides imperative and infinitive forms', () => {
    expect(verb('fry', 'de').imperative()).toBe('Brate');
    expect(verb('fry', 'de').infinitive()).toBe('braten');

    expect(verb('fry', 'es').imperative()).toBe('Fríe');
    expect(verb('fry', 'es').infinitive()).toBe('freír');

    expect(verb('fry', 'en').imperative()).toBe('Fry');
    expect(verb('fry', 'en').infinitive()).toBe('fry');
  });

  it('joinList formats lists with natural language conjunctions', () => {
    expect(joinList(['Kartoffeln', 'Zwiebeln', 'Eier', 'Salz'], 'de')).toBe('Kartoffeln, Zwiebeln, Eier und Salz');
    expect(joinList(['patatas', 'cebolla', 'huevos', 'sal'], 'es')).toBe('patatas, cebolla, huevos y sal');
    expect(joinList(['potatoes', 'onion', 'eggs', 'salt'], 'en')).toBe('potatoes, onion, eggs and salt');
  });
});

describe('Grammar-Aware Recipe Step Formatter', () => {
  const dummyTranslate = (key: string) => key;

  it('renders German recipe steps naturally', () => {
    const beatStep = { action: 'beat', inputs: ['egg'] } as RecipeStep;
    expect(formatRecipeStep(beatStep, dummyTranslate, 'de')).toBe('Eier verquirlen.');

    const cookStep: RecipeStep = { action: 'cook', method: 'fry', target: 'potato', duration: 15, unit: 'Minuten' };
    expect(formatRecipeStep(cookStep, dummyTranslate, 'de')).toBe('Brate die Kartoffeln für 15 Minuten');

    const heatStep: RecipeStep = { action: 'cook', method: 'heat', target: 'oil' };
    expect(formatRecipeStep(heatStep, dummyTranslate, 'de')).toBe('Erhitzen Olivenöl');

    const flipStep = { action: 'flip', target: 'Huevo batido', containerId: 'burner1' } as RecipeStep;
    expect(formatRecipeStep(flipStep, dummyTranslate, 'de')).toBe('In die Pfanne Huevo batido wenden');

    const serveStep: RecipeStep = { action: 'serve', target: 'Huevo batido', containerId: 'plate', as: 'Tortilla francesa' };
    expect(formatRecipeStep(serveStep, dummyTranslate, 'de')).toBe('Auf dem Servierteller 🍽️ als Tortilla francesa servieren');
  });

  it('renders Spanish recipe steps naturally', () => {
    const beatStep = { action: 'beat', inputs: ['egg'] } as RecipeStep;
    expect(formatRecipeStep(beatStep, dummyTranslate, 'es')).toBe('Bate los huevos.');

    const cookStep: RecipeStep = { action: 'cook', method: 'fry', target: 'potato', duration: 15, unit: 'minutos' };
    expect(formatRecipeStep(cookStep, dummyTranslate, 'es')).toBe('Fríe las patatas durante 15 minutos');

    const mixStep: RecipeStep = { action: 'mix', inputs: ['potato', 'onion', 'egg', 'salt'] };
    expect(formatRecipeStep(mixStep, dummyTranslate, 'es')).toBe('Mezcla las patatas, cebolla, huevos y sal');
  });

  it('renders English recipe steps naturally', () => {
    const sliceStep = { action: 'prepare', style: 'sliced', target: 'potato' } as RecipeStep;
    expect(formatRecipeStep(sliceStep, dummyTranslate, 'en')).toBe('Slice the potatoes');

    const diceStep = { action: 'prepare', style: 'diced', target: 'onion' } as RecipeStep;
    expect(formatRecipeStep(diceStep, dummyTranslate, 'en')).toBe('Dice the onion');

    const beatStep = { action: 'beat', inputs: ['egg'] } as RecipeStep;
    expect(formatRecipeStep(beatStep, dummyTranslate, 'en')).toBe('Beat the eggs.');

    const cookStep: RecipeStep = { action: 'cook', method: 'fry', target: 'potato', duration: 15, unit: 'minutes' };
    expect(formatRecipeStep(cookStep, dummyTranslate, 'en')).toBe('Fry the potatoes for 15 minutes');

    const mixStep: RecipeStep = { action: 'mix', inputs: ['potato', 'onion', 'egg', 'salt'] };
    expect(formatRecipeStep(mixStep, dummyTranslate, 'en')).toBe('Mix the potatoes, onion, eggs and salt');
  });

  it('handles array of steps with formatRecipeSteps', () => {
    const steps = [
      { action: 'beat', inputs: ['egg'] },
      { action: 'cook', method: 'heat', target: 'oil' },
      { action: 'celebrate' },
    ] as RecipeStep[];

    const deResults = formatRecipeSteps(steps, dummyTranslate, 'de');
    expect(deResults).toHaveLength(3);
    expect(deResults[0]).toBe('Eier verquirlen.');
    expect(deResults[1]).toBe('Erhitzen Olivenöl');
    expect(deResults[2]).toBe('Guten Appetit!');
  });
});
