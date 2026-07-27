/**
 * FILE: actionPlayer.ts
 *
 * PURPOSE:
 * Headless replay engine utility for sequential dispatching of recorded WorldActions.
 *
 * RESPONSIBILITY:
 * - Resets world state to initial default before playback.
 * - Dispatches actions sequentially to worldStore with configurable delay.
 * - Provides progress callbacks and cancellation mechanism.
 */

import { worldStore } from '../store/worldStore';
import type { WorldAction } from '../types/actions';

export interface PlaybackOptions {
  /** Configurable delay between action steps in milliseconds. Default: 300ms */
  delayMs?: number;
  /** Whether to reset world state before starting playback. Default: true */
  resetWorld?: boolean;
  /** Progress callback invoked after each action step */
  onStep?: (currentStep: number, totalSteps: number, action: WorldAction) => void;
  /** Callback invoked when playback successfully completes all actions */
  onComplete?: () => void;
  /** Callback invoked if playback is stopped early */
  onStop?: () => void;
}

export class ActionPlayer {
  private isPlaying = false;
  private isStopped = false;
  private timerId: ReturnType<typeof setTimeout> | null = null;
  private resolveCurrentDelay: (() => void) | null = null;

  /**
   * Returns whether playback is currently running.
   */
  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Cancels and stops ongoing action playback.
   */
  public stop(): void {
    if (!this.isPlaying) return;
    this.isStopped = true;

    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    if (this.resolveCurrentDelay) {
      this.resolveCurrentDelay();
      this.resolveCurrentDelay = null;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      this.resolveCurrentDelay = resolve;
      this.timerId = setTimeout(() => {
        this.timerId = null;
        this.resolveCurrentDelay = null;
        resolve();
      }, ms);
    });
  }

  /**
   * Replays an array of WorldActions sequentially through worldStore.
   */
  public async playLog(actions: WorldAction[], options: PlaybackOptions = {}): Promise<void> {
    if (this.isPlaying) {
      this.stop();
    }

    const {
      delayMs = 300,
      resetWorld = true,
      onStep,
      onComplete,
      onStop,
    } = options;

    this.isPlaying = true;
    this.isStopped = false;

    if (resetWorld) {
      worldStore.getState().dispatch({ type: 'RESET_WORLD' });
    }

    const total = actions.length;

    for (let i = 0; i < total; i++) {
      if (this.isStopped) {
        this.isPlaying = false;
        onStop?.();
        return;
      }

      const action = actions[i];
      worldStore.getState().dispatch(action);

      onStep?.(i + 1, total, action);

      if (i < total - 1 && delayMs > 0) {
        await this.delay(delayMs);
      }
    }

    if (this.isStopped) {
      this.isPlaying = false;
      onStop?.();
      return;
    }

    this.isPlaying = false;
    onComplete?.();
  }
}

export const actionPlayer = new ActionPlayer();
