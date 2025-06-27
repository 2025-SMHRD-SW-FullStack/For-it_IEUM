import React from 'react'
import SearchContent from '../components/search-content/SearchContent'
import SearchSidebar from '../components/search-sidebar/SearchSidebar'
import DetailPanel from '../components/detail-panel/DetailPanel'
import TabMenu from '../components/detail-panel/TabMenu'

import '../styles/SearchMain.css'

const SearchPage = () => {
  return (
    <>
      {/* Header 추가하기 */}

      <main className='searchMain'>
        <SearchSidebar/>
        <SearchContent/>
        <TabMenu />
        <DetailPanel/>
      </main>
      
      
    </>
  )
}

export default SearchPage