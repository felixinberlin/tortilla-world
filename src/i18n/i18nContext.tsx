/**
 * FILE: i18nContext.tsx
 *
 * PURPOSE:
 * Provides lightweight, reactive translation support (i18n) for Tortilla World.
 * Supports switching between English ('en') and Spanish ('es'), with parameter interpolation.
 */

import React, { useState, useCallback, useMemo } from 'react';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import { I18nContext, type SupportedLanguage } from './context';

type Dictionary = typeof en;

const dictionaries: Record<SupportedLanguage, Dictionary> = {
  en,
  es: es as unknown as Dictionary,
  de: de as unknown as Dictionary,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('tortilla_lang');
    return saved === 'es' || saved === 'de' || saved === 'en' ? saved : 'en';
  });

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('tortilla_lang', lang);
  }, []);

  const t = useCallback(
    (keyPath: string, params?: Record<string, string | number>): string => {
      const keys = keyPath.split('.');
      let current: unknown = dictionaries[language] || dictionaries.en;

      for (const k of keys) {
        if (current && typeof current === 'object' && k in current) {
          current = (current as Record<string, unknown>)[k];
        } else {
          // Fallback to English dictionary if key missing in chosen locale
          let fallback: unknown = dictionaries.en;
          for (const fk of keys) {
            if (fallback && typeof fallback === 'object' && fk in fallback) {
              fallback = (fallback as Record<string, unknown>)[fk];
            } else {
              return keyPath;
            }
          }
          current = fallback;
          break;
        }
      }

      if (typeof current !== 'string') {
        return keyPath;
      }

      let result = current;
      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          result = result.replace(new RegExp(`{{\\s*${paramKey}\\s*}}`, 'g'), String(paramValue));
        });
      }

      return result;
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, setLanguage, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
