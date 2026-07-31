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

export const RecipeDatabaseModal: React.FC = () => {
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [mascotFilter, setMascotFilter] = useState<'all' | 'mascot' | 'autonomous'>('all');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activePlaybackId, setActivePlaybackId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const [selectedFormatPreview, setSelectedFormatPreview] = useState<SavedRecipe | null>(null);
  const [recipeToDelete, setRecipeToDelete] = useState<{ id: string; title: string } | null>(null);

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

  const downloadJSON = (data: unknown, filename: string) => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

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

  const handleDeleteRecipe = (id: string, title: string) => {
    setRecipeToDelete({ id, title });
  };

  const confirmDeleteRecipe = async () => {
    if (!recipeToDelete) return;
    const { id, title } = recipeToDelete;
    setRecipeToDelete(null);
    setStatusMessage(`Deleting "${title}" from Firestore...`);
    const success = await deleteRecipeFromDb(id);
    if (success) {
      setStatusMessage(`✅ Deleted "${title}" from Firestore.`);
      await refreshRecipes();
    } else {
      setStatusMessage(`❌ Failed to delete "${title}".`);
    }
    setTimeout(() => setStatusMessage(''), 3500);
  };

  return (
    <div className="recipe-database-container">
      {/* Header Banner */}
      <div className="db-header">
        <div className="db-title-area">
          <h2>🗄️ Firestore Recipe Database & Saved Games</h2>
          <p>Search, filter, and play recipes in multiple formats directly from Cloud Firestore.</p>
        </div>

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
            aria-label="Search recipes"
          />
          {searchQuery && (
            <button
              className="clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
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
            <div key={recipe.id} className="recipe-card compact-card">
              <div className="card-top-row">
                <div className="card-title-group">
                  <h3 className="card-title">{recipe.title}</h3>
                  <span className="card-author-date">by {recipe.author} • {new Date(recipe.updatedAt || recipe.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="card-top-actions">
                  <span className={`mascot-badge ${recipe.hasMascotSupport ? 'mascot' : 'autonomous'}`}>
                    {recipe.hasMascotSupport ? '🤖 Mascot' : '⚡ Auto'}
                  </span>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDeleteRecipe(recipe.id, recipe.title)}
                    title="Delete recipe from Firestore"
                    aria-label={`Delete recipe ${recipe.title}`}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {recipe.description && <p className="card-desc">{recipe.description}</p>}

              <div className="card-mid-row">
                <div className="ingredient-badges">
                  {recipe.ingredients?.map((ing) => (
                    <span key={ing} className="ing-badge">
                      {ing}
                    </span>
                  ))}
                </div>
                <div className="formats-available">
                  {recipe.formats?.recipeJson && <span className="fmt-pill">📜 JSON</span>}
                  {recipe.formats?.mascotSequence && <span className="fmt-pill">🤖 Mascot</span>}
                  {recipe.formats?.fullSessionLog && <span className="fmt-pill">💾 Log</span>}
                </div>
              </div>

              <div className="card-actions">
                <button
                  type="button"
                  className="play-btn mascot-play"
                  onClick={() => handlePlayRecipe(recipe, true)}
                  disabled={isPlaying}
                >
                  {isPlaying && activePlaybackId === recipe.id ? '▶️ Playing...' : '▶️ Play Mascot'}
                </button>

                <button
                  type="button"
                  className="play-btn auto-play"
                  onClick={() => handlePlayRecipe(recipe, false)}
                  disabled={isPlaying}
                >
                  ⚡ Play Alone
                </button>

                <button
                  type="button"
                  className="inspect-btn"
                  onClick={() => setSelectedFormatPreview(recipe)}
                  title="Inspect Formats & Download JSON"
                >
                  👁️ Formats
                </button>
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
              <button
                className="close-btn"
                onClick={() => setSelectedFormatPreview(null)}
                aria-label="Close format preview"
              >
                ✕
              </button>
            </div>

            <div className="inspector-body">
              <div className="format-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h4 style={{ margin: 0 }}>🤖 Mascot Action Sequence Format</h4>
                  {selectedFormatPreview.formats?.mascotSequence && (
                    <button
                      type="button"
                      className="db-btn"
                      style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                      onClick={() =>
                        downloadJSON(
                          selectedFormatPreview.formats.mascotSequence,
                          `${selectedFormatPreview.id}_mascot_sequence.json`
                        )
                      }
                    >
                      📥 Download (.json)
                    </button>
                  )}
                </div>
                <pre>{JSON.stringify(selectedFormatPreview.formats?.mascotSequence || [], null, 2)}</pre>
              </div>

              <div className="format-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h4 style={{ margin: 0 }}>📜 Declarative Recipe JSON Format</h4>
                  {selectedFormatPreview.formats?.recipeJson && (
                    <button
                      type="button"
                      className="db-btn"
                      style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                      onClick={() =>
                        downloadJSON(
                          selectedFormatPreview.formats.recipeJson,
                          `${selectedFormatPreview.id}_recipe.json`
                        )
                      }
                    >
                      📥 Download (.json)
                    </button>
                  )}
                </div>
                <pre>{JSON.stringify(selectedFormatPreview.formats?.recipeJson || {}, null, 2)}</pre>
              </div>

              <div className="format-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h4 style={{ margin: 0 }}>💾 Full Session Log Format</h4>
                  {selectedFormatPreview.formats?.fullSessionLog && (
                    <button
                      type="button"
                      className="db-btn"
                      style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                      onClick={() =>
                        downloadJSON(
                          selectedFormatPreview.formats.fullSessionLog,
                          `${selectedFormatPreview.id}_session_log.json`
                        )
                      }
                    >
                      📥 Download (.json)
                    </button>
                  )}
                </div>
                <pre>{JSON.stringify(selectedFormatPreview.formats?.fullSessionLog || {}, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Overlay Modal */}
      {recipeToDelete && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-modal">
            <h3>🗑️ Confirm Firestore Deletion</h3>
            <p>
              Are you sure you want to delete <strong>"{recipeToDelete.title}"</strong> from Cloud Firestore? This action cannot be undone.
            </p>
            <div className="confirm-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setRecipeToDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={confirmDeleteRecipe}
              >
                Yes, Delete Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
