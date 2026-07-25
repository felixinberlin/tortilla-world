/**
 * FILE: RecipePanel.tsx
 *
 * PURPOSE:
 * Compact, unintrusive recipe selector and catalog viewer.
 *
 * RESPONSIBILITY:
 * - Wires catalog recipes (Con Cebolla, Sin Cebolla) with RecipeRequirements.
 * - Provides a "Follow the recipe" button for each recipe to automate mascot actions.
 * - Displays active recipe requirements and matches with current world state.
 */

import { useState } from 'react';
import { useStore } from 'zustand';
import { recipes } from '../../data/catalog/recipes';
import { RecipeRequirements } from './RecipeRequirements';
import { worldStore } from '../../store/worldStore';
import { countMatchingRequirements } from '../../systems/recipeMatcher';
import { runFollowRecipeScript } from '../../systems/mascotActions';
import { getRecipeRequirementsArray } from '../../types/Recipe';
import './RecipePanel.scss';

export function RecipePanel() {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(recipes[0]?.id || 'concebolla');
  const [runningRecipeId, setRunningRecipeId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const activeRecipe = recipes.find((r) => r.id === selectedRecipeId) || recipes[0];

  const entities = useStore(worldStore, (state) => state.entities);
  const containers = useStore(worldStore, (state) => state.containers);
  const dispatch = useStore(worldStore, (state) => state.dispatch);

  // Collect entities currently placed in active workspace containers
  const activeContainerEntities = Object.values(containers)
    .filter((c) => c.id !== 'despensa')
    .flatMap((c) => c.entityIds)
    .map((id) => entities[id])
    .filter(Boolean);

  const matchResult = countMatchingRequirements(activeRecipe, activeContainerEntities);

  const handleFollowRecipe = async (recipeId: string) => {
    if (runningRecipeId !== null) return;
    
    // Auto-reset the kitchen world before starting a new recipe
    dispatch({ type: 'RESET_WORLD' });

    setSelectedRecipeId(recipeId);
    setRunningRecipeId(recipeId);
    try {
      await runFollowRecipeScript(recipeId, 'chef', 'board', 600);
    } finally {
      setRunningRecipeId(null);
    }
  };

  if (!activeRecipe) return null;

  return (
    <div className="recipe-panel compact-recipe-panel">
      <div className="recipe-panel-header">
        <div className="recipe-selector">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className={`recipe-option ${selectedRecipeId === recipe.id ? 'active' : ''}`}
            >
              <button
                type="button"
                className={`recipe-tab ${selectedRecipeId === recipe.id ? 'active' : ''}`}
                onClick={() => setSelectedRecipeId(recipe.id)}
              >
                {recipe.name}
              </button>
              <button
                type="button"
                className="follow-recipe-btn"
                disabled={runningRecipeId !== null}
                onClick={() => handleFollowRecipe(recipe.id)}
                title={`Bring all requirements for ${recipe.name} to the table`}
              >
                {runningRecipeId === recipe.id ? '⏳ Following...' : '👨‍🍳 Follow the recipe'}
              </button>
            </div>
          ))}
        </div>

        <div className="recipe-header-right">
          <div className="recipe-status">
            Match: <span className="highlight-count">{matchResult.matchingCount}</span> / {matchResult.totalCount}
          </div>
          <button
            type="button"
            className="recipe-toggle-btn"
            onClick={() => dispatch({ type: 'RESET_WORLD' })}
            disabled={runningRecipeId !== null}
            title="Clean the kitchen and start over"
          >
            🔄 Reset
          </button>
          <button
            type="button"
            className="recipe-toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Collapse requirements' : 'Expand requirements'}
          >
            {isExpanded ? '▲ Hide Requirements' : '▼ Requirements'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="recipe-content compact">
          <RecipeRequirements requirements={getRecipeRequirementsArray(activeRecipe)} />
        </div>
      )}
    </div>
  );
}
