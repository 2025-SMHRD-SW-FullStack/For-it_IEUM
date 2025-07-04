
import React, { useEffect, useState } from 'react'
import '../../App.css';
import './SearchTypeToggle.css';
import { getRank } from '../../services/searchService';

const SearchTypeToggle = ({ onKeywordClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [keywords, setKeywords] = useState([]);
  // 키워드 데이터 예시
  // [{cnt : 5, hsCode: '01012100', productName:'경주말'},{cnt: 3, hsCode: '85423100', productName: '트랜지스터'}
  //  {cnt: 1, hsCode: '02071200', productName: '냉동 어류'},{cnt: 1, hsCode: '08021200', productName: '아몬드'}, 
  // {cnt: 1, hsCode: '809100000', productName: '살구'}]
  const fetchKeywords = async () => {
    try { 
      const response = await getRank();
      if (response && response.length > 0) {
        setKeywords(response);
        console.log("키워드 가져오기 성공:", response);
      }
      return [];
    }catch (error) {
      console.error("키워드 가져오기 실패:", error);
    }
  }

  useEffect(() => {
    fetchKeywords();
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div
      className="dropdown-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="dropdown-container-header">
        <span className="dropdown-container-title">자주 찾는 품목</span>
        <span className="dropdown-container-toggle">{isHovered ? '▲' : '▼'}</span>
      </div>
    <div className={`dropdown-container-list ${isOpen ? 'open' : ''}`}>
  {keywords.map((keyword, index) => (
    <button
      key={index}
      className="dropdown-container-item"
      onClick={() => onKeywordClick?.(keyword)}
      title={keyword.productName}
    >
      {keyword.productName}
    </button>
  ))}
</div>


    </div>
  );
};

export default SearchTypeToggle;
