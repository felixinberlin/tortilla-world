/**
 * FILE: ContainerView.tsx
 *
 * PURPOSE:
 * Displays a world container and its owned entities.
 *
 * RESPONSIBILITY:
 * - Renders container title and its inner entities via EntityView.
 * - Acts as a droppable target for drag-and-drop actions.
 */

import React from 'react';
import { useStore } from 'zustand';
import { useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { worldStore } from '../../store/worldStore';
import type { Container, Entity } from '../../types/world';
import { EntityView } from './EntityView';
import './World.scss';

interface ContainerViewProps {
  key?: string | number;
  container: Container;
}

export const ContainerView: React.FC<ContainerViewProps> = ({ container }) => {
  const entities = useStore(worldStore, (state) => state.entities);

  // Set up dnd-kit droppable binding for this container
  const { setNodeRef, isOver } = useDroppable({
    id: container.id,
  });

  const containerEntities = container.entityIds
    .map((id: string) => entities[id])
    .filter((e: Entity | undefined): e is Entity => Boolean(e));

  const isMixturePresent = containerEntities.some(
    (e) => e.id.includes('mixture') || e.name.toLowerCase().includes('mixture')
  );

  const getWorkstationBadge = (id: string) => {
    switch (id) {
      case 'sink': return 'Washing Area 💧';
      case 'board': return 'Cutting Workspace 🔪';
      case 'bowl': return 'Preparation 🥣';
      case 'burner': return 'Cooking Heat 🍳';
      case 'burner1': return 'Cooking Heat 1🍳';
      case 'burner2': return 'Cooking Heat 2🍳';
      case 'plate': return 'Serving Stage 🍽️';
      case 'despensa': return 'Pantry 🧺';
      default: return 'Workstation 📦';
    }
  };

  const containerOnFireClass = container.isOn ? 'container-onFire' : '';
  const dispatch = useStore(worldStore, (state) => state.dispatch);

  return (
    <div
      ref={setNodeRef}
      data-container-id={container.id}
      className={`${container.isOn ? 'container-view--on' : ''} ${containerOnFireClass} container-view container-view--${container.id} ${isOver ? 'container-view--drag-over' : ''} ${isMixturePresent ? 'container-view--mixture' : ''}`}
    >
      <div className="container-view__header">
        <h3 className="container-view__title">{container.name}</h3>
        <span className="container-view__badge">{getWorkstationBadge(container.id)}</span>
        <button
          className={`burner-toggle ${container.isOn ? 'burner-toggle--on' : ''}`}
          onClick={(e) => {
            e.stopPropagation();

            dispatch({
              type: 'TOGGLE_BURNER',
              payload: {
                containerId: container.id,
              },
            });
          }}
        />
      </div>
      <div className="container-view__items">
        <AnimatePresence mode="popLayout">
          {containerEntities.map((entity: Entity) => {
            const isMixture = entity.id.includes('mixture') || entity.name.toLowerCase().includes('mixture');
            return (
              <motion.div
                key={entity.id}
                layout
                initial={
                  isMixture
                    ? { scale: 0.1, rotate: -180, opacity: 0 }
                    : { scale: 0.8, opacity: 0, y: -10 }
                }
                animate={
                  isMixture
                    ? {
                      scale: [0.2, 1.15, 1],
                      rotate: [-180, 10, 0],
                      opacity: 1,
                      transition: { duration: 0.65, ease: 'easeOut' },
                    }
                    : { scale: 1, rotate: 0, opacity: 1, y: 0 }
                }
                exit={{
                  scale: 0,
                  rotate: 180,
                  opacity: 0,
                  filter: 'blur(4px)',
                  transition: { duration: 0.5, ease: 'easeInOut' },
                }}
                transition={{ duration: 0.35 }}
              >
                <EntityView entity={entity} containerId={container.id} />
              </motion.div>
            );
          })}
        </AnimatePresence>
        {containerEntities.length === 0 && (
          <span className="container-view__empty-hint">Drop entities here</span>
        )}
      </div>
    </div>
  );
};
