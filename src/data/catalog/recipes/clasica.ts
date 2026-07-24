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

  ingredients: {
    potatoes: {
      ingredientId: 'potato',
      amount: 4,
      unit: 'pcs',
    },

    eggs: {
      ingredientId: 'egg',
      amount: 6,
      unit: 'pcs',
    },

    oil: {
      ingredientId: 'oil',
      amount: 100,
      unit: 'ml',
    },

    salt: {
      ingredientId: 'salt',
      amount: 1,
      unit: 'tsp',
    },

    pepper: {
      ingredientId: 'pepper',
      amount: 1,
      unit: 'pinch',
    },
  },

  steps: [
    {
      action: 'prepare',
      target: 'potatoes',
      preparation: 'peeled',
    },

    {
      action: 'prepare',
      target: 'potatoes',
      preparation: 'sliced',
    },

    {
      action: 'cook',
      target: 'oil',
      method: 'heat',
    },

    {
      action: 'cook',
      target: 'potatoes',
      method: 'fry',
    },

    {
      action: 'prepare',
      target: 'eggs',
      preparation: 'beaten',
    },

    {
      action: 'mix',
      inputs: [
        'potatoes',
        'eggs',
        'salt',
        'pepper',
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

Add @pepper{1%pinch}.

Mix the potatoes with the beaten eggs, salt and pepper.

Pour the mixture into the pan.

Cook for 5 minutes.

With a soft spatula, make sure the tortilla does not stick to the pan.

Flip the tortilla.

Cook for another 5 minutes.

Serve the tortilla.

Celebrate.
`;

export const recipe = clasicaRecipe;