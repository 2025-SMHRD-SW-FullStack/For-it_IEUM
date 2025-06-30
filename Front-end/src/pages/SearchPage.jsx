import React from 'react'
import SearchContent from '../components/search-content/SearchContent'
import SearchSidebar from '../components/search-sidebar/SearchSidebar'
import DetailPanel from '../components/detail-panel/DetailPanel'

import '../styles/SearchPage.css'
import useCardStore from '../stores/CardStore'
import SearchBar from '../components/search-content/SearchBar'

const SearchPage = () => {

  const { selectedCard } = useCardStore();

  return (
    <>
      {/* Header 추가하기 */}

      <main className='searchPage'>
        <SearchSidebar/>
        <div>
          <SearchBar/>
          <div className='searchDetail'>
            <SearchContent/>
            {/* <DetailPanel/> */}
            {selectedCard && <DetailPanel/>}
          </div>
        </div>
      </main>
      
      
    </>
  )
}

export default SearchPage