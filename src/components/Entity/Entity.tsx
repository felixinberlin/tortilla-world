import type { Entity as WorldEntity } from '../../types/Entity'

interface EntityProps {
  entity: WorldEntity
}

export function Entity({ entity }: EntityProps) {
  return (
    <div
      data-entity-id={entity.id}
      data-entity-state={entity.state}
      data-entity-type={entity.type}
      style={{
        height: entity.size.height,
        left: entity.position.x,
        position: 'absolute',
        top: entity.position.y,
        width: entity.size.width,
      }}
    />
  )
}
