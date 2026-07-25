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

export type WorldStateStore = {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
  events: WorldEvent[];
  dispatch: (action: WorldAction) => void;
  emitEvent: (event: WorldEvent) => void;
  onEvent: (listener: (event: WorldEvent) => void) => () => void;
  resetWorld: () => void;
} & EntitySlice &
  ContainerSlice &
  MascotSlice;