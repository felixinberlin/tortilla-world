import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useEmotionStore } from '../../store/emotionStore';
import { EMOTION_PRIORITIES } from '../../types/emotion';
import { getScaledPerformance } from './performances';

describe('Emotion Performance System', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useEmotionStore.getState().stopPerformance();
  });

  afterEach(() => {
    useEmotionStore.getState().stopPerformance();
    vi.useRealTimers();
  });

  it('plays happy emotion performance sequence correctly', () => {
    const played = useEmotionStore.getState().playEmotion('happy');
    expect(played).toBe(true);

    const state = useEmotionStore.getState();
    expect(state.isPlaying).toBe(true);
    expect(state.currentEmotion).toBe('happy');
    expect(state.currentMouthState).toBe('smile');
    expect(state.currentEyeAction.eyebrows).toBe('raised');
  });

  it('respects priority rules for emotion interruption', () => {
    // 1. Start happy (priority 2)
    useEmotionStore.getState().playEmotion('happy');
    expect(useEmotionStore.getState().currentEmotion).toBe('happy');

    // 2. Try playing sleepy (priority 1) - should be ignored
    const playedSleepy = useEmotionStore.getState().playEmotion('sleepy');
    expect(playedSleepy).toBe(false);
    expect(useEmotionStore.getState().currentEmotion).toBe('happy');

    // 3. Try playing angry (priority 9) - should interrupt happy
    const playedAngry = useEmotionStore.getState().playEmotion('angry');
    expect(playedAngry).toBe(true);
    expect(useEmotionStore.getState().currentEmotion).toBe('angry');
    expect(useEmotionStore.getState().currentPriority).toBe(EMOTION_PRIORITIES.angry);
  });

  it('advances through performance phases on timer ticks', () => {
    useEmotionStore.getState().playEmotion('excited');

    expect(useEmotionStore.getState().currentPhaseIndex).toBe(0);
    expect(useEmotionStore.getState().currentBodyIntent.squash).toBe(0.6);

    // Fast forward to phase 1 (300ms)
    vi.advanceTimersByTime(310);
    expect(useEmotionStore.getState().currentPhaseIndex).toBe(1);
    expect(useEmotionStore.getState().currentBodyIntent.bounce).toBe(0.9);
    expect(useEmotionStore.getState().currentMouthState).toBe('open');
  });

  it('scales body actions by intensity', () => {
    const scaled = getScaledPerformance('happy', { emotion: 'happy', intensity: 0.5 });
    expect(scaled.phases[1].body?.squash).toBe(0.15); // 0.3 * 0.5
  });

  it('resets to neutral after performance completes', () => {
    useEmotionStore.getState().playEmotion('angry');
    expect(useEmotionStore.getState().isPlaying).toBe(true);

    // Advance past angry duration (1200ms)
    vi.advanceTimersByTime(1300);

    const state = useEmotionStore.getState();
    expect(state.isPlaying).toBe(false);
    expect(state.currentEmotion).toBe('neutral');
    expect(state.currentBodyIntent.squash).toBe(0);
  });
});
