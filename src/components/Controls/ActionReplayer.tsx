/**
 * FILE: ActionReplayer.tsx
 *
 * PURPOSE:
 * React UI component for uploading, validating, and playing back JSON action logs.
 *
 * RESPONSIBILITY:
 * - Handles JSON file loading via FileReader input.
 * - Validates JSON structure into WorldAction[].
 * - Controls playback execution using ActionPlayer.
 * - Displays active progress and stop/cancel controls during playback.
 */

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { actionPlayer } from '../../systems/actionPlayer';
import { worldStore } from '../../store/worldStore';
import { useStore } from 'zustand';
import { fetchAllRecipesFromDb, type SavedRecipe } from '../../services/dbService';
import type { WorldAction } from '../../types/actions';
import type { RecordedAction } from '../../types/recording';
import { detectRecipeFormat, getPlayableActionsFromFormat } from '../../utils/recipeFormatDetector';
import { extractUsedIngredientsFromActions } from '../../utils/sessionLogUtils';
import { TimelineScrubber } from './TimelineScrubber';
import './ActionReplayer.scss';

export interface ActionReplayerProps {
  /** Optional custom delay default in ms. Default: 300 */
  defaultDelayMs?: number;
  /** Optional class name override */
  className?: string;
  /** Whether to render secondary standalone playback buttons (step, play, speed). Default: false */
  showControls?: boolean;
  /** Callback fired when playback starts */
  onPlaybackStart?: () => void;
  /** Callback fired when playback completes */
  onPlaybackComplete?: () => void;
}

