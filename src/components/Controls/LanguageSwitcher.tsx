/**
 * FILE: LanguageSwitcher.tsx
 *
 * PURPOSE:
 * Elegant 3-button language selector for switching between English, Español, and Deutsch.
 */

import React from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import type { SupportedLanguage } from '../../i18n/context';

interface LanguageSwitcherProps {
  compact?: boolean;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ compact = false, className = '' }) => {
  const { language, setLanguage } = useTranslation();

  const options: { code: SupportedLanguage; label: string; flag: string; short: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧', short: 'EN' },
    { code: 'es', label: 'Español', flag: '🇪🇸', short: 'ES' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪', short: 'DE' },
  ];

  return (
    <div
      className={`language-switcher ${compact ? 'language-switcher--compact' : ''} ${className}`}
      role="group"
      aria-label="Language selector"
      style={{
        display: 'inline-flex',
        gap: '4px',
        backgroundColor: '#f1f5f9',
        padding: '3px',
        borderRadius: '8px',
        border: '1px solid #cbd5e1',
        alignItems: 'center',
      }}
    >
      {options.map((opt) => {
        const isActive = language === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLanguage(opt.code)}
            aria-pressed={isActive}
            title={`Switch to ${opt.label}`}
            style={{
              padding: compact ? '4px 8px' : '5px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: isActive ? '#ffffff' : 'transparent',
              color: isActive ? '#0f172a' : '#64748b',
              fontWeight: isActive ? 600 : 500,
              fontSize: compact ? '0.78rem' : '0.85rem',
              cursor: 'pointer',
              boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.15s ease-in-out',
            }}
          >
            <span>{opt.flag}</span>
            <span>{compact ? opt.short : opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};
