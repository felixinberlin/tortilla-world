/**
 * FILE: EntityStateBadge.tsx
 *
 * PURPOSE:
 * Displays status/state indicator badges for world entities.
 *
 * RESPONSIBILITY:
 * - Reflects state changes such as Raw, Prepared, Cooking, or Finished.
 */

import React from 'react';
import type { Entity } from '../../types/world';
import { useTranslation } from '../../i18n/useTranslation';

interface EntityStateBadgeProps {
  entity: Entity;
  containerId?: string;
}

export const EntityStateBadge: React.FC<EntityStateBadgeProps> = ({ entity, containerId }) => {
  const { t } = useTranslation();
  const prep = entity.state?.preparation as string | undefined;
  const cooking = entity.state?.cooking as string | undefined;
  const status = entity.state?.status as string | undefined;

  if (containerId === 'plate' || status?.includes('cooked') || status?.includes('fried') || status?.includes('tortilla')) {
    return <span className="entity-view__state entity-view__state--finished">{t('states.finished')}</span>;
  }

  if (cooking && cooking !== 'raw') {
    return <span className="entity-view__state entity-view__state--cooking">{t('states.cooking')}</span>;
  }

  if (prep) {
    const translatedPrep = t(`states.${prep}`);
    const displayPrep = (translatedPrep && !translatedPrep.startsWith('states.')) ? translatedPrep : prep;
    return <span className="entity-view__state entity-view__state--prepared">{displayPrep} 🔪</span>;
  }

  if (entity.type === 'ingredient') {
    return <span className="entity-view__state entity-view__state--raw">{t('states.raw')}</span>;
  }

  return null;
};
