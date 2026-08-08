/**
 * FILE: emotionStore.ts
 *
 * PURPOSE:
 * Zustand store & sequencer for the Mascot Emotion Performance System.
 */

import { create } from 'zustand';
import type {
  MascotEmotion,
  BodyAction,
  MouthState,
  ArmAction,
  EyeAction,
  MovementAction,
  EmotionPerformance,
  EmotionContext,
} from '../types/emotion';
import { EMOTION_PRIORITIES } from '../types/emotion';
import { getScaledPerformance } from '../systems/emotion/performances';

export interface EmotionStoreState {
  currentEmotion: MascotEmotion;
  currentPriority: number;
  isPlaying: boolean;
  performance: EmotionPerformance | null;
  currentPhaseIndex: number;

  // Active Channels
  currentBodyIntent: BodyAction;
  currentMouthState: MouthState;
  currentArmAction: ArmAction;
  currentEyeAction: EyeAction;
  currentMovement: MovementAction;
  currentDialogue?: string;

  // Actions
  playEmotion: (emotion: MascotEmotion, context?: EmotionContext) => boolean;
  stopPerformance: () => void;
  resetEmotion: () => void;
}

let activeTimer: ReturnType<typeof setTimeout> | null = null;

const DEFAULT_BODY: BodyAction = { squash: 0, stretch: 0, wobble: 0, bounce: 0, shake: 0 };
const DEFAULT_MOUTH: MouthState = 'smile';
const DEFAULT_ARM: ArmAction = { left: 'idle', right: 'idle' };
const DEFAULT_EYE: EyeAction = { target: 'player', eyebrows: 'neutral' };
const DEFAULT_MOVEMENT: MovementAction = {};

export const useEmotionStore = create<EmotionStoreState>((set, get) => ({
  currentEmotion: 'neutral',
  currentPriority: 1,
  isPlaying: false,
  performance: null,
  currentPhaseIndex: 0,

  currentBodyIntent: DEFAULT_BODY,
  currentMouthState: DEFAULT_MOUTH,
  currentArmAction: DEFAULT_ARM,
  currentEyeAction: DEFAULT_EYE,
  currentMovement: DEFAULT_MOVEMENT,
  currentDialogue: undefined,

  playEmotion: (emotion: MascotEmotion, context?: EmotionContext) => {
    const state = get();
    const incomingPriority = EMOTION_PRIORITIES[emotion] ?? 1;

    // Check priority: lower priority cannot interrupt a running higher priority performance
    if (state.isPlaying && incomingPriority < state.currentPriority) {
      return false;
    }

    // Cancel existing timer if interrupting or starting new performance
    if (activeTimer) {
      clearTimeout(activeTimer);
      activeTimer = null;
    }

    const perf = getScaledPerformance(emotion, context);
    if (!perf || perf.phases.length === 0) {
      return false;
    }

    const executePhase = (phaseIndex: number) => {
      if (phaseIndex >= perf.phases.length) {
        // Performance completed
        activeTimer = null;
        set({
          isPlaying: false,
          currentEmotion: 'neutral',
          currentPriority: 1,
          performance: null,
          currentPhaseIndex: 0,
          currentBodyIntent: DEFAULT_BODY,
          currentMouthState: DEFAULT_MOUTH,
          currentArmAction: DEFAULT_ARM,
          currentEyeAction: DEFAULT_EYE,
          currentMovement: DEFAULT_MOVEMENT,
          currentDialogue: undefined,
        });
        return;
      }

      const phase = perf.phases[phaseIndex];

      let mouthState: MouthState = DEFAULT_MOUTH;
      if (phase.mouth) {
        mouthState = typeof phase.mouth === 'string' ? phase.mouth : phase.mouth.state;
      }

      const eyebrows = phase.face?.eyebrows || phase.eyes?.eyebrows || 'neutral';
      const dialogueText = typeof phase.dialogue === 'string' ? phase.dialogue : phase.dialogue?.text;

      set({
        isPlaying: true,
        currentEmotion: emotion,
        currentPriority: incomingPriority,
        performance: perf,
        currentPhaseIndex: phaseIndex,

        currentBodyIntent: phase.body ? { ...DEFAULT_BODY, ...phase.body } : DEFAULT_BODY,
        currentMouthState: mouthState,
        currentArmAction: phase.arms ? { ...DEFAULT_ARM, ...phase.arms } : DEFAULT_ARM,
        currentEyeAction: phase.eyes ? { ...DEFAULT_EYE, eyebrows, ...phase.eyes } : { ...DEFAULT_EYE, eyebrows },
        currentMovement: phase.movement ? { ...DEFAULT_MOVEMENT, ...phase.movement } : DEFAULT_MOVEMENT,
        currentDialogue: dialogueText,
      });

      activeTimer = setTimeout(() => {
        executePhase(phaseIndex + 1);
      }, phase.duration);
    };

    executePhase(0);
    return true;
  },

  stopPerformance: () => {
    if (activeTimer) {
      clearTimeout(activeTimer);
      activeTimer = null;
    }
    set({
      isPlaying: false,
      currentEmotion: 'neutral',
      currentPriority: 1,
      performance: null,
      currentPhaseIndex: 0,
      currentBodyIntent: DEFAULT_BODY,
      currentMouthState: DEFAULT_MOUTH,
      currentArmAction: DEFAULT_ARM,
      currentEyeAction: DEFAULT_EYE,
      currentMovement: DEFAULT_MOVEMENT,
      currentDialogue: undefined,
    });
  },

  resetEmotion: () => {
    get().stopPerformance();
  },
}));
