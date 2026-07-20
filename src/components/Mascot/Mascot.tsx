import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

import { useWorldStore } from '../../store/worldStore'
import { useGazeStore } from '../../store/gazeStore'

import { MASCOT_ID, tortilla } from '../../systems/mascot'
import type { MascotState } from '../../systems/mascot'

import { eyesFollowElement, resolveGaze } from '../../systems/gaze'
import type { GazePoint } from '../../systems/gaze'

import { TortillaSvg } from "./TortillaSvg"

import './Mascot.css'


const MOUTH_BY_STATE: Record<MascotState, string> = {
  idle: 'M -14 6 Q 0 16 14 6',
  walking: 'M -14 6 Q 0 16 14 6',
  carrying: 'M -12 8 Q 0 10 12 8',
  cooking: 'M -14 4 Q 0 18 14 4',
  celebrating: 'M -16 2 Q 0 24 16 2',
}


const PUPIL_MAX_OFFSET = 2.5

const ZERO_OFFSET: GazePoint = {
  x: 0,
  y: 0,
}


/**
 * Mouse fallback gaze.
 */
function useMousePosition(): GazePoint | null {

  const [position, setPosition] =
    useState<GazePoint | null>(null)


  useEffect(() => {

    const move = (event: PointerEvent) => {

      setPosition({
        x: event.clientX,
        y: event.clientY,
      })

    }


    window.addEventListener(
      'pointermove',
      move
    )


    return () =>
      window.removeEventListener(
        'pointermove',
        move
      )

  }, [])


  return position
}



export function Mascot() {

  const entity =
    useWorldStore(
      world => world.entities[MASCOT_ID]
    )


  const gazeOverride =
    useGazeStore(
      gaze => gaze.target
    )


  const mousePosition =
    useMousePosition()


  const leftEyeRef =
    useRef<SVGEllipseElement>(null)


  const rightEyeRef =
    useRef<SVGEllipseElement>(null)


  /**
   * Click-to-scale state.
   *
   * When the user clicks anywhere on the tortilla,
   * it scales up briefly.
   */
  const [isClicked, setIsClicked] =
    useState(false)


  /**
   * Handle click anywhere on the tortilla.
   */
  const handleClick = useCallback(
    () => {
      setIsClicked(true)
      setTimeout(() => setIsClicked(false), 250)
    },
    []
  )



  if (!entity)
    return null



  const state =
    entity.state as MascotState


  const mouth =
    MOUTH_BY_STATE[state]
    ??
    MOUTH_BY_STATE.idle



  const radius =
    entity.size.width / 2 - 4



  const gazeTarget =
    gazeOverride
    ??
    mousePosition



  /**
   * Potato pieces
   *
   * Fixed positions so the mascot
   * does not randomly change every render.
   */
  const potatoes = useMemo(() => [

    { x: -15, y: -10, r: 5, rotate: -20 },
    { x: 14, y: -12, r: 4, rotate: 20 },
    { x: -18, y: 12, r: 4, rotate: 40 },
    { x: 12, y: 13, r: 5, rotate: -30 },
    { x: 2, y: 18, r: 3, rotate: 10 },

  ], [])



  /**
   * Toasted cooking marks.
   */
  const toastMarks = useMemo(() => [

    [-18, -18, 2],
    [-5, -22, 1.5],
    [15, -17, 2],
    [21, 4, 1.5],
    [-20, 8, 2],
    [5, 20, 1.5],

  ], [])



  const pupilOffset =
    useMemo(() => {


      const left =
        leftEyeRef.current


      const right =
        rightEyeRef.current



      if (
        !gazeTarget ||
        !left ||
        !right
      ) {

        return {
          left: ZERO_OFFSET,
          right: ZERO_OFFSET,
        }

      }



      const target =
        eyesFollowElement(
          gazeTarget
        )



      const leftRect =
        left.getBoundingClientRect()


      const rightRect =
        right.getBoundingClientRect()



      return {

        left:
          resolveGaze(
            {
              x: leftRect.left + leftRect.width / 2,
              y: leftRect.top + leftRect.height / 2,
            },
            target,
            PUPIL_MAX_OFFSET
          ),


        right:
          resolveGaze(
            {
              x: rightRect.left + rightRect.width / 2,
              y: rightRect.top + rightRect.height / 2,
            },
            target,
            PUPIL_MAX_OFFSET
          )

      }


    }, [
      gazeTarget,
      entity.position.x,
      entity.position.y
    ])




  return (

    <motion.div

      className="mascot"

      data-mascot-state={state}

      style={{
        width: entity.size.width,
        height: entity.size.height,
      }}

      animate={{
        left: entity.position.x,
        top: entity.position.y,
        scale: isClicked ? 1.2 : 1,
      }}

      transition={{
        left: { type: 'spring', stiffness: 120, damping: 16 },
        top: { type: 'spring', stiffness: 120, damping: 16 },
        scale: { type: 'spring', stiffness: 500, damping: 12 },
      }}

      onAnimationComplete={() =>
        tortilla.arrived()
      }

      onClick={handleClick}

    >

      <TortillaSvg
        state={state}
        radius={radius}
        pupilOffset={pupilOffset}
        mouth={mouth}
        leftEyeRef={leftEyeRef}
        rightEyeRef={rightEyeRef}
        width={entity.size.width}
        height={entity.size.height}
      />


    </motion.div>

  )

}