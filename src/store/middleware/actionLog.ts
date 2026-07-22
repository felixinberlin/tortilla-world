import type { StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla';

export interface ActionLogEntry {
  /** The action's label, e.g. "MOVE_ENTITY". */
  action: string;
  timestamp: number;
}

const MAX_ENTRIES = 200;

let entries: ActionLogEntry[] = [];

/** Read-only snapshot of recorded world actions, oldest first. */
export function getActionLog(): ActionLogEntry[] {
  return [...entries];
}

/** Clears the recorded history. Mainly useful between tests. */
export function clearActionLog(): void {
  entries = [];
}

type ActionLogMiddleware = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  initializer: StateCreator<T, Mps, Mcs>,
) => StateCreator<T, Mps, Mcs>;

/**
 * Records every labelled `set` call into an in-memory action log — the
 * "Action Queue" docs/systems.md describes for debugging, replay, and
 * future AI compatibility.
 *
 * A reducer opts a state change into the log by passing a label as the
 * third argument to `set`, the same convention the `devtools` middleware
 * uses for naming actions in Redux DevTools:
 *
 *   set(nextState, false, 'MOVE_ENTITY')
 *
 * Intended to sit directly beneath `devtools` in the middleware stack
 * (`devtools(actionLog(initializer))`), so it observes the same labelled
 * `set` calls devtools does. Calls without a string label are forwarded
 * unlogged.
 */
export const actionLog: ActionLogMiddleware = (initializer) => (set, get, api) => {
  const loggedSet = ((partial: unknown, replace?: unknown, label?: unknown) => {
    if (typeof label === 'string') {
      entries.push({ action: label, timestamp: Date.now() });
      if (entries.length > MAX_ENTRIES) entries.shift();
    }
    return (set as (...args: unknown[]) => void)(partial, replace, label);
  }) as typeof set;

  return initializer(loggedSet, get, api);
};
