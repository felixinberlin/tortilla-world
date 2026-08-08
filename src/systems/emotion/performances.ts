/**
 * FILE: performances.ts
 *
 * PURPOSE:
 * Predefined Emotion Performance definitions and scaling utilities.
 */

import type {
  MascotEmotion,
  EmotionPerformance,
  EmotionContext,
  EmotionPhase,
} from '../../types/emotion';

export const EMOTION_PERFORMANCES: Record<MascotEmotion, EmotionPerformance> = {
  happy: {
    emotion: 'happy',
    duration: 1500,
    phases: [
      {
        duration: 200,
        eyes: { target: 'player', eyebrows: 'raised' },
        mouth: 'smile',
        body: { squash: 0, stretch: 0, wobble: 0 },
        arms: { left: 'idle', right: 'idle' },
      },
      {
        duration: 100,
        body: { squash: 0.3, stretch: 0 },
        mouth: 'smile',
        arms: { left: 'raise', right: 'raise' },
      },
      {
        duration: 300,
        body: { bounce: 0.5, stretch: 0.4, squash: 0 },
        mouth: 'smile',
        arms: { left: 'raise', right: 'raise' },
      },
      {
        duration: 200,
        body: { bounce: 0.1, stretch: 0.1, squash: 0.2 },
        mouth: 'smile',
        arms: { left: 'idle', right: 'idle' },
      },
      {
        duration: 700,
        body: { wobble: 0.2, bounce: 0 },
        mouth: 'smile',
        arms: { left: 'idle', right: 'idle' },
      },
    ],
  },

  excited: {
    emotion: 'excited',
    duration: 1600,
    phases: [
      {
        duration: 300,
        eyes: { target: 'target', eyebrows: 'raised' },
        mouth: 'smile',
        body: { squash: 0.6 },
        arms: { left: 'reach', right: 'reach' },
      },
      {
        duration: 300,
        movement: { jump: true },
        body: { bounce: 0.9, stretch: 0.8 },
        arms: { left: 'celebrate', right: 'celebrate' },
        mouth: 'open',
      },
      {
        duration: 300,
        body: { squash: 0.7, bounce: 0 },
        mouth: 'wide_open',
        arms: { left: 'celebrate', right: 'celebrate' },
      },
      {
        duration: 300,
        body: { wobble: 0.6 },
        mouth: 'laughing',
        arms: { left: 'wave', right: 'wave' },
      },
      {
        duration: 400,
        body: { squash: 0, stretch: 0, wobble: 0.1 },
        mouth: 'smile',
        arms: { left: 'idle', right: 'idle' },
      },
    ],
  },

  worried: {
    emotion: 'worried',
    duration: 1500,
    phases: [
      {
        duration: 300,
        eyes: { target: 'pan', eyebrows: 'lowered' },
        movement: { retreat: true },
        mouth: 'open',
        body: { wobble: 0.2 },
        arms: { left: 'cover_face', right: 'point' },
      },
      {
        duration: 500,
        eyes: { target: 'pan', eyebrows: 'lowered' },
        mouth: 'trembling',
        body: { shake: 0.6, wobble: 0.4 },
        arms: { left: 'tremble', right: 'point' },
        dialogue: '¡Cuidado!',
      },
      {
        duration: 700,
        eyes: { target: 'player', eyebrows: 'sad' },
        mouth: 'surprised',
        body: { shake: 0.2, wobble: 0.1 },
        arms: { left: 'cover_face', right: 'shrug' },
      },
    ],
  },

  sad: {
    emotion: 'sad',
    duration: 1600,
    phases: [
      {
        duration: 400,
        eyes: { target: 'target', eyebrows: 'sad' },
        mouth: 'frown',
        body: { stretch: 0.1, stiffness: 0.3 },
        arms: { left: 'shrug', right: 'shrug' },
      },
      {
        duration: 600,
        eyes: { target: 'target', eyebrows: 'sad' },
        mouth: 'pout',
        body: { squash: 0.3, stiffness: 0.1 },
        arms: { left: 'idle', right: 'idle' },
      },
      {
        duration: 600,
        eyes: { target: 'player', eyebrows: 'sad' },
        mouth: 'frown',
        body: { wobble: 0.2 },
        arms: { left: 'idle', right: 'idle' },
      },
    ],
  },

  angry: {
    emotion: 'angry',
    duration: 1200,
    phases: [
      {
        duration: 300,
        eyes: { target: 'player', eyebrows: 'angry' },
        mouth: 'frown',
        body: { stiffness: 0.9, shake: 0.3 },
        arms: { left: 'cross', right: 'cross' },
      },
      {
        duration: 400,
        eyes: { target: 'player', eyebrows: 'angry' },
        mouth: 'pout',
        body: { shake: 0.7, squash: 0.4 },
        arms: { left: 'cross', right: 'point' },
        dialogue: '¡Oye!',
      },
      {
        duration: 500,
        eyes: { target: 'player', eyebrows: 'angry' },
        mouth: 'frown',
        body: { wobble: 0.3 },
        arms: { left: 'idle', right: 'idle' },
      },
    ],
  },

  proud: {
    emotion: 'proud',
    duration: 1600,
    phases: [
      {
        duration: 400,
        eyes: { target: 'finished_dish', eyebrows: 'raised' },
        mouth: 'smile',
        body: { stretch: 0.5 },
        arms: { left: 'raise', right: 'raise' },
      },
      {
        duration: 600,
        eyes: { target: 'finished_dish', eyebrows: 'neutral' },
        mouth: 'smile',
        body: { bounce: 0.3, stretch: 0.2 },
        arms: { left: 'celebrate', right: 'celebrate' },
      },
      {
        duration: 600,
        eyes: { target: 'player', eyebrows: 'raised' },
        mouth: 'smile',
        body: { wobble: 0.2 },
        arms: { left: 'idle', right: 'idle' },
        dialogue: '¡Perfecto!',
      },
    ],
  },

  curious: {
    emotion: 'curious',
    duration: 1500,
    phases: [
      {
        duration: 400,
        eyes: { target: 'target', eyebrows: 'raised' },
        mouth: 'open',
        body: { wobble: 0.3 },
        arms: { left: 'reach', right: 'idle' },
      },
      {
        duration: 500,
        eyes: { target: 'target', eyebrows: 'raised' },
        mouth: 'surprised',
        body: { wobble: 0.4, stretch: 0.2 },
        arms: { left: 'reach', right: 'point' },
      },
      {
        duration: 600,
        eyes: { target: 'player', eyebrows: 'neutral' },
        mouth: 'smile',
        body: { wobble: 0.1 },
        arms: { left: 'idle', right: 'idle' },
      },
    ],
  },

  sleepy: {
    emotion: 'sleepy',
    duration: 2000,
    phases: [
      {
        duration: 1000,
        eyes: { target: 'none', eyebrows: 'neutral' },
        mouth: 'neutral',
        body: { squash: 0.2, wobble: 0.1 },
        arms: { left: 'idle', right: 'idle' },
      },
      {
        duration: 1000,
        eyes: { target: 'none', eyebrows: 'neutral' },
        mouth: 'open',
        body: { squash: 0.1 },
        arms: { left: 'idle', right: 'idle' },
      },
    ],
  },

  neutral: {
    emotion: 'neutral',
    duration: 1000,
    phases: [
      {
        duration: 1000,
        eyes: { target: 'player', eyebrows: 'neutral' },
        mouth: 'smile',
        body: { squash: 0, stretch: 0, wobble: 0, bounce: 0, shake: 0 },
        arms: { left: 'idle', right: 'idle' },
      },
    ],
  },
};

