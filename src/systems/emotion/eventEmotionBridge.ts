/**
 * FILE: eventEmotionBridge.ts
 *
 * PURPOSE:
 * Listens to WorldEvents emitted by the worldStore and triggers coordinated
 * Emotion Performances on the mascot based on gameplay events.
 */

import { worldStore } from '../../store/worldStore';
import { useEmotionStore } from '../../store/emotionStore';
import type { WorldEvent } from '../../types/world';

export function setupEmotionBridge(): () => void {
  const unsubscribe = worldStore.getState().onEvent((event: WorldEvent) => {
    const playEmotion = useEmotionStore.getState().playEmotion;

    switch (event.type) {
      case 'CONTAINER_COOKED':
        playEmotion('proud', { target: event.payload.containerId, dialogue: '¡Huelemuy bien!' });
        break;

      case 'CONTAINER_MIXED':
        playEmotion('happy', { target: event.payload.containerId });
        break;

      case 'EGG_SEPARATED':
        playEmotion('excited', { target: event.payload.containerId, dialogue: '¡Lema y clara!' });
        break;

      case 'CONTAINER_HEAT_TOGGLED':
        if (event.payload.isOn) {
          playEmotion('curious', { target: event.payload.containerId });
        }
        break;

      case 'TRASH_EMPTIED':
        playEmotion('sad', { dialogue: '¡Limpio!' });
        break;

      case 'CONTAINER_CUT':
        playEmotion('curious', { target: event.payload.containerId });
        break;

      case 'CONTAINER_PEELED':
        playEmotion('happy', { target: event.payload.containerId });
        break;

      case 'CONTAINER_WASHED':
        playEmotion('happy', { target: event.payload.containerId });
        break;

      default:
        break;
    }
  });

  return unsubscribe;
}
