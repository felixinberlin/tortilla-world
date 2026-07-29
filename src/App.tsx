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

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scene } from './components/Scene/Scene';
import { Mascot } from './components/Mascot/Mascot';
import { PlayerGuideModal } from './components/Controls/PlayerGuideModal';
import { useTranslation } from './i18n/useTranslation';

function App() {
  const [showGuide, setShowGuide] = useState(true);
  const { t } = useTranslation();

  return (
    <motion.div
      className="app-container"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <header className="app-header">
        <div className="app-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <h1>Tortilla World</h1>
            <p>
              An interactive simulation world. Drag entities from the immutable catalog pantry into workspace containers.
            </p>
          </div>
          <button
            type="button"
            className="guide-trigger-btn"
            onClick={() => setShowGuide(true)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              color: '#0f172a',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              whiteSpace: 'nowrap',
            }}
          >
            {t('guide.openBtn')}
          </button>
        </div>
      </header>

      <main className="app-main">
        <Scene />
        <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
          <Mascot />
        </div>
      </main>

      <PlayerGuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </motion.div>
  );
}

export default App;