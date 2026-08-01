import React, { useState, useMemo } from 'react';
import { recipes } from '../../data/catalog/recipes';
import { ingredients as ingredientCatalog } from '../../data/catalog/ingredients';
import { catalogTools as toolsCatalog } from '../../data/catalog/tools';
import { getRecipeRequirementsArray } from '../../types/Recipe';
import type { Recipe } from '../../types/Recipe';
import { useTranslation } from '../../i18n/useTranslation';
import { worldStore } from '../../store/worldStore';
import './CookbookView.scss';

export const CookbookView: React.FC = () => {
  const { t } = useTranslation();
  const [selectedRecipeId, setSelectedRecipeId] = useState(recipes[0]?.id);
  const activeRecipe = useMemo(
    () => recipes.find((r) => r.id === selectedRecipeId) || recipes[0],
    [selectedRecipeId]
  );

  const requirements = useMemo(() => {
    if (!activeRecipe) return [];
    return getRecipeRequirementsArray(activeRecipe).map((req) => {
      const catIng = ingredientCatalog.find((i) => i.id === req.entityId);
      const catTool = toolsCatalog.find((t) => t.id === req.entityId);
      const translatedIng = t(`ingredients.${req.entityId}`);
      const translatedTool = t(`tools.${req.entityId}`);

      let name = req.name || catIng?.name || catTool?.name || req.entityId;
      if (translatedIng && !translatedIng.startsWith('ingredients.')) {
        name = translatedIng;
      } else if (translatedTool && !translatedTool.startsWith('tools.')) {
        name = translatedTool;
      }

      return {
        ...req,
        icon: catIng?.icon || catTool?.icon || '📦',
        displayName: name,
      };
    });
  }, [activeRecipe, t]);

  // Instructions with fallback to cooklang/steps
  const instructions = useMemo(() => {
    if (!activeRecipe) return [];

    const translatedList: string[] = [];
    let i = 0;
    while (true) {
      const key = `recipes.${activeRecipe.id}.instructions.${i}`;
      const translated = t(key);
      if (!translated || translated === key || translated.startsWith('recipes.')) {
        break;
      }
      translatedList.push(translated);
      i++;
    }

    if (translatedList.length > 0) {
      return translatedList;
    }

    // Check if the recipe has a cooklang string, otherwise use steps
    const cooklangStr = (activeRecipe as Recipe & { cooklang?: string }).cooklang;
    if (cooklangStr) {
      // Split by newline and clean up the cooklang syntax
      return cooklangStr
        .split('\n')
        .filter((line: string) => line.trim().length > 0)
        .map((line: string) => {
          // Replace @ingredient{amount%unit} with "ingredient (amount unit)"
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
    return activeRecipe.steps.map((step, idx) => {
      const stepAny = step as Record<string, unknown>;
      if (step.action === 'instruction') return (stepAny.text as string) || (stepAny.instruction as string) || `Step ${idx + 1}`;
      const stepTarget = (stepAny.target as string) || (stepAny.ingredient as string) || '';
      return `${step.action} ${stepTarget}`;
    });
  }, [activeRecipe, t]);

  // Hints with translation lookup
  const hints = useMemo(() => {
    if (!activeRecipe) return [];
    const translatedList: string[] = [];
    let i = 0;
    while (true) {
      const key = `recipes.${activeRecipe.id}.hints.${i}`;
      const translated = t(key);
      if (!translated || translated === key || translated.startsWith('recipes.')) {
        break;
      }
      translatedList.push(translated);
      i++;
    }
    if (translatedList.length > 0) return translatedList;
    return (activeRecipe as Recipe & { hints?: string[] }).hints || [];
  }, [activeRecipe, t]);

  if (!activeRecipe) return <div>{t('ui.noRecipesAvailable')}</div>;

  const recipeMeta = activeRecipe as Recipe & {
    description?: string;
    difficulty?: string;
    tags?: string[];
  };

  const translatedTitle = t(`recipes.${activeRecipe.id}.name`);
  const recipeTitle = (translatedTitle && !translatedTitle.startsWith('recipes.'))
    ? translatedTitle
    : activeRecipe.name;

  const translatedDesc = t(`recipes.${activeRecipe.id}.description`);
  const recipeDesc = (translatedDesc && !translatedDesc.startsWith('recipes.'))
    ? translatedDesc
    : (recipeMeta.description || '');

  return (
    <div className="cookbook-view">
      <div className="cookbook-selector">
        {recipes.map((r) => {
          const tName = t(`recipes.${r.id}.name`);
          const displayName = (tName && !tName.startsWith('recipes.')) ? tName : r.name;
          return (
            <button
              key={r.id}
              type="button"
              className={`cookbook-tab ${r.id === selectedRecipeId ? 'active' : ''}`}
              onClick={() => {
                setSelectedRecipeId(r.id);
                worldStore.getState().setActiveRecipeId(r.id);
                worldStore.getState().setActiveRecipeName(r.name);
                worldStore.getState().resetWorld();
              }}
            >
              {r.id === 'concebolla' ? '🧅' : '🥔'} {displayName}
            </button>
          );
        })}
      </div>
      <div className="cookbook-card">
        <div className="cookbook-header">
          <h2 className="recipe-title">{recipeTitle}</h2>
          {recipeDesc && (
            <p className="recipe-description">{recipeDesc}</p>
          )}
          <div className="recipe-meta">
            {recipeMeta.difficulty && (
              <span className="meta-badge difficulty">
                ⭐ {recipeMeta.difficulty}
              </span>
            )}
            {recipeMeta.tags && recipeMeta.tags.map((tag: string) => (
              <span key={tag} className="meta-badge tag">🏷️ {tag}</span>
            ))}
          </div>
        </div>
        <div className="cookbook-body">
          <div className="ingredients-section">
            <h3>🛒 {t('ui.requiredMaterials')}</h3>
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
            <h3>🍳 {t('ui.instructions')}</h3>
            <ol className="instructions-list">
              {instructions.map((step: string, idx: number) => (
                <li key={idx} className="instruction-step">
                  <span className="step-number">{idx + 1}</span>
                  <p className="step-text">{step}</p>
                </li>
              ))}
            </ol>
            {hints.length > 0 && (
              <div className="recipe-hints">
                <h4>💡 {t('ui.chefsHints')}</h4>
                <ul>
                  {hints.map((hint: string, i: number) => (
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
