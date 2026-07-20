import { describe, it, expect } from 'vitest'
import { resolveGaze, eyesFollowElement } from './gaze'

describe('resolveGaze', () => {
  it('points toward a target straight to the right', () => {
    const offset = resolveGaze({ x: 0, y: 0 }, { x: 100, y: 0 }, 3)
    expect(offset.x).toBeCloseTo(3)
    expect(offset.y).toBeCloseTo(0)
  })

  it('points toward a target straight up', () => {
    const offset = resolveGaze({ x: 0, y: 0 }, { x: 0, y: -100 }, 3)
    expect(offset.x).toBeCloseTo(0)
    expect(offset.y).toBeCloseTo(-3)
  })

  it('does not clamp when the target is closer than maxOffset', () => {
    const offset = resolveGaze({ x: 0, y: 0 }, { x: 1, y: 0 }, 3)
    expect(offset.x).toBeCloseTo(1)
    expect(offset.y).toBeCloseTo(0)
  })

  it('clamps magnitude to maxOffset while preserving direction', () => {
    const offset = resolveGaze({ x: 0, y: 0 }, { x: 300, y: 400 }, 5)
    expect(Math.hypot(offset.x, offset.y)).toBeCloseTo(5)
    expect(offset.x / offset.y).toBeCloseTo(300 / 400)
  })

  it('returns zero offset when the target is exactly on the eye', () => {
    const offset = resolveGaze({ x: 50, y: 50 }, { x: 50, y: 50 }, 3)
    expect(offset).toEqual({ x: 0, y: 0 })
  })
})

describe('eyesFollowElement', () => {
  it('passes a plain point straight through', () => {
    expect(eyesFollowElement({ x: 12, y: 34 })).toEqual({ x: 12, y: 34 })
  })

  it('resolves an element-like target to the center of its bounding rect', () => {
    const fakeElement = {
      getBoundingClientRect: () => ({ left: 100, top: 200, width: 40, height: 20 }),
    }
    expect(eyesFollowElement(fakeElement)).toEqual({ x: 120, y: 210 })
  })
})