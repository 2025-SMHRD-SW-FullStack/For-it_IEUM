import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InterestKeyword from './interestKeyword';
import Keyword from './Keyword';
import './KeywordSideBar.css';

export const Item = {
  KEYWORD: 'keyword',
};

const KeywordSideBar = () => {

  const keywords = [
    '전기전자',
    '의료용품',
    '가구조명',
    '생활용품',
    '의류',
    '스포츠용품',
    '자동차부품',
    '식품',
    '문구류',
    '완구',
    '화장품',
    '주방용품',
  ];

  const [interest, setInterest] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const navigate = useNavigate();

  const handleClick = (keyword) => {
    setSelectedKeyword(keyword);
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <InterestKeyword interest={interest} setInterest={setInterest} Item={Item} />
        <div>
          <b className="keywordLabel">분류 리스트</b>
          <br />
          {keywords.map((keyword, i) => (
            <Keyword
              key={i}
              keyword={keyword}
              draggable={true}
              Item={Item}
              isSelected={selectedKeyword === keyword}
              onClick={() => handleClick(keyword)}
            />
          ))}
        </div>
        {/* ToastContainer는 반드시 여기 JSX 안에 있어야 합니다 */}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          toastStyle={{ width: 'fit-content', whiteSpace: 'nowrap' }} // 너비 넓히고 줄바꿈 방지
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </DndProvider>
  );
};

export default KeywordSideBar;
