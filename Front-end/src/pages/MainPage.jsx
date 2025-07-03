import React from 'react'
import FrequentlySearched from '../components/Search/FrequentlySearched'
import SearchTypeToggle from '../components/Search/SearchTypeToggle'
import SearchBar from '../components/Search/SearchBar'
import ExampleDetail from '../components/ExampleResult/ExampleDetail'
import '../pages/MainPage.css'

const MainPage = () => {
  return (
    <div className='Main'>
        <FrequentlySearched />
        <div className="search_box">
            <SearchTypeToggle />
            <SearchBar />
        </div>
        
        <ExampleDetail/>
    </div>
  )
}

export default MainPage