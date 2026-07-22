import React from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';

interface MascotProps {
  mascotId?: string;
}

export const Mascot: React.FC<MascotProps> = ({ mascotId = 'chef' }) => {
  const mascotEntity = useStore(worldStore, (state) => state.entities[mascotId]);

  if (!mascotEntity) return null;

  return (
    <div className="mascot">
      <h3>{mascotEntity.name}</h3>
      Gazing at: {mascotEntity.state?.gazingAt ? String(mascotEntity.state.gazingAt) : 'Nothing'}
    </div>
  );
};