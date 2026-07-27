import React, { useState, useMemo } from 'react';
import { recipes } from '../../data/catalog/recipes';
import { ingredients as ingredientCatalog } from '../../data/catalog/ingredients';
import { catalogTools as toolsCatalog } from '../../data/catalog/tools';
import { getRecipeRequirementsArray } from '../../types/Recipe';
import './CookbookView.scss';

export const CookbookView: React.FC = () => {
  const [selectedRecipeId, setSelectedRecipeId] = useState(recipes[0]?.id);

  const activeRecipe = useMemo(
    () => recipes.find((r) => r.id === selectedRecipeId) || recipes[0],
    [selectedRecipeId]
  );

  const requirements = useMemo(() => {
    if (!activeRecipe) return [];
    return getRecipeRequirementsArray(activeRecipe).map((req) => {
      const catIng = ingredientCatalog.find((i) => i.id === req.entityId);
      const catTool = toolsCatalog.find((t: any) => t.id === req.entityId);
      return {
        ...req,
        icon: catIng?.icon || catTool?.icon || '📦',
        displayName: req.name || catIng?.name || catTool?.name || req.entityId,
      };
    });
  }, [activeRecipe]);

  // Clean up cooklang string for display
  const instructions = useMemo(() => {
    if (!activeRecipe) return [];

    // Check if the recipe has a cooklang string, otherwise use steps
    const cooklangStr = (activeRecipe as any).cooklang;
    if (cooklangStr) {
      // Split by newline and clean up the cooklang syntax
      return cooklangStr
        .split('\n')
        .filter((line: string) => line.trim().length > 0)
        .map((line: string) => {
          // Replace @ingredient{amount%unit} with "ingredient (amount unit)"
          // Simplified regex for @ingredient{amount%unit} or @ingredient
          let cleaned = line.replace(/@([a-zA-Z0-9_-]+)\{([^}]+)\}/g, (_match: string, name: string, qty: string) => {
             const cleanName = name.replace(/_/g, ' ');
             const cleanQty = qty.replace('%', ' ');
             return `${cleanName} (${cleanQty})`;
          });

          cleaned = cleaned.replace(/@([a-zA-Z0-9_-]+)/g, (_match: string, name: string) => {
            return name.replace(/_/g, ' ');
          });

          // Clean up ~timer{duration%unit}
          cleaned = cleaned.replace(/~([a-zA-Z0-9_-]*)\{([^}]+)\}/g, (_match: string, _name: string, duration: string) => {
             return duration.replace('%', ' ');
          });

          return cleaned;
        });
    }

    // Fallback to step instructions if no cooklang
    return activeRecipe.steps.map((step: any, idx) => {
       if (step.action === 'instruction') return step.text || step.instruction || `Step ${idx + 1}`;
       return `${step.action} ${step.target || step.ingredient || ''}`;
    });
  }, [activeRecipe]);

  if (!activeRecipe) return <div>No recipes available.</div>;

  return (
    <div className="cookbook-view">
      <div className="cookbook-selector">
        {recipes.map((r) => (
          <button
            key={r.id}
            type="button"
            className={`cookbook-tab ${r.id === selectedRecipeId ? 'active' : ''}`}
            onClick={() => setSelectedRecipeId(r.id)}
          >
            {r.id === 'concebolla' ? '🧅' : '🥔'} {r.name}
          </button>
        ))}
      </div>

      <div className="cookbook-card">
        <div className="cookbook-header">
          <h2 className="recipe-title">{activeRecipe.name}</h2>
          {/* Casting to any since these are optional metadata added in loader */}
          {(activeRecipe as any).description && (
            <p className="recipe-description">{(activeRecipe as any).description}</p>
          )}

          <div className="recipe-meta">
            {(activeRecipe as any).difficulty && (
              <span className="meta-badge difficulty">
                ⭐ {(activeRecipe as any).difficulty}
              </span>
            )}
            {(activeRecipe as any).tags && (activeRecipe as any).tags.map((tag: string) => (
              <span key={tag} className="meta-badge tag">🏷️ {tag}</span>
            ))}
          </div>
        </div>

        <div className="cookbook-body">
          <div className="ingredients-section">
            <h3>🛒 Ingredients</h3>
            <ul className="ingredients-list">
              {requirements.map((req, i) => (
                <li key={i} className="ingredient-item">
                  <span className="ingredient-icon">{req.icon}</span>
                  <div className="ingredient-details">
                    <span className="ingredient-name">{req.displayName}</span>
                    <span className="ingredient-amount">
                      {req.amount} {req.unit}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="instructions-section">
            <h3>🍳 Instructions</h3>
            <ol className="instructions-list">
              {instructions.map((step: string, idx: number) => (
                <li key={idx} className="instruction-step">
                  <span className="step-number">{idx + 1}</span>
                  <p className="step-text">{step}</p>
                </li>
              ))}
            </ol>

            {(activeRecipe as any).hints && (activeRecipe as any).hints.length > 0 && (
              <div className="recipe-hints">
                <h4>💡 Chef's Hints</h4>
                <ul>
                  {(activeRecipe as any).hints.map((hint: string, i: number) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
