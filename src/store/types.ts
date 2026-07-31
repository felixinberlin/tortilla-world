/**
 * FILE: types.ts
 *
 * PURPOSE:
 * Type contract for Zustand world store and its slices.
 */

import type { Container, Entity, WorldAction, WorldEvent } from '../types/world';
import type { EntitySlice } from './slices/entitySlice';
import type { ContainerSlice } from './slices/containerSlice';
import type { MascotSlice } from './slices/mascotSlice';
import type { RecordSlice } from './slices/recordSlice';
import type { FocusSlice } from './slices/focusSlice';

export type WorldStateStore = {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
  events: WorldEvent[];
  activeRecipeName?: string;
  setActiveRecipeName: (name: string) => void;
  dispatch: (action: WorldAction) => void;
  emitEvent: (event: WorldEvent) => void;
  onEvent: (listener: (event: WorldEvent) => void) => () => void;
  resetWorld: () => void;
} & EntitySlice &
  ContainerSlice &
  MascotSlice &
  RecordSlice &
  FocusSlice;