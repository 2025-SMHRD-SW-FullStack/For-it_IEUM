import React from 'react'
import SearchContent from '../components/search-content/SearchContent'
import SearchSidebar from '../components/search-sidebar/SearchSidebar'
import DetailPanel from '../components/detail-panel/DetailPanel'

const SearchPage = () => {
  return (
    <>
      {/* Header 추가하기 */}

      <main>
        <SearchSidebar/>
        <SearchContent/>
        <DetailPanel/>
      </main>
      
      
    </>
  )
}

export default SearchPage