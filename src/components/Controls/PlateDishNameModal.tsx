/**
 * FILE: src/components/Controls/PlateDishNameModal.tsx
 *
 * PURPOSE:
 * Modal dialog presented at the end of recording when there is a dish/entity on the plate.
 * Prompts the chef to name their creation before stopping the session.
 */

import React, { useState } from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import './PlateDishNameModal.scss';

interface PlateDishNameModalProps {
  isOpen: boolean;
  initialName?: string;
  onConfirm: (dishName: string) => void;
  onSkip: () => void;
}

export const PlateDishNameModal: React.FC<PlateDishNameModalProps> = ({
  isOpen,
  initialName = 'Tortilla Española Clásica',
  onConfirm,
  onSkip,
}) => {
  const { t } = useTranslation();
  const [dishName, setDishName] = useState<string>(initialName);
  const [prevInitialName, setPrevInitialName] = useState<string>(initialName);

  if (initialName !== prevInitialName) {
    setPrevInitialName(initialName);
    setDishName(initialName);
  }

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = dishName.trim();
    if (trimmed) {
      onConfirm(trimmed);
    } else {
      onSkip();
    }
  };

  return (
    <div className="plate-dish-modal-overlay" onClick={onSkip}>
      <div className="plate-dish-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="plate-dish-modal-header">
          <div className="plate-dish-modal-icon">🍽️</div>
          <div>
            <h3>{t('recorder.dishNameModalTitle')}</h3>
            <p className="plate-dish-modal-subtitle">
              {t('recorder.dishNameModalSubtitle')}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="plate-dish-modal-body">
          <label className="plate-dish-modal-label">
            {t('ui.finalNameLabel')}
          </label>
          <input
            type="text"
            className="plate-dish-modal-input"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            placeholder={t('recorder.dishNamePlaceholder')}
            autoFocus
          />

          <div className="plate-dish-modal-actions">
            <button
              type="button"
              className="plate-dish-modal-btn secondary"
              onClick={onSkip}
            >
              {t('recorder.skipDishName')}
            </button>
            <button
              type="submit"
              className="plate-dish-modal-btn primary"
            >
              {t('recorder.saveDishNameAndStop')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
