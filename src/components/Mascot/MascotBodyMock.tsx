/**
 * FILE: MascotBodyMock.tsx
 *
 * @TODO: Replace with actual Soft-Body Physics Mesh constraints
 *
 * PURPOSE:
 * Temporary visual proxy component mapping Mascot BodyAction intents (squash, stretch, bounce, wobble)
 * into smooth CSS transforms and spring animations on the UI layer.
 */

import React from 'react';
import { useEmotionStore } from '../../store/emotionStore';
import type { BodyAction } from '../../types/emotion';

interface MascotBodyMockProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  bodyIntent?: BodyAction;
}

export const MascotBodyMock: React.FC<MascotBodyMockProps> = ({ children, className = '', style = {}, bodyIntent }) => {
  const storeBodyIntent = useEmotionStore((state) => state.currentBodyIntent);
  const currentBodyIntent = bodyIntent || storeBodyIntent;

  const squash = currentBodyIntent?.squash || 0;
  const stretch = currentBodyIntent?.stretch || 0;
  const bounce = currentBodyIntent?.bounce || 0;
  const wobble = currentBodyIntent?.wobble || 0;
  const shake = currentBodyIntent?.shake || 0;

  const scaleX = Math.round((1 + squash - stretch * 0.5) * 1000) / 1000;
  const scaleY = Math.round((1 + stretch - squash * 0.5) * 1000) / 1000;
  const translateY = bounce * -20; // 20px bounce max
  const rotate = wobble * 10; // 10deg wobble max

  // Combine CSS transform
  const transformString = `translateY(${translateY}px) scale(${scaleX}, ${scaleY}) rotate(${rotate}deg)`;

  return (
    <div
      className={`mascot-body-wrapper ${shake > 0 ? 'is-shaking' : ''} ${className}`.trim()}
      style={{
        display: 'inline-block',
        transform: transformString,
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transformOrigin: 'bottom center',
        ...style,
      }}
      data-testid="mascot-body-mock"
      data-squash={squash}
      data-stretch={stretch}
      data-bounce={bounce}
      data-wobble={wobble}
    >
      {children}
    </div>
  );
};
