/**
 * FILE: concebolla.ts
 *
 * PURPOSE:
 * Recipe definition for Tortilla con cebolla.
 *
 * RESPONSIBILITY:
 * - Defines the ingredients, quantities, and cooking process.
 * - Describes recipe actions in a declarative format.
 * - Provides a Cooklang representation for humans.
 */

import type { Recipe } from '../../../types/Recipe';

export const concebollaRecipe: Recipe = {
  id: 'concebolla',
  
  name: 'Tortilla con Cebolla',

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
    onions: {
      ingredientId: 'onion',
      amount: 1,
      unit: 'pcs',
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
      action: 'wash',
      target: 'potatoes',
    },
    {
      action: 'prepare',
      target: 'potatoes',
      preparation: 'sliced',
    },
    {
      action: 'prepare',
      target: 'onions',
      preparation: 'peeled',
    },
    {
      action: 'wash',
      target: 'onions',
    },
    {
      action: 'prepare',
      target: 'onions',
      preparation: 'diced',
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
      action: 'cook',
      target: 'onions',
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
        'onions',
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

export const concebollaCooklang = `
Peel the @potatoes{4%pcs}.

Wash the @potatoes.

Slice the @potatoes.

Peel the @onions{1%pcs}.

Wash the @onions.

Dice the @onions.

Heat the @oil{100%ml}.

Fry the @potatoes until tender.

Fry the @onions until golden.

Beat the @eggs{6%pcs}.

Add @salt{1%tsp} and @pepper{1%pinch}.

Mix the fried potatoes and onions with the beaten eggs, salt and pepper.

Pour the mixture into the pan.

Cook for 5 minutes.

With a soft spatula, make sure the tortilla does not stick to the pan.

Flip the tortilla.

Cook for another 5 minutes.

Serve the tortilla.

Celebrate.
`;

export const recipe = concebollaRecipe;