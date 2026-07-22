import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';

export function useSceneDragAndDrop() {
  const containers = useStore(worldStore, (state) => Object.values(state.containers));

  return {
    containers,
  };
}