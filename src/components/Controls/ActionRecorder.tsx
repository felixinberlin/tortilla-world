/**
 * FILE: ActionRecorder.tsx
 *
 * PURPOSE:
 * Dedicated UI panel component for recording human kitchen actions, inspecting logs,
 * and translating human actions into mascot-guided recipes.
 */

import React, { useState, useMemo } from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { ActionReplayer } from './ActionReplayer';
import { actionPlayer } from '../../systems/actionPlayer';
import {
  translateHumanActionsToMascotActions,
  translateHumanActionsToRecipe,
} from '../../systems/recipeTranslator';
import type { Recipe } from '../../types/Recipe';
import type { WorldAction } from '../../types/actions';
import './ActionRecorder.scss';

export const ActionRecorder: React.FC = () => {
  const isRecording = useStore(worldStore, (state) => state.isRecording);
  const recordedActions = useStore(worldStore, (state) => state.recordedActions);
  const usedIngredients = useStore(worldStore, (state) => state.usedIngredients);
  const startRecording = useStore(worldStore, (state) => state.startRecording);
  const stopRecording = useStore(worldStore, (state) => state.stopRecording);
  const clearRecording = useStore(worldStore, (state) => state.clearRecording);

  const [showTranslator, setShowTranslator] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'mascotActions' | 'recipeFile'>('mascotActions');
  const [isPlayingTranslated, setIsPlayingTranslated] = useState<boolean>(false);

  // Translate human actions to mascot actions sequence
  const translatedMascotActions = useMemo(() => {
    if (recordedActions.length === 0) return [];
    return translateHumanActionsToMascotActions(recordedActions);
  }, [recordedActions]);

  // Translate human actions to declarative Recipe definition
  const translatedRecipe: Recipe | null = useMemo(() => {
    if (recordedActions.length === 0) return null;
    return translateHumanActionsToRecipe(recordedActions, {
      recipeName: 'Custom Translated Recipe',
    });
  }, [recordedActions]);

  // Handle downloading translated recipe JSON
  const handleDownloadRecipe = () => {
    if (!translatedRecipe) return;
    const jsonStr = JSON.stringify(translatedRecipe, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${translatedRecipe.id || 'translated-recipe'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle replaying translated mascot action sequence
  const handleReplayTranslatedMascotSequence = async () => {
    if (translatedMascotActions.length === 0) return;
    setIsPlayingTranslated(true);

    await actionPlayer.playLog(translatedMascotActions as unknown as WorldAction[], {
      delayMs: 300,
      resetWorld: true,
      onComplete: () => setIsPlayingTranslated(false),
      onStop: () => setIsPlayingTranslated(false),
    });
  };

  return (
    <div className="action-recorder-container">
      <div className="recorder-header">
        <div>
          <div className="recorder-title">
            <span>🎥 Action Recording & Translator</span>
          </div>
          <div className="recorder-subtitle">
            Record live human interactions, replay logs, or translate actions into a mascot recipe.
          </div>
        </div>

        <div className="recorder-status">
          <span className="badge">
            Captured Actions: <strong>{recordedActions.length}</strong>
          </span>
        </div>
      </div>

      <div className="recorder-actions-bar">
        {!isRecording ? (
          <button
            type="button"
            className="rec-btn start-rec"
            onClick={startRecording}
            title="Start recording live kitchen interactions"
          >
            🔴 Start Recording
          </button>
        ) : (
          <button
            type="button"
            className="rec-btn stop-rec"
            onClick={stopRecording}
            title="Stop recording"
          >
            ⏹ Stop Recording ({recordedActions.length})
          </button>
        )}

        {recordedActions.length > 0 && (
          <button
            type="button"
            className="rec-btn"
            onClick={clearRecording}
            title="Clear current recorded actions log"
          >
            🗑 Clear Log
          </button>
        )}

        <button
          type="button"
          className="rec-btn translate-btn"
          disabled={recordedActions.length === 0}
          onClick={() => setShowTranslator(!showTranslator)}
          title="Translate human recorded actions into a mascot recipe with movement"
        >
          🪄 {showTranslator ? 'Hide Translator' : 'Translate to Mascot Recipe'}
        </button>

        <ActionReplayer defaultDelayMs={300} />
      </div>

      <div className="used-ingredients-bar">
        <span className="bar-label">🛒 Saved Ingredients ({usedIngredients.length}):</span>
        {usedIngredients.length === 0 ? (
          <span className="no-ingredients-hint">
            No ingredients used yet. Drag items from the right panel into the kitchen.
          </span>
        ) : (
          <div className="chips-list">
            {usedIngredients.map((ing) => (
              <span key={ing.id} className="ingredient-chip">
                {ing.icon} {ing.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {showTranslator && translatedRecipe && (
        <div className="translation-preview-panel">
          <div className="translation-header">
            <h4>🪄 Translated Mascot Recipe Preview</h4>
          </div>

          <div className="translation-tabs">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'mascotActions' ? 'active' : ''}`}
              onClick={() => setActiveTab('mascotActions')}
            >
              🤖 Mascot Action Sequence ({translatedMascotActions.length} steps)
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'recipeFile' ? 'active' : ''}`}
              onClick={() => setActiveTab('recipeFile')}
            >
              📜 Declarative Recipe File (.json)
            </button>
          </div>

          <div className="translation-content">
            {activeTab === 'mascotActions' ? (
              <pre>{JSON.stringify(translatedMascotActions, null, 2)}</pre>
            ) : (
              <pre>{JSON.stringify(translatedRecipe, null, 2)}</pre>
            )}
          </div>

          <div className="translation-actions">
            <button
              type="button"
              className="action-btn primary"
              onClick={handleReplayTranslatedMascotSequence}
              disabled={isPlayingTranslated}
            >
              {isPlayingTranslated ? '⏳ Replaying...' : '▶ Replay Translated Mascot Sequence'}
            </button>

            <button type="button" className="action-btn" onClick={handleDownloadRecipe}>
              💾 Download Translated Recipe File (.json)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
