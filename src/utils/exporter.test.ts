/**
 * FILE: src/utils/exporter.test.ts
 */

import { describe, it, expect, vi } from 'vitest';
import { exportSessionAsZip } from './exporter';
import type { WorldStateStore } from '../store/types';

vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}));

describe('exportSessionAsZip', () => {
  it('should package replay log, world snapshot, and kitchen blueprint into ZIP and call saveAs', async () => {
    const mockState = {
      activeRecipeName: 'Test Omelette',
      activeRecipeId: 'clasica',
      activeKitId: 'base',
      activePantryKitId: 'base_pantry',
      recordedActions: [
        { type: 'MOVE_ENTITY', payload: { entityId: 'egg1', targetContainerId: 'bowl' } },
      ],
      usedIngredients: ['egg'],
      entities: {
        egg1: { id: 'egg1', name: 'Egg', type: 'ingredient' },
      },
      containers: {
        bowl: { id: 'bowl', type: 'bowl', entityIds: ['egg1'] },
      },
    } as unknown as WorldStateStore;

    const saveAsMock = (await import('file-saver')).saveAs;

    await exportSessionAsZip(mockState, { title: 'Custom Test Session' });

    expect(saveAsMock).toHaveBeenCalledTimes(1);
    const [blobArg, filenameArg] = (saveAsMock as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(blobArg).toBeInstanceOf(Blob);
    expect(filenameArg).toBe('custom_test_session_session.zip');
  });
});
