/**
 * FILE: IngredientList.tsx
 *
 * PURPOSE:
 * Displays a container in the game world, its contained entities, and container action tools.
 *
 * RESPONSIBILITY:
 * - Renders container header, capacity indicator, and inner entities.
 * - Connects dnd-kit useDroppable for drag and drop targets.
 * - Displays rejection alerts when a drop fails container rules (TW-02).
 * - Provides interactive container actions (Cut, Cook, Assemble Dish) (TW-04, TW-05).
 */

import { useState, useEffect } from 'react';
import { useStore } from 'zustand';
import { useDroppable } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import { IngredientListItem } from './IngredientListItem';
import { cutIngredient, cookContainerIngredients } from '../../systems/cooking';
import { evaluateRecipeProgress, assembleDish } from '../../systems/recipe';
import type { Container, Entity } from '../../types/world';

interface IngredientListProps {
  container: Container;
}

export function IngredientList({ container }: IngredientListProps) {
  const entities = useStore(worldStore, (state) => state.entities);
  const lastRejection = useStore(worldStore, (state) => state.lastRejection);
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);

  const rejectionTimestamp = lastRejection?.timestamp;
  const rejectionContainerId = lastRejection?.containerId;
  const reasonText = lastRejection?.reason;

  // Set up dnd-kit droppable binding for this container
  const { setNodeRef, isOver } = useDroppable({
    id: container.id,
  });

  useEffect(() => {
    if (rejectionContainerId === container.id && reasonText) {
      const timer = setTimeout(() => {
        setRejectionReason(reasonText);
      }, 0);
      const clearTimer = setTimeout(() => {
        setRejectionReason(null);
      }, 3500);

      return () => {
        clearTimeout(timer);
        clearTimeout(clearTimer);
      };
    }
  }, [rejectionTimestamp, rejectionContainerId, reasonText, container.id]);

  const containerEntities = container.entityIds
    .map((id: string) => entities[id])
    .filter((e: Entity | undefined): e is Entity => Boolean(e));

  const maxCapacity = container.rules?.maxCapacity;
  const capacityText = maxCapacity
    ? `${containerEntities.length}/${maxCapacity}`
    : `${containerEntities.length}`;

  // Interactive Container Action Handlers
  const handleCutAll = () => {
    containerEntities.forEach((e) => {
      if (e.type === 'ingredient') {
        cutIngredient(container.id, e.id, 'diced');
      }
    });
  };

  const handleCookAll = () => {
    cookContainerIngredients(container.id);
  };

  const handleAssembleDish = () => {
    assembleDish(container.id, 'concebolla');
  };

  const recipeProgress = container.type === 'plate' ? evaluateRecipeProgress(container.id, 'concebolla') : null;

  return (
    <div
      ref={setNodeRef}
      className={`ingredient-list container-${container.type} ${isOver ? 'drag-over' : ''} ${
        rejectionReason ? 'rejected' : ''
      }`}
    >
      <div className="container-header">
        <h3>{container.name}</h3>
        <span className="capacity-badge">{capacityText}</span>
      </div>

      {rejectionReason && (
        <div className="rejection-alert">
          ⚠️ {rejectionReason}
        </div>
      )}

      {container.type === 'plate' && recipeProgress && (
        <div className="recipe-progress-bar">
          <div className="progress-info">
            <span>Recipe Progress</span>
            <span>{recipeProgress.percentage}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${recipeProgress.percentage}%` }} />
          </div>
        </div>
      )}

      <div className="items-container">
        {containerEntities.map((entity: Entity) => (
          <IngredientListItem key={entity.id} entity={entity} />
        ))}
        {containerEntities.length === 0 && (
          <span className="empty-hint">Drop ingredients or tools here</span>
        )}
      </div>

      {/* Container Context Actions */}
      <div className="container-actions">
        {container.type === 'board' && containerEntities.some((e) => e.type === 'ingredient') && (
          <button className="action-btn" onClick={handleCutAll}>
            🔪 Cut Ingredients
          </button>
        )}

        {container.type === 'pan' && containerEntities.some((e) => e.type === 'ingredient') && (
          <button className="action-btn cook-btn" onClick={handleCookAll}>
            🔥 Cook / Fry Ingredients
          </button>
        )}

        {container.type === 'plate' && (
          <button
            className="action-btn assemble-btn"
            disabled={!recipeProgress?.isComplete}
            onClick={handleAssembleDish}
          >
            🍳 Assemble Spanish Tortilla
          </button>
        )}
      </div>
    </div>
  );
}