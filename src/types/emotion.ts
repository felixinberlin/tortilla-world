/**
 * FILE: emotion.ts
 *
 * PURPOSE:
 * Domain types for the Mascot Emotion Performance System.
 */

import type { GazeTarget } from '../systems/gaze';

export type MascotEmotion =
  | 'happy'
  | 'excited'
  | 'worried'
  | 'sad'
  | 'angry'
  | 'proud'
  | 'curious'
  | 'sleepy'
  | 'neutral';

export interface BodyAction {
  squash?: number; // 0..1 scale deformation
  stretch?: number; // 0..1 scale deformation
  wobble?: number; // 0..1 rotation angle/wobble intensity
  stiffness?: number; // 0..1 physics stiffness
  bounce?: number; // 0..1 height translation
  shake?: number; // 0..1 shake frequency/amplitude
  impulse?: { x: number; y: number };
}

export type MouthState =
  | 'neutral'
  | 'smile'
  | 'frown'
  | 'open'
  | 'wide_open'
  | 'surprised'
  | 'talking'
  | 'laughing'
  | 'trembling'
  | 'pout';

export interface MouthAction {
  state: MouthState;
  d?: string;
}

export type ArmPose =
  | 'idle'
  | 'wave'
  | 'point'
  | 'raise'
  | 'cover_face'
  | 'cross'
  | 'celebrate'
  | 'reach'
  | 'tremble'
  | 'shrug';

export interface ArmAction {
  left?: ArmPose;
  right?: ArmPose;
  duration?: number;
}

export type EyebrowState = 'neutral' | 'lowered' | 'raised' | 'sad' | 'angry';

export type GazeTargetType =
  | 'player'
  | 'pan'
  | 'ingredient'
  | 'workstation'
  | 'finished_dish'
  | 'none'
  | 'mouse'
  | 'entity'
  | 'point';

export interface EyeAction {
  target?: GazeTargetType | string;
  gazeTarget?: GazeTarget;
  eyebrows?: EyebrowState;
}

export interface MovementAction {
  targetContainerId?: string;
  retreat?: boolean;
  jump?: boolean;
  offset?: { x: number; y: number };
}

export interface DialogueAction {
  text: string;
  duration?: number;
}

export interface EmotionPhase {
  duration: number; // in milliseconds
  body?: BodyAction;
  face?: { eyebrows?: EyebrowState };
  mouth?: MouthAction | MouthState;
  eyes?: EyeAction;
  arms?: ArmAction;
  movement?: MovementAction;
  dialogue?: DialogueAction | string;
}

export interface EmotionPerformance {
  emotion: MascotEmotion;
  duration: number; // total duration in ms
  phases: EmotionPhase[];
}

export interface EmotionContext {
  emotion?: MascotEmotion;
  intensity?: number; // 0.0 to 1.0, defaults to 1.0
  target?: string;
  dialogue?: string;
}

export const EMOTION_PRIORITIES: Record<MascotEmotion, number> = {
  sleepy: 1,
  neutral: 1,
  happy: 2,
  curious: 3,
  excited: 5,
  proud: 6,
  sad: 7,
  worried: 8,
  angry: 9,
};
