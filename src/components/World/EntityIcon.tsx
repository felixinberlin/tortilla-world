/**
 * FILE: EntityIcon.tsx
 *
 * PURPOSE:
 * Visual icon representation for any entity in the world (ingredients, tools, containers, products).
 *
 * RESPONSIBILITY:
 * - Renders symbol/icon based on entity data, catalog lookup, or entity type fallback.
 */

import React from 'react';
import type { Entity } from '../../types/world';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools as tools } from '../../data/catalog/tools';

interface EntityIconProps {
  entity?: Entity;
  icon?: string;
  entityId?: string;
  type?: string;
}

const FALLBACK_ICONS: Record<string, string> = {
  potato: '🥔',
  egg: '🥚',
  onion: '🧅',
  oil: '🫗',
  salt: '🧂',
  pepper: '🌶️',
  knife: '🔪',
  pan: '🍳',
  plate: '🍽️',
  bowl: '🥣',
  sink: '💧',
  board: '🪵',
  tortilla: '🫓',
};

export const EntityIcon: React.FC<EntityIconProps> = ({ entity, icon, entityId, type }) => {
  if (icon) {
    return <span className="entity-icon" aria-hidden="true">{icon}</span>;
  }

  if (entity?.icon) {
    return <span className="entity-icon" aria-hidden="true">{entity.icon}</span>;
  }

  const lookupId = entity?.ingredientId || entity?.id || entityId || '';

  // Catalog lookup
  const catalogIng = ingredients.find((i) => i.id === lookupId || lookupId.startsWith(i.id));
  if (catalogIng?.icon) {
    return <span className="entity-icon" aria-hidden="true">{catalogIng.icon}</span>;
  }

  const catalogTool = tools.find((t) => t.id === lookupId || lookupId.startsWith(t.id));
  if (catalogTool?.icon) {
    return <span className="entity-icon" aria-hidden="true">{catalogTool.icon}</span>;
  }

  // Prefix key match
  for (const [key, fallbackIcon] of Object.entries(FALLBACK_ICONS)) {
    if (lookupId.toLowerCase().includes(key)) {
      return <span className="entity-icon" aria-hidden="true">{fallbackIcon}</span>;
    }
  }

  const defaultTypeIcon = type === 'tool' ? '🔧' : type === 'container' ? '📦' : '📦';

  return <span className="entity-icon" aria-hidden="true">{defaultTypeIcon}</span>;
};
