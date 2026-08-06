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
import { useTranslation } from '../../i18n/useTranslation';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { TortillaSvg } from './TortillaSvg';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools } from '../../data/catalog/tools';
import type { GazeTarget } from '../../systems/gaze';
import { gazeEntityId } from '../../systems/gaze';
import { getMascotFocusClass } from '../../systems/focus';

interface MascotProps {
  mascotId?: string;
}

export const Mascot: React.FC<MascotProps> = ({ mascotId = 'chef' }) => {
  const { t } = useTranslation();
  const mascotEntity = useStore(worldStore, (state) => state.entities[mascotId]);
  const entities = useStore(worldStore, (state) => state.entities);
  const focusTarget = useStore(worldStore, (state) => state.focusTarget);
  const dispatch = useStore(worldStore, (state) => state.dispatch);
  
  const focusClass = getMascotFocusClass(focusTarget);
  
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const mascotAnchorRef = useRef<HTMLDivElement>(null);

  // Derived from mascotEntity.state — use optional chaining so these stay safe
  // when mascotEntity is undefined, keeping every hook below unconditional.
  const gazingAt = (mascotEntity?.state?.gazingAt ?? null) as GazeTarget;
  const gazingAtEntityId = gazeEntityId(gazingAt);
  const targetContainerId = (mascotEntity?.state?.targetContainerId as string | undefined) ?? gazingAtEntityId ?? undefined;
  const state = (mascotEntity?.state?.state as string | undefined) || 'idle';
  const speechMessage = mascotEntity?.state?.speechMessage as string | undefined;

  // Extract array of holdingEntityIds (supporting multi-item carrying or legacy single holdingEntityId)
  const rawHoldingIds = mascotEntity?.state?.holdingEntityIds as string[] | undefined;
  const singleHoldingId = mascotEntity?.state?.holdingEntityId as string | undefined;

  const holdingEntityIds: string[] = Array.isArray(rawHoldingIds) && rawHoldingIds.length > 0
    ? rawHoldingIds
    : singleHoldingId
    ? [singleHoldingId]
    : [];

  const isHoldingLeft = holdingEntityIds.length > 0;
  const isHoldingRight = holdingEntityIds.length > 1;

  // Resolve held item info helper
  const getHeldItemInfo = (id: string) => {
    const entity = entities[id];
    const catalogIng = ingredients.find(
      (i) => i.id === entity?.ingredientId || i.id === id || id.startsWith(i.id) || i.id.includes(id)
    );
    const catalogTool = catalogTools.find(
      (t) => t.id === entity?.id || t.id === id || id.startsWith(t.id)
    );

    const name = entity?.name || catalogIng?.name || catalogTool?.name || id.charAt(0).toUpperCase() + id.slice(1);
    const icon = catalogIng?.icon || catalogTool?.icon || '🥔';

    return { name, icon };
  };

  const holdingEntityIdsKey = holdingEntityIds.join(',');

  // Calculate physical DOM position offset to target container
  useEffect(() => {
    const updatePosition = () => {
      if (!mascotAnchorRef.current) return;

      let containerEl = null;
      if (targetContainerId) {
        containerEl = document.querySelector(`[data-container-id="${targetContainerId}"]`);
      }

      // If no target container is specified, default to despensa (pantry) or recipe requirements
      if (!containerEl) {
        containerEl = document.querySelector(`[data-container-id="despensa"]`);
      }

      // Fallback 1: Any container with recipe requirements
      if (!containerEl) {
        containerEl = document.querySelector(`.recipe-requirements-section`);
      }

      // Fallback 2: General safe position if absolutely no containers found
      if (!containerEl) {
        // Safe position in the middle right
        const safeX = window.innerWidth - 120;
        const safeY = window.innerHeight / 2 - 50;
        const mascotRect = mascotAnchorRef.current.getBoundingClientRect();

        setOffset({
          x: safeX - mascotRect.left,
          y: safeY - mascotRect.top
        });
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
    const rafId = requestAnimationFrame(updatePosition);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [targetContainerId, gazingAtEntityId, holdingEntityIdsKey, state]);

  // Guarded until after all hooks so hook call order never changes between renders.
  if (!mascotEntity) return null;

  const handleDoubleClick = () => {
    dispatch({ type: 'MASCOT_FLIP', payload: { mascotId } });
    window.dispatchEvent(new CustomEvent('mascot-flip', { detail: { mascotId } }));
  };

  const isFloating = offset.x !== 0 || offset.y !== 0;

  return (
    <>
      {/* Anchor box holding mascot location in layout */}
      <div
        ref={mascotAnchorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '1px',
          height: '1px',
          visibility: 'hidden',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9999
        }}
      >
        <div
          className={`mascot-wrapper ${focusClass} ${isFloating ? 'is-floating' : ''} ${holdingEntityIds.length > 0 ? 'is-holding' : ''}`}
          style={
            {
              position: 'absolute',
              top: '0',
              left: '0',
              pointerEvents: 'auto',
              '--offset-x': `${offset.x}px`,
              '--offset-y': `${offset.y}px`,
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
            } as React.CSSProperties
          }
        >
          <TortillaSvg
            state={state}
            gazingAt={gazingAt}
            onDoubleClick={handleDoubleClick}
            isHoldingLeft={isHoldingLeft}
            isHoldingRight={isHoldingRight}
          />

          {/* Held Ingredient Badges (Up to 2 items) */}
          {holdingEntityIds.slice(0, 2).map((id, index) => {
            const info = getHeldItemInfo(id);
            const isFirst = index === 0;
            return (
              <div
                key={`held-badge-${id}-${index}`}
                className={`mascot-held-badge ${isFirst ? 'badge-left' : 'badge-right'}`}
                style={{
                  bottom: '-8px',
                  ...(isFirst ? { left: '-12px', right: 'auto' } : { right: '-12px', left: 'auto' }),
                }}
              >
                <span style={{ fontSize: '16px' }}>{info.icon}</span>
                <span>{info.name}</span>
              </div>
            );
          })}

          {speechMessage && (
            <div
              className="mascot-speech-bubble"
              style={{
                position: 'absolute',
                top: '-50px',
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
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                zIndex: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>💬</span>
                <span>{speechMessage}</span>
              </div>
              {(speechMessage.includes('empty') ||
                speechMessage.includes('vaciar') ||
                speechMessage.includes('leeren') ||
                speechMessage.includes('trash') ||
                speechMessage.includes('papelera') ||
                speechMessage.includes('Mülleimer')) && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({ type: 'EMPTY_TRASH' });
                      dispatch({
                        type: 'UPDATE_ENTITY_STATE',
                        payload: { entityId: 'chef', changes: { speechMessage: undefined } },
                      });
                    }}
                    style={{
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '3px 8px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    ✅ {t('ui.yesEmpty')}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({
                        type: 'UPDATE_ENTITY_STATE',
                        payload: { entityId: 'chef', changes: { speechMessage: undefined } },
                      });
                    }}
                    style={{
                      backgroundColor: '#6b7280',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '3px 8px',
                      fontSize: '11px',
                      cursor: 'pointer',
                    }}
                  >
                    ❌ {t('ui.cancel')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};