/**
 * FILE: rendererRegistry.ts
 *
 * PURPOSE:
 * Registry for custom entity type renderers.
 */

import React from 'react';
import type { Entity } from '../../types/world';

export interface EntityRendererProps {
  entity: Entity;
  containerId?: string;
  readOnly?: boolean;
}

export type EntityRenderer = React.ComponentType<EntityRendererProps>;

export const entityRendererRegistry: Record<string, EntityRenderer> = {};

export function registerEntityRenderer(type: string, renderer: EntityRenderer): void {
  entityRendererRegistry[type] = renderer;
}
