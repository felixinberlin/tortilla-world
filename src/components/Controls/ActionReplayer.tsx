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
import type { WorldAction } from '../../types/actions';
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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [delayMs, setDelayMs] = useState<number>(defaultDelayMs);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
          setIsPlaying(true);
          setCurrentStep(0);
          setTotalSteps(actions.length);
          onPlaybackStart?.();

          await actionPlayer.playLog(actions, {
            delayMs,
            resetWorld: true,
            onStep: (curr, tot) => {
              setCurrentStep(curr);
              setTotalSteps(tot);
            },
            onComplete: () => {
              setIsPlaying(false);
              onPlaybackComplete?.();
            },
            onStop: () => {
              setIsPlaying(false);
            },
          });
        } catch (err) {
          console.error('Failed to parse action log JSON:', err);
          setErrorMessage('Failed to read or parse JSON file.');
        }
      };

      reader.readAsText(file);
    },
    [delayMs, onPlaybackStart, onPlaybackComplete]
  );

  const handleStop = () => {
    actionPlayer.stop();
    setIsPlaying(false);
  };

  const percent = totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0;

  return (
    <div className={`action-replayer ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="file-input-hidden"
        onChange={handleFileChange}
      />

      {!isPlaying ? (
        <button
          type="button"
          className="replayer-btn load-btn"
          onClick={handleUploadClick}
          title="Upload and replay a recorded action log JSON file"
        >
          📂 Load Action Log (.json)
        </button>
      ) : (
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

      {isPlaying && (
        <div className="playback-status">
          <span>
            Step {currentStep} / {totalSteps}
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
