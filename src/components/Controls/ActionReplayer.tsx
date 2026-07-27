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

import React, { useRef, useState, useCallback } from 'react';
import { actionPlayer } from '../../systems/actionPlayer';
import { worldStore } from '../../store/worldStore';
import { useStore } from 'zustand';
import type { WorldAction } from '../../types/actions';
import type { RecordedAction } from '../../types/recording';
import './ActionReplayer.scss';

export interface ActionReplayerProps {
  /** Optional custom delay default in ms. Default: 300 */
  defaultDelayMs?: number;
  /** Optional class name override */
  className?: string;
  /** Callback fired when playback starts */
  onPlaybackStart?: () => void;
  /** Callback fired when playback completes */
  onPlaybackComplete?: () => void;
}

export const ActionReplayer: React.FC<ActionReplayerProps> = ({
  defaultDelayMs = 300,
  className = '',
  onPlaybackStart,
  onPlaybackComplete,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordedActions = useStore(worldStore, (state) => state.recordedActions);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [delayMs, setDelayMs] = useState<number>(defaultDelayMs);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalSteps = recordedActions.length;
  const effectiveCurrentStep = Math.min(currentStep, totalSteps);

  const handleUploadClick = () => {
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const validateActions = (parsed: unknown): WorldAction[] | null => {
    let actionArray: unknown[] | null = null;

    if (Array.isArray(parsed)) {
      actionArray = parsed;
    } else if (parsed && typeof parsed === 'object') {
      const obj = parsed as Record<string, unknown>;
      if (Array.isArray(obj.actions)) {
        actionArray = obj.actions;
      } else if (Array.isArray(obj.actionLog)) {
        actionArray = obj.actionLog;
      }
    }

    if (!actionArray || !Array.isArray(actionArray) || actionArray.length === 0) {
      return null;
    }

    const isValid = actionArray.every(
      (item) => item && typeof item === 'object' && typeof (item as Record<string, unknown>).type === 'string'
    );

    return isValid ? (actionArray as WorldAction[]) : null;
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
          const actions = validateActions(parsed);

          if (!actions) {
            setErrorMessage('Invalid JSON format: Expected array of WorldActions.');
            return;
          }

          setErrorMessage(null);
          worldStore.getState().setRecordedActions(actions as unknown as RecordedAction[]);
          setCurrentStep(0);
        } catch (err) {
          console.error('Failed to parse action log JSON:', err);
          setErrorMessage('Failed to read or parse JSON file.');
        }
      };

      reader.readAsText(file);
    },
    []
  );

  const handlePlayAll = useCallback(async () => {
    if (recordedActions.length === 0) return;
    setIsPlaying(true);
    onPlaybackStart?.();

    const reset = currentStep === 0;
    const remainingActions = recordedActions.slice(currentStep) as unknown as WorldAction[];
    const startOffset = currentStep;

    await actionPlayer.playLog(remainingActions, {
      delayMs,
      resetWorld: reset,
      onStep: (curr) => {
        setCurrentStep(startOffset + curr);
      },
      onComplete: () => {
        setIsPlaying(false);
        onPlaybackComplete?.();
      },
      onStop: () => {
        setIsPlaying(false);
      },
    });
  }, [recordedActions, currentStep, delayMs, onPlaybackStart, onPlaybackComplete]);

  const handleStop = () => {
    actionPlayer.stop();
    setIsPlaying(false);
  };

  const handleStepForward = useCallback(() => {
    if (currentStep < recordedActions.length) {
      const nextAction = recordedActions[currentStep];
      worldStore.getState().dispatch(nextAction as unknown as WorldAction);
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, recordedActions]);

  const handleStepBack = useCallback(() => {
    if (currentStep > 0) {
      const targetIndex = currentStep - 1;
      worldStore.getState().dispatch({ type: 'RESET_WORLD' });
      for (let i = 0; i < targetIndex; i++) {
        worldStore.getState().dispatch(recordedActions[i] as unknown as WorldAction);
      }
      setCurrentStep(targetIndex);
    }
  }, [currentStep, recordedActions]);

  const handleResetSteps = useCallback(() => {
    worldStore.getState().dispatch({ type: 'RESET_WORLD' });
    setCurrentStep(0);
  }, []);

  const percent = totalSteps > 0 ? Math.round((effectiveCurrentStep / totalSteps) * 100) : 0;

  return (
    <div className={`action-replayer ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        aria-label="Upload action log JSON file"
        className="file-input-hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        className="replayer-btn load-btn"
        onClick={handleUploadClick}
        title="Upload and replay a recorded action log JSON file"
      >
        📂 Load Action Log (.json)
      </button>

      {totalSteps > 0 && !isPlaying && (
        <div className="step-controls-group">
          <button
            type="button"
            className="replayer-btn step-btn"
            onClick={handleStepBack}
            disabled={effectiveCurrentStep === 0}
            title="Step back to previous recorded action"
          >
            ⏮️ Step Back
          </button>

          <button
            type="button"
            className="replayer-btn step-btn step-forward-btn"
            onClick={handleStepForward}
            disabled={effectiveCurrentStep >= totalSteps}
            title="Step forward to next recorded action"
          >
            ⏭️ Step Forward
          </button>

          <button
            type="button"
            className="replayer-btn play-btn"
            onClick={handlePlayAll}
            title="Play all remaining actions"
          >
            ▶️ Play
          </button>

          <button
            type="button"
            className="replayer-btn reset-btn"
            onClick={handleResetSteps}
            title="Reset world state to step 0"
          >
            🔄 Reset
          </button>
        </div>
      )}

      {isPlaying && (
        <button
          type="button"
          className="replayer-btn stop-btn"
          onClick={handleStop}
          title="Stop action playback"
        >
          ⏹ Stop Playback
        </button>
      )}

      {!isPlaying && (
        <select
          className="delay-select"
          value={delayMs}
          onChange={(e) => setDelayMs(Number(e.target.value))}
          title="Playback speed step delay"
        >
          <option value={100}>Fast (100ms)</option>
          <option value={300}>Normal (300ms)</option>
          <option value={600}>Slow (600ms)</option>
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

      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};