export const ActionReplayer: React.FC<ActionReplayerProps> = ({
  defaultDelayMs = 300,
  className = '',
  showControls = false,
  onPlaybackStart,
  onPlaybackComplete,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordedActions = useStore(worldStore, (state) => state.recordedActions);
  const currentActionIndex = useStore(worldStore, (state) => state.currentActionIndex ?? 0);
  const seekTo = useStore(worldStore, (state) => state.seekTo);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [delayMs, setDelayMs] = useState<number>(defaultDelayMs);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const [dbRecipes, setDbRecipes] = useState<SavedRecipe[]>([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('');

  const loadDbRecipes = useCallback(async () => {
    try {
      const recipes = await fetchAllRecipesFromDb();
      setDbRecipes(recipes);
    } catch (err) {
      console.warn('Failed to load DB recipes in ActionReplayer:', err);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetchAllRecipesFromDb()
      .then((recipes) => {
        if (active) setDbRecipes(recipes);
      })
      .catch((err) => {
        console.warn('Failed to load DB recipes in ActionReplayer:', err);
      });
    return () => {
      active = false;
    };
  }, []);

  const totalSteps = recordedActions.length;
  const effectiveCurrentStep = Math.min(currentActionIndex, totalSteps);

  const handleUploadClick = () => {
    setErrorMessage(null);
    setInfoMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleSelectDbRecipe = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const recipeId = e.target.value;
    setSelectedRecipeId(recipeId);
    if (!recipeId) return;

    const found = dbRecipes.find((r) => r.id === recipeId);
    if (!found) return;

    const detected = detectRecipeFormat(found);
    if (detected.type === 'unknown') {
      setErrorMessage(`Selected recipe "${found.title}" does not contain a recognized recipe format.`);
      setInfoMessage(null);
      return;
    }

    const playable = getPlayableActionsFromFormat(detected);
    if (playable.actions.length === 0) {
      setErrorMessage(`Selected recipe "${found.title}" does not contain valid playable actions.`);
      setInfoMessage(null);
      return;
    }

    const foundObj = found as unknown as Record<string, unknown>;
    const fullLog = (foundObj?.formats as Record<string, unknown>)?.fullSessionLog as Record<string, unknown> | undefined;
    const workspaceObj = (foundObj?.workspace || fullLog?.workspace) as Record<string, unknown> | undefined;
    const targetKitId = (workspaceObj?.kitId as string) || 'base';
    const targetPantryKitId = (workspaceObj?.pantryKitId as string) || undefined;
    const customContainers = workspaceObj?.containers as Record<string, import('../../types/world').Container> | undefined;

    worldStore.getState().resetWorld(
      targetKitId as import('../../types/workstations').WorkstationKitId,
      customContainers,
      targetPantryKitId
    );
    const extractedIngs = extractUsedIngredientsFromActions(playable.actions);
    worldStore.getState().setRecordedActions(playable.actions as unknown as RecordedAction[], extractedIngs);
    seekTo(0);
    window.dispatchEvent(new CustomEvent('select-recorded-session'));
    setErrorMessage(null);
    setInfoMessage(
      `Loaded "${found.title}" [Type: ${detected.typeLabel}] (${playable.actions.length} ${
        detected.type === 'declarative' ? 'converted steps' : 'actions'
      })`
    );
  };

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string;
          const parsed = JSON.parse(content);
          const detected = detectRecipeFormat(parsed);

          if (detected.type === 'unknown') {
            setErrorMessage('Invalid or unrecognized JSON recipe format.');
            setInfoMessage(null);
            return;
          }

          const playable = getPlayableActionsFromFormat(detected);
          if (playable.actions.length === 0) {
            setErrorMessage(`Uploaded file "${file.name}" contains no playable actions.`);
            setInfoMessage(null);
            return;
          }

          setErrorMessage(null);
          const parsedObj = parsed as unknown as Record<string, unknown>;
          const fileFullLog = parsedObj?.fullSessionLog as Record<string, unknown> | undefined;
          const fileWorkspaceObj = (parsedObj?.workspace || fileFullLog?.workspace) as Record<string, unknown> | undefined;
          const fileKitId = (fileWorkspaceObj?.kitId as string) || 'base';
          const filePantryKitId = (fileWorkspaceObj?.pantryKitId as string) || undefined;
          const fileContainers = fileWorkspaceObj?.containers as Record<string, import('../../types/world').Container> | undefined;

          worldStore.getState().resetWorld(
            fileKitId as import('../../types/workstations').WorkstationKitId,
            fileContainers,
            filePantryKitId
          );
          const extractedIngs = extractUsedIngredientsFromActions(playable.actions);
          worldStore.getState().setRecordedActions(playable.actions as unknown as RecordedAction[], extractedIngs);
          seekTo(0);
          window.dispatchEvent(new CustomEvent('select-recorded-session'));
          setInfoMessage(
            `Loaded "${file.name}" [Type: ${detected.typeLabel}] (${playable.actions.length} ${
              detected.type === 'declarative' ? 'converted steps' : 'actions'
            })`
          );
        } catch (err) {
          console.error('Failed to parse action log JSON:', err);
          setErrorMessage('Failed to read or parse JSON file.');
          setInfoMessage(null);
        }
      };

      reader.readAsText(file);
    },
    [seekTo]
  );

  const handlePlayAll = useCallback(async () => {
    if (recordedActions.length === 0) return;
    setIsPlaying(true);
    onPlaybackStart?.();

    const reset = currentActionIndex === 0;
    const remainingActions = recordedActions.slice(currentActionIndex) as unknown as WorldAction[];
    const startOffset = currentActionIndex;

    await actionPlayer.playLog(remainingActions, {
      delayMs,
      resetWorld: reset,
      onStep: (curr) => {
        seekTo(startOffset + curr);
      },
      onComplete: () => {
        setIsPlaying(false);
        onPlaybackComplete?.();
      },
      onStop: () => {
        setIsPlaying(false);
      },
    });
  }, [recordedActions, currentActionIndex, delayMs, onPlaybackStart, onPlaybackComplete, seekTo]);

  const handleStop = () => {
    actionPlayer.stop();
    setIsPlaying(false);
  };

  const handleStepForward = useCallback(() => {
    if (currentActionIndex < recordedActions.length) {
      seekTo(currentActionIndex + 1);
    }
  }, [currentActionIndex, recordedActions.length, seekTo]);

  const handleStepBack = useCallback(() => {
    if (currentActionIndex > 0) {
      seekTo(currentActionIndex - 1);
    }
  }, [currentActionIndex, seekTo]);

  const handleResetSteps = useCallback(() => {
    seekTo(0);
  }, [seekTo]);

  const percent = totalSteps > 0 ? Math.round((effectiveCurrentStep / totalSteps) * 100) : 0;

  return (
    <div className={`action-replayer ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="file-input-hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        className="replayer-btn load-btn"
        onClick={handleUploadClick}
        title="Upload and replay a recorded action log JSON file"
      >
        📂 Load Log (.json)
      </button>

      {dbRecipes.length > 0 && (
        <select
          className="db-recipe-select"
          value={selectedRecipeId}
          onChange={handleSelectDbRecipe}
          onFocus={loadDbRecipes}
          title="Select and load a saved recipe from Cloud Firestore"
          style={{
            padding: '6px 10px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '0.85rem',
            backgroundColor: '#ffffff',
            color: '#0f172a',
            fontWeight: 500,
            cursor: 'pointer',
            maxWidth: '220px',
          }}
        >
          <option value="">🗄️ Select DB Recipe...</option>
          {dbRecipes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.title} ({r.ingredients?.join(', ') || 'recipe'})
            </option>
          ))}
        </select>
      )}

      {showControls && (
        <div className="vcr-dock">
          <div className="vcr-controls-row">
            {!isPlaying ? (
              <div className="step-controls-group">
                <button
                  type="button"
                  className="replayer-btn step-btn"
                  onClick={handleStepBack}
                  disabled={effectiveCurrentStep === 0}
                  title="Step back to previous recorded action (Rewind)"
                  aria-label="Rewind"
                >
                  ⏮️
                </button>

                <button
                  type="button"
                  className="replayer-btn play-btn"
                  onClick={handlePlayAll}
                  disabled={totalSteps === 0 || effectiveCurrentStep >= totalSteps}
                  title="Play all recorded actions"
                  aria-label="Play"
                >
                  ▶️ Play
                </button>

                <button
                  type="button"
                  className="replayer-btn step-btn step-forward-btn"
                  onClick={handleStepForward}
                  disabled={totalSteps === 0 || effectiveCurrentStep >= totalSteps}
                  title="Step forward to next recorded action (Fast-Forward)"
                  aria-label="Fast Forward"
                >
                  ⏭️
                </button>

                <button
                  type="button"
                  className="replayer-btn reset-btn"
                  onClick={handleResetSteps}
                  disabled={totalSteps === 0}
                  title="Reset world state to initial step 0"
                  aria-label="Reset"
                >
                  🔄 Reset
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="replayer-btn stop-btn"
                onClick={handleStop}
                title="Stop action playback"
                aria-label="Pause"
              >
                ⏸ Pause
              </button>
            )}

            {!isPlaying && (
              <select
                className="delay-select"
                value={delayMs}
                onChange={(e) => setDelayMs(Number(e.target.value))}
                title="Playback speed step delay"
              >
                <option value={100}>⚡ 100ms</option>
                <option value={300}>⏱️ 300ms</option>
                <option value={600}>🐢 600ms</option>
              </select>
            )}

            {totalSteps > 0 && (
              <div className="playback-status">
                <span>
                  Step {effectiveCurrentStep} / {totalSteps}
                </span>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
                </div>
              </div>
            )}
          </div>

          <div className="vcr-scrubber-row">
            <TimelineScrubber disabled={isPlaying} />
          </div>
        </div>
      )}

      {infoMessage && <span className="info-message" style={{ color: '#0d9488', fontSize: '0.8rem', fontWeight: 600 }}>{infoMessage}</span>}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};
