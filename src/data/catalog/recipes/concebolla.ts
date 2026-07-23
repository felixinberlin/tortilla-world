/**
 * FILE: sincebolla.ts
 *
 * PURPOSE:
 * Recipe definition for Tortilla sin cebolla.
 *
 * RESPONSIBILITY:
 * - Specifies ingredients needed for the sin cebolla recipe variant.
 */

import { ingredients } from "../ingredients";

export const recipe = {
  id: "sincebolla",
  name: "Sincebolla",
  ingredients: [
    ingredients.find(i => i.id === "potato"),
    ingredients.find(i => i.id === "egg"),
    ingredients.find(i => i.id === "oil"),
    ingredients.find(i => i.id === "salt"),
    ingredients.find(i => i.id === "pepper"),
  ]
};