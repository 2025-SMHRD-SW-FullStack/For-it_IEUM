import React, { useState } from 'react'
import search from '../../assets/image/search.png'

const SearchBar = ({onSearch}) => {

  // 입력값 상태 관리
  const [query , setQuery] = useState('');
  const [category , setCategory] = useState('product');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(query.trim()) {
      onSearch({query,category});
      // 검색 조건 전달
    }

  };


  return (
        // <div className="main_search">
        //     <input
        //     type="text"
        //     placeholder="내가 관심있는 품목 검색하기"
        //     className="main_search">
        //     </input>
        //     <button className="main_btn">🔍</button>
        // </div>
        <form className="search-box" onSubmit={handleSubmit}>
        <div className="select-wrapper">
          <select 
          id="category" 
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          >
            <option value="product">품목(ex 쌀)</option>
            <option value="hs">HS 코드</option>
          </select>
        </div>

        <input 
        type="search" 
        placeholder="내가 관심있는 품목 검색하기" 
        aria-label="검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" aria-label="검색">
          {/* <i class="fas fa-search"></i> */}
          <span><img src={search} alt="검색 아이콘" style={{width:'20px', height:'20px'}}></img></span>
        </button>
      </form>
  )
}

export default SearchBar