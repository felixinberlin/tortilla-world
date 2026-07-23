/**
 * FILE: actionLog.test.ts
 *
 * PURPOSE:
 * Unit tests for actionLog Zustand middleware.
 *
 * RESPONSIBILITY:
 * - Validates action recording, log size limits, and clearing behavior.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { actionLog, clearActionLog, getActionLog } from './actionLog';

interface CounterState {
  count: number;
  incrementLabelled: () => void;
  incrementUnlabelled: () => void;
}

function makeStore() {
  return createStore<CounterState>()(
    devtools(
      actionLog((set) => ({
        count: 0,
        incrementLabelled: () =>
          set((state) => ({ count: state.count + 1 }), false, 'INCREMENT'),
        incrementUnlabelled: () => set((state) => ({ count: state.count + 1 })),
      })),
      { enabled: false }
    )
  );
}

describe('actionLog middleware', () => {
  beforeEach(() => {
    clearActionLog();
  });

  it('records a labelled set call', () => {
    const store = makeStore();
    store.getState().incrementLabelled();

    const log = getActionLog();
    expect(log).toHaveLength(1);
    expect(log[0].action).toBe('INCREMENT');
    expect(store.getState().count).toBe(1);
  });

  it('does not record an unlabelled set call', () => {
    const store = makeStore();
    store.getState().incrementUnlabelled();

    expect(getActionLog()).toHaveLength(0);
    expect(store.getState().count).toBe(1);
  });

  it('caps the log at 200 entries, dropping the oldest first', () => {
    const store = makeStore();
    for (let i = 0; i < 205; i++) {
      store.getState().incrementLabelled();
    }

    const log = getActionLog();
    expect(log).toHaveLength(200);
    expect(store.getState().count).toBe(205);
  });

  it('clearActionLog empties the log', () => {
    const store = makeStore();
    store.getState().incrementLabelled();
    clearActionLog();

    expect(getActionLog()).toHaveLength(0);
  });
});
