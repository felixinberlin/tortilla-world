/**
 * FILE: clasica.ts
 *
 * PURPOSE:
 * Recipe definition for Tortilla Clásica (without onion).
 *
 * RESPONSIBILITY:
 * - Defines the ingredients, quantities, and cooking process.
 * - Describes recipe actions in a declarative format.
 * - Provides a Cooklang representation for humans.
 *
 * NOTE:
 * Recipes describe WHAT happens.
 * The RecipeRunner decides HOW it happens:
 * - finding ingredients
 * - moving the chef
 * - animations
 * - changing entity state
 * - creating intermediate results
 */

import type { Recipe } from '../../../types/Recipe';

export const clasicaRecipe: Recipe = {
  id: 'clasica',

  name: 'Clásica',

  requirements: {
    potatoes: {
      entityId: 'potato',
      amount: 4,
      unit: 'pcs',
    },

    eggs: {
      entityId: 'egg',
      amount: 6,
      unit: 'pcs',
    },

    garlic: {
      entityId: 'garlic',
      amount: 1,
      unit: 'head',
    },

    oil: {
      entityId: 'oil',
      amount: 100,
      unit: 'ml',
    },

    salt: {
      entityId: 'salt',
      amount: 1,
      unit: 'tsp',
    },

    black_pepper: {
      entityId: 'black_pepper',
      amount: 1,
      unit: 'pinch',
    },
  },

  steps: [
  {
    action: 'prepare',
    target: 'garlic',
    preparation: 'peeled',
  },

  // Heat oil first
  {
    action: 'cook',
    target: 'oil',
    method: 'heat',
  },

  // Fry garlic (consumes oil)
  {
    action: 'cook',
    target: 'garlic',
    method: 'fry',
    instruction: 'Que no se quemen.', // Cook but don't burn
  },

  // IMPORTANT: Move garlic out IMMEDIATELY after cooking
  {
    action: 'move',
    ingredient: 'garlic',
    target: 'plate',  // Move to pantry
    source: 'pan',     // From pan
  },

  // Now cook potatoes in the same oil (oil already used from garlic step)
  {
    action: 'cook',
    target: 'potatoes',
    method: 'fry',
  },

  // Beat eggs
  {
    action: 'prepare',
    target: 'eggs',
    preparation: 'beaten',
  },

  // Mix all together including garlic from pantry
  {
    action: 'mix',
    inputs: [
      'potatoes',      // From pan
      'eggs',          // Fresh
      'salt',          // Fresh
      'black_pepper',  // Fresh
      'garlic'         // From pantry (cooked earlier)
    ],
    output: 'mixture',
  },

    {
      action: 'cook',
      target: 'mixture',
      method: 'fry',
      duration: 5,
      unit: 'min',
    },

    {
      action: 'instruction',
      text: 'Con una espátula blanda, asegúrate de que la tortilla no se pega a la sartén.',
    },

    {
      action: 'flip',
      target: 'mixture',
      instruction: 'Dale la vuelta a la tortilla.',
    },

    {
      action: 'cook',
      target: 'mixture',
      method: 'fry',
      duration: 5,
      unit: 'min',
      instruction: 'Deja cocinar por otros 5 min.',
    },

    {
      action: 'serve',
      target: 'mixture',
    },

    {
      action: 'celebrate',
    },
  ],
};

export const clasicaCooklang = `
Peel the @potatoes{4%pcs}.

Slice the @potatoes.

Heat the @oil{100%ml}.

Fry the @potatoes until tender.

Beat the @eggs{6%pcs}.

Add @salt{1%tsp}.

Add @black_pepper{1%pinch}.

Mix the potatoes with the beaten eggs, salt and black_pepper.

Pour the mixture into the pan.

Cook for 5 minutes.

With a soft spatula, make sure the tortilla does not stick to the pan.

Flip the tortilla.

Cook for another 5 minutes.

Serve the tortilla.

Celebrate.
`;

export const recipe = clasicaRecipe;