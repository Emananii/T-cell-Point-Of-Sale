import { useState } from 'react'
import './Styles/App.css'
import POS from './Components/POS/POS'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <POS/>
      
    </div>
  )
}

export default App
