/**
 * FILE: App.tsx
 *
 * PURPOSE:
 * Main React application component.
 *
 * RESPONSIBILITY:
 * - Creates the application layout.
 * - Connects major UI areas together.
 * - Acts as the entry point for the game world.
 *
 * SHOULD NOT:
 * - Contain game rules.
 * - Modify world state directly.
 */

import { motion } from 'framer-motion';
import { Scene } from './components/Scene/Scene';
import { Mascot } from './components/Mascot/Mascot';

function App() {
  return (
    <motion.div
      className="app-container"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <header className="app-header">
        <div className="app-header-content">
          <h1>Tortilla World</h1>
          <p>
            An interactive simulation world. Drag entities from the immutable catalog pantry into workspace containers.
          </p>
        </div>
      </header>

      <main className="app-main">
        <Scene />
      </main>

      <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
        <Mascot />
      </div>
    </motion.div>
  );
}

export default App;