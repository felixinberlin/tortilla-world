/**
 * FILE: replayEngine.ts
 *
 * PURPOSE:
 * Deterministic replay engine for Tortilla World event logs.
 *
 * RESPONSIBILITY:
 * - Wipes the world state clean and re-executes actions sequentially from an event stream.
 */

import type { BaseWorldEvent } from '../types/WorldEvent';
import { worldStore } from '../store/worldStore';
import { eventStore } from './EventStore';

/**
 * Replays an array of BaseWorldEvents onto a clean world store state.
 */
export function replayEvents(events: readonly BaseWorldEvent[]): void {
  // 1. Wipe current worldStore state clean
  worldStore.getState().resetWorld();

  // 2. Clear eventStore log so replayed actions rebuild the audit trail
  eventStore.clear();

  // 3. Sort events by sequence number
  const sortedEvents = [...events].sort((a, b) => a.sequenceNumber - b.sequenceNumber);

  // 4. Iterate through sequence and dispatch each action
  for (const event of sortedEvents) {
    worldStore.getState().dispatch(event.action);
  }
}
