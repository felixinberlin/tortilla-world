/**
 * FILE: recording.ts
 *
 * PURPOSE:
 * Type definitions for serialized world state recipes and recorded user interaction sequences.
 *
 * RESPONSIBILITY:
 * - Defines the JSON schema for serialized recipe exports.
 * - Captures initial and final WorldState snapshots (entities + containers).
 * - Stores interaction sequences with relative timestamps for replay / serialization.
 */

import type { Container, Entity, WorldAction } from './world';

export interface RecordedAction {
  type: WorldAction['type'] | string;
  payload: Record<string, unknown>;
  timestampMs: number;
}

export interface SerializedWorldState {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
}

export interface SerializedRecipeExport {
  version: '1.0.0';
  title: string;
  recordedAt: string;
  durationMs: number;
  actionCount: number;
  usedIngredients?: Array<{ id: string; name: string; icon?: string }>;
  initialState: SerializedWorldState;
  finalState: SerializedWorldState;
  actions: RecordedAction[];
}
