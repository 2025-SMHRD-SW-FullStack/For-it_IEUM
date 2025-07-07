import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchItem } from '../services/searchService';
import './SearchPage.css';
import useCardStore from '../stores/CardStore';
import DetailPanel from '../components/detail-panel/DetailPanel';
import SearchBar from '../components/Search/SearchBar';
import CardItem from '../components/search-content/CardItem';
import KeywordSideBar from '../components/search-sidebar/KeywordSideBar';
import { useBookmarkStore } from '../stores/BookMarkStore';

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCard, clearSelectedCard } = useCardStore();
  const [results, setResults] = useState([]);
  const { bookmarkList } = useBookmarkStore();

  // 쿼리 파라미터 추출
  const params = new URLSearchParams(location.search);
  const category = params.get('category'); // 'productName' or 'hsCode'
  const query = params.get('query');

  useEffect(() => {
    clearSelectedCard(); // 페이지 진입 시 초기화
  }, [clearSelectedCard]);

  useEffect(() => {
  if (!category || !query) {
    setResults([]);  // 검색 조건 없으면 결과 비우기
    return;
  }

  const choice = category === 'productName' ? 'productName' : 'hsCode';

  const fetchResults = async () => {
    try {
      const data = await searchItem(choice, query);
      setResults(data);
      // navigate('/search', { replace: true });
    } catch (error) {
      console.error('검색 실패:', error);
    }
  };

  fetchResults();
}, [category, query, bookmarkList]);

  return (
    <div className='searchPage'>
      <div className='sideBar'>
        <KeywordSideBar  />
      </div>
      <div className="searchContainer">
        <div className='searchWrapper'>
          <SearchBar />
          <div className="card-list">
            {results.length === 0 ? (
              <p>검색 결과가 없습니다.</p>
            ) : (
              results.map((card) => (
                <CardItem key={card.id} card={card} />
              ))
            )}
          </div>
        </div>

          {selectedCard && <DetailPanel />}
        </div>
    </div>
  );
};

export default SearchPage;
