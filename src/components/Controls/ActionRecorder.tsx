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
import { eventStore } from '../../systems/EventStore';
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
  const dispatch = useStore(worldStore, (state) => state.dispatch);
  const isRecording = useStore(worldStore, (state) => state.isRecording);
  const recordedActions = useStore(worldStore, (state) => state.recordedActions);
  const usedIngredients = useStore(worldStore, (state) => state.usedIngredients);
  const initialRecordingState = useStore(worldStore, (state) => state.initialRecordingState);
  const startRecording = useStore(worldStore, (state) => state.startRecording);
  const stopRecording = useStore(worldStore, (state) => state.stopRecording);
  const clearRecording = useStore(worldStore, (state) => state.clearRecording);

  const [showTranslator, setShowTranslator] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'mascotActions' | 'recipeFile' | 'fullSessionLog'>('mascotActions');
  const [isPlayingTranslated, setIsPlayingTranslated] = useState<boolean>(false);

  // Sourced actions (either explicit recording or emitted eventStore events)
  const sourceActions = useMemo(() => {
    if (recordedActions.length > 0) return recordedActions;
    return eventStore.getEvents();
  }, [recordedActions]);

  // Translate actions to mascot actions sequence
  const translatedMascotActions = useMemo(() => {
    if (sourceActions.length === 0) return [];
    return translateHumanActionsToMascotActions(sourceActions);
  }, [sourceActions]);

  // Translate actions to declarative Recipe definition
  const translatedRecipe: Recipe | null = useMemo(() => {
    if (sourceActions.length === 0) return null;
    return translateHumanActionsToRecipe(sourceActions, {
      recipeName: 'Custom Translated Recipe',
    });
  }, [sourceActions]);

  // Full Session Log (zustand init -> actions/events -> zustand end)
  const fullSessionLogData = useMemo(() => {
    const currentState = worldStore.getState();
    return {
      version: '1.0.0',
      title: 'Tortilla World Action Session Log',
      recordedAt: new Date().toISOString(),
      zustandInit: initialRecordingState || {
        entities: currentState.entities,
        containers: currentState.containers,
      },
      actions: recordedActions.length > 0 ? recordedActions : eventStore.getEvents().map((e) => e.action),
      events: eventStore.getEvents(),
      zustandEnd: {
        entities: currentState.entities,
        containers: currentState.containers,
      },
      metadata: {
        actionCount: recordedActions.length,
        eventCount: eventStore.getEvents().length,
      },
    };
  }, [recordedActions, initialRecordingState]);

  // Download helper
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

  // Downloads
  const handleDownloadMascotActions = () => {
    if (translatedMascotActions.length === 0) return;
    downloadJSON(translatedMascotActions, 'mascot-actions-sequence.json');
  };

  const handleDownloadRecipe = () => {
    if (!translatedRecipe) return;
    downloadJSON(translatedRecipe, `${translatedRecipe.id || 'translated-recipe'}.json`);
  };

  const handleDownloadSessionLog = () => {
    downloadJSON(fullSessionLogData, 'tortilla-full-session-log.json');
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

  const hasActions = recordedActions.length > 0 || eventStore.getEvents().length > 0;

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
            Captured Actions: <strong>{recordedActions.length}</strong> | Events: <strong>{eventStore.getEvents().length}</strong>
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
          disabled={!hasActions}
          onClick={() => setShowTranslator(!showTranslator)}
          title="Translate human recorded actions into a mascot recipe with movement"
        >
          🪄 {showTranslator ? 'Hide Translator' : 'Translate / View Formats'}
        </button>

        <button
          type="button"
          className="rec-btn reset-kitchen-btn"
          onClick={() => dispatch({ type: 'RESET_WORLD' })}
          title="Clean the kitchen and reset all containers"
        >
          🔄 Reset Kitchen
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

      {showTranslator && hasActions && (
        <div className="translation-preview-panel">
          <div className="translation-header">
            <h4>🪄 Action Export Formats & Translator Preview</h4>
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
            <button
              type="button"
              className={`tab-btn ${activeTab === 'fullSessionLog' ? 'active' : ''}`}
              onClick={() => setActiveTab('fullSessionLog')}
            >
              💾 Full Session Log (zustand init / actions / end)
            </button>
          </div>

          <div className="translation-content">
            {activeTab === 'mascotActions' && (
              <pre>{JSON.stringify(translatedMascotActions, null, 2)}</pre>
            )}
            {activeTab === 'recipeFile' && (
              <pre>{JSON.stringify(translatedRecipe, null, 2)}</pre>
            )}
            {activeTab === 'fullSessionLog' && (
              <pre>{JSON.stringify(fullSessionLogData, null, 2)}</pre>
            )}
          </div>

          <div className="translation-actions">
            <button
              type="button"
              className="action-btn primary"
              onClick={handleReplayTranslatedMascotSequence}
              disabled={isPlayingTranslated || translatedMascotActions.length === 0}
            >
              {isPlayingTranslated ? '⏳ Replaying...' : '▶ Replay Mascot Sequence'}
            </button>

            <button type="button" className="action-btn" onClick={handleDownloadMascotActions}>
              🤖 Download Mascot Sequence (.json)
            </button>

            <button type="button" className="action-btn" onClick={handleDownloadRecipe}>
              📜 Download Recipe File (.json)
            </button>

            <button type="button" className="action-btn" onClick={handleDownloadSessionLog}>
              💾 Download Full Session Log (.json)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
