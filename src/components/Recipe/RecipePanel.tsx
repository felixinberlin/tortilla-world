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
import { concebollaRecipe } from '../../data/catalog/recipes/concebolla';
import { sincebollaRecipe } from '../../data/catalog/recipes/sincebolla';
import { RecipeIngredientList } from '../Ingredients/RecipeIngredientList';
import { worldStore } from '../../store/worldStore';
import './RecipePanel.css';

export function RecipePanel() {
  const [selectedRecipeId, setSelectedRecipeId] = useState<'concebolla' | 'sincebolla'>('concebolla');

  const activeRecipe = selectedRecipeId === 'concebolla' ? concebollaRecipe : sincebollaRecipe;

  const entities = useStore(worldStore, (state) => state.entities);
  const containers = useStore(worldStore, (state) => state.containers);

  // Collect ingredient IDs currently placed in active workspace containers (pan, board, plate)
  const activeContainerEntities = [
    ...(containers.board?.entityIds || []),
    ...(containers.pan?.entityIds || []),
    ...(containers.plate?.entityIds || []),
  ].map((id) => entities[id]).filter(Boolean);

  const activeIngredientBaseIds = activeContainerEntities.map((e) => {
    // If copied, ID might be "potato_12345_678", extract base catalog ID
    return e.id.split('_')[0];
  });

  const matchingCount = activeRecipe.ingredients.filter((req) =>
    activeIngredientBaseIds.includes(req.ingredientId)
  ).length;

  return (
    <div className="recipe-panel">
      <div className="recipe-panel-header">
        <div className="recipe-selector">
          <button
            type="button"
            className={`recipe-tab ${selectedRecipeId === 'concebolla' ? 'active' : ''}`}
            onClick={() => setSelectedRecipeId('concebolla')}
          >
            🧅 Con Cebolla
          </button>
          <button
            type="button"
            className={`recipe-tab ${selectedRecipeId === 'sincebolla' ? 'active' : ''}`}
            onClick={() => setSelectedRecipeId('sincebolla')}
          >
            🍳 Sin Cebolla
          </button>
        </div>
        <div className="recipe-status">
          Match: <span className="highlight-count">{matchingCount}</span> / {activeRecipe.ingredients.length}
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
