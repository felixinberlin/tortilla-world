/**
 * FILE: workstations.ts
 *
 * PURPOSE:
 * Defines workstation structures and capabilities.
 *
 * RESPONSIBILITY:
 * - Represents workstations as functional kitchen areas where actions take place.
 * - Maps cooking/preparation actions to workstations and required tools.
 */

export type WorkstationId =
  | 'pantry'
  | 'washing_station'
  | 'cutting_station'
  | 'preparation_station'
  | 'cooking_station'
  | 'serving_station';

export type Workstation = {
  id: WorkstationId;
  name: string;
  purpose: string;
  supportedActions: string[];
  defaultContainerId: string;
  requiredTools?: string[];
  optionalTools?: string[];
};
