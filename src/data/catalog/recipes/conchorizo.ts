import { ingredients } from '../ingredients'

export const recipe = {
  title: "Spaghetti Bolognese",
  description: "Classic Italian dish made with ground beef, tomato sauce, and spaghetti.",
  ingredients: [    
    { name: "Ground Beef", quantity: "500g" },
    { name: "Tomato Sauce", quantity: "1 can (400ml)" },
    { name: "Spaghetti", quantity: "800g" },
    { name: "Onions", quantity: "2 medium, diced" },
    { name: "Garlic", quantity: "3 cloves, minced" },
    { name: "Olive Oil", quantity: "1/2 cup" },
    { name: "Basil Leaves", quantity: "1 bunch fresh" },
    { name: "Salt and Pepper", quantity: "to taste" }
  ],
  steps: [
    { stepNumber: 1, description: "Heat olive oil in a large pan over medium heat. Add the diced onions and minced garlic and cook until soft." },
    { stepNumber: 2, description: "Add the ground beef to the pan and cook until browned. Drain excess fat if desired." },
    { stepNumber: 3, description: "Stir in the tomato sauce and bring to a simmer. Season with salt and pepper to taste." },
    { stepNumber: 4, description: "Cook for about 10-15 minutes or until thickened. Add fresh basil leaves if desired." },
    { stepNumber: 5, description: "Season again with salt and pepper to taste." },
    { stepNumber: 6, description: "To serve, heat some spaghetti in boiling water until al dente. Serve the tomato sauce over the cooked spaghetti." }
  ]
};
