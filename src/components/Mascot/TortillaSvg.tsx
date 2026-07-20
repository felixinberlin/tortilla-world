import { motion } from "framer-motion";
import type { GazePoint } from "../../systems/gaze";
import type { MascotState } from "../../systems/mascot";

interface Props {
  state: MascotState;
  radius: number;
  pupilOffset: { left: GazePoint; right: GazePoint };
  mouth: string;
  leftEyeRef: React.RefObject<SVGEllipseElement | null>;
  rightEyeRef: React.RefObject<SVGEllipseElement | null>;
  width: number;
  height: number;
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
  const r = radius ?? 28;

  return (
    <motion.svg
      viewBox="-40 -40 80 80"
      width={width}
      height={height}
      animate={
        state === "idle"
          ? { y: [0, -3, 0], scaleY: [1, 1.02, 1] }
          : { y: 0, scaleY: 1 }
      }
      transition={
        state === "idle"
          ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.2 }
      }
    >
      <defs>
        {/* Hauptkörper: Ei + Kartoffeln */}
        <radialGradient id="tortillaBody" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#fff8e1" />
          <stop offset="30%" stopColor="#f5d98e" />
          <stop offset="70%" stopColor="#e8b84a" />
          <stop offset="100%" stopColor="#c98a2a" />
        </radialGradient>

        {/* Gebräunter Rand */}
        <linearGradient id="crustEdge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4953a" />
          <stop offset="50%" stopColor="#b8731f" />
          <stop offset="100%" stopColor="#8b5a1a" />
        </linearGradient>

        {/* Schatten unter der Tortilla */}
        <radialGradient id="dropShadow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#5a3a0a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#5a3a0a" stopOpacity="0" />
        </radialGradient>

        {/* Öl-Glanz */}
        <linearGradient id="oilShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Kartoffel-Textur */}
        <radialGradient id="potatoChunk" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#fff5d6" />
          <stop offset="100%" stopColor="#e8c97a" />
        </radialGradient>

        {/* Zwiebel-Textur */}
        <radialGradient id="onionChunk" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f0e6d2" />
        </radialGradient>

        {/* Dampf für Cooking-State */}
        <linearGradient id="steam" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <filter id="softShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="3" opacity="0.3" />
        </filter>

        <filter id="innerGlow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* === SCHATTEN === */}
      <ellipse
        cx="2"
        cy="22"
        rx={r * 0.9}
        ry={r * 0.7}
        fill="url(#dropShadow)"
      />

      {/* === TORTILLA-DICKE (Seitenansicht) === */}
      <ellipse
        cx="0"
        cy="8"
        rx={r * 0.95}
        ry={r * 0.85}
        fill="#7a4a15"
      />

      {/* === HAUPTKÖRPER === */}
      <ellipse
        cx="0"
        cy="0"
        rx={r}
        ry={r * 0.88}
        fill="url(#tortillaBody)"
        stroke="url(#crustEdge)"
        strokeWidth="2.5"
        filter="url(#softShadow)"
      />

      {/* === GEKRÄUSELTER RAND === */}
      <path
        d="M -28 -8 
           Q -32 -2 -30 5 
           Q -28 15 -20 22 
           Q -10 28 0 27 
           Q 12 28 22 22 
           Q 30 15 31 5 
           Q 32 -5 25 -15 
           Q 15 -25 0 -26 
           Q -15 -25 -28 -8 Z"
        fill="none"
        stroke="#b8731f"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.6"
      />

