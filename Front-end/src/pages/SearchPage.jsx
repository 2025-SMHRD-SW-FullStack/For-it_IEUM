import React from 'react'
import SearchContent from '../components/search-content/SearchContent'
import SearchSidebar from '../components/search-sidebar/SearchSidebar'
import DetailPanel from '../components/detail-panel/DetailPanel'

import '../styles/SearchMain.css'
import useCardStore from '../stores/CardStore'

const SearchPage = () => {

  const { selectedCard } = useCardStore();

  return (
    <>
      {/* Header 추가하기 */}

      <main className='searchMain'>
        <SearchSidebar/>
        <SearchContent/>
        {/* <DetailPanel/> */}
        {selectedCard && <DetailPanel/>}
      </main>
      
      
    </>
  )
}

export default SearchPage