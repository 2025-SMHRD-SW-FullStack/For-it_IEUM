import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InterestKeyword from './InterestKeyword';
import Keyword from './Keyword';
import './KeywordSideBar.css';
import { keywordItem } from '../../services/keyWordService';
import { keywordSaveItem } from '../../services/keyWordService';
export const Item = {
  KEYWORD: 'keyword',
};

const KeywordSideBar = () => {

  const [interest, setInterest] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [allKeywords, setAllKeywords] = useState([]);
  const [userKeyword,setUserKeyword] =useState([])
  const navigate = useNavigate();

  const handleClick = (keyword) => {
    setSelectedKeyword(keyword);
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  useEffect(()=>{

    const fetchResults = async () => {
        try {
          const data = await keywordItem();   // axios.get 결과
          setAllKeywords(data.keywordAll);
          setUserKeyword(data.userKeyword)
          console.log(data.userKeyword); // 회원 키워드 
          console.log(data.keywordAll); // 전체 키워드
        } catch (error) {
          console.error('검색 실패:', error);
        }
      };
      fetchResults();
  },[]);

  const tk = localStorage.getItem('accessToken')

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
      {tk &&
        <InterestKeyword
          interest={interest}
          setInterest={setInterest}
          Item={Item}
          userKeyword={userKeyword}
          setUserKeyword={setUserKeyword}
        />
        }
        <div>
          <b className="keywordLabel">분류 리스트</b>
          <br />
          {allKeywords.map((keyword, i) => (
            <Keyword
              key={i}
              keyword={keyword.productName}
              hsCode={keyword.hsCode}
              checkType={keyword.checkType}
              draggable={true}
              Item={Item}
              isSelected={selectedKeyword === keyword}
              onClick={() => handleClick(keyword)}
              setUserKeyword= {setUserKeyword}
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
