import React, { useEffect, useState } from 'react'
import '../../App.css';
import './SearchTypeToggle.css';
import { getRank } from '../../services/searchService';

const SearchTypeToggle = ({ onKeywordClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [keywords, setKeywords] = useState([]);

  const fetchKeywords = async () => {
    try {
      const response = await getRank();
      if (response && response.length > 0) {
        setKeywords(response);
        console.log("키워드 가져오기 성공:", response);
      }
    } catch (error) {
      console.error("키워드 가져오기 실패:", error);
    }
  }

  useEffect(() => {
    fetchKeywords();
  }, []);

  // ✅ 마우스 오버 시 드롭다운 열고, 나가면 닫기
  useEffect(() => {
    setIsOpen(isHovered);
  }, [isHovered]);

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
