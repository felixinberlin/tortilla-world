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
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-content">
          <h1>Tortilla World</h1>
          <p>
            An interactive simulation world. Drag entities from the immutable catalog pantry into workspace containers.
          </p>
        </div>
        <Mascot />
      </header>

      <main className="app-main">
        <RecipePanel />
        <Scene />
      </main>
    </div>
  );
}

export default App;