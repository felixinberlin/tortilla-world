/**
 * FILE: ingredients.ts
 *
 * PURPOSE:
 * Catalog of available ingredient definitions.
 *
 * RESPONSIBILITY:
 * - Provides master list of ingredient metadata (names, icons, ids).
 */

import type { Ingredient } from "../../types/Ingredient";
import { INGREDIENT_CAPABILITIES_CATALOG } from "./ingredientCapabilities";

export const ingredients: Ingredient[] = [
  {
    id: "potato",
    icon: "🥔",
    name: "Potatoes",
    capabilities: INGREDIENT_CAPABILITIES_CATALOG.potato?.capabilities,
  },

  {
    id: "egg",
    icon: "🥚",
    name: "Eggs",
    capabilities: INGREDIENT_CAPABILITIES_CATALOG.egg?.capabilities,
  },

  {
    id: "yolk",
    icon: "🟡",
    name: "Yolk",
    capabilities: INGREDIENT_CAPABILITIES_CATALOG.yolk?.capabilities,
  },

  {
    id: "egg_white",
    icon: "⚪",
    name: "Egg White",
    capabilities: INGREDIENT_CAPABILITIES_CATALOG.egg_white?.capabilities,
  },

  {
    id: "oil",
    icon: "🫒",
    name: "Olive Oil",
    capabilities: INGREDIENT_CAPABILITIES_CATALOG.oil?.capabilities,
  },

  {
    id: "onion",
    icon: "🧅",
    name: "Onion",
    capabilities: INGREDIENT_CAPABILITIES_CATALOG.onion?.capabilities,
  },

  {
    id: "chorizo",
    icon: "🌭",
    name: "Chorizo",
    capabilities: INGREDIENT_CAPABILITIES_CATALOG.chorizo?.capabilities,
  },

  {
    id: "salt",
    icon: "🧂",
    name: "Salt",
    capabilities: INGREDIENT_CAPABILITIES_CATALOG.salt?.capabilities,
  },

  {
    id: "pepper",
    icon: "🫑",
    name: "Bell Pepper",
  },

  {
    id: "garlic",
    icon: "🧄",
    name: "Garlic",
    capabilities: INGREDIENT_CAPABILITIES_CATALOG.garlic?.capabilities,
  },


  {
    id: "tomato",
    icon: "🍅",
    name: "Tomato",
  },

  {
    id: "cheese",
    icon: "🧀",
    name: "Cheese",
  },

  {
    id: "bread",
    icon: "🍞",
    name: "Bread",
  },

  {
    id: "milk",
    icon: "🥛",
    name: "Milk",
  },

  {
    id: "butter",
    icon: "🧈",
    name: "Butter",
  },

  // --- Expanded Ingredients ---

  {
    id: "black_pepper",
    icon: "🌶️",
    name: "Black Pepper",
  },

  {
    id: "flour",
    icon: "🌾",
    name: "Flour",
  },

  {
    id: "sugar",
    icon: "🍚",
    name: "Sugar",
  },

  {
    id: "rice",
    icon: "🍚",
    name: "Rice",
  },

  {
    id: "chicken",
    icon: "🍗",
    name: "Chicken",
  },

  {
    id: "beef",
    icon: "🥩",
    name: "Beef",
  },

  {
    id: "mushroom",
    icon: "🍄",
    name: "Mushroom",
  },

  {
    id: "spinach",
    icon: "🥬",
    name: "Spinach",
  },

  {
    id: "lemon",
    icon: "🍋",
    name: "Lemon",
  },

];