/**
 * FILE: RecipePanel.tsx
 *
 * PURPOSE:
 * Interactive recipe selector and catalog viewer.
 *
 * RESPONSIBILITY:
 * - Wires catalog recipes (Con Cebolla, Sin Cebolla) with RecipeIngredientList.
 * - Displays active recipe requirements and matches with current world state.
 */

import { useState } from 'react';
import { useStore } from 'zustand';
import { ingredients as ingredientCatalog } from '../../data/catalog/ingredients';
import { recipes } from '../../data/catalog/recipes';
import { RecipeIngredientList } from '../Ingredients/RecipeIngredientList';
import { worldStore } from '../../store/worldStore';
import { countMatchingIngredients } from '../../systems/recipeMatcher';
import './RecipePanel.css';

export function RecipePanel() {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(recipes[0]?.id || 'concebolla');

  const activeRecipe = recipes.find((r) => r.id === selectedRecipeId) || recipes[0];

  const entities = useStore(worldStore, (state) => state.entities);
  const containers = useStore(worldStore, (state) => state.containers);

  // Collect ingredient entities currently placed in active workspace containers (board, pan, plate)
  const activeContainerEntities = [
    ...(containers.board?.entityIds || []),
    ...(containers.pan?.entityIds || []),
    ...(containers.plate?.entityIds || []),
  ].map((id) => entities[id]).filter(Boolean);

  const matchResult = countMatchingIngredients(activeRecipe, activeContainerEntities);

  if (!activeRecipe) return null;

  return (
    <div className="recipe-panel">
      <div className="recipe-panel-header">
        <div className="recipe-selector">
          {recipes.map((recipe) => (
            <button
              key={recipe.id}
              type="button"
              className={`recipe-tab ${selectedRecipeId === recipe.id ? 'active' : ''}`}
              onClick={() => setSelectedRecipeId(recipe.id)}
            >
              {recipe.name}
            </button>
          ))}
        </div>
        <div className="recipe-status">
          Match: <span className="highlight-count">{matchResult.matchingCount}</span> / {matchResult.totalCount}
        </div>
      </div>

      <div className="recipe-content">
        <h3 className="recipe-title">{activeRecipe.name}</h3>
        <RecipeIngredientList
          ingredients={activeRecipe.ingredients}
          ingredientCatalog={ingredientCatalog}
        />
      </div>
    </div>
  );
}
