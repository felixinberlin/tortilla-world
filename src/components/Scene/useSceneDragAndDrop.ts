/**
 * FILE: useSceneDragAndDrop.ts
 *
 * PURPOSE:
 * React hook connecting drag/drop events with the game world.
 *
 * RESPONSIBILITY:
 * - Handles DnD lifecycle.
 * - Translates UI interactions into world actions.
 *
 * SHOULD NOT:
 * - Decide game rules.
 * - Directly manipulate entity collections.
 */

import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';

export function useSceneDragAndDrop() {
  const containers = useStore(worldStore, (state) => Object.values(state.containers));

  return {
    containers,
  };
}