/**
 * Creates a performance scaled by context intensity and target/dialogue overrides.
 */
export function getScaledPerformance(
  emotion: MascotEmotion,
  context?: EmotionContext
): EmotionPerformance {
  const basePerf = EMOTION_PERFORMANCES[emotion] || EMOTION_PERFORMANCES.neutral;
  const intensity = context?.intensity ?? 1.0;

  const phases: EmotionPhase[] = basePerf.phases.map((phase) => {
    const scaledBody = phase.body
      ? {
          squash: phase.body.squash !== undefined ? phase.body.squash * intensity : undefined,
          stretch: phase.body.stretch !== undefined ? phase.body.stretch * intensity : undefined,
          wobble: phase.body.wobble !== undefined ? phase.body.wobble * intensity : undefined,
          bounce: phase.body.bounce !== undefined ? phase.body.bounce * intensity : undefined,
          shake: phase.body.shake !== undefined ? phase.body.shake * intensity : undefined,
          stiffness: phase.body.stiffness,
          impulse: phase.body.impulse,
        }
      : undefined;

    const eyeTarget = context?.target || phase.eyes?.target;
    const dialogueText = context?.dialogue || (typeof phase.dialogue === 'string' ? phase.dialogue : phase.dialogue?.text);

    return {
      ...phase,
      body: scaledBody,
      eyes: phase.eyes ? { ...phase.eyes, target: eyeTarget } : undefined,
      movement: phase.movement
        ? { ...phase.movement, targetContainerId: context?.target || phase.movement.targetContainerId }
        : undefined,
      dialogue: dialogueText ? { text: dialogueText, duration: phase.duration } : undefined,
    };
  });

  return {
    emotion,
    duration: basePerf.duration,
    phases,
  };
}
