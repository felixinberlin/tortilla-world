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

function App() {
  return (
    <Scene />
  );
}

export default App;