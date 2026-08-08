import { renderToString } from 'react-dom/server';
import { describe, it, expect, beforeEach } from 'vitest';
import { MascotBodyMock } from './MascotBodyMock';
import { useEmotionStore } from '../../store/emotionStore';

describe('MascotBodyMock Component', () => {
  beforeEach(() => {
    useEmotionStore.getState().stopPerformance();
  });

  it('renders children within mascot-body-wrapper', () => {
    const html = renderToString(
      <MascotBodyMock>
        <div data-testid="svg-child">SVG</div>
      </MascotBodyMock>
    );

    expect(html).toContain('SVG');
    expect(html).toContain('mascot-body-wrapper');
  });

  it('applies correct CSS transform matrix for body intent values', () => {
    const customIntent = {
      squash: 0.4,
      stretch: 0.2,
      bounce: 0.5,
      wobble: 0.3,
      shake: 0,
    };

    const html = renderToString(
      <MascotBodyMock bodyIntent={customIntent}>
        <div>Content</div>
      </MascotBodyMock>
    );

    // Expected values:
    // scaleX = 1 + 0.4 - (0.2 * 0.5) = 1.3
    // scaleY = 1 + 0.2 - (0.4 * 0.5) = 1.0
    // translateY = 0.5 * -20 = -10px
    // rotate = 0.3 * 10 = 3deg
    expect(html).toContain('translateY(-10px)');
    expect(html).toContain('scale(1.3, 1)');
    expect(html).toContain('rotate(3deg)');
    expect(html).toContain('transform-origin:bottom center');
  });
});

