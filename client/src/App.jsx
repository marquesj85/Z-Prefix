import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Landing from './Landing/Landing'
import Items from './Items/Items'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/items' element={<Items />}/>
      </Routes>
    </>
  )
}

export default App
