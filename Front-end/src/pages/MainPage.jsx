import React from 'react'
import Catchphrase from '../components/Search/Catchphrase'
import SearchTypeToggle from '../components/Search/SearchTypeToggle'
import SearchBar from '../components/Search/SearchBar'
import ExampleDetail from '../components/ExampleResult/ExampleDetail'
import '../pages/MainPage.css'

const MainPage = () => {
  return (
    <div className='Main'>
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