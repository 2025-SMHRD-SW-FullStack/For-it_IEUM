import React, { useState } from 'react';
import '../../App.css';
import './SearchTypeToggle.css';

const SearchTypeToggle = ({ onKeywordClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const keywords = ['FTA 원산지증명입니다', 'HS코드 조회', '관세율 확인', '수출입 절차', '기타 등등'];

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

      <div className={`dropdown-container-list ${isHovered ? 'open' : ''}`}>
        {keywords.map((keyword, index) => (
          <button
            key={index}
            className="dropdown-container-item"
            onClick={() => onKeywordClick?.(keyword)}
            title={keyword}
          >
            {keyword}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchTypeToggle;
