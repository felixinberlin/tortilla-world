/**
 * FILE: src/components/Controls/SaveCustomRecipeModal.tsx
 *
 * PURPOSE:
 * Modal dialog for saving a recorded/forked recipe session with rich metadata inspired by francesa.json.
 * Prompts the user for recipe name, description, difficulty, tags, author, and cooking hints.
 */

import React, { useState } from 'react';
import type { CustomRecipeMetadata } from '../../services/customRecipeService';
import { exportSessionAsZip } from '../../utils/exporter';
import { worldStore } from '../../store/worldStore';
import './SaveCustomRecipeModal.scss';

interface SaveCustomRecipeModalProps {
  isOpen: boolean;
  initialBaseRecipeName?: string;
  initialDishName?: string;
  onSave: (metadata: CustomRecipeMetadata) => void;
  onClose: () => void;
}

export const SaveCustomRecipeModal: React.FC<SaveCustomRecipeModalProps> = ({
  isOpen,
  initialBaseRecipeName = 'Tortilla Francesa',
  initialDishName,
  onSave,
  onClose,
}) => {
  const defaultName = initialDishName || `${initialBaseRecipeName} (Mi Versión)`;
  const defaultDesc = `Receta personalizada inspirada en ${initialBaseRecipeName}.`;

  const [name, setName] = useState<string>(defaultName);
  const [description, setDescription] = useState<string>(defaultDesc);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [tagsInput, setTagsInput] = useState<string>('custom, traditional, spanish, francesa, vegetarian');
  const [author, setAuthor] = useState<string>('Chef Tortilla');
  const [hints, setHints] = useState<string>(
    'Mezcla los huevos en el bol con sal para hacer el Huevo batido.\nCocina a fuego medio en la sartén hasta dorar.'
  );

  const [prevDishName, setPrevDishName] = useState<string | undefined>(initialDishName);

  if (initialDishName !== prevDishName) {
    setPrevDishName(initialDishName);
    if (initialDishName) {
      setName(initialDishName);
    }
  }

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);

    const parsedHints = hints
      .split('\n')
      .map((h) => h.trim())
      .filter((h) => h.length > 0);

    onSave({
      name: name.trim() || 'Custom Tortilla',
      description: description.trim() || 'Receta de tortilla personalizada.',
      difficulty,
      tags: parsedTags.length > 0 ? parsedTags : ['custom', 'spanish', 'francesa'],
      author: author.trim() || 'Chef Tortilla',
      hints: parsedHints.length > 0 ? parsedHints : ['Servir bien caliente.'],
    });
  };

  return (
    <div className="save-recipe-modal-overlay" onClick={onClose}>
      <div className="save-recipe-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="save-recipe-modal-header">
          <div className="save-recipe-modal-icon">🍳</div>
          <div>
            <h3>Save Custom Recipe</h3>
            <p className="save-recipe-modal-subtitle">
              Save your recipe version with rich metadata (inspired by Tortilla Francesa)
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="save-recipe-modal-body">
          {/* Recipe Name */}
          <div className="form-group">
            <label htmlFor="recipe-name" className="form-label">
              <span>🏷️ Recipe Name / Title</span>
              <span className="required-star">*</span>
            </label>
            <input
              type="text"
              id="recipe-name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tortilla Francesa Especial con Queso"
              required
              autoFocus
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="recipe-desc" className="form-label">📝 Description (metadata inspired by francesa.json)</label>
            <textarea
              id="recipe-desc"
              className="form-textarea"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of your custom tortilla creation..."
            />
          </div>

          {/* Grid row for Difficulty and Author */}
          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="recipe-difficulty" className="form-label">⚡ Difficulty</label>
              <select
                id="recipe-difficulty"
                className="form-select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
              >
                <option value="easy">Easy (Fácil)</option>
                <option value="medium">Medium (Media)</option>
                <option value="hard">Hard (Avanzada)</option>
              </select>
            </div>

            <div className="form-group half">
              <label htmlFor="recipe-author" className="form-label">👨‍🍳 Author / Chef</label>
              <input
                type="text"
                id="recipe-author"
                className="form-input"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Chef Name"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="form-group">
            <label htmlFor="recipe-tags" className="form-label">🏷️ Tags (comma separated)</label>
            <input
              type="text"
              id="recipe-tags"
              className="form-input"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="traditional, spanish, francesa, quick, cheese"
            />
          </div>

          {/* Hints / Tips */}
          <div className="form-group">
            <label htmlFor="recipe-hints" className="form-label">💡 Cooking Hints & Tips (one per line)</label>
            <textarea
              id="recipe-hints"
              className="form-textarea"
              rows={2}
              value={hints}
              onChange={(e) => setHints(e.target.value)}
              placeholder="Add cooking tips or preparation notes..."
            />
          </div>

          {/* Actions */}
          <div className="save-recipe-modal-actions">
            <button
              type="button"
              className="save-modal-btn secondary"
              onClick={async () => {
                await exportSessionAsZip(worldStore.getState(), {
                  title: name.trim() || 'Custom Recipe',
                  author: author.trim() || 'Chef Tortilla',
                  description: description.trim() || 'Custom Tortilla Session',
                });
              }}
              title="Download entire session including replay log, world snapshot, and kitchen blueprint as a ZIP file"
            >
              📦 Download Full Session (ZIP)
            </button>
            <button type="button" className="save-modal-btn secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-modal-btn primary">
              💾 Save Custom Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
