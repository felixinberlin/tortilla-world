export interface GazePoint {
  x: number
  y: number
}

/** Anything with a measurable screen position can be a gaze target: a point, or a DOM-ish element. */
export interface BoundsSource {
  getBoundingClientRect: () => { left: number; top: number; width: number; height: number }
}

export type GazeTarget = GazePoint | BoundsSource

function hasBounds(target: GazeTarget): target is BoundsSource {
  return typeof (target as BoundsSource).getBoundingClientRect === 'function'
}

/**
 * Resolves any gaze target down to a screen-space point.
 * - a point -> itself
 * - an element (or anything with getBoundingClientRect, real DOM node or
 *   fake) -> the center of its bounding rect
 *
 * This is what lets the mascot look at the mouse, a dragged ingredient,
 * or the pan interchangeably — they're all just "things with a position."
 */
export function eyesFollowElement(target: GazeTarget): GazePoint {
  if (hasBounds(target)) {
    const rect = target.getBoundingClientRect()
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
  }
  return target
}

/**
 * Pure: how far a pupil should shift toward a target, given the eye's
 * own screen position. Direction is preserved, magnitude is clamped to
 * maxOffset so the pupil never leaves the eye socket.
 */
export function resolveGaze(eyeCenter: GazePoint, target: GazePoint, maxOffset: number): GazePoint {
  const dx = target.x - eyeCenter.x
  const dy = target.y - eyeCenter.y
  const distance = Math.hypot(dx, dy)

  if (distance === 0) return { x: 0, y: 0 }

  const clamped = Math.min(distance, maxOffset)
  return {
    x: (dx / distance) * clamped,
    y: (dy / distance) * clamped,
  }
}