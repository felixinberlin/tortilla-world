import deGrammar from './locales/de.json';
import esGrammar from './locales/es.json';
import enGrammar from './locales/en.json';

export interface NounInfo {
  singular: string;
  plural: string;
  defaultForm?: 'singular' | 'plural';
  article: {
    singular: string;
    plural: string;
  };
  accusativeArticle?: {
    singular: string;
    plural: string;
  };
  inContainer?: string;
  ontoContainer?: string;
}

const dictionaries: Record<string, Record<string, NounInfo>> = {
  de: deGrammar.nouns as Record<string, NounInfo>,
  es: esGrammar.nouns as Record<string, NounInfo>,
  en: enGrammar.nouns as Record<string, NounInfo>,
};

export function noun(term: string, lang: string = 'en'): NounInfo {
  if (!term) {
    return {
      singular: '',
      plural: '',
      defaultForm: 'singular',
      article: { singular: '', plural: '' },
    };
  }

  const normLang = lang.toLowerCase().slice(0, 2);
  const dict = dictionaries[normLang] || dictionaries.en;
  const lowerTerm = term.trim().toLowerCase();

  if (dict && dict[lowerTerm]) {
    return dict[lowerTerm];
  }

  // Fallback search in dictionary
  if (dict) {
    for (const key of Object.keys(dict)) {
      const entry = dict[key];
      if (
        entry.singular?.toLowerCase() === lowerTerm ||
        entry.plural?.toLowerCase() === lowerTerm
      ) {
        return entry;
      }
    }
  }

  // Dynamic fallback when metadata is missing
  const isPlural = lowerTerm.endsWith('s') || lowerTerm.endsWith('n');
  const singular = term;
  const plural = term.endsWith('s') ? term : `${term}s`;
  const defaultArticle = normLang === 'de' ? 'die' : normLang === 'es' ? (isPlural ? 'los' : 'el') : 'the';

  return {
    singular,
    plural,
    defaultForm: isPlural ? 'plural' : 'singular',
    article: {
      singular: defaultArticle,
      plural: defaultArticle,
    },
  };
}
