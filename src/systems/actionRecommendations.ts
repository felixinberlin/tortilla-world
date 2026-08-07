/**
 * FILE: actionRecommendations.ts
 *
 * PURPOSE:
 * Generates contextual cooking advice and step recommendations spoken by Chef Tortilla.
 */

import { catalogTools } from '../data/catalog/tools';

export interface ActionRecommendationOptions {
  action: string;
  style?: string;
  toolId?: string;
  ingredientName?: string;
  customMessage?: string;
}

export function getActionRecommendation(opts: ActionRecommendationOptions): string {
  if (opts.customMessage) {
    return opts.customMessage;
  }

  const action = opts.action.toLowerCase();
  const style = (opts.style || '').toLowerCase();
  const tool = opts.toolId ? catalogTools.find((t) => t.id === opts.toolId) : undefined;
  const toolName = tool ? tool.name : opts.toolId;

  // Tool specific prefix if tool is equipped
  let toolContext = '';
  if (toolName) {
    if (opts.toolId === 'knife') toolContext = 'Using the Chef Knife, ';
    else if (opts.toolId === 'machine') toolContext = 'Using the Food Processor, ';
    else if (opts.toolId === 'peeler') toolContext = 'Using the Peeler, ';
    else if (opts.toolId === 'mandoline') toolContext = 'Using the Mandoline, ';
    else if (opts.toolId === 'wok') toolContext = 'In the Wok, ';
    else if (opts.toolId === 'big_pan') toolContext = 'In the Big Skillet, ';
    else if (opts.toolId === 'small_pan') toolContext = 'In the Small Pan, ';
    else if (opts.toolId === 'spatula') toolContext = 'With the Spatula, ';
    else if (opts.toolId === 'whisk') toolContext = 'With the Whisk, ';
  }

  switch (action) {
    case 'cut':
    case 'slice':
    case 'prepare': {
      if (style.includes('slice') || style.includes('sliced')) {
        return `✂️ ${toolContext}cut into thin, even slices!`;
      }
      if (style.includes('big') || style.includes('chunk')) {
        return `🔪 ${toolContext}cut into big, rustic pieces!`;
      }
      if (style.includes('dice') || style.includes('diced')) {
        return `🔪 ${toolContext}dice into small uniform cubes!`;
      }
      if (style.includes('peel') || style.includes('peeled')) {
        return `🥔 ${toolContext}peel the outer skin smoothly!`;
      }
      if (style.includes('beat') || style.includes('beaten')) {
        return `🥢 ${toolContext}whisk vigorously until smooth and fluffy!`;
      }
      return `✂️ ${toolContext}cut carefully into uniform pieces!`;
    }

    case 'peel':
      return `🥔 ${toolContext}peel the skin off completely and cleanly!`;

    case 'wash':
    case 'rinse':
    case 'drain':
      return `🚿 Rinse thoroughly under cool running water!`;

    case 'cook':
    case 'fry':
    case 'boil':
    case 'saute': {
      if (style.includes('fry') || style.includes('fried')) {
        return `🔥 ${toolContext}fry on medium-high heat until golden brown!`;
      }
      if (style.includes('brown') || style.includes('browned')) {
        return `🔥 ${toolContext}cook until deeply browned and aromatic!`;
      }
      if (style.includes('boil') || style.includes('boiled')) {
        return `♨️ ${toolContext}boil until soft and tender throughout!`;
      }
      if (style.includes('saute') || style.includes('softened')) {
        return `🥘 ${toolContext}sauté gently until tender and translucent!`;
      }
      return `🔥 ${toolContext}cook evenly until hot and ready!`;
    }

    case 'mix':
    case 'beat':
    case 'whisk':
      if (style.includes('beat') || style.includes('beaten')) {
        return `🥢 ${toolContext}whisk vigorously until light and fluffy!`;
      }
      return `🥣 ${toolContext}mix thoroughly until fully combined!`;

    case 'season':
      return `🧂 Season evenly with salt and spices for balanced taste!`;

    case 'flip':
      return `🍳 Flip with confidence for a perfect even cook!`;

    case 'serve':
      return `🍽️ Plate neatly and serve fresh and warm!`;

    default:
      return `👨‍🍳 ${toolContext}perform step carefully for best results!`;
  }
}
