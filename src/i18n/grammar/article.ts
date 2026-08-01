import type { NounInfo } from './noun';

export function getArticle(
  nounInfo: NounInfo,
  lang: string = 'en',
  options: { plural?: boolean; case?: 'nominative' | 'accusative' | 'dative' } = {}
): string {
  if (!nounInfo || !nounInfo.article) return '';

  const normLang = lang.toLowerCase().slice(0, 2);
  const isPlural = options.plural ?? (nounInfo.defaultForm === 'plural');

  if (normLang === 'de' && options.case === 'accusative' && nounInfo.accusativeArticle) {
    return isPlural ? nounInfo.accusativeArticle.plural : nounInfo.accusativeArticle.singular;
  }

  return isPlural ? nounInfo.article.plural : nounInfo.article.singular;
}
