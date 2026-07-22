import type { Container, Entity } from '../types/world';

export interface ValidationResult {
  allowed: boolean;
  reason?: string;
}

export function validateContainerRules(
  container: Container,
  entity: Entity,
  currentEntitiesInContainer: Entity[]
): ValidationResult {
  const rules = container.rules;

  if (!rules) {
    return { allowed: true };
  }

  // 1. Capacity Check
  if (
    rules.maxCapacity !== undefined &&
    container.entityIds.length >= rules.maxCapacity
  ) {
    return {
      allowed: false,
      reason: `Container '${container.name}' capacity reached (${rules.maxCapacity} items max).`,
    };
  }

  // 2. Allowed Types Check
  if (rules.allowedTypes && !rules.allowedTypes.includes(entity.type)) {
    return {
      allowed: false,
      reason: `Container '${container.name}' does not accept entity type '${entity.type}'.`,
    };
  }

  // 3. Unique Types Check
  if (rules.uniqueTypesOnly) {
    const hasTypeAlready = currentEntitiesInContainer.some(
      (e) => e.type === entity.type
    );
    if (hasTypeAlready) {
      return {
        allowed: false,
        reason: `Container '${container.name}' already contains an entity of type '${entity.type}'.`,
      };
    }
  }

  // 4. Custom Validator Check
  if (rules.customValidator) {
    const passesCustom = rules.customValidator(
      container,
      entity,
      currentEntitiesInContainer
    );
    if (!passesCustom) {
      return {
        allowed: false,
        reason: `Entity '${entity.name}' failed custom container rules for '${container.name}'.`,
      };
    }
  }

  return { allowed: true };
}