import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import search from '../../assets/image/search.png';
import './SearchBar.css';

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('productName');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('query');
    const c = params.get('category');

    if (q) setQuery(q);
    if (c) setCategory(c);
  }, [location.search]);

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
          <option value="productName">품목(ex. 쌀)</option>
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
      <button type="submit" aria-label="검색">
        <span>
          <img src={search} alt="검색 아이콘" style={{ width: '20px', height: '20px' }} />
        </span>
      </button>
    </form>
  );
};

export default SearchBar;
