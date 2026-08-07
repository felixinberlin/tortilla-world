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

import type { WorkstationKitId } from '../types/workstations';

export type WorldStateStore = {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
  events: WorldEvent[];
  activeKitId?: WorkstationKitId;
  setWorkstationKit: (kitId: WorkstationKitId) => void;
  activeRecipeName?: string;
  setActiveRecipeName: (name: string) => void;
  activeRecipeId?: string;
  setActiveRecipeId: (recipeId: string) => void;
  dispatch: (action: WorldAction) => void;
  emitEvent: (event: WorldEvent) => void;
  onEvent: (listener: (event: WorldEvent) => void) => () => void;
  resetWorld: (
    target?: WorkstationKitId | Record<string, Container>,
    customContainers?: Record<string, Container>
  ) => void;
} & EntitySlice &
  ContainerSlice &
  MascotSlice &
  RecordSlice &
  FocusSlice;