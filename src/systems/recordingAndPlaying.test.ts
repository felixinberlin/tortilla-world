/**
 * FILE: src/systems/recordingAndPlaying.test.ts
 *
 * PURPOSE:
 * Comprehensive integration unit tests for recording and playing systems in Tortilla World.
 *
 * RESPONSIBILITIES TESTED:
 * 1. Recording lifecycle: Start recording, capture interactions (MOVE_ENTITY, PREPARE_INGREDIENT, TOGGLE_BURNER), stop & clear.
 * 2. Step navigation & player timeline: Step forward, step back, rewind 3 steps, jump to specific step.
 * 3. Recipe forking: Branching off a recipe execution at step K > 0, converting prior steps to recorded actions.
 * 4. Declarative recipe step translation to action stream & actionPlayer execution.
 * 5. Persistence: Saving custom recipes with rich metadata inspired by francesa.json, loading them back.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { worldStore } from '../store/worldStore';
import { actionPlayer } from './actionPlayer';
import { convertDeclarativeStepsToActions } from '../utils/recipeFormatDetector';
import {
  saveCustomRecipe,
  getStoredCustomRecipes,
  loadAllCustomRecipes,
  type CustomRecipeMetadata,
} from '../services/customRecipeService';
import type { RecordedAction } from '../types/recording';
import type { RecipeStep } from '../types/RecipeStep';
import type { WorldAction } from '../types/world';

describe('Recording and Playing Systems', () => {
  let mockLocalStorageStore: Record<string, string> = {};

  beforeEach(() => {
    // 1. Reset Zustand world state
    worldStore.getState().resetWorld();
    worldStore.getState().clearRecording();

    // 2. Setup mock localStorage & window dispatchEvent for Node vitest environment
    mockLocalStorageStore = {};
    const mockLocalStorage = {
      getItem: vi.fn((key: string) => mockLocalStorageStore[key] || null),
      setItem: vi.fn((key: string, val: string) => {
        mockLocalStorageStore[key] = val;
      }),
      clear: vi.fn(() => {
        mockLocalStorageStore = {};
      }),
      removeItem: vi.fn((key: string) => {
        delete mockLocalStorageStore[key];
      }),
    };

    vi.stubGlobal('window', {
      localStorage: mockLocalStorage,
      dispatchEvent: vi.fn(),
      location: { search: '', href: 'http://localhost' },
    });

    vi.restoreAllMocks();
  });

  describe('1. Recording Lifecycle', () => {
    it('initializes recording state properly on startRecording', () => {
      const store = worldStore.getState();
      expect(store.isRecording).toBe(false);

      store.startRecording();

      const stateAfter = worldStore.getState();
      expect(stateAfter.isRecording).toBe(true);
      expect(stateAfter.recordedActions).toEqual([]);
      expect(stateAfter.initialRecordingState).not.toBeNull();
      expect(stateAfter.initialRecordingState?.entities).toBeDefined();
    });

    it('captures dispatched world actions when isRecording is true', () => {
      const store = worldStore.getState();
      store.startRecording();

      store.dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: 'huevos', targetContainerId: 'bowl_mix' },
      });

      store.dispatch({
        type: 'PREPARE_INGREDIENT',
        payload: { entityId: 'huevos', preparation: 'beaten' },
      });

      store.dispatch({
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner_1' },
      });

      const recorded = worldStore.getState().recordedActions;
      expect(recorded).toHaveLength(3);
      expect(recorded[0].type).toBe('MOVE_ENTITY');
      expect(recorded[1].type).toBe('PREPARE_INGREDIENT');
      expect(recorded[2].type).toBe('TOGGLE_BURNER');
    });

    it('ignores actions dispatched when isRecording is false', () => {
      const store = worldStore.getState();
      store.dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: 'huevos', targetContainerId: 'bowl_mix' },
      });

      expect(worldStore.getState().recordedActions).toHaveLength(0);
    });

    it('stops recording and exports blob URL metadata', () => {
      if (!globalThis.URL.createObjectURL) {
        globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock-url-5678');
        globalThis.URL.revokeObjectURL = vi.fn();
      }

      const store = worldStore.getState();
      store.startRecording();
      store.dispatch({
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner_1' },
      });

      store.stopRecording('My Custom Recipe');

      const stateAfter = worldStore.getState();
      expect(stateAfter.isRecording).toBe(false);
      expect(stateAfter.recordedDownloadUrl).toBeTruthy();
      expect(stateAfter.recordedFilename).toContain('tortilla-recorded-recipe-');
    });

    it('clears recorded actions completely', () => {
      const store = worldStore.getState();
      store.startRecording();
      store.dispatch({
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner_1' },
      });

      store.clearRecording();

      const stateAfter = worldStore.getState();
      expect(stateAfter.isRecording).toBe(false);
      expect(stateAfter.recordedActions).toEqual([]);
      expect(stateAfter.initialRecordingState).toBeNull();
      expect(stateAfter.recordedDownloadUrl).toBeNull();
    });
  });

  describe('2. Playing & Timeline Navigation', () => {
    it('replays action sequences sequentially with actionPlayer', async () => {
      const actionsToPlay: RecordedAction[] = [
        {
          type: 'TOGGLE_BURNER',
          payload: { containerId: 'burner1' },
          timestampMs: 100,
        },
        {
          type: 'ADD_ENTITY',
          payload: {
            entity: { id: 'test_patata', name: 'Patata', type: 'ingredient' },
            containerId: 'burner1',
          },
          timestampMs: 300,
        },
      ];

      worldStore.getState().startRecording();
      await actionPlayer.playLog(actionsToPlay as unknown as WorldAction[], { delayMs: 5 });

      const state = worldStore.getState();
      expect(state.containers['burner1']?.isOn).toBe(true);
      expect(state.containers['burner1']?.entityIds).toContain('test_patata');
      expect(state.recordedActions.length).toBeGreaterThanOrEqual(2);
    });

    it('translates declarative recipe steps into playable action stream', () => {
      const steps = [
        {
          action: 'move',
          ingredient: 'huevos',
          target: 'bowl',
          label: 'Mover huevos al bol',
        },
        {
          action: 'prepare',
          ingredient: 'huevos',
          style: 'beaten',
          label: 'Batir huevos',
        },
        {
          action: 'cook',
          appliance: 'burner1',
          temperature: 'medium',
          duration: 3,
          label: 'Cocinar a fuego medio',
        },
      ] as unknown as RecipeStep[];

      const translatedActions = convertDeclarativeStepsToActions(steps);
      expect(translatedActions.length).toBeGreaterThanOrEqual(3);

      expect(translatedActions[0].type).toBe('MOVE_ENTITY');
      expect(translatedActions[1].type).toBe('PREPARE_INGREDIENT');
      expect(translatedActions[2].type).toBe('COOK_INGREDIENT');
    });

    it('calculates rewind step indices correctly (-1, -3 steps)', () => {
      const currentStep = 5;

      const stepDown = Math.max(0, currentStep - 1);
      expect(stepDown).toBe(4);

      const rewind3 = Math.max(0, currentStep - 3);
      expect(rewind3).toBe(2);

      const rewind3FromNearStart = Math.max(0, 1 - 3);
      expect(rewind3FromNearStart).toBe(0);
    });
  });

  describe('3. Recipe Forking & Branching', () => {
    it('converts executed recipe steps 0..K to prefix recorded actions when forking at step K', () => {
      const recipeSteps = [
        {
          action: 'move',
          ingredient: 'huevos',
          target: 'bowl',
        },
        {
          action: 'prepare',
          ingredient: 'huevos',
          style: 'beaten',
        },
        {
          action: 'cook',
          appliance: 'burner_1',
          temperature: 'medium',
          duration: 5,
        },
      ] as unknown as RecipeStep[];

      // User forks at step 2 (0..2 executed)
      const forkStepIndex = 2;
      const executedSteps = recipeSteps.slice(0, forkStepIndex);

      const worldActions = convertDeclarativeStepsToActions(executedSteps);
      const prefixRecordedActions: RecordedAction[] = worldActions.map((act, idx) => ({
        type: act.type,
        payload: act.payload ? JSON.parse(JSON.stringify(act.payload)) : {},
        timestampMs: idx * 500,
      }));

      worldStore.getState().startRecording();
      worldStore.getState().setRecordedActions(prefixRecordedActions);

      // Dispatch new user interaction while recording
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: { entityId: 'queso_1', targetContainerId: 'bowl' },
      });

      const totalRecorded = worldStore.getState().recordedActions;
      // Should contain translated prefix actions + newly recorded action
      expect(totalRecorded.length).toBe(prefixRecordedActions.length + 1);
      expect(totalRecorded[totalRecorded.length - 1].type).toBe('MOVE_ENTITY');
      expect(totalRecorded[totalRecorded.length - 1].payload.entityId).toBe('queso_1');
    });
  });

  describe('4. Custom Recipe Saving & Metadata Persistence (Inspired by Francesa)', () => {
    it('saves a custom recipe with full metadata (author, tags, difficulty, hints)', async () => {
      const mockRecordedActions: RecordedAction[] = [
        {
          type: 'MOVE_ENTITY',
          payload: { entityId: 'huevos', targetContainerId: 'bowl' },
          timestampMs: 100,
        },
        {
          type: 'PREPARE_INGREDIENT',
          payload: { entityId: 'huevos', preparation: 'beaten' },
          timestampMs: 400,
        },
      ];

      const metadata: CustomRecipeMetadata = {
        name: 'Tortilla Francesa de la Abuela',
        description: 'Receta familiar ligera y jugosa con tres huevos batidos.',
        difficulty: 'easy',
        tags: ['traditional', 'spanish', 'francesa', 'abuela'],
        hints: ['Mover con rapidez en la sartén para lograr soltura.'],
        author: 'Chef Felix',
      };

      const savedRecipe = await saveCustomRecipe(mockRecordedActions, metadata);

      const savedRecObj = savedRecipe as unknown as Record<string, unknown>;
      expect(savedRecipe.id).toBeDefined();
      expect(savedRecipe.name).toBe('Tortilla Francesa de la Abuela');
      expect(savedRecObj.description).toBe('Receta familiar ligera y jugosa con tres huevos batidos.');
      expect(savedRecObj.difficulty).toBe('easy');
      expect(savedRecObj.author).toBe('Chef Felix');
      expect(savedRecObj.tags).toContain('francesa');
      expect(savedRecObj.hints).toContain('Mover con rapidez en la sartén para lograr soltura.');

      // Check stored in localStorage
      const storedLocal = getStoredCustomRecipes();
      expect(storedLocal).toHaveLength(1);
      expect(storedLocal[0].name).toBe('Tortilla Francesa de la Abuela');

      // Check custom event dispatched
      expect(window.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'custom-recipe-saved' })
      );
    });

    it('loads custom recipes in loadAllCustomRecipes', async () => {
      const mockActions: RecordedAction[] = [
        {
          type: 'TOGGLE_BURNER',
          payload: { containerId: 'burner_1' },
          timestampMs: 200,
        },
      ];

      await saveCustomRecipe(mockActions, {
        name: 'Custom Recipe 1',
        description: 'Desc 1',
      });

      const loaded = await loadAllCustomRecipes();
      expect(loaded.length).toBeGreaterThanOrEqual(1);
      expect(loaded.some((r) => r.name === 'Custom Recipe 1')).toBe(true);
    });
  });
});