      {/* === KARTOFFEL-STÜCKE (organisch, mit Schatten) === */}
      {[
        { x: -16, y: -12, rx: 7, ry: 5, rotate: -25 },
        { x: 14, y: -14, rx: 6, ry: 4.5, rotate: 35 },
        { x: -19, y: 10, rx: 5.5, ry: 4, rotate: 45 },
        { x: 16, y: 12, rx: 7, ry: 5, rotate: -40 },
        { x: 0, y: 18, rx: 5, ry: 3.5, rotate: 15 },
        { x: -8, y: -20, rx: 6, ry: 4, rotate: -10 },
        { x: 22, y: -2, rx: 4, ry: 3, rotate: 60 },
      ].map((potato, i) => (
        <g key={`potato-${i}`} transform={`rotate(${potato.rotate} ${potato.x} ${potato.y})`}>
          {/* Schatten */}
          <ellipse
            cx={potato.x + 0.5}
            cy={potato.y + 0.5}
            rx={potato.rx}
            ry={potato.ry}
            fill="#b8892a"
            opacity="0.4"
          />
          {/* Kartoffel */}
          <ellipse
            cx={potato.x}
            cy={potato.y}
            rx={potato.rx}
            ry={potato.ry}
            fill="url(#potatoChunk)"
            stroke="#d4a84a"
            strokeWidth="0.8"
          />
          {/* Highlight */}
          <ellipse
            cx={potato.x - 1}
            cy={potato.y - 1}
            rx={potato.rx * 0.4}
            ry={potato.ry * 0.3}
            fill="#ffffff"
            opacity="0.5"
          />
        </g>
      ))}

      {/* === ZWIEBEL-RINGE === */}
      {[
        { x: -22, y: -2, r: 3.5 },
        { x: 20, y: -8, r: 2.5 },
        { x: 8, y: -22, r: 2 },
        { x: -5, y: 20, r: 3 },
      ].map((onion, i) => (
        <g key={`onion-${i}`}>
          <circle
            cx={onion.x}
            cy={onion.y}
            r={onion.r}
            fill="none"
            stroke="#f5e6c8"
            strokeWidth="1.8"
            opacity="0.7"
          />
          <circle
            cx={onion.x}
            cy={onion.y}
            r={onion.r * 0.5}
            fill="none"
            stroke="#e8d5a8"
            strokeWidth="1"
            opacity="0.5"
          />
        </g>
      ))}

      {/* === GEBRÄUNTE STELLEN (Toast-Marks) === */}
      {[
        { x: -20, y: -18, rx: 3, ry: 2, rotate: 30 },
        { x: -6, y: -24, rx: 2.5, ry: 1.5, rotate: -15 },
        { x: 16, y: -19, rx: 3, ry: 2, rotate: 45 },
        { x: 23, y: 3, rx: 2, ry: 1.5, rotate: -20 },
        { x: -22, y: 6, rx: 2.5, ry: 2, rotate: 60 },
        { x: 6, y: 22, rx: 2, ry: 1.5, rotate: 10 },
        { x: 0, y: -26, rx: 2.5, ry: 1.5, rotate: 0 },
      ].map((mark, i) => (
        <ellipse
          key={`toast-${i}`}
          cx={mark.x}
          cy={mark.y}
          rx={mark.rx}
          ry={mark.ry}
          fill="#8b5a1a"
          opacity="0.35"
          transform={`rotate(${mark.rotate} ${mark.x} ${mark.y})`}
        />
      ))}

      {/* === ÖL-GLANZ (mehrere Highlights) === */}
      <path
        d="M -15 -18 Q -5 -25 8 -20"
        fill="none"
        stroke="url(#oilShine)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 10 15 Q 18 18 24 12"
        fill="none"
        stroke="url(#oilShine)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <ellipse cx="-8" cy="-16" rx="3" ry="1.5" fill="#ffffff" opacity="0.3" transform="rotate(-20 -8 -16)" />

      {/* === BASILIKUM-BLATT (als "Haarschmuck") === */}
      <g transform="translate(18, -22) rotate(25)">
        <path
          d="M 0 0 Q -4 -8 0 -14 Q 4 -8 0 0 Z"
          fill="#5a8f3a"
          stroke="#4a7a2e"
          strokeWidth="0.8"
        />
        <path
          d="M 0 0 L 0 -12"
          fill="none"
          stroke="#4a7a2e"
          strokeWidth="0.5"
        />
        <ellipse cx="-1.5" cy="-5" rx="1" ry="0.8" fill="#6ba84a" opacity="0.7" />
        <ellipse cx="1.5" cy="-9" rx="0.8" ry="0.6" fill="#6ba84a" opacity="0.7" />
      </g>

