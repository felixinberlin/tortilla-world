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

export interface RecordSlice {
  isRecording: boolean;
  recordingStartTime: number | null;
  recordedActions: RecordedAction[];
  initialRecordingState: SerializedWorldState | null;
  recordedDownloadUrl: string | null;
  recordedFilename: string | null;

  startRecording: () => void;
  stopRecording: () => void;
  recordAction: (action: WorldAction) => void;
  clearRecording: () => void;
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
    });
  },

  stopRecording: () => {
    const { isRecording, recordingStartTime, recordedActions, initialRecordingState, recordedDownloadUrl } = get();
    if (!isRecording) return;

    if (recordedDownloadUrl) {
      URL.revokeObjectURL(recordedDownloadUrl);
    }

    const { entities, containers } = get();
    const finalState = JSON.parse(
      JSON.stringify({
        entities,
        containers,
      })
    );

    const durationMs = Date.now() - (recordingStartTime || Date.now());
    const exportData: SerializedRecipeExport = {
      version: '1.0.0',
      title: 'Recorded Tortilla Recipe',
      recordedAt: new Date().toISOString(),
      durationMs,
      actionCount: recordedActions.length,
      initialState: initialRecordingState || { entities: {}, containers: {} },
      finalState,
      actions: recordedActions,
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
      state.initialRecordingState = null;
      state.recordedDownloadUrl = null;
      state.recordedFilename = null;
    });
  },
});
