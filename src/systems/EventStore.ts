/**
 * FILE: EventStore.ts
 *
 * PURPOSE:
 * Headless, append-only Event Store for audit trails, state logging, and replays.
 *
 * RESPONSIBILITY:
 * - Records every dispatched WorldAction wrapped in metadata.
 * - Provides methods for querying, exporting, importing, and clearing event logs.
 */

import type { WorldAction } from '../types/actions';
import type { BaseWorldEvent } from '../types/WorldEvent';

export class EventStore {
  private events: BaseWorldEvent[] = [];
  private sequenceNumber = 0;

  /**
   * Appends a new WorldAction to the immutable audit trail.
   */
  public emit(action: WorldAction, actor?: 'player' | 'mascot' | 'system'): void {
    this.sequenceNumber += 1;
    const resolvedActor = actor || this.determineActor(action);

    const event: BaseWorldEvent = {
      id: `evt_${Date.now()}_${this.sequenceNumber}`,
      timestamp: Date.now(),
      sequenceNumber: this.sequenceNumber,
      version: 1,
      actor: resolvedActor,
      action,
    };

    this.events.push(Object.freeze(event));
  }

  /**
   * Returns a read-only list of recorded events.
   */
  public getEvents(): readonly BaseWorldEvent[] {
    return this.events;
  }

  /**
   * Resets the event store log and sequence counter.
   */
  public clear(): void {
    this.events = [];
    this.sequenceNumber = 0;
  }

  /**
   * Exports the event history as a JSON string.
   */
  public exportJSON(): string {
    return JSON.stringify(this.events, null, 2);
  }

  /**
   * Hydrates the event store from a serialized JSON string.
   */
  public importJSON(jsonString: string): void {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      throw new Error('[EventStore] Invalid JSON: Expected an array of BaseWorldEvent objects.');
    }

    this.events = parsed.map((evt: BaseWorldEvent) => Object.freeze({ ...evt }));
    const maxSeq = this.events.reduce((max, evt) => Math.max(max, evt.sequenceNumber || 0), 0);
    this.sequenceNumber = maxSeq > 0 ? maxSeq : this.events.length;
  }

  private determineActor(action: WorldAction): 'player' | 'mascot' | 'system' {
    if (action.type.startsWith('MASCOT_')) {
      return 'mascot';
    }
    if (action.type === 'RESET_WORLD') {
      return 'system';
    }
    return 'player';
  }
}

export const eventStore = new EventStore();
