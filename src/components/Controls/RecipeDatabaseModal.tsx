/**
 * FILE: src/components/Controls/RecipeDatabaseModal.tsx
 *
 * PURPOSE:
 * Firestore Database Recipe Hub for Tortilla World.
 *
 * RESPONSIBILITY:
 * - Allows searching recipes in Firestore by ingredients (e.g. Garlic, Egg, Potato), tags, and text.
 * - Filters recipes by Ms. Tortilla Mascot support or Autonomous direct playback.
 * - Plays recipes in world state with or without Mascot.
 * - Saves current recorded session into Firestore in 3 structured formats.
 * - Seeds default recipes, ingredients, and tools into Firestore.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import {
  searchRecipesInDb,
  deleteRecipeFromDb,
  seedDefaultRecipesInDb,
  seedDefaultToolsInDb,
  seedDefaultIngredientsInDb,
  seedDefaultKitchenConfigInDb,
} from '../../services/dbService';
import type { SavedRecipe } from '../../services/dbService';
import { RecipeRunner } from '../../systems/recipeRunner';
import type { Recipe } from '../../types/Recipe';
import './RecipeDatabaseModal.scss';

const POPULAR_INGREDIENTS = [
  { id: 'garlic', name: 'Garlic 🧄' },
  { id: 'egg', name: 'Eggs 🥚' },
  { id: 'potato', name: 'Potatoes 🥔' },
  { id: 'onion', name: 'Onion 🧅' },
  { id: 'oil', name: 'Olive Oil 🫒' },
  { id: 'chorizo', name: 'Chorizo 🌭' },
  { id: 'salt', name: 'Salt 🧂' },
  { id: 'cheese', name: 'Cheese 🧀' },
  { id: 'tomato', name: 'Tomato 🍅' },
];

import { useDevMode } from '../../utils/devMode';

export const RecipeDatabaseModal: React.FC = () => {
  const isDev = useDevMode();
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [mascotFilter, setMascotFilter] = useState<'all' | 'mascot' | 'autonomous'>('all');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activePlaybackId, setActivePlaybackId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const [selectedFormatPreview, setSelectedFormatPreview] = useState<SavedRecipe | null>(null);

  const dispatch = useStore(worldStore, (state) => state.dispatch);

  useEffect(() => {
    let ignore = false;

    Promise.resolve().then(() => {
      if (!ignore) setLoading(true);
    });

    const ingredientQuery = selectedIngredients.length > 0 ? selectedIngredients : undefined;
    const mascotBool =
      mascotFilter === 'mascot' ? true : mascotFilter === 'autonomous' ? false : undefined;

    searchRecipesInDb({
      ingredientQuery,
      hasMascotSupport: mascotBool,
      searchTerm: searchQuery.trim() || undefined,
    })
      .then((data) => {
        if (!ignore) {
          setRecipes(data);
        }
      })
      .catch((err) => {
        console.warn('Error loading Firestore recipes:', err);
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [searchQuery, selectedIngredients, mascotFilter]);

  const refreshRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const ingredientQuery = selectedIngredients.length > 0 ? selectedIngredients : undefined;
      const mascotBool =
        mascotFilter === 'mascot' ? true : mascotFilter === 'autonomous' ? false : undefined;

      const data = await searchRecipesInDb({
        ingredientQuery,
        hasMascotSupport: mascotBool,
        searchTerm: searchQuery.trim() || undefined,
      });

      setRecipes(data);
    } catch (err) {
      console.warn('Error loading Firestore recipes:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedIngredients, mascotFilter]);

  const toggleIngredientFilter = (ingId: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingId) ? prev.filter((i) => i !== ingId) : [...prev, ingId]
    );
  };

  const handleSeedDefaults = async () => {
    setLoading(true);
    setStatusMessage('Seeding default recipes, tools, and ingredients to Firestore...');
    try {
      await Promise.all([
        seedDefaultRecipesInDb(),
        seedDefaultToolsInDb(),
        seedDefaultIngredientsInDb(),
        seedDefaultKitchenConfigInDb(),
      ]);
      setStatusMessage('✅ Firestore database seeded successfully!');
      await refreshRecipes();
    } catch (err) {
      setStatusMessage('❌ Seeding failed. Check console.');
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMessage(''), 4000);
    }
  };

  const handlePlayRecipe = async (savedRecipe: SavedRecipe, withMascot: boolean) => {
    setIsPlaying(true);
    setActivePlaybackId(savedRecipe.id);
    setStatusMessage(
      `Playing "${savedRecipe.title}" ${withMascot ? 'with Ms. Tortilla Mascot 🤖' : 'Autonomously ⚡'}...`
    );

    try {
      dispatch({ type: 'RESET_WORLD' });
      await new Promise((res) => setTimeout(res, 400));

      const runner = new RecipeRunner({
        delayMs: withMascot ? 500 : 350,
      });

      const recipeObj = savedRecipe.formats?.recipeJson as unknown as Recipe;

      if (recipeObj && recipeObj.steps) {
        if (!withMascot) {
          // Autonomous direct playback: override runner to skip mascot animations and move directly
          runner.useMascot = false;
        }
        await runner.runRecipe(recipeObj);
        setStatusMessage(`✅ Finished playing "${savedRecipe.title}"!`);
      } else {
        setStatusMessage(`⚠️ Recipe JSON format missing in database object.`);
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Unknown error';
      setStatusMessage(`❌ Execution error: ${errMsg}`);
      console.error(err);
    } finally {
      setIsPlaying(false);
      setActivePlaybackId(null);
    }
  };

  const handleDeleteRecipe = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}" from Firestore?`)) {
      await deleteRecipeFromDb(id);
      setStatusMessage(`Deleted "${title}".`);
      await refreshRecipes();
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  return (
    <div className="recipe-database-container">
      {/* Header Banner */}
      <div className="db-header">
        <div className="db-title-area">
          <h2>🗄️ Firestore Recipe Database & Saved Games</h2>
          <p>Search, filter, and play recipes in multiple formats directly from Cloud Firestore.</p>
        </div>

        {isDev && (
          <div className="db-header-actions">
            <button
              type="button"
              className="db-btn btn-seed"
              onClick={handleSeedDefaults}
              disabled={loading}
            >
              🌱 Seed Catalog to DB
            </button>
          </div>
        )}
      </div>

      {statusMessage && <div className="db-status-banner">{statusMessage}</div>}

      {/* Search and Filters Bar */}
      <div className="db-filters-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search recipes by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" aria-label="Clear search" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>

        {/* Mascot Support Selector */}
        <div className="mascot-filter-group">
          <label>Mascot Mode:</label>
          <button
            type="button"
            className={`filter-tab ${mascotFilter === 'all' ? 'active' : ''}`}
            onClick={() => setMascotFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`filter-tab ${mascotFilter === 'mascot' ? 'active' : ''}`}
            onClick={() => setMascotFilter('mascot')}
          >
            🤖 With Mascot
          </button>
          <button
            type="button"
            className={`filter-tab ${mascotFilter === 'autonomous' ? 'active' : ''}`}
            onClick={() => setMascotFilter('autonomous')}
          >
            ⚡ Autonomous Only
          </button>
        </div>
      </div>

      {/* Ingredient Index Search Chips */}
      <div className="ingredient-chips-area">
        <span className="chips-label">Search by Ingredient Index:</span>
        <div className="chips-list">
          {POPULAR_INGREDIENTS.map((ing) => {
            const isSelected = selectedIngredients.includes(ing.id);
            return (
              <button
                key={ing.id}
                type="button"
                className={`ingredient-chip ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleIngredientFilter(ing.id)}
              >
                {ing.name} {isSelected ? '✓' : ''}
              </button>
            );
          })}
          {selectedIngredients.length > 0 && (
            <button
              type="button"
              className="clear-ingredients-btn"
              onClick={() => setSelectedIngredients([])}
            >
              Clear Ingredients ({selectedIngredients.length})
            </button>
          )}
        </div>
      </div>

      {/* Recipes List Grid */}
      <div className="recipes-grid">
        {loading ? (
          <div className="loading-state">⏳ Loading Firestore database records...</div>
        ) : recipes.length === 0 ? (
          <div className="empty-state">
            <p>No recipes found matching your query filters.</p>
            <button type="button" className="db-btn btn-seed" onClick={handleSeedDefaults}>
              🌱 Seed Default Recipes into Firestore
            </button>
          </div>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="card-header">
                <h3 className="card-title">{recipe.title}</h3>
                <span className={`mascot-badge ${recipe.hasMascotSupport ? 'mascot' : 'autonomous'}`}>
                  {recipe.hasMascotSupport ? '🤖 Mascot Compatible' : '⚡ Autonomous Direct'}
                </span>
              </div>

              <p className="card-desc">{recipe.description}</p>

              <div className="card-meta">
                <span className="author-tag">By {recipe.author}</span>
                <span className="date-tag">
                  {new Date(recipe.updatedAt || recipe.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Ingredient Index Badges */}
              <div className="ingredient-badges">
                {recipe.ingredients?.map((ing) => (
                  <span key={ing} className="ing-badge">
                    {ing}
                  </span>
                ))}
              </div>

              {/* Tags */}
              <div className="card-tags">
                {recipe.tags?.map((t) => (
                  <span key={t} className="tag-pill">
                    #{t}
                  </span>
                ))}
              </div>

              {/* Format Availability Indicators */}
              {isDev && (
                <div className="formats-available">
                  <span>Formats:</span>
                  {recipe.formats?.recipeJson && <span className="fmt-pill">📜 Recipe JSON</span>}
                  {recipe.formats?.mascotSequence && <span className="fmt-pill">🤖 Mascot Steps</span>}
                  {recipe.formats?.fullSessionLog && <span className="fmt-pill">💾 Session Log</span>}
                </div>
              )}

              {/* Card Actions */}
              <div className="card-actions">
                <button
                  type="button"
                  className="play-btn mascot-play"
                  onClick={() => handlePlayRecipe(recipe, true)}
                  disabled={isPlaying}
                >
                  {isPlaying && activePlaybackId === recipe.id ? '▶️ Playing...' : '▶️ Play with Mascot 🤖'}
                </button>

                <button
                  type="button"
                  className="play-btn auto-play"
                  onClick={() => handlePlayRecipe(recipe, false)}
                  disabled={isPlaying}
                >
                  ⚡ Play Alone
                </button>

                {isDev && (
                  <>
                    <button
                      type="button"
                      className="inspect-btn"
                      onClick={() => setSelectedFormatPreview(recipe)}
                    >
                      👁️ Inspect Formats
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      aria-label={`Delete recipe ${recipe.title}`}
                      onClick={() => handleDeleteRecipe(recipe.id, recipe.title)}
                    >
                      🗑️
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Format Inspector Modal */}
      {selectedFormatPreview && (
        <div className="format-inspector-overlay" onClick={() => setSelectedFormatPreview(null)}>
          <div className="format-inspector-content" onClick={(e) => e.stopPropagation()}>
            <div className="inspector-header">
              <h3>📜 Multi-Format Export Preview: {selectedFormatPreview.title}</h3>
              <button className="close-btn" aria-label="Close format preview" onClick={() => setSelectedFormatPreview(null)}>
                ✕
              </button>
            </div>

            <div className="inspector-body">
              <div className="format-section">
                <h4>🤖 Mascot Action Sequence Format</h4>
                <pre>{JSON.stringify(selectedFormatPreview.formats?.mascotSequence || [], null, 2)}</pre>
              </div>

              <div className="format-section">
                <h4>📜 Declarative Recipe JSON Format</h4>
                <pre>{JSON.stringify(selectedFormatPreview.formats?.recipeJson || {}, null, 2)}</pre>
              </div>

              <div className="format-section">
                <h4>💾 Full Session Log Format</h4>
                <pre>{JSON.stringify(selectedFormatPreview.formats?.fullSessionLog || {}, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
