/**
 * FILE: recipeWorkstations.ts
 *
 * PURPOSE:
 * Utility to identify all workstation containers required/used by a recipe.
 *
 * RESPONSIBILITY:
 * - Scans recipe steps to extract target and source containers (sink, board, bowl, burner1, plate, etc.).
 * - Used to hide workstations not used in an active recipe.
 */

import type { Recipe } from '../types/Recipe';
import type { RecipeStep } from '../types/RecipeStep';
import type { Container } from '../types/world';

export function getRecipeWorkstationIds(
  recipe?: Recipe | null,
  allContainers?: Record<string, Container>
): Set<string> {
  const result = new Set<string>();

  if (!recipe || !recipe.steps || recipe.steps.length === 0) {
    if (allContainers) {
      Object.keys(allContainers).forEach((id) => {
        if (id !== 'despensa') result.add(id);
      });
    } else {
      ['sink', 'board', 'bowl', 'burner1', 'burner2', 'burner', 'plate'].forEach((id) => result.add(id));
    }
    return result;
  }

  // Plato (plate) and Trash are always available in kitchen workstations
  result.add('plate');
  result.add('trash');

  const knownContainers = new Set(['sink', 'board', 'bowl', 'burner1', 'burner2', 'plate', 'trash']);

  const addWorkstation = (rawId?: string) => {
    if (!rawId) return;
    const cId = rawId.toLowerCase().trim();
    if (cId === 'despensa' || cId === 'pantry' || cId === 'storage') return;

    if (
      cId === 'burner' ||
      cId === 'pan' ||
      cId === 'stove' ||
      cId === 'fuego' ||
      cId === 'fuego1' ||
      cId === 'fuego 1' ||
      cId === 'sarten' ||
      cId === 'sartén' ||
      cId === 'burner1'
    ) {
      result.add('burner1');
      return;
    }
    if (cId === 'fuego2' || cId === 'fuego 2' || cId === 'burner2') {
      result.add('burner2');
      return;
    }
    if (cId === 'cutting_board' || cId === 'cutting' || cId === 'tabla' || cId === 'board') {
      result.add('board');
      return;
    }
    if (cId === 'fregadero' || cId === 'sink') {
      result.add('sink');
      return;
    }
    if (cId === 'bol' || cId === 'bowl') {
      result.add('bowl');
      return;
    }
    if (cId === 'plato' || cId === 'plate') {
      result.add('plate');
      return;
    }
    if (cId === 'basura' || cId === 'trash') {
      result.add('trash');
      return;
    }

    if (allContainers && allContainers[cId] && cId !== 'despensa') {
      result.add(cId);
    } else if (knownContainers.has(cId)) {
      result.add(cId);
    }
  };

  const getContainerId = (s: RecipeStep): string | undefined => {
    if ('containerId' in s && typeof s.containerId === 'string') return s.containerId;
    return undefined;
  };

  const getTargetContainerId = (s: RecipeStep): string | undefined => {
    if ('targetContainerId' in s && typeof s.targetContainerId === 'string') return s.targetContainerId;
    return undefined;
  };

  for (const step of recipe.steps) {
    switch (step.action) {
      case 'clean':
      case 'wash':
      case 'rinse':
      case 'drain':
        addWorkstation(getContainerId(step) || 'sink');
        break;

      case 'prepare':
      case 'cut':
      case 'peel':
        if ('preparation' in step && step.preparation === 'beaten') {
          addWorkstation('bowl');
        } else {
          addWorkstation(getContainerId(step) || 'board');
        }
        break;

      case 'cook':
        addWorkstation(getContainerId(step) || 'burner1');
        break;

      case 'mix':
      case 'beat':
      case 'combine':
        addWorkstation(getTargetContainerId(step) || 'bowl');
        break;

      case 'flip':
        addWorkstation(getContainerId(step) || 'burner1');
        break;

      case 'serve':
        addWorkstation(getContainerId(step) || 'plate');
        break;

      case 'move':
        if ('target' in step && typeof step.target === 'string') addWorkstation(step.target);
        if ('source' in step && typeof step.source === 'string') addWorkstation(step.source);
        break;

      case 'grab':
        if ('source' in step && typeof step.source === 'string') addWorkstation(step.source);
        break;

      case 'drop':
        if ('target' in step && typeof step.target === 'string') addWorkstation(step.target);
        break;
    }

    const cId = getContainerId(step);
    if (cId) addWorkstation(cId);
    const tcId = getTargetContainerId(step);
    if (tcId) addWorkstation(tcId);
  }

  return result;
}
