import { motion } from "framer-motion"
import type { GazePoint } from "../../systems/gaze"
import type { MascotState } from "../../systems/mascot"

interface Props {
  state: MascotState
  radius: number
  pupilOffset: { left: GazePoint; right: GazePoint }
  mouth: string
  leftEyeRef: React.RefObject<SVGCircleElement | null>
  rightEyeRef: React.RefObject<SVGCircleElement | null>
  width: number
  height: number
}

export function TortillaSvg({
  state,
  radius,
  pupilOffset,
  mouth,
  leftEyeRef,
  rightEyeRef,
  width,
  height,
}: Props) {
  return (
    <motion.svg
      viewBox="-32 -32 64 64"
      width={width}
      height={height}
      animate={state === "idle" ? { y: [0, -4, 0] } : { y: 0 }}
      transition={
        state === "idle"
          ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.2 }
      }
    >
      <defs>
        <radialGradient id="tortillaEgg" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#fff6d8" />
          <stop offset="60%" stopColor="#f2ce74" />
          <stop offset="100%" stopColor="#d9902c" />
        </radialGradient>

        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" opacity=".25" />
        </filter>
      </defs>

      {/* Tortilla thickness */}
      <ellipse cx="0" cy="7" rx={radius} ry={radius * 0.82} fill="#8b4f1b" />

      {/* Irregular tortilla body */}
      <path
        d="M -24 -16 Q -30 -4 -24 12 Q -15 27 3 25 Q 22 28 29 10 Q 33 -8 17 -22 Q -2 -31 -24 -16 Z"
        fill="url(#tortillaEgg)"
        stroke="#9b5a19"
        strokeWidth="2"
        filter="url(#shadow)"
      />

      {/* Fried golden edge */}
      <path
        d="M -24 -16 Q -30 -4 -24 12 Q -15 27 3 25 Q 22 28 29 10 Q 33 -8 17 -22"
        fill="none"
        stroke="#b96d20"
        strokeWidth="3"
        opacity=".7"
      />

      {/* Potato chunks */}
      {[[-14, -10, 5], [14, -12, 4], [-18, 10, 4], [12, 12, 5], [0, 17, 3]].map(
        ([x, y, size], i) => (
          <path
            key={i}
            d={`M ${x - size} ${y}
              Q ${x - size / 2} ${y - size} ${x} ${y - size / 1.3}
              Q ${x + size} ${y - size / 2} ${x + size} ${y}
              Q ${x + size / 2} ${y + size} ${x} ${y + size / 1.4}
              Q ${x - size} ${y + size / 2} ${x - size} ${y} Z`}
            fill="#f3d58d"
            stroke="#c68a3a"
            strokeWidth=".7"
          />
        )
      )}

      {/* Toast marks */}
      {[[-18, -17, 2], [-5, -22, 1.5], [15, -17, 2], [22, 2, 1.5], [-20, 7, 2], [5, 20, 1.5]].map(
        ([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#874514" opacity=".35" />
        )
      )}

      {/* Onion pieces */}
      <path d="M-20 0 Q-16 -5 -12 0" fill="none" stroke="#fff2d6" strokeWidth="2" />
      <path d="M16 -5 Q20 -9 23 -4" fill="none" stroke="#fff2d6" strokeWidth="2" />

      {/* Olive */}
      <motion.ellipse
        cx="0"
        cy="-25"
        rx="3"
        ry="2"
        fill="#536b28"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Eyes */}
      <circle ref={leftEyeRef} cx="-10" cy="-5" r="7" fill="#fff" />
      <circle ref={rightEyeRef} cx="10" cy="-5" r="7" fill="#fff" />

<motion.circle
  cx="-10"
  cy="-5"
  r="3"
  fill="#3b2418"
  animate={{ x: pupilOffset.left.x, y: pupilOffset.left.y }}
/>

<motion.circle
  cx="10"
  cy="-5"
  r="3"
  fill="#3b2418"
  animate={{ x: pupilOffset.right.x, y: pupilOffset.right.y }}
/>

      {/* Eye shine */}
      <circle cx="-12" cy="-8" r="1.5" fill="white" />
      <circle cx="8" cy="-8" r="1.5" fill="white" />

      {/* Mouth */}
      <path d={mouth} fill="none" stroke="#3b2418" strokeWidth="3" strokeLinecap="round" />

      {/* Blush */}
      <ellipse cx="-20" cy="5" rx="4" ry="2" fill="#ef8f8f" opacity=".35" />
      <ellipse cx="20" cy="5" rx="4" ry="2" fill="#ef8f8f" opacity=".35" />

      {/* Oil shine */}
      <path d="M-10 -15 Q0 -22 10 -15" fill="none" stroke="white" strokeWidth="2" opacity=".25" />
    </motion.svg>
  )
}
