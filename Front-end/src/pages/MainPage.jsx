import React from 'react'
import FrequentlySearched from '../components/Search/FrequentlySearched'
import SearchTypeToggle from '../components/Search/SearchTypeToggle'
import SearchBar from '../components/Search/SearchBar'
import ChartExample from '../components/ExampleResult/ChartExample'
import CountryList from '../components/ExampleResult/CountryList'
import InfoBox from '../components/ExampleResult/InfoBox'
import Tabs from '../components/ExampleResult/Tabs'
import Copyright from '../components/Footer/Copyright'
import { Link } from 'react-router-dom'
import SocialLinks from '../components/Footer/SocialLinks'
import '../pages/MainPage.css'

const MainPage = () => {
  return (
    <div className='Main'>
        <FrequentlySearched />
        <div className="search_box">
            <SearchTypeToggle />
            <SearchBar />
        </div>
        <ChartExample />
        <CountryList />
        <InfoBox />
        <Tabs />
        <Copyright />
        {/* <Link /> */}
        <SocialLinks />
    </div>
  )
}

export default MainPage