import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BookmarkList from './components/BookmarkList'
import AIStrategyTab from './components/detail-panel/tab/AIStrategyTab'
import SearchPage from './pages/SearchPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <AIStrategyTab/> */}
      <SearchPage/>
    </>
  )
}

export default App
