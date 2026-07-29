/**
 * FILE: context.ts
 *
 * PURPOSE:
 * Holds the React context definition for i18n to avoid fast-refresh lint issues.
 */

import { createContext } from 'react';

export type SupportedLanguage = 'en' | 'es';

export interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (keyPath: string, params?: Record<string, string | number>) => string;
}

export const I18nContext = createContext<I18nContextType | null>(null);
