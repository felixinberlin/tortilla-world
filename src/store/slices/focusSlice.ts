/**
 * FILE: focusSlice.ts
 *
 * PURPOSE:
 * Zustand slice for managing Mascot-Centered Focus Mode state.
 *
 * RESPONSIBILITY:
 * - Stores active FocusTarget and userOverride flag.
 * - Provides setFocus and clearFocus methods.
 */

import type { StateCreator } from 'zustand/vanilla';
import type { FocusTarget } from '../../types/focus';
import type { WorldStateStore } from '../types';

export interface FocusSlice {
  focusTarget: FocusTarget;
  userOverride: boolean;
  setFocus: (target: Partial<FocusTarget>, isUserOverride?: boolean) => void;
  clearFocus: (isUserOverride?: boolean) => void;
}

export const createFocusSlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  FocusSlice
> = (set) => ({
  focusTarget: {
    mode: 'normal',
    containerId: undefined,
    entityIds: [],
  },
  userOverride: false,

  setFocus: (target, isUserOverride = false) => {
    set((draft) => {
      draft.focusTarget = {
        mode: target.mode ?? 'focused',
        containerId: target.containerId,
        entityIds: target.entityIds || [],
      };
      draft.userOverride = isUserOverride;
    });
  },

  clearFocus: (isUserOverride = false) => {
    set((draft) => {
      draft.focusTarget = {
        mode: 'normal',
        containerId: undefined,
        entityIds: [],
      };
      draft.userOverride = isUserOverride;
    });
  },
});
