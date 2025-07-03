import React, { useState } from 'react';
import search from '../../assets/image/search.png';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('productName');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (query.trim()) {
      navigate(`/search?category=${category}&query=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <div className="select-wrapper">
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="productName">품목(ex 쌀)</option>
          <option value="hsCode">HS 코드</option>
        </select>
      </div>

      <input
        type="search"
        placeholder="내가 관심있는 품목 검색하기"
        aria-label="검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" aria-label="검색" onClick={handleSubmit}>
        <span>
          <img src={search} alt="검색 아이콘" style={{ width: '20px', height: '20px' }} />
        </span>
      </button>
    </form>
  );
};

export default SearchBar


