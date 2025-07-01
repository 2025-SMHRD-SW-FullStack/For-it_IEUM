
import React, { useState } from 'react'
import '../../App.css';

const SearchTypeToggle = ({ onKeywordClick }) => {

  const [isOpen, setIsOpen] = useState(false);
  const keywords = ['FTA 원산지증명','HS코드 조회', '관세율 확인', '수출입 절차'];

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown-container">
      <div className="dropdown-container-header" onClick={toggleOpen}>
        <span className="dropdown-container-title">자주 찾는 검색어</span>
        <span className="dropdown-container-toggle">{isOpen ? '▲' : '▼'}</span>
      </div>
    <div className={`dropdown-container-list ${isOpen ? 'open' : ''}`}>
  {keywords.map((keyword, index) => (
    <button
      key={index}
      className="dropdown-container-item"
      onClick={() => onKeywordClick?.(keyword)}
    >
      {keyword}
    </button>
  ))}
</div>


    </div>
  );
};

export default SearchTypeToggle
