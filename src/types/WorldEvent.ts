/**
 * FILE: WorldEvent.ts
 *
 * PURPOSE:
 * Defines strict TypeScript interfaces for the append-only Event Sourcing audit trail.
 *
 * RESPONSIBILITY:
 * - Represents immutable events recorded in the EventStore.
 */

import type { WorldAction } from './actions';

export interface BaseWorldEvent {
  id: string; // Auto-generated sequential or UUID
  timestamp: number; // Unix epoch ms
  sequenceNumber: number;
  version: number; // Default to 1
  actor: 'player' | 'mascot' | 'system';
  action: WorldAction; // Inherit your existing WorldAction union
}
