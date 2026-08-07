export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function joinList(items: string[], lang: string = 'en'): string {
  if (!items || items.length === 0) return '';
  if (items.length === 1) return items[0];

  const normLang = lang.toLowerCase().slice(0, 2);
  const conjunction = normLang === 'de' ? ' und ' : normLang === 'es' ? ' y ' : ' and ';

  if (items.length === 2) {
    return items.join(conjunction);
  }

  const head = items.slice(0, -1).join(', ');
  const tail = items[items.length - 1];
  return `${head}${conjunction}${tail}`;
}
