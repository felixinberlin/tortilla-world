/**
 * FILE: types.ts
 *
 * PURPOSE:
 * Type contract for Zustand world store and its slices.
 */

import type { Container, Entity, WorldAction } from '../types/world';
import type { EntitySlice } from './slices/entitySlice';
import type { ContainerSlice } from './slices/containerSlice';
import type { MascotSlice } from './slices/mascotSlice';

export type WorldStateStore = {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
  dispatch: (action: WorldAction) => void;
} & EntitySlice &
  ContainerSlice &
  MascotSlice;
