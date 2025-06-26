import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BookmarkList from './components/BookmarkList'
import AIResult from './components/AIResult'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AIResult/>
    </>
  )
}

export default App
