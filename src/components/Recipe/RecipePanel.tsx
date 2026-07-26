/**
 * FILE: RecipePanel.tsx
 *
 * PURPOSE:
 * Compact, unintrusive recipe selector and catalog viewer.
 *
 * RESPONSIBILITY:
 * - Wires catalog recipes (Con Cebolla, Sin Cebolla) with RecipeRequirements.
 * - Displays active recipe requirements and matches with current world state.
 */

import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import './RecipePanel.scss';

export function RecipePanel() {
  const dispatch = useStore(worldStore, (state) => state.dispatch);

  return (
    <div className="recipe-panel compact-recipe-panel">
      <div className="recipe-panel-header">
        <button
          type="button"
          className="recipe-reset-btn"
          onClick={() => dispatch({ type: 'RESET_WORLD' })}
          title="Clean the kitchen and start over"
        >
          🔄 Reset Kitchen
        </button>
      </div>
    </div>
  );
}

