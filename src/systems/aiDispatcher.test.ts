import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { executeAIPlan, createTortillaAIPlan } from './aiDispatcher';
import type { AIActionPlan } from './aiDispatcher';

describe('AI Action Dispatcher & Execution Queue', () => {
  beforeEach(() => {
    worldStore.setState({
      entities: {
        'knife-1': { id: 'knife-1', name: 'Knife', type: 'tool' },
        'potato-1': { id: 'potato-1', name: 'Potato', type: 'ingredient' },
        'onion-1': { id: 'onion-1', name: 'Onion', type: 'ingredient' },
        'egg-1': { id: 'egg-1', name: 'Egg', type: 'ingredient' },
      },
      containers: {
        storage: {
          id: 'storage',
          name: 'Storage',
          type: 'storage',
          entityIds: ['knife-1', 'potato-1', 'onion-1', 'egg-1'],
        },
        board: {
          id: 'board',
          name: 'Cutting Board',
          type: 'board',
          entityIds: [],
          rules: { maxCapacity: 3, allowedTypes: ['ingredient', 'tool'] },
        },
        pan: {
          id: 'pan',
          name: 'Cooking Pan',
          type: 'pan',
          entityIds: [],
          rules: { maxCapacity: 2, allowedTypes: ['ingredient'] },
        },
      },
    });
  });

  it('executes a valid AI plan successfully step by step', () => {
    const plan = createTortillaAIPlan();
    const result = executeAIPlan(plan);

    expect(result.success).toBe(true);
    expect(result.executedStepsCount).toBe(4);
    expect(worldStore.getState().containers.board.entityIds).toContain('potato-1');
    expect(worldStore.getState().containers.pan.entityIds).toContain('egg-1');
  });

  it('halts execution if an AI action step violates container capacity rules', () => {
    const overflowPlan: AIActionPlan = {
      name: 'Overflow Pan',
      steps: [
        { description: 'Add Egg 1', action: { type: 'MOVE_ENTITY', payload: { entityId: 'egg-1', targetContainerId: 'pan' } } },
        { description: 'Add Potato', action: { type: 'MOVE_ENTITY', payload: { entityId: 'potato-1', targetContainerId: 'pan' } } },
        { description: 'Add Onion (Exceeds Pan maxCapacity 2)', action: { type: 'MOVE_ENTITY', payload: { entityId: 'onion-1', targetContainerId: 'pan' } } },
      ],
    };

    const result = executeAIPlan(overflowPlan);
    expect(result.success).toBe(false);
    expect(result.executedStepsCount).toBe(2);
    expect(result.failedStepIndex).toBe(2);
    expect(result.reason).toContain('capacity reached');
  });
});
