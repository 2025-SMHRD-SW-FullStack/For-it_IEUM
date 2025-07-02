import React from 'react'
import FrequentlySearched from '../components/Search/FrequentlySearched'
import SearchTypeToggle from '../components/Search/SearchTypeToggle'
import SearchBar from '../components/Search/SearchBar'
import '../pages/MainPage.css'
import ExampleDetail from '../components/ExampleResult/ExampleDetail'

const MainPage = () => {
  return (
    <div className='Main'>
        <FrequentlySearched />
        <div className="search_box">
            <SearchTypeToggle />
            <SearchBar />
        </div>
        <div>
          <ExampleDetail/>
        </div>
    </div>
  )
}

export default MainPage