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
import { saveRecipeToDb } from '../../services/dbService';
import type { Recipe } from '../../types/Recipe';
import type { WorldAction } from '../../types/actions';
import './ActionRecorder.scss';

import { useDevMode } from '../../utils/devMode';

export const ActionRecorder: React.FC = () => {
  const isDev = useDevMode();
  const dispatch = useStore(worldStore, (state) => state.dispatch);
  const isRecording = useStore(worldStore, (state) => state.isRecording);
  const recordedActions = useStore(worldStore, (state) => state.recordedActions);
  const usedIngredients = useStore(worldStore, (state) => state.usedIngredients);
  const initialRecordingState = useStore(worldStore, (state) => state.initialRecordingState);
  const startRecording = useStore(worldStore, (state) => state.startRecording);
  const stopRecording = useStore(worldStore, (state) => state.stopRecording);
  const clearRecording = useStore(worldStore, (state) => state.clearRecording);

  const [showTranslator, setShowTranslator] = useState<boolean>(false);
  const [showSaveForm, setShowSaveForm] = useState<boolean>(false);
  const [saveTitle, setSaveTitle] = useState<string>('Mi Tortilla de Patatas');
  const [saveAuthor, setSaveAuthor] = useState<string>('Chef Tortilla');
  const [saveDesc, setSaveDesc] = useState<string>('Custom recorded session from Tortilla World.');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>('');
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

  const handleSaveToDatabase = async () => {
    if (!saveTitle.trim()) {
      alert('Please enter a recipe title.');
      return;
    }

    setIsSaving(true);
    setSaveStatus('');
    try {
      const state = worldStore.getState();
      const rawActions =
        state.recordedActions.length > 0
          ? state.recordedActions
          : eventStore.getEvents().map((e) => e.action);

      const recipeJson = translateHumanActionsToRecipe(rawActions, {
        recipeName: saveTitle.trim(),
      });
      const mascotSeq = translateHumanActionsToMascotActions(rawActions);

      const detectedIngredients = Array.from(
        new Set(
          Object.values(state.entities)
            .filter((e) => e.type === 'ingredient')
            .map((e) => e.ingredientId || e.id)
        )
      );

      await saveRecipeToDb({
        title: saveTitle.trim(),
        description: saveDesc.trim() || 'Recorded recipe session from Tortilla World.',
        author: saveAuthor.trim() || 'Chef Tortilla',
        ingredients: detectedIngredients.length > 0 ? detectedIngredients : ['egg', 'potato'],
        tags: ['recorded', 'custom'],
        hasMascotSupport: mascotSeq.length > 0,
        formats: {
          mascotSequence: mascotSeq as unknown as Array<Record<string, unknown>>,
          recipeJson: recipeJson as unknown as Record<string, unknown>,
          fullSessionLog: fullSessionLogData as unknown as Record<string, unknown>,
        },
      });

      setSaveStatus('✅ Recipe successfully saved to Cloud Firestore! You can play it anytime in the Recipe Catalog.');
      setTimeout(() => {
        setShowSaveForm(false);
        setSaveStatus('');
      }, 4000);
    } catch (err) {
      console.error('Error saving recipe:', err);
      setSaveStatus(`❌ Error saving: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsSaving(false);
    }
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
          <>
            <button
              type="button"
              className="rec-btn save-db-btn"
              onClick={() => setShowSaveForm(!showSaveForm)}
              style={{
                backgroundColor: showSaveForm ? '#0284c7' : '#0ea5e9',
                color: '#ffffff',
                fontWeight: 600,
              }}
              title="Save this recorded session directly to Cloud Firestore recipe database"
            >
              💾 {showSaveForm ? 'Cancel Save' : 'Save Recipe to DB'}
            </button>

            <button
              type="button"
              className="rec-btn"
              onClick={clearRecording}
              title="Clear current recorded actions log"
            >
              🗑 Clear Log
            </button>
          </>
        )}

        {isDev && (
          <button
            type="button"
            className="rec-btn translate-btn"
            disabled={!hasActions}
            onClick={() => setShowTranslator(!showTranslator)}
            title="Translate human recorded actions into a mascot recipe with movement"
          >
            🪄 {showTranslator ? 'Hide Translator' : 'Translate / View Formats'}
          </button>
        )}

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

      {showSaveForm && (
        <div
          className="save-db-card-panel"
          style={{
            margin: '12px 0',
            padding: '16px',
            borderRadius: '12px',
            backgroundColor: '#f8fafc',
            border: '1px solid #cbd5e1',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>
              💾 Save Recorded Recipe to Firestore
            </h4>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Recorded Actions: <strong>{recordedActions.length}</strong>
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Recipe Title *
              </label>
              <input
                type="text"
                value={saveTitle}
                onChange={(e) => setSaveTitle(e.target.value)}
                placeholder="e.g. Tortilla de Patatas Tradicional"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Author
              </label>
              <input
                type="text"
                value={saveAuthor}
                onChange={(e) => setSaveAuthor(e.target.value)}
                placeholder="Chef Name"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Description
            </label>
            <input
              type="text"
              value={saveDesc}
              onChange={(e) => setSaveDesc(e.target.value)}
              placeholder="Brief description of this recipe technique..."
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.9rem',
              }}
            />
          </div>

          {saveStatus && (
            <div
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                backgroundColor: saveStatus.startsWith('✅') ? '#f0fdf4' : '#fef2f2',
                border: `1px solid ${saveStatus.startsWith('✅') ? '#bbf7d0' : '#fecaca'}`,
                color: saveStatus.startsWith('✅') ? '#166534' : '#991b1b',
                fontSize: '0.85rem',
                marginBottom: '12px',
              }}
            >
              {saveStatus}
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowSaveForm(false)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveToDatabase}
              disabled={isSaving || !saveTitle.trim()}
              style={{
                padding: '8px 20px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#16a34a',
                color: '#ffffff',
                fontWeight: 600,
                cursor: isSaving ? 'wait' : 'pointer',
                fontSize: '0.85rem',
              }}
            >
              {isSaving ? '⏳ Saving to Firestore...' : '💾 Save to Database'}
            </button>
          </div>
        </div>
      )}

      {isDev && showTranslator && hasActions && (
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
