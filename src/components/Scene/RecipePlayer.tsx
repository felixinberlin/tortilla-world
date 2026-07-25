/**
 * FILE: RecipePlayer.tsx
 *
 * PURPOSE:
 * Interactive recipe playback and step navigation control component.
 *
 * RESPONSIBILITY:
 * - Provides play/pause, slow, fast, step up (forward), and step down (backward) controls.
 * - Displays active recipe progress, current step index, and human-readable step description.
 * - Manages automated execution using RecipeRunner engine.
 * - Supports instant step navigation and timeline jumping while maintaining simulation world state.
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { recipes } from '../../data/catalog/recipes';
import { RecipeRunner } from '../../systems/recipeRunner';
import { worldStore } from '../../store/worldStore';
import type { RecipeStep } from '../../types/RecipeStep';
import type { Recipe } from '../../types/Recipe';
import './RecipePlayer.scss';

// Speed options and corresponding delays in ms
const SPEED_DELAYS: Record<number, number> = {
  0.5: 1200, // Slow
  1: 600,    // Normal
  2: 300,    // Fast
  3: 150,    // Turbo
};

/**
 * Generates human-readable step details (icon, text label, badge) for a given RecipeStep.
 */
function getStepDetails(step?: RecipeStep): { icon: string; text: string; actionName: string } {
  if (!step) {
    return { icon: '✨', text: 'Select a recipe and press Play or Step Up to begin!', actionName: 'Ready' };
  }

  switch (step.action) {
    case 'move':
      return {
        icon: '🚚',
        text: `Move ${step.ingredient || 'ingredient'} from ${step.source || 'storage'} to ${step.target || 'workspace'}`,
        actionName: 'Move',
      };
    case 'grab':
      return {
        icon: '🫳',
        text: `Grab ${step.ingredient} from ${step.source || 'storage'}`,
        actionName: 'Grab',
      };
    case 'drop':
      return {
        icon: '⬇️',
        text: `Drop held ingredient into ${step.target || 'workspace'}`,
        actionName: 'Drop',
      };
    case 'cut':
    case 'prepare':
    case 'peel':
      return {
        icon: '🔪',
        text: `${step.action.toUpperCase()} ${step.ingredient || step.target || ''} (${step.preparation || step.style || 'prepared'})`,
        actionName: step.action,
      };
    case 'wash':
    case 'rinse':
    case 'drain':
      return {
        icon: '💧',
        text: `${step.action.toUpperCase()} ${step.ingredient || step.target || ''}`,
        actionName: step.action,
      };
    case 'cook':
      return {
        icon: '🍳',
        text: `Cook ${step.target || step.ingredient || ''} (${step.method || 'fry'}${step.duration ? `, ${step.duration} ${step.unit || 'min'}` : ''})`,
        actionName: 'Cook',
      };
    case 'flip':
      return {
        icon: '🍳',
        text: step.instruction || `Flip ${step.target || 'tortilla'} in the pan`,
        actionName: 'Flip',
      };
    case 'mix':
    case 'beat':
    case 'combine':
      return {
        icon: '🥣',
        text: `Mix ${(step.inputs || step.ingredients || []).join(', ')} -> ${step.output || 'mixture'}`,
        actionName: step.action,
      };
    case 'serve':
      return {
        icon: '🍽️',
        text: `Serve ${step.target || 'dish'} to ${step.containerId || 'plate'}`,
        actionName: 'Serve',
      };
    case 'instruction':
      return {
        icon: '👨‍🍳',
        text: step.text || step.instruction || 'Follow recipe instruction',
        actionName: 'Instruction',
      };
    case 'speak':
      return {
        icon: '💬',
        text: `Tortilla says: "${step.message}"`,
        actionName: 'Speak',
      };
    case 'celebrate':
      return {
        icon: '🎉',
        text: 'Flip celebration! Recipe completed successfully!',
        actionName: 'Celebrate',
      };
    case 'wait':
      return {
        icon: '⏳',
        text: `Wait for ${step.durationMs || 600}ms`,
        actionName: 'Wait',
      };
    default:
      return {
        icon: '📝',
        text: 'Execute recipe step',
        actionName: 'Step',
      };
  }
}

