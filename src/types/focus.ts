/**
 * FILE: focus.ts
 *
 * PURPOSE:
 * Type declarations for Mascot-centered Focus Mode.
 */

export type FocusMode = 'normal' | 'focused';

export interface FocusTarget {
  containerId?: string;
  entityIds?: string[];
  mode: FocusMode;
}

export interface FocusState {
  focusTarget: FocusTarget;
  userOverride: boolean;
}

export type FocusClass = 'focus-primary' | 'focus-secondary' | 'focus-background' | '';
