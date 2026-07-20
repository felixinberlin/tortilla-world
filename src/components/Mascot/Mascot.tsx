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

  // Generate random potato chunks for decoration
  const potatoChunks = useMemo(() => {
    const chunks = []
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + Math.random() * 0.5
      const distance = radius * 0.6 + Math.random() * radius * 0.3
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance
      const size = 4 + Math.random() * 5
      chunks.push({ x, y, size, rotation: Math.random() * Math.PI * 2 })
    }
    return chunks
  }, [radius])

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
        {/* Base tortilla - golden brown with texture */}
        <defs>
          <radialGradient id="tortillaGradient" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f5d78c" />
            <stop offset="40%" stopColor="#e8b84b" />
            <stop offset="80%" stopColor="#d4942a" />
            <stop offset="100%" stopColor="#b8781e" />
          </radialGradient>
          <radialGradient id="eggGradient" cx="30%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#fff5e0" />
            <stop offset="60%" stopColor="#f5d78c" />
            <stop offset="100%" stopColor="#e8b84b" />
          </radialGradient>
          <pattern id="texturePattern" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="#c8862c" opacity="0.3" />
            <circle cx="3" cy="3" r="0.5" fill="#c8862c" opacity="0.2" />
          </pattern>
        </defs>

        {/* Main tortilla body */}
        <circle cx="0" cy="0" r={radius} fill="url(#tortillaGradient)" stroke="#a0651a" strokeWidth="3" />
        
        {/* Texture pattern overlay */}
        <circle cx="0" cy="0" r={radius} fill="url(#texturePattern)" opacity="0.5" />

        {/* Golden brown crust edge */}
        <circle cx="0" cy="0" r={radius} fill="none" stroke="#b8781e" strokeWidth="6" opacity="0.3" />

        {/* Potato chunks scattered around */}
        {potatoChunks.map((chunk, i) => (
          <g key={i} transform={`translate(${chunk.x}, ${chunk.y}) rotate(${chunk.rotation})`}>
            <rect
              x={-chunk.size / 2}
              y={-chunk.size / 2}
              width={chunk.size}
              height={chunk.size * 1.3}
              rx={chunk.size * 0.4}
              fill="#f5deb3"
              stroke="#d4a574"
              strokeWidth="0.5"
              opacity={0.9}
            />
            <rect
              x={-chunk.size / 2 + 1}
              y={-chunk.size / 2 + 1}
              width={chunk.size - 2}
              height={chunk.size * 1.3 - 2}
              rx={chunk.size * 0.3}
              fill="#faf0d7"
              opacity={0.4}
            />
          </g>
        ))}

        {/* Egg white patches */}
        <ellipse cx="-8" cy="8" rx="10" ry="7" fill="url(#eggGradient)" opacity="0.4" transform="rotate(-20, -8, 8)" />
        <ellipse cx="12" cy="-10" rx="8" ry="6" fill="url(#eggGradient)" opacity="0.35" transform="rotate(15, 12, -10)" />
        <ellipse cx="0" cy="16" rx="7" ry="5" fill="url(#eggGradient)" opacity="0.3" transform="rotate(-10, 0, 16)" />

        {/* Small onion pieces */}
        <circle cx="-18" cy="-12" r="2.5" fill="#e8c9b0" stroke="#d4a574" strokeWidth="0.5" opacity="0.6" />
        <circle cx="16" cy="16" r="2" fill="#e8c9b0" stroke="#d4a574" strokeWidth="0.5" opacity="0.5" />
        <circle cx="20" cy="-8" r="2" fill="#e8c9b0" stroke="#d4a574" strokeWidth="0.5" opacity="0.4" />

        {/* Eyes */}
        <circle ref={leftEyeRef} cx="-10" cy="-6" r="6" fill="#fffdf8" stroke="#d4942a" strokeWidth="1.5" />
        <circle ref={rightEyeRef} cx="10" cy="-6" r="6" fill="#fffdf8" stroke="#d4942a" strokeWidth="1.5" />

        {/* Pupils */}
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

        {/* Eye highlights */}
        <circle cx="-12" cy="-8" r="1.5" fill="white" opacity="0.8" />
        <circle cx="8" cy="-8" r="1.5" fill="white" opacity="0.8" />

        {/* Mouth */}
        <path d={mouth} fill="none" stroke="#4a2c14" strokeWidth="3" strokeLinecap="round" />

        {/* Cute blush marks */}
        <ellipse cx="-18" cy="4" rx="4" ry="2.5" fill="#f5a0a0" opacity="0.3" />
        <ellipse cx="18" cy="4" rx="4" ry="2.5" fill="#f5a0a0" opacity="0.3" />

        {/* Tiny olive oil drop on top */}
        <motion.circle
          cx="0"
          cy="-22"
          r="1.5"
          fill="#f5d78c"
          opacity={0.6}
          animate={state === 'idle' ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.path
          d="M0,-24 Q-2,-26 0,-28 Q2,-26 0,-24"
          fill="#f5d78c"
          opacity={0.4}
          animate={state === 'idle' ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.svg>
    </motion.div>
  )
}