export const RecipePlayer: React.FC = () => {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(recipes[0]?.id || 'concebolla');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1); // 0.5, 1, 2, 3

  const activeRecipe: Recipe = useMemo(
    () => recipes.find((r) => r.id === selectedRecipeId) || recipes[0],
    [selectedRecipeId]
  );
  const steps: RecipeStep[] = useMemo(() => activeRecipe?.steps || [], [activeRecipe]);
  const totalSteps = steps.length;

  const runnerRef = useRef<RecipeRunner | null>(null);
  const isExecutingRef = useRef<boolean>(false);

  // Get delay in ms based on active speed multiplier
  const currentDelayMs = SPEED_DELAYS[speed] || 600;

  // Re-sync runner context or reset when recipe changes
  const handleRecipeChange = (newRecipeId: string) => {
    setIsPlaying(false);
    setSelectedRecipeId(newRecipeId);
    setCurrentStepIndex(0);
    runnerRef.current = null;
    worldStore.getState().dispatch({ type: 'RESET_WORLD' });
  };

  // Full reset of world and player step
  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    runnerRef.current = null;
    worldStore.getState().dispatch({ type: 'RESET_WORLD' });
  }, []);

  // Jump to a specific target step index by replaying from step 0
  const jumpToStep = useCallback(
    async (targetIndex: number) => {
      if (isExecutingRef.current) return;
      setIsPlaying(false);

      const clampedTarget = Math.min(Math.max(0, targetIndex), totalSteps);
      isExecutingRef.current = true;

      try {
        // Reset world state to initial kitchen
        worldStore.getState().dispatch({ type: 'RESET_WORLD' });

        // Instantiate zero-delay runner for fast-forward
        const fastRunner = new RecipeRunner({
          mascotId: 'chef',
          defaultTargetId: 'board',
          delayMs: 0,
        });
        fastRunner.bindRecipeContext(activeRecipe);

        for (let i = 0; i < clampedTarget; i++) {
          await fastRunner.executeStep(steps[i]);
        }

        fastRunner.delayMs = currentDelayMs;
        runnerRef.current = fastRunner;
        setCurrentStepIndex(clampedTarget);
      } catch (err) {
        console.error('[RecipePlayer] Error jumping to step:', err);
      } finally {
        isExecutingRef.current = false;
      }
    },
    [activeRecipe, totalSteps, steps, currentDelayMs]
  );

  // Step Up (Step forward 1 step)
  const handleStepUp = useCallback(async () => {
    if (isExecutingRef.current) return;
    setIsPlaying(false);

    if (currentStepIndex >= totalSteps) return;

    isExecutingRef.current = true;

    try {
      if (!runnerRef.current || currentStepIndex === 0) {
        if (currentStepIndex === 0) {
          worldStore.getState().dispatch({ type: 'RESET_WORLD' });
        }
        runnerRef.current = new RecipeRunner({
          mascotId: 'chef',
          defaultTargetId: 'board',
          delayMs: currentDelayMs,
        });
        runnerRef.current.bindRecipeContext(activeRecipe);
      } else {
        runnerRef.current.delayMs = currentDelayMs;
      }

      const stepToRun = steps[currentStepIndex];
      await runnerRef.current.executeStep(stepToRun);
      setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps));
    } catch (err) {
      console.error('[RecipePlayer] Error stepping up:', err);
    } finally {
      isExecutingRef.current = false;
    }
  }, [currentStepIndex, totalSteps, activeRecipe, steps, currentDelayMs]);

  // Step Down (Step back 1 step)
  const handleStepDown = useCallback(() => {
    if (currentStepIndex <= 0) return;
    jumpToStep(currentStepIndex - 1);
  }, [currentStepIndex, jumpToStep]);

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      // If at end of recipe, restart from beginning
      if (currentStepIndex >= totalSteps) {
        handleReset();
      }
      setIsPlaying(true);
    }
  };

  // Decrease speed (Slow button)
  const handleSlow = () => {
    if (speed === 3) setSpeed(2);
    else if (speed === 2) setSpeed(1);
    else if (speed === 1) setSpeed(0.5);
    else setSpeed(0.5);
  };

  // Increase speed (Fast button)
  const handleFast = () => {
    if (speed === 0.5) setSpeed(1);
    else if (speed === 1) setSpeed(2);
    else if (speed === 2) setSpeed(3);
    else setSpeed(3);
  };

  // Auto-play step loop effect
  useEffect(() => {
    if (!isPlaying) return;

    let isCancelled = false;

    const playNextStep = async () => {
      if (currentStepIndex >= totalSteps) {
        setIsPlaying(false);
        return;
      }

      if (isExecutingRef.current) return;
      isExecutingRef.current = true;

      try {
        if (!runnerRef.current || currentStepIndex === 0) {
          if (currentStepIndex === 0) {
            worldStore.getState().dispatch({ type: 'RESET_WORLD' });
          }
          runnerRef.current = new RecipeRunner({
            mascotId: 'chef',
            defaultTargetId: 'board',
            delayMs: currentDelayMs,
          });
          runnerRef.current.bindRecipeContext(activeRecipe);
        } else {
          runnerRef.current.delayMs = currentDelayMs;
        }

        const stepToRun = steps[currentStepIndex];
        await runnerRef.current.executeStep(stepToRun);

        if (!isCancelled) {
          const nextIndex = currentStepIndex + 1;
          setCurrentStepIndex(nextIndex);
          if (nextIndex >= totalSteps) {
            setIsPlaying(false);
          }
        }
      } catch (err) {
        console.error('[RecipePlayer] Playback loop error:', err);
        if (!isCancelled) setIsPlaying(false);
      } finally {
        isExecutingRef.current = false;
      }
    };

    playNextStep();

    return () => {
      isCancelled = true;
    };
  }, [isPlaying, currentStepIndex, totalSteps, activeRecipe, steps, currentDelayMs]);

  // Details for current step
  const currentStep = steps[currentStepIndex < totalSteps ? currentStepIndex : totalSteps - 1];
  const stepDetails = getStepDetails(currentStepIndex < totalSteps ? currentStep : undefined);
  const progressPercent = totalSteps > 0 ? Math.min(100, (currentStepIndex / totalSteps) * 100) : 0;

  return (
    <div className="recipe-player-container">
      {/* Top Header: Recipe Selector & Step Pill */}
      <div className="player-header">
        <div className="recipe-select-group">
          <label htmlFor="player-recipe-select" className="recipe-label">
            👨‍🍳 Active Recipe:
          </label>
          <select
            id="player-recipe-select"
            className="recipe-dropdown"
            value={selectedRecipeId}
            onChange={(e) => handleRecipeChange(e.target.value)}
          >
            {recipes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div className="player-status-badge">
          <span className="step-count">
            Step <strong>{currentStepIndex}</strong> / {totalSteps}
          </span>
          <span className={`speed-badge speed-${speed.toString().replace('.', '_')}`}>
            ⚡ {speed}x
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="player-progress-track">
        <div
          className="player-progress-bar"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Active Step Description Card */}
      <div className="current-step-card">
        <div className="step-icon-area">{stepDetails.icon}</div>
        <div className="step-text-area">
          <div className="step-action-badge">{stepDetails.actionName}</div>
          <p className="step-description">{stepDetails.text}</p>
        </div>
      </div>

      {/* Main Controls Row */}
      <div className="player-controls-bar">
        {/* Slow Control */}
        <button
          type="button"
          className="ctrl-btn slow-btn"
          onClick={handleSlow}
          title="Slow down playback speed (0.5x)"
        >
          🐢 Slow
        </button>

        {/* Step Down (Step Back) */}
        <button
          type="button"
          className="ctrl-btn step-down-btn"
          onClick={handleStepDown}
          disabled={currentStepIndex <= 0}
          title="Step Down: Go back to previous step"
        >
          ⏮ Step Down
        </button>

        {/* Play / Pause Toggle */}
        <button
          type="button"
          className={`ctrl-btn play-btn ${isPlaying ? 'is-playing' : ''}`}
          onClick={handleTogglePlay}
          title={isPlaying ? 'Pause recipe auto-play' : 'Play recipe step-by-step'}
        >
          {isPlaying ? '⏸ Pause' : currentStepIndex >= totalSteps ? '🔄 Replay' : '▶ Play'}
        </button>

        {/* Step Up (Step Forward) */}
        <button
          type="button"
          className="ctrl-btn step-up-btn"
          onClick={handleStepUp}
          disabled={currentStepIndex >= totalSteps}
          title="Step Up: Advance to next step"
        >
          Step Up ⏭
        </button>

        {/* Fast Control */}
        <button
          type="button"
          className="ctrl-btn fast-btn"
          onClick={handleFast}
          title="Speed up playback speed (2x/3x)"
        >
          Fast ⚡
        </button>

        {/* Kitchen Reset Button */}
        <button
          type="button"
          className="ctrl-btn reset-btn"
          onClick={handleReset}
          title="Reset kitchen world to starting state"
        >
          🔄 Reset
        </button>
      </div>

      {/* Speed Presets & Step Timeline Dots */}
      <div className="player-footer">
        <div className="speed-pills">
          <span className="speed-title">Speed:</span>
          {[0.5, 1, 2, 3].map((sp) => (
            <button
              key={sp}
              type="button"
              className={`speed-pill ${speed === sp ? 'active' : ''}`}
              onClick={() => setSpeed(sp)}
            >
              {sp}x
            </button>
          ))}
        </div>

        {/* Interactive Step Stepper Dots */}
        <div className="stepper-dots">
          {steps.map((_, idx) => (
            <button
              key={`step-dot-${idx}`}
              type="button"
              className={`step-dot ${idx < currentStepIndex ? 'completed' : ''} ${
                idx === currentStepIndex ? 'active' : ''
              }`}
              onClick={() => jumpToStep(idx)}
              title={`Jump to step ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
