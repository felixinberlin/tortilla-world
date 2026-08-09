/**
 * FILE: src/components/Controls/TimelineScrubber.tsx
 *
 * PURPOSE:
 * Pure React UI component providing a video-editor style timeline slider ("scrubber")
 * to travel through simulation action history.
 *
 * RESPONSIBILITIES:
 * - Reads currentActionIndex and recordedActions.length from Zustand worldStore using select functions.
 * - Renders a native range input <input type="range"> from min=0 to max=totalActions.
 * - On change (user slider drag), dispatches seekTo(newIndex) to the store without business logic in UI.
 */

import React from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { useTranslation } from '../../i18n/useTranslation';
import './TimelineScrubber.scss';

export interface TimelineScrubberProps {
  /** Optional container class name override */
  className?: string;
  /** Disable input control */
  disabled?: boolean;
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  className = '',
  disabled = false,
}) => {
  const { t } = useTranslation();
  const currentActionIndex = useStore(worldStore, (state) => state.currentActionIndex ?? 0);
  const totalActions = useStore(worldStore, (state) => state.recordedActions.length);
  const seekTo = useStore(worldStore, (state) => state.seekTo);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetIndex = parseInt(e.target.value, 10);
    if (!isNaN(targetIndex)) {
      seekTo(targetIndex);
    }
  };

  const isScrubberDisabled = disabled || totalActions === 0;

  return (
    <div className={`timeline-scrubber ${className}`}>
      <div className="scrubber-header">
        <span className="scrubber-label">
          ⏱️ Timeline Scrubber
        </span>
        <span className="scrubber-counter">
          {currentActionIndex} / {totalActions} {t('ui.steps') || 'Pasos'}
        </span>
      </div>
      <div className="scrubber-track-wrapper">
        <input
          type="range"
          min={0}
          max={totalActions}
          value={Math.min(currentActionIndex, totalActions)}
          onChange={handleSliderChange}
          disabled={isScrubberDisabled}
          aria-label="Timeline Scrubber"
          className="scrubber-input"
        />
      </div>
    </div>
  );
};

export default TimelineScrubber;
