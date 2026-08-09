/**
 * FILE: src/utils/exporter.ts
 *
 * PURPOSE:
 * Export engine utility for packaging full kitchen simulation sessions as bundled ZIP archives.
 *
 * RESPONSIBILITY:
 * - Exports session data as a ZIP archive containing replay log, world snapshot, and kitchen blueprint.
 * - Pure utility function with zero React or DOM UI coupling.
 */

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { WorldStateStore } from '../store/types';

export interface ExportSessionMetadata {
  id?: string;
  title?: string;
  parentRecipeId?: string;
  timestamp?: string;
  author?: string;
  description?: string;
}

/**
 * Reads from world state and exports a complete session bundle as a ZIP file.
 */
export async function exportSessionAsZip(
  state: WorldStateStore,
  metadata?: ExportSessionMetadata
): Promise<void> {
  const zip = new JSZip();

  const meta = {
    id: metadata?.id || `remix_${Date.now()}`,
    title: metadata?.title || state.activeRecipeName || 'Tortilla World Session',
    parentRecipeId: metadata?.parentRecipeId || state.activeRecipeId || 'clasica',
    timestamp: metadata?.timestamp || new Date().toISOString(),
    author: metadata?.author || 'Chef Tortilla',
    description: metadata?.description || 'Exported interactive session from Tortilla World.',
  };

  const replayLogPayload = {
    metadata: meta,
    workspace: {
      workstationKitId: state.activeKitId || 'base',
      pantryKitId: state.activePantryKitId || 'base_pantry',
    },
    actions: state.recordedActions || [],
    usedIngredients: state.usedIngredients || [],
  };

  const worldSnapshotPayload = {
    entities: state.entities || {},
    containers: state.containers || {},
  };

  const kitchenBlueprintPayload = {
    activeKitId: state.activeKitId || 'base',
    activePantryKitId: state.activePantryKitId || 'base_pantry',
    containers: Object.keys(state.containers || {}),
  };

  zip.file('replay_log.json', JSON.stringify(replayLogPayload, null, 2));
  zip.file('world_snapshot.json', JSON.stringify(worldSnapshotPayload, null, 2));
  zip.file('kitchen_blueprint.json', JSON.stringify(kitchenBlueprintPayload, null, 2));

  const blob = await zip.generateAsync({ type: 'blob' });
  const sanitizedTitle = meta.title.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const filename = `${sanitizedTitle}_session.zip`;

  saveAs(blob, filename);
}
