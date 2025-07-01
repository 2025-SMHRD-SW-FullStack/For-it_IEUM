import React, { useEffect } from 'react'
import SearchContent from '../components/search-content/SearchContent'
import SearchSidebar from '../components/search-sidebar/SearchSidebar'
import DetailPanel from '../components/detail-panel/DetailPanel'

import './SearchPage.css'
import useCardStore from '../stores/CardStore'
import SearchBar from '../components/Search/SearchBar'

const SearchPage = () => {

  const { selectedCard, clearSelectedCard } = useCardStore();
  useEffect(() => {
    clearSelectedCard();  // 페이지 진입 시 selectedCard 초기화
  }, [clearSelectedCard]);

  return (
    <>
      <main className='searchPage'>
        <SearchSidebar/>
          <div className='searchContainer'>
            <div className='searchBar'>
              <SearchBar />
            </div>

            <div className='searchContentPanel'>
                <SearchContent/>
                {selectedCard &&<DetailPanel/>}
            </div>
          </div>
      </main>
      
      
    </>
  )
}

export default SearchPage