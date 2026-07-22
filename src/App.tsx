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

import { useEffect } from 'react';
import { useStore } from 'zustand';
import { Scene } from './components/Scene/Scene';
import { worldStore } from './store/worldStore';
import { initialContainers, initialEntities } from './data/initialWorld';

function App() {
  const containers = useStore(worldStore, (state) => state.containers);

  useEffect(() => {
    if (Object.keys(containers).length === 0) {
      worldStore.getState().dispatch({
        type: 'INIT_WORLD',
        payload: {
          entities: initialEntities,
          containers: initialContainers,
        },
      });
    }
  }, [containers]);

  return <Scene />;
}

export default App;