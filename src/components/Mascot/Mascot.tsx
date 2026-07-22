/**
 * FILE: Mascot.tsx
 *
 * PURPOSE:
 * Interactive Tortilla Mascot companion component.
 *
 * RESPONSIBILITY:
 * - Displays mascot avatar, gaze direction, and speech bubble hints.
 * - Provides dynamic speech hints based on recipe progress.
 *
 * SHOULD NOT:
 * - Direct mutation of world store logic outside actions.
 */

import React from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { evaluateRecipeProgress } from '../../systems/recipe';

interface MascotProps {
  mascotId?: string;
}

export const Mascot: React.FC<MascotProps> = ({ mascotId = 'chef' }) => {
  const mascotEntity = useStore(worldStore, (state) => state.entities[mascotId]);
  const plateContainer = useStore(worldStore, (state) => state.containers.plate);

  const progress = evaluateRecipeProgress('plate', 'concebolla');

  let hintText = 'Welcome to Tortilla World! Drag ingredients into the Cutting Board or Cooking Pan to start cooking.';
  if (plateContainer && plateContainer.entityIds.length > 0) {
    if (progress.isComplete) {
      hintText = '🎉 Spanish Tortilla recipe complete! Great job chef!';
    } else if (progress.missingRequirements.length > 0) {
      hintText = `Recipe progress: ${progress.percentage}%. Next requirement: ${progress.missingRequirements[0]}.`;
    }
  }

  const gazingTarget = mascotEntity?.state?.gazingAt
    ? String(mascotEntity.state.gazingAt)
    : 'Kitchen';

  return (
    <div className="mascot-container">
      <div className="mascot-avatar">
        <span className="mascot-emoji">🧑‍🍳</span>
        <div className="mascot-meta">
          <span className="mascot-name">Chef Tortilla</span>
          <span className="mascot-gaze">👀 Looking at: {gazingTarget}</span>
        </div>
      </div>
      <div className="speech-bubble">
        <p>{hintText}</p>
      </div>
    </div>
  );
};