import React from 'react'
import Search_Icon from '../../assets/icon/search_icon.png'


const SearchBar = () => {

  return (
    <div>
        <input style={{height:30}}
        id="searchBar" 
        type="text" 
        placeholder='내가 관심있는 품목 검색하기' />
        
        <input 
        className="Icon" 
        id="search_Icon" 
        type="image" 
        src={Search_Icon}
        alt="검색"/>
    </div>
  )
}

export default SearchBar