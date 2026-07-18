import { useWorldStore } from '../../store/worldStore'

export function Scene() {
  const entities = useWorldStore((world) => world.entities)

  return (
    <section
      aria-label="Tortilla world"
      style={{ minHeight: '100%', position: 'relative', width: '100%' }}
    >
      {Object.values(entities).map((entity) => (
        <div
          key={entity.id}
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
      ))}
    </section>
  )
}
