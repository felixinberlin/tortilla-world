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
import { useStore } from 'zustand';
import { recipes } from '../../data/catalog/recipes';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools as tools } from '../../data/catalog/tools';
import { RecipeRunner } from '../../systems/recipeRunner';
import { worldStore } from '../../store/worldStore';
import type { RecipeStep } from '../../types/RecipeStep';
import type { Recipe } from '../../types/Recipe';
import type { WorldAction } from '../../types/actions';
import type { RecordedAction } from '../../types/recording';
import { getRecipeRequirementsArray } from '../../types/Recipe';
import { RecipeRequirements } from '../Recipe/RecipeRequirements';
import { ActionReplayer } from '../Controls/ActionReplayer';
import { PlateDishNameModal } from '../Controls/PlateDishNameModal';
import { useTranslation } from '../../i18n/useTranslation';
import './RecipePlayer.scss';

// Speed options and corresponding delays in ms
const SPEED_DELAYS: Record<number, number> = {
  0.5: 1200, // Slow
  1: 600,    // Normal
  2: 300,    // Fast
  3: 150,    // Turbo
};

/**
 * Generates human-readable step details for a recorded WorldAction.
 */
function getActionDetails(recordedAction?: RecordedAction | WorldAction): {
  icon: string;
  text: string;
  actionName: string;
} {
  if (!recordedAction) {
    return {
      icon: '🎥',
      text: 'Recording mode active. Perform kitchen actions or press Play / Step Up to replay recorded actions.',
      actionName: 'Recording Mode',
    };
  }

  const { type, payload } = recordedAction as { type: string; payload?: Record<string, unknown> };
  const p = payload || {};

  const formatName = (id?: unknown) => {
    if (typeof id !== 'string' || !id) return '';
    return id
      .replace(/_\d+$/, '')
      .replace(/_/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .trim();
  };

  switch (type) {
    case 'MOVE_ENTITY': {
      const entity = formatName(p.entityId);
      const target = formatName(p.targetContainerId);
      return {
        icon: '🚚',
        actionName: 'Move Entity',
        text: `Move ${entity || 'item'} to ${target || 'container'}`,
      };
    }
    case 'ADD_ENTITY': {
      const entityObj = p.entity as { name?: string; id?: string } | undefined;
      const entity = entityObj?.name || formatName(entityObj?.id);
      const target = formatName(p.containerId);
      return {
        icon: '➕',
        actionName: 'Add Entity',
        text: `Add ${entity || 'item'} into ${target || 'container'}`,
      };
    }
    case 'REMOVE_ENTITY': {
      const entity = formatName(p.entityId);
      return {
        icon: '🗑️',
        actionName: 'Remove Entity',
        text: `Remove ${entity || 'item'} from container`,
      };
    }
    case 'TOGGLE_BURNER': {
      const container = formatName(p.containerId);
      return {
        icon: '🔥',
        actionName: 'Toggle Heat',
        text: `Toggle heat on ${container || 'burner'}`,
      };
    }
    case 'PREPARE_INGREDIENT': {
      const entity = formatName(p.entityId);
      return {
        icon: '🔪',
        actionName: 'Prepare',
        text: `Prepare ${entity || 'ingredient'} (${p.preparation || 'prepared'})`,
      };
    }
    case 'COOK_INGREDIENT': {
      const entity = formatName(p.entityId);
      return {
        icon: '🍳',
        actionName: 'Cook',
        text: `Cook ${entity || 'ingredient'} (${p.cooking || 'cooked'})`,
      };
    }
    case 'USE_INGREDIENT': {
      const entity = formatName(p.entityId);
      return {
        icon: '🥣',
        actionName: 'Use Ingredient',
        text: `Use ${entity || 'ingredient'} in recipe`,
      };
    }
    case 'UPDATE_ENTITY_STATE': {
      const entity = formatName(p.entityId);
      const changesObj = (p.changes as Record<string, unknown>) || {};
      const keys = Object.keys(changesObj).join(', ');
      return {
        icon: '✨',
        actionName: 'Update State',
        text: `Update ${keys || 'state'} for ${entity || 'entity'}`,
      };
    }
    case 'MASCOT_MOVE': {
      return {
        icon: '🤖',
        actionName: 'Mascot Move',
        text: `Mascot moves to ${formatName(p.targetContainerId)}`,
      };
    }
    case 'MASCOT_GRAB': {
      return {
        icon: '🫳',
        actionName: 'Mascot Grab',
        text: `Mascot grabs ${formatName(p.entityId)}`,
      };
    }
    case 'MASCOT_DROP': {
      return {
        icon: '⬇️',
        actionName: 'Mascot Drop',
        text: `Mascot drops item into ${formatName(p.targetContainerId)}`,
      };
    }
    case 'MASCOT_FLIP': {
      return {
        icon: '🍳',
        actionName: 'Mascot Flip',
        text: 'Mascot performs pan flip',
      };
    }
    case 'RESET_WORLD': {
      return {
        icon: '🔄',
        actionName: 'Reset World',
        text: 'Reset world state to default initial layout',
      };
    }
    default: {
      return {
        icon: '⚡',
        actionName: type || 'Action',
        text: `Execute recorded action ${type}`,
      };
    }
  }
}

/**
 * Formats an ingredient key with its current preparation and cooking state from worldStore.
 */
function formatIngredientWithState(inputKey: string): string {
  const store = worldStore.getState();

  const singularKey =
    inputKey.endsWith('es') && inputKey.length > 3
      ? inputKey.slice(0, -2)
      : inputKey.endsWith('s') && inputKey.length > 2
      ? inputKey.slice(0, -1)
      : inputKey;

  const entity = Object.values(store.entities).find(
    (e) =>
      e &&
      (e.id === inputKey ||
        e.ingredientId === inputKey ||
        e.ingredientId === singularKey ||
        e.id.startsWith(inputKey + '_') ||
        e.id.startsWith(singularKey + '_'))
  );

  const parts: string[] = [];

  if (entity?.state) {
    // Cooking state
    const cooking = entity.state.cooking as string | undefined;
    if (cooking && cooking !== 'raw') {
      if (cooking === 'fry' || cooking === 'fried' || cooking === 'cooked') {
        parts.push('cooked');
      } else {
        parts.push(cooking);
      }
    }

    // Preparation state
    const prep = entity.state.preparation as string | undefined;
    if (prep && prep !== 'whole' && prep !== 'raw') {
      parts.push(prep);
    }
  }

  // Fallback defaults for recipe step descriptions when state is not yet populated
  if (parts.length === 0) {
    if (inputKey === 'potatoes') {
      parts.push('cooked', 'sliced');
    } else if (inputKey === 'eggs') {
      parts.push('beaten');
    } else if (inputKey === 'onions') {
      parts.push('cooked', 'diced');
    }
  }

  parts.push(inputKey);
  return parts.join(' ');
}

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
    case 'combine': {
      const formattedInputs = (step.inputs || step.ingredients || []).map(formatIngredientWithState);
      const targetContainer = step.targetContainerId;
      const containerName =
        !targetContainer || targetContainer === 'bowl' || targetContainer === 'preparation_bowl'
          ? 'preparation bowl'
          : targetContainer.replace('_', ' ');
      return {
        icon: '🥣',
        text: `Mix ${formattedInputs.join(', ')} in the ${containerName} -> ${step.output || 'mixture'}`,
        actionName: step.action,
      };
    }
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

interface RecipePlayerProps {
  renderWorkspace?: (requirementsNode: React.ReactNode) => React.ReactNode;
}

export const RecipePlayer: React.FC<RecipePlayerProps> = ({ renderWorkspace }) => {
  const { t } = useTranslation();
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(recipes[0]?.id || 'concebolla');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1); // 0.5, 1, 2, 3
  const [isIngredientsCollapsed, setIsIngredientsCollapsed] = useState<boolean>(false);

  // WorldStore recording state
  const isRecording = useStore(worldStore, (state) => state.isRecording);
  const recordedActions = useStore(worldStore, (state) => state.recordedActions);
  const recordedDownloadUrl = useStore(worldStore, (state) => state.recordedDownloadUrl);
  const recordedFilename = useStore(worldStore, (state) => state.recordedFilename);
  const startRecording = useStore(worldStore, (state) => state.startRecording);
  const stopRecording = useStore(worldStore, (state) => state.stopRecording);
  const chefMascot = useStore(worldStore, (state) => state.entities['chef']);

  const [isPlateNameModalOpen, setIsPlateNameModalOpen] = useState<boolean>(false);
  const [plateInitialDishName, setPlateInitialDishName] = useState<string>('');

  const handleStopRecordingRequest = () => {
    const state = worldStore.getState();
    const plateContainer = state.containers.plate || state.containers.plato;
    const plateEntityIds = plateContainer?.entityIds || [];

    if (plateEntityIds.length > 0) {
      const firstEntity = state.entities[plateEntityIds[0]];
      const initialDishName = firstEntity?.name || 'Tortilla Española Clásica';
      setPlateInitialDishName(initialDishName);
      setIsPlateNameModalOpen(true);
    } else {
      stopRecording();
    }
  };

  const handleConfirmDishName = (dishName: string) => {
    setIsPlateNameModalOpen(false);
    stopRecording(dishName);
  };

  const handleSkipDishName = () => {
    setIsPlateNameModalOpen(false);
    stopRecording();
  };

  const prevHoldingRef = useRef<string | undefined>(undefined);

  // Listen for open/close custom events from drag-and-drop or actions
  useEffect(() => {
    const handleOpen = () => setIsIngredientsCollapsed(false);
    const handleClose = () => setIsIngredientsCollapsed(true);

    window.addEventListener('open-ingredients-list', handleOpen);
    window.addEventListener('close-ingredients-list', handleClose);

    return () => {
      window.removeEventListener('open-ingredients-list', handleOpen);
      window.removeEventListener('close-ingredients-list', handleClose);
    };
  }, []);

  // Mascot state listener: auto-open when ingredient is gonna be used, auto-close when placed
  useEffect(() => {
    const currentHolding = chefMascot?.state?.holdingEntityId as string | undefined;
    const currentTarget = chefMascot?.state?.targetContainerId as string | undefined;
    const currentSource = chefMascot?.state?.sourceContainerId as string | undefined;

    const isFetchingIngredient =
      currentTarget === 'despensa' ||
      currentSource === 'despensa' ||
      Boolean(currentHolding);

    if (isFetchingIngredient) {
      queueMicrotask(() => setIsIngredientsCollapsed(false));
    } else if (prevHoldingRef.current && !currentHolding) {
      // Ingredient was placed into workstation!
      queueMicrotask(() => setIsIngredientsCollapsed(true));
    }

    prevHoldingRef.current = currentHolding;
  }, [
    chefMascot?.state?.holdingEntityId,
    chefMascot?.state?.targetContainerId,
    chefMascot?.state?.sourceContainerId,
  ]);

  const isRecordingMode = selectedRecipeId === 'recording' || isRecording;

  const activeRecipe: Recipe = useMemo(
    () => recipes.find((r) => r.id === selectedRecipeId) || recipes[0],
    [selectedRecipeId]
  );
  const steps: RecipeStep[] = useMemo(() => activeRecipe?.steps || [], [activeRecipe]);

  const totalSteps = isRecordingMode ? recordedActions.length : steps.length;

  const runnerRef = useRef<RecipeRunner | null>(null);
  const isExecutingRef = useRef<boolean>(false);

  // Get delay in ms based on active speed multiplier
  const currentDelayMs = SPEED_DELAYS[speed] || 600;

  // Details for current step / recorded action
  const stepDetails = useMemo(() => {
    if (isRecordingMode) {
      if (recordedActions.length === 0) {
        return getActionDetails(undefined);
      }
      const activeIndex =
        currentStepIndex < recordedActions.length
          ? currentStepIndex
          : recordedActions.length - 1;
      return getActionDetails(recordedActions[activeIndex]);
    } else {
      const activeStep = steps[currentStepIndex < steps.length ? currentStepIndex : steps.length - 1];
      return getStepDetails(currentStepIndex < steps.length ? activeStep : undefined);
    }
  }, [isRecordingMode, recordedActions, steps, currentStepIndex]);

  // Synchronize required materials for active recipe in despensa container
  useEffect(() => {
    if (activeRecipe?.name) {
      worldStore.getState().setActiveRecipeName(activeRecipe.name);
    }
    if (activeRecipe?.id) {
      worldStore.getState().setActiveRecipeId(activeRecipe.id);
    }
    if (isRecordingMode) return;
    const store = worldStore.getState();
    const reqs = getRecipeRequirementsArray(activeRecipe);
    reqs.forEach((req) => {
      const existing = store.entities[req.entityId];
      if (!existing) {
        const catalogIng = ingredients.find((i) => i.id === req.entityId);
        const catalogTool = tools.find((t: { id: string }) => t.id === req.entityId);
        store.dispatch({
          type: 'ADD_ENTITY',
          payload: {
            entity: {
              id: req.entityId,
              name: req.name || catalogIng?.name || catalogTool?.name || req.entityId,
              type: (catalogTool ? 'tool' : 'ingredient') as 'tool' | 'ingredient',
              icon: catalogIng?.icon || catalogTool?.icon,
              ingredientId: req.entityId,
              state: {},
            },
            containerId: 'despensa',
          },
        });
      }
    });
  }, [activeRecipe, isRecordingMode]);

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

  // Jump to a specific target step index
  const jumpToStep = useCallback(
    async (targetIndex: number) => {
      if (isExecutingRef.current) return;
      setIsPlaying(false);

      const clampedTarget = Math.min(Math.max(0, targetIndex), totalSteps);
      isExecutingRef.current = true;

      try {
        // Reset world state to initial kitchen
        worldStore.getState().dispatch({ type: 'RESET_WORLD' });

        if (isRecordingMode) {
          // Replay recorded actions up to targetIndex
          for (let i = 0; i < clampedTarget; i++) {
            const act = recordedActions[i];
            if (act) {
              worldStore.getState().dispatch(act as unknown as WorldAction);
            }
          }
          setCurrentStepIndex(clampedTarget);
        } else {
          // Fast-forward recipe runner
          const fastRunner = new RecipeRunner({
            mascotId: 'chef',
            delayMs: 0,
          });
          fastRunner.bindRecipeContext(activeRecipe);

          for (let i = 0; i < clampedTarget; i++) {
            await fastRunner.executeStep(steps[i]);
          }

          fastRunner.delayMs = currentDelayMs;
          runnerRef.current = fastRunner;
          setCurrentStepIndex(clampedTarget);
        }
      } catch (err) {
        console.error('[RecipePlayer] Error jumping to step:', err);
      } finally {
        isExecutingRef.current = false;
      }
    },
    [activeRecipe, totalSteps, steps, currentDelayMs, isRecordingMode, recordedActions]
  );

  // Step Up (Step forward 1 step)
  const handleStepUp = useCallback(async () => {
    if (isExecutingRef.current) return;
    setIsPlaying(false);

    if (currentStepIndex >= totalSteps) return;

    isExecutingRef.current = true;

    try {
      if (isRecordingMode) {
        const act = recordedActions[currentStepIndex];
        if (act) {
          worldStore.getState().dispatch(act as unknown as WorldAction);
        }
        setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps));
      } else {
        if (!runnerRef.current || currentStepIndex === 0) {
          if (currentStepIndex === 0) {
            worldStore.getState().dispatch({ type: 'RESET_WORLD' });
          }
          runnerRef.current = new RecipeRunner({
            mascotId: 'chef',
            delayMs: currentDelayMs,
          });
          runnerRef.current.bindRecipeContext(activeRecipe);
        } else {
          runnerRef.current.delayMs = currentDelayMs;
        }

        const stepToRun = steps[currentStepIndex];
        await runnerRef.current.executeStep(stepToRun);
        setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps));
      }
    } catch (err) {
      console.error('[RecipePlayer] Error stepping up:', err);
    } finally {
      isExecutingRef.current = false;
    }
  }, [currentStepIndex, totalSteps, activeRecipe, steps, currentDelayMs, isRecordingMode, recordedActions]);

  // Step Down (Step back 1 step)
  const handleStepDown = useCallback(() => {
    if (currentStepIndex <= 0) return;
    jumpToStep(currentStepIndex - 1);
  }, [currentStepIndex, jumpToStep]);

  // Toggle Play / Pause
  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      // If at start (0) or end of steps, reset kitchen before playing
      if (currentStepIndex === 0 || currentStepIndex >= totalSteps) {
        handleReset();
      }
      setIsPlaying(true);
    }
  }, [isPlaying, currentStepIndex, totalSteps, handleReset]);

  // Decrease speed (Slow button)
  const handleSlow = useCallback(() => {
    setSpeed((prevSpeed) => {
      if (prevSpeed === 3) return 2;
      if (prevSpeed === 2) return 1;
      return 0.5;
    });
  }, []);

  // Increase speed (Fast button)
  const handleFast = useCallback(() => {
    setSpeed((prevSpeed) => {
      if (prevSpeed === 0.5) return 1;
      if (prevSpeed === 1) return 2;
      return 3;
    });
  }, []);

  // Keyboard shortcut listener for power user commands
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is focused in an input, textarea, select, or editable element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      const key = e.key;

      if (key === 'ArrowLeft' || key === 'p' || key === 'P' || key === 'j' || key === 'J') {
        e.preventDefault();
        handleStepDown();
      } else if (key === 'ArrowRight' || key === 'n' || key === 'N' || key === 'l' || key === 'L') {
        e.preventDefault();
        handleStepUp();
      } else if (key === ' ' || e.code === 'Space' || key === 'k' || key === 'K') {
        e.preventDefault();
        handleTogglePlay();
      } else if (key === 'r' || key === 'R') {
        e.preventDefault();
        handleReset();
      } else if (key === '+' || key === '=') {
        e.preventDefault();
        handleFast();
      } else if (key === '-' || key === '_') {
        e.preventDefault();
        handleSlow();
      } else if (key === 'f' || key === 'F' || key === 'c' || key === 'C') {
        e.preventDefault();
        worldStore.getState().dispatch({ type: 'MASCOT_FLIP', payload: { mascotId: 'chef' } });
        window.dispatchEvent(new CustomEvent('mascot-flip', { detail: { mascotId: 'chef' } }));
      } else if (key === '1') {
        e.preventDefault();
        worldStore.getState().dispatch({ type: 'MASCOT_MOVE', payload: { targetContainerId: 'despensa' } });
      } else if (key === '2') {
        e.preventDefault();
        worldStore.getState().dispatch({ type: 'MASCOT_MOVE', payload: { targetContainerId: 'board' } });
      } else if (key === '3') {
        e.preventDefault();
        worldStore.getState().dispatch({ type: 'MASCOT_MOVE', payload: { targetContainerId: 'sarten' } });
      } else if (key === '?' || key === 'h' || key === 'H') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('toggle-player-guide'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleStepDown, handleStepUp, handleTogglePlay, handleReset, handleFast, handleSlow]);

  // Listen for mascot flip (double click/tap on mascot) to step up in recipe player
  useEffect(() => {
    const handleMascotFlip = () => {
      handleStepUp();
    };

    window.addEventListener('mascot-flip', handleMascotFlip);
    return () => {
      window.removeEventListener('mascot-flip', handleMascotFlip);
    };
  }, [handleStepUp]);

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
        if (isRecordingMode) {
          const act = recordedActions[currentStepIndex];
          if (act) {
            worldStore.getState().dispatch(act as unknown as WorldAction);
          }
          if (!isCancelled) {
            const nextIndex = currentStepIndex + 1;
            setCurrentStepIndex(nextIndex);
            if (nextIndex >= totalSteps) {
              setIsPlaying(false);
            }
          }
        } else {
          if (!runnerRef.current || currentStepIndex === 0) {
            if (currentStepIndex === 0) {
              worldStore.getState().dispatch({ type: 'RESET_WORLD' });
            }
            runnerRef.current = new RecipeRunner({
              mascotId: 'chef',
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
        }
      } catch (err) {
        console.error('[RecipePlayer] Playback loop error:', err);
        if (!isCancelled) setIsPlaying(false);
      } finally {
        isExecutingRef.current = false;
      }
    };

    const timeoutId = setTimeout(() => {
      playNextStep();
    }, isRecordingMode ? currentDelayMs : 0);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [isPlaying, currentStepIndex, totalSteps, activeRecipe, steps, currentDelayMs, isRecordingMode, recordedActions]);

  const progressPercent = totalSteps > 0 ? Math.min(100, (currentStepIndex / totalSteps) * 100) : 0;

  const requirementsNode = (
    <div className={`recipe-requirements-section ${isIngredientsCollapsed ? 'collapsed' : ''}`} data-container-id="despensa">
      <div className="requirements-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="requirements-title">📋 {t('ui.requiredMaterials')}</span>
          <span className="requirements-subtitle" style={{ fontSize: '0.78rem', color: '#64748b' }}>
            ({getRecipeRequirementsArray(activeRecipe).length} items)
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsIngredientsCollapsed(!isIngredientsCollapsed)}
          className="ingredients-toggle-btn"
          style={{
            padding: '3px 9px',
            fontSize: '0.75rem',
            fontWeight: 600,
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#ffffff',
            color: '#334155',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          }}
        >
          {isIngredientsCollapsed ? '👁️ Show' : '🙈 Hide'}
        </button>
      </div>
      {!isIngredientsCollapsed && <RecipeRequirements requirements={getRecipeRequirementsArray(activeRecipe)} />}
    </div>
  );

  return (
    <>
      <div className="recipe-player-container">
        {/* Header Row */}
        <div className="player-header">
          <div className="recipe-select-group">
            <span className="recipe-label">{t('ui.recipe')}:</span>
            <div className="recipe-buttons">
              {recipes.map((r) => {
                const isActive = r.id === selectedRecipeId;
                const recipeIcon = r.id === 'concebolla' ? '🧅' : '🥔';
                return (
                  <button
                    key={r.id}
                    type="button"
                    className={`recipe-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleRecipeChange(r.id)}
                  >
                    <span className="recipe-btn-icon">{recipeIcon}</span>
                    <span className="recipe-btn-text">{r.name}</span>
                  </button>
                );
              })}

              {(recordedActions.length > 0 || isRecording) && (
                <button
                  type="button"
                  className={`recipe-btn recording-mode-btn ${selectedRecipeId === 'recording' ? 'active' : ''}`}
                  onClick={() => handleRecipeChange('recording')}
                >
                  <span className="recipe-btn-icon">{isRecording ? '🔴' : '🎥'}</span>
                  <span className="recipe-btn-text">
                    {isRecording
                      ? `Recording (${recordedActions.length})`
                      : `Recorded Session (${recordedActions.length})`}
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="player-status-badge">
            <span className="step-count">
              {t('replayer.stepProgress', { current: currentStepIndex, total: totalSteps })}
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

          {/* Record / Stop Recording Toggle */}
          <button
            type="button"
            className={`ctrl-btn record-btn ${isRecording ? 'is-recording' : ''}`}
            onClick={
              isRecording
                ? handleStopRecordingRequest
                : () => {
                    startRecording();
                    setSelectedRecipeId('recording');
                    setCurrentStepIndex(0);
                  }
            }
            title={
              isRecording
                ? 'Stop recording world interactions'
                : 'Record world interactions into a serialized recipe'
            }
          >
            <span className={`record-indicator ${isRecording ? 'active' : ''}`}></span>
            {isRecording ? `⏹ Stop (${recordedActions.length})` : '⏺ Record'}
          </button>

          {/* Download Recipe JSON Link */}
          {recordedDownloadUrl && (
            <a
              href={recordedDownloadUrl}
              download={recordedFilename || 'tortilla-recorded-recipe.json'}
              className="ctrl-btn download-btn"
              title="Download serialized recipe JSON file"
            >
              💾 Download Recipe (.json)
            </a>
          )}

          {/* Action Log Replayer */}
          <ActionReplayer
            onPlaybackStart={() => {
              setSelectedRecipeId('recording');
              setCurrentStepIndex(0);
            }}
          />

          {/* Kitchen Reset Button */}
          <button
            type="button"
            className="ctrl-btn reset-btn"
            onClick={handleReset}
            title="Clean the kitchen and reset all containers"
          >
            🔄 Reset Kitchen
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
            {Array.from({ length: totalSteps }).map((_, idx) => (
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

        {!renderWorkspace && requirementsNode}
      </div>
      {renderWorkspace && renderWorkspace(requirementsNode)}

      <PlateDishNameModal
        isOpen={isPlateNameModalOpen}
        initialName={plateInitialDishName}
        onConfirm={handleConfirmDishName}
        onSkip={handleSkipDishName}
      />
    </>
  );
};
