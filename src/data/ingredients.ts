// Local Ingredient type (fallback) to avoid import errors when
// ../types/Ingredient is missing or has incorrect path.
export type Ingredient = {
  id: string;
  icon?: string;
  name: string;
};

export const ingredients: Ingredient[] = [

  {
    id: "potato",
    icon: "🥔",
    name: "Potatoes",
  },


  {
    id: "egg",
    icon: "🥚",
    name: "Eggs",
  },


  {
    id: "oil",
    icon: "🫒",
    name: "Olive Oil",
  },


  {
    id: "onion",
    icon: "🧅",
    name: "Onion",
  },


  {
    id: "chorizo",
    icon: "🌭",
    name: "Chorizo",
  },

  {
    id: "salt",
    icon: "🧂",
    name: "Salt",
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

];