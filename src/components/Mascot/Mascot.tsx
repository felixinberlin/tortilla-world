// src/components/Mascot/Mascot.tsx

import React from 'react';
import { useWorldStore } from '../../store/worldStore';
import type { WorldState } from '../../store/worldStore';

const MASCOT_ID = 'mascot';

export const Mascot: React.FC = () => {
  const mascotEntity = useWorldStore((state: WorldState) => state.entities[MASCOT_ID]);

  if (!mascotEntity) return null;

  return (
    <div className="mascot-container">
      <span>🌮 {mascotEntity.name}</span>
    </div>
  );
};