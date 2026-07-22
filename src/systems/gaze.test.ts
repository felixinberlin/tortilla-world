import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { updateMascotGaze, getMascotGazeTarget } from './gaze';

describe('Gaze System', () => {
  beforeEach(() => {
    worldStore.setState({
      entities: {
        chef: {
          id: 'chef',
          name: 'Chef',
          type: 'mascot',
          state: {
            gazingAt: undefined,
          },
        },
      },
      containers: {
        bench: {
          id: 'bench',
          name: 'Workbench',
          type: 'board',
          rules: { maxCapacity: 1 },
          entityIds: [],
        },
        pan: {
          id: 'pan',
          name: 'Pan',
          type: 'pan',
          rules: { maxCapacity: Infinity },
          entityIds: [],
        },
        plate: {
          id: 'plate',
          name: 'Plate',
          type: 'storage',
          rules: { maxCapacity: Infinity },
          entityIds: [],
        },
      },
    });
  });

  it('updates mascot gaze target correctly', () => {
    updateMascotGaze('chef', 'pan');
    expect(getMascotGazeTarget('chef')).toBe('pan');
  });

  it('is idempotent when gazing at the same target', () => {
    updateMascotGaze('chef', 'pan');
    const firstState = worldStore.getState();

    updateMascotGaze('chef', 'pan');
    const secondState = worldStore.getState();

    expect(firstState).toBe(secondState);
  });
});