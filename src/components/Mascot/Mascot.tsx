/**
 * FILE: Mascot.tsx
 *
 * PURPOSE:
 * Main Tortilla mascot component.
 *
 * RESPONSIBILITY:
 * - Controls mascot visual representation.
 * - Displays mascot state and animations.
 *
 * SHOULD NOT:
 * - Own world state.
 * - Contain gameplay rules.
 */

import React from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { TortillaSvg } from './TortillaSvg';

interface MascotProps {
  mascotId?: string;
}

export const Mascot: React.FC<MascotProps> = ({ mascotId = 'chef' }) => {
  const mascotEntity = useStore(worldStore, (state) => state.entities[mascotId]);
  const dispatch = useStore(worldStore, (state) => state.dispatch);

  if (!mascotEntity) return null;

  const gazingAt = mascotEntity.state?.gazingAt as string | undefined;
  const state = (mascotEntity.state?.state as string | undefined) || 'idle';
  const holdingEntityId = mascotEntity.state?.holdingEntityId as string | undefined;

  const handleDoubleClick = () => {
    dispatch({ type: 'MASCOT_FLIP', payload: { mascotId } });
  };

  return (
    <div className="mascot-card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: '12px' }}>
      <TortillaSvg
        state={state}
        gazingAt={gazingAt as any}
        onDoubleClick={handleDoubleClick}
      />
      <div>
        <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-h)' }}>{mascotEntity.name}</h3>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--text)' }}>
          Gazing at: <strong>{gazingAt || 'Kitchen World'}</strong>
          {holdingEntityId && (
            <span style={{ marginLeft: '8px', color: 'var(--primary, #e8b84a)' }}>
              (Holding: {holdingEntityId})
            </span>
          )}
        </p>
      </div>
    </div>
  );
};