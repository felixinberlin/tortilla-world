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