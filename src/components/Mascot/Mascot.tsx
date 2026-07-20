import { useState, useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { useWorldStore } from '../../store/worldStore'
import { useGazeStore } from '../../store/gazeStore'
import { MASCOT_ID, tortilla } from '../../systems/mascot'
import type { MascotState } from '../../systems/mascot'
import { eyesFollowElement, resolveGaze } from '../../systems/gaze'
import type { GazePoint } from '../../systems/gaze'
import './Mascot.css'

const MOUTH_BY_STATE: Record<MascotState, string> = {
  idle: 'M -14 6 Q 0 16 14 6',
  walking: 'M -14 6 Q 0 16 14 6',
  carrying: 'M -12 8 Q 0 10 12 8',
  cooking: 'M -14 4 Q 0 18 14 4',
  celebrating: 'M -16 2 Q 0 24 16 2',
}

const PUPIL_MAX_OFFSET = 2.5
const ZERO_OFFSET: GazePoint = { x: 0, y: 0 }

/** Tracks the mouse as a fallback gaze point. */
function useMousePosition(): GazePoint | null {
  const [position, setPosition] = useState<GazePoint | null>(null)

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return position
}

export function Mascot() {
  const entity = useWorldStore((world) => world.entities[MASCOT_ID])
  const gazeOverride = useGazeStore((gaze) => gaze.target)
  const mousePosition = useMousePosition()

  const leftEyeRef = useRef<SVGCircleElement>(null)
  const rightEyeRef = useRef<SVGCircleElement>(null)

  if (!entity) return null

  const state = entity.state as MascotState
  const mouth = MOUTH_BY_STATE[state] ?? MOUTH_BY_STATE.idle
  const radius = entity.size.width / 2 - 4

  const gazeTarget = gazeOverride ?? mousePosition

  /**
   * Compute pupil offsets WITHOUT triggering re-renders.
   * This avoids infinite loops caused by setState inside effects.
   */
  const pupilOffset = useMemo(() => {
    const left = leftEyeRef.current
    const right = rightEyeRef.current

    if (!gazeTarget || !left || !right) {
      return { left: ZERO_OFFSET, right: ZERO_OFFSET }
    }

    const resolvedTarget = eyesFollowElement(gazeTarget)

    const leftRect = left.getBoundingClientRect()
    const rightRect = right.getBoundingClientRect()

    return {
      left: resolveGaze(
        { x: leftRect.left + leftRect.width / 2, y: leftRect.top + leftRect.height / 2 },
        resolvedTarget,
        PUPIL_MAX_OFFSET,
      ),
      right: resolveGaze(
        { x: rightRect.left + rightRect.width / 2, y: rightRect.top + rightRect.height / 2 },
        resolvedTarget,
        PUPIL_MAX_OFFSET,
      ),
    }
  }, [gazeTarget, entity.position.x, entity.position.y])

  return (
    <motion.div
      className="mascot"
      data-mascot-state={state}
      style={{ width: entity.size.width, height: entity.size.height }}
      animate={{ left: entity.position.x, top: entity.position.y }}
      transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      onAnimationComplete={() => tortilla.arrived()}
    >
      <motion.svg
        viewBox="-32 -32 64 64"
        width={entity.size.width}
        height={entity.size.height}
        animate={state === 'idle' ? { y: [0, -4, 0] } : { y: 0 }}
        transition={
          state === 'idle'
            ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.2 }
        }
      >
        <circle cx="0" cy="0" r={radius} fill="#f2b84b" stroke="#c8862c" strokeWidth="3" />

        <circle ref={leftEyeRef} cx="-10" cy="-6" r="6" fill="#fffdf8" />
        <circle ref={rightEyeRef} cx="10" cy="-6" r="6" fill="#fffdf8" />

        <motion.circle
          cx="-10"
          cy="-6"
          r="3"
          fill="#4a2c14"
          animate={{ x: pupilOffset.left.x, y: pupilOffset.left.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
        <motion.circle
          cx="10"
          cy="-6"
          r="3"
          fill="#4a2c14"
          animate={{ x: pupilOffset.right.x, y: pupilOffset.right.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />

        <path d={mouth} fill="none" stroke="#4a2c14" strokeWidth="3" strokeLinecap="round" />
      </motion.svg>
    </motion.div>
  )
}
