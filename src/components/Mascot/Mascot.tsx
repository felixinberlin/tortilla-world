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
import { ingredients } from '../../data/catalog/ingredients';
import type { GazeTarget } from '../../systems/gaze';
import { gazeEntityId } from '../../systems/gaze';

interface MascotProps {
  mascotId?: string;
}

export const Mascot: React.FC<MascotProps> = ({ mascotId = 'chef' }) => {
  const mascotEntity = useStore(worldStore, (state) => state.entities[mascotId]);
  const entities = useStore(worldStore, (state) => state.entities);
  const dispatch = useStore(worldStore, (state) => state.dispatch);
  
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const mascotAnchorRef = useRef<HTMLDivElement>(null);

  // Derived from mascotEntity.state — use optional chaining so these stay safe
  // when mascotEntity is undefined, keeping every hook below unconditional.
  const gazingAt = (mascotEntity?.state?.gazingAt ?? null) as GazeTarget;
  const gazingAtEntityId = gazeEntityId(gazingAt);
  const targetContainerId = (mascotEntity?.state?.targetContainerId as string | undefined) ?? gazingAtEntityId ?? undefined;
  const state = (mascotEntity?.state?.state as string | undefined) || 'idle';
  const holdingEntityId = mascotEntity?.state?.holdingEntityId as string | undefined;
  const speechMessage = mascotEntity?.state?.speechMessage as string | undefined;

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

      // Calculate translation offset so mascot hovers near the container but doesn't obscure it
      const x = containerRect.left + containerRect.width / 2 - (mascotRect.left + mascotRect.width / 2);

      // If the screen is small (mobile), hover the mascot slightly higher and to the right
      // so it doesn't block the container's title or items.
      const isMobile = window.innerWidth <= 600;
      const yOffset = isMobile ? 55 : 15; // increased to ensure space for floating speech bubble and avoid blocking headers
      const xOffsetModifier = isMobile ? 35 : 0; // increased slight shift right to avoid obscure text

      const y = containerRect.top - mascotRect.top - yOffset;

      setOffset({ x: x + xOffsetModifier, y });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [targetContainerId]);

  // Guarded until after all hooks so hook call order never changes between renders.
  if (!mascotEntity) return null;

  const handleDoubleClick = () => {
    dispatch({ type: 'MASCOT_FLIP', payload: { mascotId } });
  };

  const isFloating = offset.x !== 0 || offset.y !== 0;

  return (
    <>
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
            gazingAt={gazingAt}
            onDoubleClick={handleDoubleClick}
          />

          {/* Held Ingredient Badge ("Really Grab") */}
          {holdingEntityId && (
            <div className="mascot-held-badge">
              <span style={{ fontSize: '16px' }}>{heldIngredientInfo?.icon || '🥔'}</span>
              <span>{heldEntity?.name || heldIngredientInfo?.name || holdingEntityId}</span>
            </div>
          )}

          {speechMessage && (
            <div
              className="mascot-speech-bubble"
              style={{
                position: 'absolute',
                top: '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '8px 12px',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--text-h)',
                background: 'var(--card-bg, #ffffff)',
                border: '1px solid var(--primary, #e8b84a)',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                zIndex: 10,
              }}
            >
              <span>💬</span>
              <span>{speechMessage}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
