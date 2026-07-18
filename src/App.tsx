import { useEffect } from 'react'
import './App.css'
import { IngredientList } from './components/Ingredients/IngredientList'
import { useWorldStore } from './store/worldStore'

function App() {
  const addEntity = useWorldStore((state) => state.addEntity)
  const entities = useWorldStore((state) => state.entities)
  const ingredients = Object.values(entities)
    .filter((entity) => entity.type === 'ingredient')
    .map((entity) => ({
      id: entity.id,
      name: entity.id,
      icon: '🥔',
    }))

  useEffect(() => {
    if (Object.keys(entities).length > 0) {
      return
    }

    addEntity({
      id: 'potato',
      type: 'ingredient',
      position: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      state: 'idle',
    })
  }, [addEntity, entities])

  return (
    <>
      <h1>Hola mundo!</h1>

      <div className="comments">
        <p>Here is a list</p>

        <IngredientList ingredients={ingredients} />
      </div>
    </>
  )
}

export default App
