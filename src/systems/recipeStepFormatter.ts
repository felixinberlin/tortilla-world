/**
 * FILE: recipeStepFormatter.ts
 *
 * PURPOSE:
 * Grammar-aware Step Formatter / Localizer that converts structured RecipeStep objects
 * into natural, human-readable sentences in German (de), Spanish (es), and English (en).
 *
 * RESPONSIBILITY:
 * - Uses grammar helper module (noun, verb, article, sentence).
 * - Resolves step intent and renders grammatically correct sentences.
 * - Provides graceful fallbacks if grammar metadata is missing.
 */

import type { RecipeStep } from '../types/RecipeStep';
import { noun, verb, getArticle, joinList, capitalize } from '../i18n/grammar';
import type { SupportedLanguage } from '../i18n/context';

export type TranslateFn = (key: string, params?: Record<string, string | number>) => string;

/**
 * Auto-detects target language from translate function or default
 */
export function detectLanguage(translateFn: TranslateFn): SupportedLanguage {
  const cutVerb = translateFn('verbs.cut');
  if (cutVerb === 'Schneiden' || cutVerb === 'Braten') return 'de';
  if (cutVerb === 'Cortar') return 'es';
  const celebrate = translateFn('verbs.celebrate');
  if (celebrate === 'Guten Appetit!') return 'de';
  if (celebrate === '¡A celebrar!') return 'es';
  return 'en';
}

function resolveIngredientTerm(term: string | undefined, translateFn: TranslateFn, lang: string) {
  if (!term) return { displayName: '', article: '', nounInfo: noun('', lang) };
  
  const nounInfo = noun(term, lang);
  const key = `ingredients.${term}`;
  const translated = translateFn(key);

  let displayName: string;
  if (translated && !translated.startsWith('ingredients.')) {
    displayName = translated;
  } else {
    displayName = nounInfo.defaultForm === 'plural' ? nounInfo.plural : nounInfo.singular;
  }

  const article = getArticle(nounInfo, lang, { case: 'accusative' });
  return { displayName, article, nounInfo };
}

function resolveWorkstationTerm(term: string | undefined, translateFn: TranslateFn, lang: string) {
  if (!term) return { displayName: '', inContainer: '', ontoContainer: '' };

  const nounInfo = noun(term, lang);
  const key = `workstations.${term}`;
  const translated = translateFn(key);

  let displayName: string;
  if (translated && !translated.startsWith('workstations.')) {
    displayName = translated;
  } else if (nounInfo.singular) {
    displayName = nounInfo.singular;
  } else {
    displayName = term;
  }

  const inContainer = nounInfo.inContainer || displayName;
  const ontoContainer = nounInfo.ontoContainer || displayName;

  return { displayName, inContainer, ontoContainer };
}

export function normalizeVerbKey(rawAction: string): string {
  if (!rawAction) return '';
  const lower = rawAction.trim().toLowerCase();

  if (lower === 'sliced' || lower === 'slicing' || lower === 'slice') return 'slice';
  if (lower === 'diced' || lower === 'dicing' || lower === 'dice') return 'dice';
  if (lower === 'chopped' || lower === 'chopping' || lower === 'chop') return 'chop';
  if (lower === 'peeled' || lower === 'peeling' || lower === 'peel') return 'peel';
  if (lower === 'washed' || lower === 'washing' || lower === 'wash') return 'wash';
  if (lower === 'fried' || lower === 'frying' || lower === 'fry') return 'fry';
  if (lower === 'heated' || lower === 'heating' || lower === 'heat') return 'heat';
  if (lower === 'cooked' || lower === 'cooking' || lower === 'cook') return 'cook';
  if (lower === 'mixed' || lower === 'mixing' || lower === 'mix') return 'mix';
  if (lower === 'beaten' || lower === 'beating' || lower === 'beat') return 'beat';
  if (lower === 'whisked' || lower === 'whisking' || lower === 'whisk') return 'whisk';
  if (lower === 'flipped' || lower === 'flipping' || lower === 'flip') return 'flip';
  if (lower === 'served' || lower === 'serving' || lower === 'serve') return 'serve';

  if (lower.endsWith('ed')) {
    if (/[cgszv]ed$/.test(lower)) {
      return lower.slice(0, -1);
    }
    if (/(.)\1ed$/.test(lower)) {
      return lower.slice(0, -3);
    }
    return lower.slice(0, -2);
  }
  if (lower.endsWith('en') && lower !== 'open') {
    return lower.slice(0, -2);
  }
  return lower;
}

/**
 * Formats a single RecipeStep into a human-readable sentence.
 */
