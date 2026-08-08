/**
 * FILE: CookbookModal.tsx
 *
 * PURPOSE:
 * Modal overlay displaying the full Cookbook view with recipe selection, requirements, and step-by-step instructions.
 */

import React from 'react';
import { CookbookView } from './CookbookView';
import { useTranslation } from '../../i18n/useTranslation';
import './CookbookModal.scss';

interface CookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookbookModal: React.FC<CookbookModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="cookbook-modal-backdrop" onClick={onClose}>
      <div className="cookbook-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="cookbook-modal-header-bar">
          <div className="title-group">
            <span className="cookbook-icon">📕</span>
            <h2>{t('app.recipeCatalog') || 'Cookbook & Recipes'}</h2>
          </div>
          <button
            type="button"
            className="cookbook-close-btn"
            onClick={onClose}
            aria-label="Close Cookbook"
          >
            ✕
          </button>
        </div>
        <div className="cookbook-modal-content-area">
          <CookbookView />
        </div>
      </div>
    </div>
  );
};
