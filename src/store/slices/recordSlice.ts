/**
 * FILE: recordSlice.ts
 *
 * PURPOSE:
 * Zustand slice for recording user interactions into a serialized WorldState recipe.
 *
 * RESPONSIBILITY:
 * - Manages recording state (active/inactive, start time).
 * - Captures initial and final WorldState snapshots (entities + containers).
 * - Logs dispatched WorldActions with relative timestamps.
 * - Serializes recorded data into JSON blob with download URL generation.
 */

import type { StateCreator } from 'zustand/vanilla';
import type { WorldAction } from '../../types/world';
import type { RecordedAction, SerializedRecipeExport, SerializedWorldState } from '../../types/recording';
import type { WorldStateStore } from '../types';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools } from '../../data/catalog/tools';
import { filterUnusedIngredientsFromState } from '../../utils/sessionLogUtils';

export interface UsedIngredientInfo {
  id: string;
  name: string;
  icon?: string;
}

export interface RecordSlice {
  isRecording: boolean;
  recordingStartTime: number | null;
  recordedActions: RecordedAction[];
  usedIngredients: UsedIngredientInfo[];
  initialRecordingState: SerializedWorldState | null;
  recordedDownloadUrl: string | null;
  recordedFilename: string | null;

  startRecording: () => void;
  stopRecording: (customDishName?: string) => void;
  recordAction: (action: WorldAction) => void;
  clearRecording: () => void;
  setRecordedActions: (actions: RecordedAction[]) => void;
}

export const createRecordSlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  RecordSlice
> = (set, get) => ({
  isRecording: false,
  recordingStartTime: null,
  recordedActions: [],
  usedIngredients: [],
  initialRecordingState: null,
  recordedDownloadUrl: null,
  recordedFilename: null,

  startRecording: () => {
    const prevUrl = get().recordedDownloadUrl;
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
    }

    const { entities, containers } = get();

    set((state) => {
      state.isRecording = true;
      state.recordingStartTime = Date.now();
      state.recordedActions = [];
      state.usedIngredients = [];
      state.recordedDownloadUrl = null;
      state.recordedFilename = null;
      state.initialRecordingState = JSON.parse(
        JSON.stringify({
          entities,
          containers,
        })
      );
    });
  },

  recordAction: (action: WorldAction) => {
    const { isRecording, recordingStartTime } = get();
    if (!isRecording) return;

    const timestampMs = Date.now() - (recordingStartTime || Date.now());
    set((state) => {
      state.recordedActions.push({
        type: action.type,
        payload: JSON.parse(JSON.stringify(action.payload)),
        timestampMs,
      });

      // Track used ingredients / entities during recording
      const payload = action.payload || {};
      let rawEntityId: string | undefined;

      if (action.type === 'MOVE_ENTITY') {
        const target = (payload as { targetContainerId?: string }).targetContainerId;
        if (target && target !== 'despensa') {
          rawEntityId = (payload as { entityId?: string }).entityId;
        }
      } else if (action.type === 'ADD_ENTITY') {
        const target = (payload as { containerId?: string }).containerId;
        if (target && target !== 'despensa') {
          const ent = (payload as { entity?: { id?: string; ingredientId?: string } }).entity;
          rawEntityId = ent?.ingredientId || ent?.id;
        }
      } else if (['PREPARE_INGREDIENT', 'COOK_INGREDIENT', 'USE_INGREDIENT'].includes(action.type)) {
        rawEntityId = (payload as { entityId?: string }).entityId;
      }

      if (rawEntityId) {
        // Strip timestamp/unique suffix if present (e.g., "potato_1729384" -> "potato")
        const baseId = rawEntityId.split('_')[0] || rawEntityId;
        const catalogIng = ingredients.find((i) => i.id === baseId || i.id === rawEntityId);
        const catalogTool = catalogTools.find((t) => t.id === baseId || t.id === rawEntityId);

        const cleanName =
          catalogIng?.name ||
          catalogTool?.name ||
          baseId.charAt(0).toUpperCase() + baseId.slice(1).replace(/_/g, ' ');
        const icon = catalogIng?.icon || catalogTool?.icon || '📦';

        if (!state.usedIngredients.some((u) => u.id === baseId)) {
          state.usedIngredients.push({
            id: baseId,
            name: cleanName,
            icon,
          });
        }
      }
    });
  },

  stopRecording: (customDishName?: string) => {
    const { isRecording, recordingStartTime, initialRecordingState, recordedDownloadUrl } = get();
    if (!isRecording) return;

    // Apply custom dish name to entities on plate if provided
    const { entities, containers, dispatch } = get();
    const plateContainer = containers.plate || containers.plato;
    const plateEntityIds = plateContainer?.entityIds || [];

    if (customDishName && customDishName.trim() && plateEntityIds.length > 0) {
      const trimmedName = customDishName.trim();
      plateEntityIds.forEach((id) => {
        if (entities[id]) {
          dispatch({
            type: 'UPDATE_ENTITY_STATE',
            payload: {
              entityId: id,
              changes: { name: trimmedName },
            },
          });
        }
      });
    }

    if (recordedDownloadUrl) {
      URL.revokeObjectURL(recordedDownloadUrl);
    }

    // Read current state after potential dish name update dispatch
    const updatedState = get();
    const activeActions = updatedState.recordedActions;

    const rawInitState = initialRecordingState || {
      entities: updatedState.entities,
      containers: updatedState.containers,
    };
    const rawFinalState = {
      entities: updatedState.entities,
      containers: updatedState.containers,
    };

    const filteredInitState = filterUnusedIngredientsFromState(rawInitState, activeActions);
    const filteredFinalState = filterUnusedIngredientsFromState(rawFinalState, activeActions);

    const durationMs = Date.now() - (recordingStartTime || Date.now());
    const exportData: SerializedRecipeExport = {
      version: '1.0.0',
      title: 'Recorded Tortilla Recipe',
      recordedAt: new Date().toISOString(),
      durationMs,
      actionCount: activeActions.length,
      usedIngredients: updatedState.usedIngredients,
      initialState: filteredInitState,
      finalState: filteredFinalState,
      actions: activeActions,
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `tortilla-recorded-recipe-${dateStr}.json`;

    set((state) => {
      state.isRecording = false;
      state.recordedDownloadUrl = downloadUrl;
      state.recordedFilename = filename;
    });
  },

  clearRecording: () => {
    const prevUrl = get().recordedDownloadUrl;
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
    }
    set((state) => {
      state.isRecording = false;
      state.recordingStartTime = null;
      state.recordedActions = [];
      state.usedIngredients = [];
      state.initialRecordingState = null;
      state.recordedDownloadUrl = null;
      state.recordedFilename = null;
    });
  },

  setRecordedActions: (actions: RecordedAction[]) => {
    const prevUrl = get().recordedDownloadUrl;
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
    }
    set((state) => {
      state.recordedActions = actions;
      state.usedIngredients = [];
      state.recordedDownloadUrl = null;
      state.recordedFilename = null;
    });
  },
});
