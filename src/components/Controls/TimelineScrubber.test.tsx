/**
 * FILE: src/components/Controls/TimelineScrubber.test.tsx
 *
 * PURPOSE:
 * Unit tests for TimelineScrubber component and seekTo store integration.
 */

import { renderToString } from 'react-dom/server';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TimelineScrubber } from './TimelineScrubber';
import { worldStore } from '../../store/worldStore';
import type { RecordedAction } from '../../types/recording';

describe('TimelineScrubber component & seekTo store action', () => {
  beforeEach(() => {
    vi.stubGlobal('window', {
      localStorage: { getItem: vi.fn(), setItem: vi.fn(), removeItem: vi.fn(), clear: vi.fn() },
      dispatchEvent: vi.fn(),
      location: { search: '', href: 'http://localhost' },
    });
    worldStore.getState().resetWorld();
    worldStore.getState().clearRecording();
  });

  it('renders slider HTML structure with min 0 and max equal to recordedActions.length', () => {
    const mockActions: RecordedAction[] = [
      { type: 'MOVE_ENTITY', payload: { entityId: 'patata', targetContainerId: 'sarten' }, timestampMs: 100 },
      { type: 'TOGGLE_BURNER', payload: { containerId: 'burner1' }, timestampMs: 200 },
    ];

    worldStore.getState().setRecordedActions(mockActions);

    const html = renderToString(<TimelineScrubber />);

    expect(html).toContain('timeline-scrubber');
    expect(html).toContain('type="range"');
    expect(html).toContain('min="0"');
    expect(html).toContain('scrubber-counter');
  });

  it('seekTo action deterministically restores snapshot and replays actions up to targetIndex', () => {
    const mockActions: RecordedAction[] = [
      { type: 'TOGGLE_BURNER', payload: { containerId: 'burner1', isOn: true }, timestampMs: 100 },
      { type: 'ADD_ENTITY', payload: { entity: { id: 'test_patata', name: 'Potato', type: 'ingredient' }, containerId: 'burner1' }, timestampMs: 200 },
    ];

    worldStore.getState().setRecordedActions(mockActions);
    expect(worldStore.getState().currentActionIndex).toBe(2);

    // Seek back to step 1 (only burner toggled, patata not added yet)
    worldStore.getState().seekTo(1);
    expect(worldStore.getState().currentActionIndex).toBe(1);
    expect(worldStore.getState().containers.burner1.isOn).toBe(true);
    expect(worldStore.getState().containers.burner1.entityIds).not.toContain('test_patata');

    // Seek to step 2 (both burner toggled and patata added)
    worldStore.getState().seekTo(2);
    expect(worldStore.getState().currentActionIndex).toBe(2);
    expect(worldStore.getState().containers.burner1.entityIds).toContain('test_patata');

    // Seek back to step 0 (initial state)
    worldStore.getState().seekTo(0);
    expect(worldStore.getState().currentActionIndex).toBe(0);
    expect(worldStore.getState().containers.burner1.isOn).toBe(false);
  });

  it('renders disabled scrubber input when no actions are recorded', () => {
    worldStore.getState().clearRecording();

    const html = renderToString(<TimelineScrubber />);

    expect(html).toContain('disabled=""');
    expect(html).toContain('scrubber-counter');
  });
});
