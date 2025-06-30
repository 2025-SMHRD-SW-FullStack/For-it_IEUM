import React from 'react'
import SearchContent from '../components/search-content/SearchContent'
import SearchSidebar from '../components/search-sidebar/SearchSidebar'
import DetailPanel from '../components/detail-panel/DetailPanel'

import './SearchPage.css'
import useCardStore from '../stores/CardStore'
import SearchBar from '../components/Search/SearchBar'

const SearchPage = () => {

  const { selectedCard } = useCardStore();

  return (
    <>
      <main className='searchPage'>
        <SearchSidebar/>
        <div>
          <div className='searchBar'>
            <SearchBar />
          </div>
          <div className='searchDetail'>
            <div className='searchContent'>
              <SearchContent/>
            </div>
            {selectedCard &&
              (<div className='detailPanel'>
                <DetailPanel/>
              </div>)}
          </div>
        </div>
      </main>
      
      
    </>
  )
}

export default SearchPage