import React from 'react'
import SearchTypeToggle from '../components/Search/SearchTypeToggle'
import SearchBar from '../components/Search/SearchBar'
import ExampleDetail from '../components/ExampleResult/ExampleDetail'
import '../pages/MainPage.css'
import Catchphrase from '../components/Search/Catchphrase'

const MainPage = () => {
  return (
    <div className='mainPage'>
        <Catchphrase />
        <div className="search_box">
            <SearchTypeToggle />
            <SearchBar />
        </div>
        
        <ExampleDetail/>
    </div>
  )
}

export default MainPage