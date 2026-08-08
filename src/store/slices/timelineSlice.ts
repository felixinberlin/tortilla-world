/**
 * FILE: timelineSlice.ts
 *
 * PURPOSE:
 * Reusable Zustand slice factory for timeline recording and playback functionality.
 */

import type { StateCreator } from 'zustand';

export interface TimelineEvent<TType extends string = string, TPayload = unknown> {
  id: string;
  type: TType;
  payload: TPayload;
  timestamp?: number;
}

export interface TimelineSlice<E extends TimelineEvent = TimelineEvent> {
  isRecording: boolean;
  isPlaying: boolean;
  currentIndex: number;
  events: E[];

  recordEvent: (event: E) => void;
  stepForward: () => void;
  setRecording: (isRecording: boolean) => void;
  resetTimeline: () => void;
}

export type TimelineStore<E extends TimelineEvent = TimelineEvent> = TimelineSlice<E> & {
  handleReplayEvent?: (event: E) => void;
};

export const createTimelineSlice = <
  E extends TimelineEvent,
  TStore extends TimelineStore<E> = TimelineStore<E>
>(): StateCreator<TStore, [], [], TimelineSlice<E>> => (set, get) => ({
  isRecording: true,
  isPlaying: false,
  currentIndex: -1,
  events: [],

  recordEvent: (event: E) => {
    const { isRecording, isPlaying } = get();
    if (!isRecording || isPlaying) return;

    set((state) => ({
      ...state,
      events: [...state.events, event],
    }));
  },

  stepForward: () => {
    const state = get();
    const nextIndex = state.currentIndex + 1;

    if (nextIndex >= state.events.length) {
      return;
    }

    const eventToReplay = state.events[nextIndex];

    set({ isPlaying: true, currentIndex: nextIndex } as unknown as Partial<TStore>);

    try {
      state.handleReplayEvent?.(eventToReplay);
    } finally {
      set({ isPlaying: false } as unknown as Partial<TStore>);
    }
  },

  setRecording: (isRecording: boolean) => {
    set({ isRecording } as unknown as Partial<TStore>);
  },

  resetTimeline: () => {
    set({
      currentIndex: -1,
      events: [],
      isPlaying: false,
    } as unknown as Partial<TStore>);
  },
});
