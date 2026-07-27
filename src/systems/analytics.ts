/**
 * FILE: analytics.ts
 *
 * PURPOSE:
 * Headless analytics and audit trail reporting utilities for EventStore event streams.
 *
 * RESPONSIBILITY:
 * - Computes recipe execution metrics (duration, step counts).
 * - Filters audit trails by actor.
 * - Exports event history to formatted CSV.
 */

import type { BaseWorldEvent } from '../types/WorldEvent';

/**
 * Computes recipe execution metrics based on an array of BaseWorldEvents.
 */
export function getRecipeMetrics(events: readonly BaseWorldEvent[]): { durationMs: number; stepCount: number } {
  const stepCount = events.length;

  if (stepCount <= 1) {
    return { durationMs: 0, stepCount };
  }

  const startTime = events[0].timestamp;
  const endTime = events[events.length - 1].timestamp;
  const durationMs = Math.max(0, endTime - startTime);

  return { durationMs, stepCount };
}

/**
 * Filters the event audit trail by actor ('player', 'mascot', 'system', or 'all').
 */
export function getAuditTrail(events: readonly BaseWorldEvent[], actor: string): BaseWorldEvent[] {
  if (!actor || actor === 'all') {
    return [...events];
  }
  return events.filter((evt) => evt.actor === actor);
}

/**
 * Converts an array of BaseWorldEvents into a valid CSV string.
 */
export function exportToCSV(events: readonly BaseWorldEvent[]): string {
  const headers = ['id', 'sequenceNumber', 'timestamp', 'version', 'actor', 'actionType', 'actionPayload'];

  const rows = events.map((evt) => {
    const actionType = evt.action.type;
    const payloadStr = 'payload' in evt.action ? JSON.stringify(evt.action.payload) : '{}';
    const escapedPayload = `"${payloadStr.replace(/"/g, '""')}"`;

    return [
      evt.id,
      evt.sequenceNumber,
      evt.timestamp,
      evt.version,
      evt.actor,
      actionType,
      escapedPayload,
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}
