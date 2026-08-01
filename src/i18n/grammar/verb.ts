import deGrammar from './locales/de.json';
import esGrammar from './locales/es.json';
import enGrammar from './locales/en.json';

export interface VerbInfo {
  infinitive: string;
  imperative: string;
  imperativePlural?: string;
}

export interface VerbHelper {
  infinitive(): string;
  imperative(): string;
  raw(): VerbInfo;
}

const dictionaries: Record<string, Record<string, VerbInfo>> = {
  de: deGrammar.verbs as Record<string, VerbInfo>,
  es: esGrammar.verbs as Record<string, VerbInfo>,
  en: enGrammar.verbs as Record<string, VerbInfo>,
};

export function verb(action: string, lang: string = 'en'): VerbHelper {
  if (!action) {
    return {
      infinitive: () => '',
      imperative: () => '',
      raw: () => ({ infinitive: '', imperative: '' }),
    };
  }

  const normLang = lang.toLowerCase().slice(0, 2);
  const dict = dictionaries[normLang] || dictionaries.en;
  const lowerAction = action.trim().toLowerCase();

  const info: VerbInfo = (dict && dict[lowerAction])
    ? dict[lowerAction]
    : {
        infinitive: action,
        imperative: action.charAt(0).toUpperCase() + action.slice(1),
      };

  return {
    infinitive: () => info.infinitive,
    imperative: () => info.imperative,
    raw: () => info,
  };
}
