import type { ContainerType } from './world';

export interface VesselCatalogItem {
  id: string;
  name: string;
  icon: string;
  containerType: ContainerType;
  capacity: number;
}