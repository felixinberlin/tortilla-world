import './App.css'
import { IngredientList } from './components/Ingredients/IngredientList'
import { ingredients } from './data/ingredients'

function App() {
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
