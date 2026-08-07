/**
 * FILE: focus.ts
 *
 * PURPOSE:
 * System logic for Mascot-Centered Focus Mode attention transitions.
 *
 * RESPONSIBILITY:
 * - Computes visual priority classes ('focus-primary', 'focus-secondary', 'focus-background', '')
 *   for containers, entities, and mascot.
 * - Infers active focus target from world actions.
 */

import type { FocusTarget, FocusClass } from '../types/focus';
import type { WorldAction, Container } from '../types/world';

/**
 * Related / adjacent workstation pairings to give secondary visual priority.
 */
const RELATED_CONTAINERS: Record<string, string[]> = {
  board: ['sink', 'bowl', 'pantry', 'despensa'],
  sink: ['board', 'bowl'],
  bowl: ['board', 'burner', 'burner1', 'burner2', 'plate'],
  burner: ['bowl', 'plate'],
  burner1: ['bowl', 'plate'],
  burner2: ['bowl', 'plate'],
  plate: ['burner', 'burner1', 'burner2', 'bowl'],
};

/**
 * Calculates the focus class for a container element.
 * Inactive workstations get 'focus-background' (unused effect),
 * while active and related containers stay primary or secondary.
 */
export function getContainerFocusClass(
  containerId: string,
  focusTarget: FocusTarget,
  options?: {
    container?: Container;
    recipeWorkstationIds?: Set<string>;
    isBeingUsed?: boolean;
  }
): FocusClass {
  if (
    focusTarget.mode === 'normal' ||
    (!focusTarget.containerId && (!focusTarget.entityIds || focusTarget.entityIds.length === 0))
  ) {
    return '';
  }

  // Primary: The explicitly focused container
  if (focusTarget.containerId === containerId) {
    return 'focus-primary';
  }

  // Related containers or active workstations stay secondary
  const isRelated = Boolean(
    focusTarget.containerId && RELATED_CONTAINERS[focusTarget.containerId]?.includes(containerId)
  );
  const isUsed = Boolean(options?.container?.isOn || options?.isBeingUsed);

  if (isRelated || isUsed) {
    return 'focus-secondary';
  }

  // Inactive workstations keep the unused/background effect
  return 'focus-background';
}

/**
 * Calculates the focus class for an entity element.
 * Ingredients sitting in containers/workstations never hide out or change transparency.
 */
export function getEntityFocusClass(
  entityId: string,
  containerId: string | undefined,
  focusTarget: FocusTarget
): FocusClass {
  if (
    focusTarget.mode === 'normal' ||
    (!focusTarget.containerId && (!focusTarget.entityIds || focusTarget.entityIds.length === 0))
  ) {
    return '';
  }

  // Primary: Explicitly targeted entity ID
  if (focusTarget.entityIds?.includes(entityId)) {
    return 'focus-primary';
  }

  // Primary: Entity sits inside the focused primary container
  if (containerId && focusTarget.containerId === containerId) {
    return 'focus-primary';
  }

  // Secondary: All other entities sitting in containers/workstations stay fully visible
  if (containerId) {
    return 'focus-secondary';
  }

  return 'focus-secondary';
}

/**
 * Calculates the focus class for Ms. Tortilla (Mascot).
 * Ms. Tortilla serves as the primary visual anchor during focus mode.
 */
export function getMascotFocusClass(focusTarget: FocusTarget): FocusClass {
  if (
    focusTarget.mode === 'normal' ||
    (!focusTarget.containerId && (!focusTarget.entityIds || focusTarget.entityIds.length === 0))
  ) {
    return '';
  }
  return 'focus-primary';
}

/**
 * Infers appropriate focus targets (containerId and entityIds) from a WorldAction.
 */
export function inferFocusFromAction(action: WorldAction): { containerId?: string; entityIds?: string[] } | null {
  switch (action.type) {
    case 'MOVE_ENTITY':
      return {
        containerId: action.payload.targetContainerId,
        entityIds: [action.payload.entityId],
      };
    case 'MASCOT_MOVE':
      return {
        containerId: action.payload.targetContainerId,
      };
    case 'MASCOT_GRAB':
      return {
        containerId: action.payload.sourceContainerId,
        entityIds: [action.payload.entityId],
      };
    case 'MASCOT_DROP':
      return {
        containerId: action.payload.targetContainerId,
      };
    case 'MASCOT_FLIP':
      return {
        containerId: 'burner',
      };
    case 'TOGGLE_BURNER':
    case 'TOGGLE_HEAT':
    case 'WASH_CONTAINER_CONTENTS':
    case 'CUT_CONTAINER_CONTENTS':
    case 'PEEL_CONTAINER_CONTENTS':
    case 'MIX_CONTAINER_CONTENTS':
    case 'COOK_CONTAINER_CONTENTS':
      return {
        containerId: action.payload.containerId,
      };
    case 'PREPARE_INGREDIENT':
    case 'COOK_INGREDIENT':
    case 'USE_INGREDIENT':
      return {
        entityIds: [action.payload.entityId],
      };
    default:
      return null;
  }
}