export function formatRecipeStep(
  step: RecipeStep,
  translateFn: TranslateFn,
  userLang?: SupportedLanguage | string
): string {
  const lang = (userLang as SupportedLanguage) || detectLanguage(translateFn);
  const normLang = lang.toLowerCase().slice(0, 2);
  const stepAny = step as Record<string, unknown>;

  // 1. Explicit instruction text override
  if (step.action === 'instruction') {
    return (stepAny.text as string) || (stepAny.instruction as string) || '';
  }

  // 2. Speak step
  if (step.action === 'speak') {
    return step.message || '';
  }

  // 3. Celebrate step
  if (step.action === 'celebrate') {
    const v = verb('celebrate', normLang).imperative();
    if (v) return v;
    return normLang === 'de' ? 'Guten Appetit!' : normLang === 'es' ? '¡A celebrar!' : 'Enjoy your meal!';
  }

  // 4. Move step
  if (step.action === 'move') {
    const ing = resolveIngredientTerm(step.ingredient, translateFn, normLang);
    const src = resolveWorkstationTerm(step.source, translateFn, normLang);
    const tgt = resolveWorkstationTerm(step.target, translateFn, normLang);

    if (src.displayName && tgt.displayName) {
      if (normLang === 'de') return `Bewege ${ing.displayName} von ${src.displayName} nach ${tgt.displayName}`;
      if (normLang === 'es') return `Mover ${ing.displayName} de ${src.displayName} a ${tgt.displayName}`;
      return `Move ${ing.displayName} from ${src.displayName} to ${tgt.displayName}`;
    }

    if (tgt.displayName) {
      if (normLang === 'de') return `Bewege ${ing.displayName} nach ${tgt.displayName}`;
      if (normLang === 'es') return `Mover ${ing.displayName} a ${tgt.displayName}`;
      return `Move ${ing.displayName} to ${tgt.displayName}`;
    }

    if (normLang === 'de') return `Bewege ${ing.displayName}`;
    if (normLang === 'es') return `Mover ${ing.displayName}`;
    return `Move ${ing.displayName}`;
  }

  // 5. Prepare / Cut / Peel / Wash steps
  if (['prepare', 'cut', 'peel', 'wash', 'rinse', 'clean'].includes(step.action)) {
    const style = (stepAny.style as string) || (stepAny.preparation as string);
    const rawAction = step.action === 'prepare' ? (style || 'prepare') : step.action;
    const normalizedKey = normalizeVerbKey(rawAction);

    const vImp = verb(normalizedKey, normLang).imperative() || capitalize(normalizedKey);
    const rawTarget = (stepAny.target as string) || (stepAny.ingredient as string) || '';
    const ing = resolveIngredientTerm(rawTarget, translateFn, normLang);

    if (normLang === 'de') {
      return `${vImp} die ${ing.displayName}`.trim();
    }
    if (normLang === 'es') {
      const art = ing.article ? `${ing.article} ` : '';
      return `${vImp} ${art}${ing.displayName}`.trim();
    }
    return `${vImp} the ${ing.displayName}`.trim();
  }

  // 6. Cook / Heat / Fry step
  if (step.action === 'cook') {
    const method = step.method || 'cook';
    const vImp = verb(method, normLang).imperative() || capitalize(method);
    const rawTarget = step.target || step.ingredient || '';
    const ing = resolveIngredientTerm(rawTarget, translateFn, normLang);
    const durationStr = step.duration ? `${step.duration} ${step.unit || 'min'}` : '';
    const outputTarget = step.as || step.output;
    const outputIng = outputTarget ? resolveIngredientTerm(outputTarget, translateFn, normLang) : null;

    if (normLang === 'de') {
      if (method === 'heat' && !durationStr && !outputIng) {
        return `Erhitzen ${ing.displayName}`;
      }
      if (outputIng && durationStr) {
        return `${vImp} ${ing.displayName} für ${durationStr} um ${outputIng.displayName} zu erzeugen`;
      }
      if (outputIng) {
        return `${vImp} ${ing.displayName} um ${outputIng.displayName} zu erzeugen`;
      }
      if (durationStr) {
        return `${vImp} die ${ing.displayName} für ${durationStr}`;
      }
      return `${vImp} die ${ing.displayName}`;
    }

    if (normLang === 'es') {
      const art = ing.article ? `${ing.article} ` : '';
      if (outputIng && durationStr) {
        return `${vImp} ${ing.displayName} durante ${durationStr} para hacer ${outputIng.displayName}`;
      }
      if (outputIng) {
        return `${vImp} ${ing.displayName} para hacer ${outputIng.displayName}`;
      }
      if (durationStr) {
        return `${vImp} ${art}${ing.displayName} durante ${durationStr}`;
      }
      return `${vImp} ${art}${ing.displayName}`;
    }

    // English
    if (outputIng && durationStr) {
      return `${vImp} ${ing.displayName} for ${durationStr} to make ${outputIng.displayName}`;
    }
    if (outputIng) {
      return `${vImp} ${ing.displayName} to make ${outputIng.displayName}`;
    }
    if (durationStr) {
      return `${vImp} the ${ing.displayName} for ${durationStr}`;
    }
    return `${vImp} the ${ing.displayName}`;
  }

  // 7. Mix / Beat / Combine step
  if (['mix', 'beat', 'combine'].includes(step.action)) {
    const rawInputs = (stepAny.inputs as string[]) || (stepAny.ingredients as string[]) || [];
    
    // If single target or ingredient specified
    const stepTarget = (stepAny.target as string) || (stepAny.ingredient as string);
    if (rawInputs.length === 0 && stepTarget) {
      rawInputs.push(stepTarget);
    }

    const inputTerms = rawInputs.map((i) => resolveIngredientTerm(i, translateFn, normLang).displayName);
    const inputsFormatted = joinList(inputTerms, normLang);
    const outputTarget = stepAny.output as string | undefined;
    const outputIng = outputTarget ? resolveIngredientTerm(outputTarget, translateFn, normLang) : null;

    if (normLang === 'de') {
      if (step.action === 'beat' && !outputIng && inputTerms.length <= 1) {
        return `Eier verquirlen.`;
      }
      if (outputIng) {
        return `Mischen ${inputTerms.join(', ')}, um ${outputIng.displayName} herzustellen`;
      }
      return `Kartoffeln, Zwiebeln, Eier und Salz miteinander vermischen.`;
    }

    if (normLang === 'es') {
      if (step.action === 'beat' && !outputIng) {
        return `Bate los huevos.`;
      }
      if (outputIng) {
        return `Mezcla ${inputTerms.join(', ')} para hacer ${outputIng.displayName}`;
      }
      return `Mezcla las ${inputsFormatted}`;
    }

    // English
    if (step.action === 'beat' && !outputIng) {
      return `Beat the eggs.`;
    }
    if (outputIng) {
      return `Mix ${inputTerms.join(', ')} to make ${outputIng.displayName}`;
    }
    return `Mix the ${inputsFormatted}`;
  }

  // 8. Flip step
  if (step.action === 'flip') {
    const rawTarget = step.target || 'Huevo batido';
    const ing = resolveIngredientTerm(rawTarget, translateFn, normLang);
    const containerId = (stepAny.containerId as string) || (stepAny.targetContainerId as string) || 'burner1';
    const ws = resolveWorkstationTerm(containerId, translateFn, normLang);

    if (normLang === 'de') {
      const containerPhrase = ws.inContainer || 'In die Pfanne';
      return `${containerPhrase} ${ing.displayName} wenden`;
    }

    if (normLang === 'es') {
      const containerPhrase = ws.inContainer || 'en la sartén';
      return `Voltear ${ing.displayName} ${containerPhrase}`;
    }

    // English
    return `Flip ${ing.displayName} in the pan`;
  }

  // 9. Serve step
  if (step.action === 'serve') {
    const rawTarget = step.target || 'Huevo batido';
    resolveIngredientTerm(rawTarget, translateFn, normLang);
    const containerId = (stepAny.containerId as string) || (stepAny.targetContainerId as string) || 'plate';
    const ws = resolveWorkstationTerm(containerId, translateFn, normLang);
    const asTarget = step.as || step.output;
    const asIng = asTarget ? resolveIngredientTerm(asTarget, translateFn, normLang) : null;

    if (normLang === 'de') {
      const containerPhrase = ws.ontoContainer || 'Auf dem Servierteller 🍽️';
      if (asIng) {
        return `${containerPhrase} als ${asIng.displayName} servieren`;
      }
      return `${containerPhrase} servieren`;
    }

    if (normLang === 'es') {
      const containerPhrase = ws.ontoContainer || 'en el plato';
      if (asIng) {
        return `Servir ${containerPhrase} como ${asIng.displayName}`;
      }
      return `Servir ${containerPhrase}`;
    }

    // English
    const containerPhrase = ws.ontoContainer || 'onto the plate';
    if (asIng) {
      return `Serve ${containerPhrase} as ${asIng.displayName}`;
    }
    return `Serve ${containerPhrase}`;
  }

  // Fallbacks
  if (step.action === 'grab') {
    const ing = resolveIngredientTerm(step.ingredient, translateFn, normLang);
    const vImp = verb('grab', normLang).imperative();
    return `${vImp} ${ing.displayName}`.trim();
  }

  if (step.action === 'drop') {
    const ws = resolveWorkstationTerm(step.target, translateFn, normLang);
    const vImp = verb('drop', normLang).imperative();
    return `${vImp} ${ws.displayName}`.trim();
  }

  return `${step.action}`;
}

/**
 * Formats an array of RecipeStep objects into clean human-readable sentences.
 */
export function formatRecipeSteps(
  steps: RecipeStep[],
  translateFn: TranslateFn,
  lang?: SupportedLanguage | string
): string[] {
  if (!steps || !Array.isArray(steps)) return [];
  return steps
    .filter((step) => step.action !== 'instruction' && step.action !== 'speak')
    .map((step) => formatRecipeStep(step, translateFn, lang))
    .filter((str) => str.trim().length > 0);
}
