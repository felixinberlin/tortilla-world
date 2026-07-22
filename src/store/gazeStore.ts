/**
 * FILE: gazeStore.ts
 *
 * PURPOSE:
 * Stores mascot gaze/attention state.
 *
 * RESPONSIBILITY:
 * - Tracks what the mascot is looking at.
 * - Provides gaze information to UI components.
 */

import { create } from 'zustand'
import type { GazeTarget } from '../systems/gaze'

interface GazeState {
  /** Whatever the mascot should be looking at right now, or null to fall back to the mouse. */
  target: GazeTarget | null
  setTarget: (target: GazeTarget | null) => void
  clearTarget: () => void
}

export const useGazeStore = create<GazeState>((set) => ({
  target: null,
  setTarget: (target) => set({ target }),
  clearTarget: () => set({ target: null }),
}))