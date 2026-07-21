// src/components/Mascot/TortillaSvg.tsx

import React from 'react';
import type { MascotState } from '../../systems/mascot';

interface Props {
  state?: MascotState;
}

export const TortillaSvg: React.FC<Props> = ({ state }) => {
  const gazingAt = state?.gazingAt ?? null;
  const expression = state?.expression ?? 'happy';

  return (
    <svg viewBox="0 0 100 100" className={`tortilla-svg expression-${expression}`}>
      <circle cx="50" cy="50" r="45" fill="#F4D06F" stroke="#E0A93B" strokeWidth="3" />
      {/* Eyes gaze shifts based on target state */}
      <circle cx={gazingAt ? 40 : 35} cy="40" r="5" fill="#333" />
      <circle cx={gazingAt ? 60 : 65} cy="40" r="5" fill="#333" />
      {/* Mouth */}
      <path d="M 35 60 Q 50 75 65 60" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};