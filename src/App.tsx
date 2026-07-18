import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hola mundo!</h1>


      <div className="comments">
        <p>Hier is a list</p>

        <ul className="kitchen">
          <li>patatas</li>
          <li>Huevos</li>
          <li>Aceite</li>
        </ul>

        <ul className="despensa">
          <li>Tomates</li>
          <li>Sal</li>
          <li>Pimienta</li>
        </ul>

      </div>
    </>
  )
}

export default App
