import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from 'zustand';
import { recipes } from '../../data/catalog/recipes';
import { ingredients as ingredientCatalog } from '../../data/catalog/ingredients';
import { catalogTools as toolsCatalog } from '../../data/catalog/tools';
import { getRecipeRequirementsArray } from '../../types/Recipe';
import type { Recipe } from '../../types/Recipe';
import { useTranslation } from '../../i18n/useTranslation';
import { formatRecipeSteps } from '../../systems/recipeStepFormatter';
import { translateHumanActionsToRecipe } from '../../systems/recipeTranslator';
import { fetchAllRecipesFromDb } from '../../services/dbService';
import { worldStore } from '../../store/worldStore';
import './CookbookView.scss';

export const CookbookView: React.FC = () => {
  const { t, language } = useTranslation();
  const recordedActions = useStore(worldStore, (state) => state.recordedActions);
  const storeActiveRecipeId = useStore(worldStore, (state) => state.activeRecipeId);
  const storeActiveRecipeName = useStore(worldStore, (state) => state.activeRecipeName);

  const [dbRecipes, setDbRecipes] = useState<Recipe[]>([]);

  // Fetch saved DB recipes on mount
  useEffect(() => {
    let isMounted = true;
    fetchAllRecipesFromDb()
      .then((savedList) => {
        if (!isMounted || !savedList || savedList.length === 0) return;
        const parsed: Recipe[] = savedList.map((saved) => {
          if (saved.formats?.recipeJson && typeof saved.formats.recipeJson === 'object') {
            const rJson = saved.formats.recipeJson as unknown as Recipe;
            return {
              ...rJson,
              id: `db-${saved.id}`,
              name: saved.title || rJson.name || 'Saved Recipe',
            };
          }
          if (saved.formats?.mascotSequence && Array.isArray(saved.formats.mascotSequence)) {
            return translateHumanActionsToRecipe(saved.formats.mascotSequence, {
              recipeId: `db-${saved.id}`,
              recipeName: saved.title || 'Saved Recipe',
            });
          }
          return {
            id: `db-${saved.id}`,
            name: saved.title || 'Saved Recipe',
            requirements: (saved.ingredients || []).map((ing) => ({
              id: `req-${ing}`,
              entityId: ing,
              amount: 1,
              unit: 'unidad',
            })),
            steps: [],
          };
        });
        setDbRecipes(parsed);
      })
      .catch((err) => {
        console.warn('Failed to fetch DB recipes in CookbookView:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Translate recorded or loaded actions into a Recipe if available
  const recordedRecipe: Recipe | null = useMemo(() => {
    if (!recordedActions || recordedActions.length === 0) return null;
    return translateHumanActionsToRecipe(recordedActions, {
      recipeId: 'recording',
      recipeName: storeActiveRecipeName && storeActiveRecipeName !== 'Tortilla Española Clásica'
        ? storeActiveRecipeName
        : (t('recipes.recorded.name') && !t('recipes.recorded.name').startsWith('recipes.')
            ? t('recipes.recorded.name')
            : 'Receta Grabada / Cargada'),
    });
  }, [recordedActions, storeActiveRecipeName, t]);

  // Combine static catalog recipes, recorded/loaded recipe, and DB recipes
  const allRecipes = useMemo(() => {
    const list: Recipe[] = [...recipes];
    if (recordedRecipe) {
      list.push(recordedRecipe);
    }
    dbRecipes.forEach((dbR) => {
      if (!list.some((r) => r.id === dbR.id)) {
        list.push(dbR);
      }
    });
    return list;
  }, [recordedRecipe, dbRecipes]);

  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(() => {
    if (recordedRecipe && (storeActiveRecipeId === 'recording' || storeActiveRecipeId === 'recorded')) {
      return recordedRecipe.id;
    }
    return recipes[0]?.id || 'concebolla';
  });

  // Ensure activeRecipe resolves correctly
  const activeRecipe = useMemo(() => {
    const found = allRecipes.find((r) => r.id === selectedRecipeId);
    if (found) return found;
    if (recordedRecipe) return recordedRecipe;
    return allRecipes[0] || recipes[0];
  }, [allRecipes, selectedRecipeId, recordedRecipe]);

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

  // Dynamically format recipe steps into human-readable instructions
  const instructions = useMemo(() => {
    if (!activeRecipe) return [];
    if (activeRecipe.steps && activeRecipe.steps.length > 0) {
      return formatRecipeSteps(activeRecipe.steps, t, language);
    }

    // Check if the recipe has a cooklang string fallback
    const cooklangStr = (activeRecipe as Recipe & { cooklang?: string }).cooklang;
    if (cooklangStr) {
      return cooklangStr
        .split('\n')
        .filter((line: string) => line.trim().length > 0)
        .map((line: string) => {
          let cleaned = line.replace(/@([a-zA-Z0-9_-]+)\{([^}]+)\}/g, (_match: string, name: string, qty: string) => {
            const cleanName = name.replace(/_/g, ' ');
            const cleanQty = qty.replace('%', ' ');
            return `${cleanName} (${cleanQty})`;
          });
          cleaned = cleaned.replace(/@([a-zA-Z0-9_-]+)/g, (_match: string, name: string) => {
            return name.replace(/_/g, ' ');
          });
          cleaned = cleaned.replace(/~([a-zA-Z0-9_-]*)\{([^}]+)\}/g, (_match: string, _name: string, duration: string) => {
            return duration.replace('%', ' ');
          });
          return cleaned;
        });
    }

    return [];
  }, [activeRecipe, t, language]);

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

  const isRecordedOrLoaded = activeRecipe.id === 'recording' || activeRecipe.id.startsWith('db-');

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
    : (recipeMeta.description || (isRecordedOrLoaded ? (t('recipes.recorded.description') || 'Receta generada a partir de acciones grabadas o cargadas.') : ''));

  return (
    <div className="cookbook-view">
      <div className="cookbook-selector">
        {allRecipes.map((r) => {
          const isRec = r.id === 'recording' || r.id.startsWith('db-');
          const tName = t(`recipes.${r.id}.name`);
          const displayName = (tName && !tName.startsWith('recipes.')) ? tName : r.name;
          const icon = isRec ? '🎥' : r.id === 'concebolla' ? '🧅' : '🥔';

          return (
            <button
              key={r.id}
              type="button"
              className={`cookbook-tab ${r.id === activeRecipe.id ? 'active' : ''} ${isRec ? 'recorded-tab' : ''}`}
              onClick={() => {
                setSelectedRecipeId(r.id);
                worldStore.getState().setActiveRecipeId(r.id);
                worldStore.getState().setActiveRecipeName(r.name);
                if (!isRec) {
                  worldStore.getState().resetWorld();
                }
              }}
            >
              {icon} {displayName}
            </button>
          );
        })}
      </div>
      <div className="cookbook-card">
        <div className="cookbook-header">
          <h2 className="recipe-title">
            {recipeTitle}
            {isRecordedOrLoaded && (
              <span className="recorded-badge">🎬 {t('ui.recordedSession') || 'Grabada / Cargada'}</span>
            )}
          </h2>
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
            {isRecordedOrLoaded && (
              <span className="meta-badge tag custom-tag">🎥 Custom / Recorded</span>
            )}
          </div>
        </div>
        <div className="cookbook-body">
          <div className="ingredients-section">
            <h3>🛒 {t('ui.requiredMaterials')}</h3>
            {requirements.length > 0 ? (
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
            ) : (
              <p className="empty-notice">{t('ui.noIngredientsListed') || 'Sin ingredientes especificadas.'}</p>
            )}
          </div>
          <div className="instructions-section">
            <h3>🍳 {t('ui.instructions')}</h3>
            {instructions.length > 0 ? (
              <ol className="instructions-list">
                {instructions.map((step: string, idx: number) => (
                  <li key={idx} className="instruction-step">
                    <span className="step-number">{idx + 1}</span>
                    <p className="step-text">{step}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="empty-notice">{t('ui.noInstructionsListed') || 'Sin pasos registrados todavía.'}</p>
            )}
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
