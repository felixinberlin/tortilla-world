/**
 * FILE: Mascot.tsx
 *
 * PURPOSE:
 * Main Tortilla mascot component with physical movement and grabbing animations.
 *
 * RESPONSIBILITY:
 * - Controls mascot visual representation.
 * - Animates physical movement to target containers across the scene.
 * - Displays held ingredient badge and grab/drop motion feedback.
 *
 * SHOULD NOT:
 * - Own world state.
 * - Contain gameplay rules.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { TortillaSvg } from './TortillaSvg';
import { runTortillaPotatoScript } from '../../systems/mascotActions';
import { ingredients } from '../../data/catalog/ingredients';

interface MascotProps {
  mascotId?: string;
}

export const Mascot: React.FC<MascotProps> = ({ mascotId = 'chef' }) => {
  const mascotEntity = useStore(worldStore, (state) => state.entities[mascotId]);
  const entities = useStore(worldStore, (state) => state.entities);
  const dispatch = useStore(worldStore, (state) => state.dispatch);
  
  const [isRunningScript, setIsRunningScript] = useState(false);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const mascotAnchorRef = useRef<HTMLDivElement>(null);

  if (!mascotEntity) return null;

  const gazingAt = mascotEntity.state?.gazingAt as string | undefined;
  const targetContainerId = (mascotEntity.state?.targetContainerId || gazingAt) as string | undefined;
  const state = (mascotEntity.state?.state as string | undefined) || 'idle';
  const holdingEntityId = mascotEntity.state?.holdingEntityId as string | undefined;

  // Resolve held entity and ingredient metadata
  const heldEntity = holdingEntityId ? entities[holdingEntityId] : undefined;
  const heldIngredientInfo = heldEntity
    ? ingredients.find(
        (i) => i.id === heldEntity.ingredientId || i.id === heldEntity.id || heldEntity.id.startsWith(i.id)
      )
    : undefined;

  // Calculate physical DOM position offset to target container
  useEffect(() => {
    const updatePosition = () => {
      if (!targetContainerId || !mascotAnchorRef.current) {
        setOffset({ x: 0, y: 0 });
        return;
      }

      const containerEl = document.querySelector(`[data-container-id="${targetContainerId}"]`);
      if (!containerEl) {
        setOffset({ x: 0, y: 0 });
        return;
      }

      const containerRect = containerEl.getBoundingClientRect();
      const mascotRect = mascotAnchorRef.current.getBoundingClientRect();

      // Calculate translation offset so mascot hovers above the container center
      const x = containerRect.left + containerRect.width / 2 - (mascotRect.left + mascotRect.width / 2);
      const y = containerRect.top - mascotRect.top - 15;

      setOffset({ x, y });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [targetContainerId]);

  const handleDoubleClick = () => {
    dispatch({ type: 'MASCOT_FLIP', payload: { mascotId } });
  };

  const handleRunScript = async () => {
    if (isRunningScript) return;
    setIsRunningScript(true);
    try {
      await runTortillaPotatoScript(mascotId, 650);
    } finally {
      setIsRunningScript(false);
    }
  };

  const isFloating = offset.x !== 0 || offset.y !== 0;

  return (
    <div
      className="mascot-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 16px',
        background: 'var(--code-bg)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        flexWrap: 'wrap',
      }}
    >
      {/* Anchor box holding mascot location in layout */}
      <div
        ref={mascotAnchorRef}
        style={{
          width: '100px',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          className={`mascot-wrapper ${isFloating ? 'is-floating' : ''} ${holdingEntityId ? 'is-holding' : ''}`}
          style={
            {
              '--offset-x': `${offset.x}px`,
              '--offset-y': `${offset.y}px`,
            } as React.CSSProperties
          }
        >
          <TortillaSvg
            state={state}
            gazingAt={gazingAt as any}
            onDoubleClick={handleDoubleClick}
          />

          {/* Held Ingredient Badge ("Really Grab") */}
          {holdingEntityId && (
            <div className="mascot-held-badge">
              <span style={{ fontSize: '16px' }}>{heldIngredientInfo?.icon || '🥔'}</span>
              <span>{heldEntity?.name || heldIngredientInfo?.name || holdingEntityId}</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-h)' }}>{mascotEntity.name}</h3>
        <p style={{ margin: '4px 0 8px 0', fontSize: '13px', color: 'var(--text)' }}>
          Focus / Target: <strong>{targetContainerId || gazingAt || 'Kitchen Home'}</strong>
          {holdingEntityId && (
            <span style={{ marginLeft: '8px', color: 'var(--primary, #e8b84a)', fontWeight: 600 }}>
              (Carrying: {heldIngredientInfo?.icon || '🥔'} {heldEntity?.name || holdingEntityId})
            </span>
          )}
        </p>
        <button
          onClick={handleRunScript}
          disabled={isRunningScript}
          style={{
            padding: '8px 14px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#ffffff',
            background: isRunningScript
              ? 'var(--border)'
              : 'linear-gradient(135deg, #e8b84a 0%, #d4953a 100%)',
            border: 'none',
            borderRadius: '8px',
            cursor: isRunningScript ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
            transition: 'all 0.2s ease',
          }}
        >
          {isRunningScript ? '⏳ Executing Action Script...' : '▶ Script: Grab Potato ➔ Drop in Tabla ➔ Flip'}
        </button>
      </div>
    </div>
  );
};
