/**
 * FILE: workstations.test.ts
 *
 * PURPOSE:
 * Unit tests for workstation mapping and tool resolution logic.
 */

import { describe, expect, it } from 'vitest';
import { findWorkstationForStep, findToolsForStep } from './workstations';
import { KITCHEN_WORKSTATIONS } from '../data/catalog/workstations';

describe('Workstations Engine', () => {
  it('maps steps to correct workstations', () => {
    expect(findWorkstationForStep({ action: 'prepare', target: 'potatoes', preparation: 'peeled' }))
      .toBe(KITCHEN_WORKSTATIONS.cutting_station);

    expect(findWorkstationForStep({ action: 'prepare', target: 'eggs', preparation: 'beaten' }))
      .toBe(KITCHEN_WORKSTATIONS.preparation_station);

    expect(findWorkstationForStep({ action: 'cook', target: 'potatoes', method: 'fry' }))
      .toBe(KITCHEN_WORKSTATIONS.cooking_station);

    expect(findWorkstationForStep({ action: 'mix', inputs: ['potatoes', 'eggs'] }))
      .toBe(KITCHEN_WORKSTATIONS.preparation_station);

    expect(findWorkstationForStep({ action: 'serve', target: 'mixture' }))
      .toBe(KITCHEN_WORKSTATIONS.serving_station);

    expect(findWorkstationForStep({ action: 'wash', target: 'potatoes' }))
      .toBe(KITCHEN_WORKSTATIONS.washing_station);
  });

  it('determines required/recommended tools for steps', () => {
    expect(findToolsForStep({ action: 'prepare', target: 'potatoes', preparation: 'peeled' }))
      .toEqual(['peeler', 'knife']);

    expect(findToolsForStep({ action: 'cut', ingredient: 'potato', style: 'sliced' }))
      .toEqual(['knife']);

    expect(findToolsForStep({ action: 'mix', inputs: ['potatoes', 'eggs'] }))
      .toEqual(['whisk', 'fork', 'spoon']);

    expect(findToolsForStep({ action: 'cook', target: 'oil', method: 'heat' }))
      .toEqual(['spatula', 'pan']);
  });
});
