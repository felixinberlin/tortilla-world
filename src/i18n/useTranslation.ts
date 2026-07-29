/**
 * FILE: useTranslation.ts
 *
 * PURPOSE:
 * Custom React hook for accessing current language and translation function.
 */

import { useContext } from 'react';
import { I18nContext, type I18nContextType } from './context';

export function useTranslation(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    return {
      language: 'en',
      setLanguage: () => {},
      t: (keyPath: string) => keyPath,
    };
  }
  return context;
}
