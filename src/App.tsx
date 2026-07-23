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

import { Scene } from './components/Scene/Scene';
import { Mascot } from './components/Mascot/Mascot';
import { RecipePanel } from './components/Recipe/RecipePanel';

function App() {
  return (
    <div className="app-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', color: 'var(--text-h)' }}>Tortilla World</h1>
          <p style={{ margin: '4px 0 0 0', color: 'var(--text)', opacity: 0.8 }}>
            An interactive simulation world. Drag ingredients from the immutable catalog pantry into workspace containers.
          </p>
        </div>
        <Mascot />
      </header>

      <main>
        <RecipePanel />
        <Scene />
      </main>
    </div>
  );
}

export default App;