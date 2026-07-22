import React from 'react';
import type { GazeTarget } from '../../systems/gaze';

interface TortillaSvgProps {
  gazingAt?: GazeTarget;
}

export const TortillaSvg: React.FC<TortillaSvgProps> = ({ gazingAt }) => {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="#f4d03f" />
      {/* Visual representation of mascot gaze direction */}
      <circle cx={gazingAt ? 60 : 50} cy="40" r="5" fill="#000" />
    </svg>
  );
};