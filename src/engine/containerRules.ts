// src/engine/containerRules.ts

import type { Container, Entity } from '../types/world'

export interface RuleValidationResult {
  valid: boolean;
  reason?: string;
}

export class ContainerAuthority {
  /**
   * Evaluates if a container will accept a target entity[cite: 22, 36].
   */
  static canAccept(
    container: Container,
    entity: Entity,
    currentEntitiesInContainer: Entity[]
  ): RuleValidationResult {
    // 1. Capacity Enforcement
    if (container.entityIds.length >= container.rules.maxCapacity) {
      return {
        valid: false,
        reason: `Container '${container.name}' capacity reached (${container.rules.maxCapacity} items max).`
      };
    }

    // 2. Allowed Entity Type Enforcement
    if (container.rules.allowedTypes && !container.rules.allowedTypes.includes(entity.type)) {
      return {
        valid: false,
        reason: `Container '${container.name}' does not accept entity type '${entity.type}'.`
      };
    }

    // 3. Uniqueness Rule Enforcement
    if (container.rules.uniqueTypesOnly) {
      const exists = currentEntitiesInContainer.some((e) => e.type === entity.type);
      if (exists) {
        return {
          valid: false,
          reason: `Container '${container.name}' already holds an entity of type '${entity.type}'.`
        };
      }
    }

    // 4. Custom Authority Rule Validation
    if (container.rules.customValidator) {
      const passesCustom = container.rules.customValidator(container, entity, currentEntitiesInContainer);
      if (!passesCustom) {
        return {
          valid: false,
          reason: `Container '${container.name}' custom rule check failed for '${entity.name}'.`
        };
      }
    }

    return { valid: true };
  }
}