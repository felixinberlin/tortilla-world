import { describe, it, expect } from 'vitest';
import { getActionRecommendation } from './actionRecommendations';

describe('actionRecommendations system', () => {
  it('generates cutting recommendations with tool context', () => {
    const rec1 = getActionRecommendation({
      action: 'cut',
      style: 'slices',
      toolId: 'knife',
    });
    expect(rec1).toContain('Using the Chef Knife');
    expect(rec1).toContain('thin, even slices');

    const rec2 = getActionRecommendation({
      action: 'cut',
      style: 'big_pieces',
      toolId: 'machine',
    });
    expect(rec2).toContain('Using the Food Processor');
    expect(rec2).toContain('big, rustic pieces');
  });

  it('generates cooking recommendations for pan/wok', () => {
    const rec1 = getActionRecommendation({
      action: 'cook',
      style: 'fried',
      toolId: 'wok',
    });
    expect(rec1).toContain('In the Wok');
    expect(rec1).toContain('golden brown');

    const rec2 = getActionRecommendation({
      action: 'cook',
      style: 'browned',
      toolId: 'big_pan',
    });
    expect(rec2).toContain('In the Big Skillet');
    expect(rec2).toContain('deeply browned');
  });

  it('generates mixing and peeling recommendations', () => {
    const rec1 = getActionRecommendation({
      action: 'peel',
      toolId: 'peeler',
    });
    expect(rec1).toContain('Using the Peeler');
    expect(rec1).toContain('peel the skin off');

    const rec2 = getActionRecommendation({
      action: 'mix',
      style: 'beaten',
      toolId: 'whisk',
    });
    expect(rec2).toContain('With the Whisk');
    expect(rec2).toContain('whisk vigorously');
  });
});