      {/* === DAMPF (nur im Cooking-State) === */}
      {state === "cooking" && (
        <>
          <motion.path
            d="M -10 -28 Q -15 -38 -8 -45"
            fill="none"
            stroke="url(#steam)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: [0, 0.7, 0], y: [-2, -8, -15], x: [0, 3, -2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.path
            d="M 5 -30 Q 10 -40 3 -48"
            fill="none"
            stroke="url(#steam)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: [0, 0.6, 0], y: [-2, -10, -18], x: [0, -3, 2] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.7 }}
          />
          <motion.path
            d="M 0 -32 Q -5 -42 2 -50"
            fill="none"
            stroke="url(#steam)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: [0, 0.5, 0], y: [-2, -12, -20], x: [0, 4, -3] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 1.4 }}
          />
        </>
      )}

      {/* === GESICHT === */}

      {/* Wangen (Blush) */}
      <ellipse cx="-22" cy="6" rx="5" ry="3" fill="#e85a5a" opacity="0.25" filter="url(#innerGlow)" />
      <ellipse cx="22" cy="6" rx="5" ry="3" fill="#e85a5a" opacity="0.25" filter="url(#innerGlow)" />

      {/* Augen (Weiß) */}
      <ellipse ref={leftEyeRef} cx="-11" cy="-6" rx="8" ry="9" fill="#fff" />
      <ellipse ref={rightEyeRef} cx="11" cy="-6" rx="8" ry="9" fill="#fff" />


      {/* Augenlider (Blinzeln via CSS) */}
      <ellipse
        cx="-11"
        cy="-6"
        rx="8"
        ry="9"
        fill="#e8b84a"
        className="tortilla-blink"
        style={{ transformOrigin: "-11px -6px" }}
      />
      <ellipse
        cx="11"        // ← war -11, muss 11 sein!
        cy="-6"
        rx="8"
        ry="9"
        fill="#e8b84a"
        className="tortilla-blink"
        style={{ transformOrigin: "11px -6px" }}  // ← auch hier!
      />

      {/* Pupillen */}
      <motion.circle
        cx="-11"
        cy="-6"
        r="3.5"
        fill="#3b2418"
        animate={{ x: pupilOffset.left.x, y: pupilOffset.left.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.circle
        cx="11"
        cy="-6"
        r="3.5"
        fill="#3b2418"
        animate={{ x: pupilOffset.right.x, y: pupilOffset.right.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Pupillen-Highlights */}
      <circle cx="-12.5" cy="-8" r="1.2" fill="white" />
      <circle cx="9.5" cy="-8" r="1.2" fill="white" />

      {/* Mund */}
      <motion.path
        d={mouth}
        fill="none"
        stroke="#3b2418"
        strokeWidth="3"
        strokeLinecap="round"
        animate={
          state === "celebrating"
            ? { scale: [1, 1.1, 1] }
            : state === "cooking"
              ? { d: ["M -14 4 Q 0 18 14 4", "M -14 5 Q 0 16 14 5", "M -14 4 Q 0 18 14 4"] }
              : {}
        }
        transition={
          state === "celebrating"
            ? { duration: 0.5, repeat: Infinity }
            : state === "cooking"
              ? { duration: 1.5, repeat: Infinity }
              : { duration: 0.2 }
        }
      />

      {/* Zunge (nur bei celebrating) */}
      {state === "celebrating" && (
        <motion.path
          d="M -6 12 Q 0 18 6 12"
          fill="#e85a5a"
          opacity="0.8"
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}

      {/* === EXTRA: Kleine Krümel (Details) === */}
      <circle cx="-30" cy="5" r="1" fill="#c98a2a" opacity="0.5" />
      <circle cx="32" cy="-5" r="0.8" fill="#c98a2a" opacity="0.4" />
      <circle cx="28" cy="18" r="1.2" fill="#c98a2a" opacity="0.3" />
    </motion.svg>
  );
}