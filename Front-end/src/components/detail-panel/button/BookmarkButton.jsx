import React, { useState } from 'react';
import './Btn.css'
import bookmark from '../../../assets/image/bookmark.png'
import useCalCulStore from '../../../stores/CalculStore';
import useCardStore from '../../../stores/CardStore';
import useChatGTPStore from '../../../stores/ChatGPTStore';
import { saveBookMarks } from '../../../services/bookMarkService';
// zustand나 Context 스토어 import 필요시 추가
// import useBookmarkStore from '../../stores/BookmarkStore';

const BookmarkButton = ({ activeTab}) => {
  const [bookmarkMessage, setBookmarkMessage] = useState('');

  const {selectedCard} = useCardStore();
  const {quantity, unitPrice, calculation} = useCalCulStore();
  const {chatGPTResponse} = useChatGTPStore();

  

  // // 여기선 로컬 상태로 예시, 필요시 전역 상태로 변경 가능
  // const [bookmarks, setBookmarks] = React.useState({
  //   tariff: null,
  //   calculator: null,
  //   strategy: null,
  // });

  
  const clickBookmark = async () => {
    // const currentBookmark = bookmarks[activeTab];
    console.log("calculation",calculation);
    console.log("setChatGPTResponse",chatGPTResponse);
    const resultBookmark = await saveBookMarks(selectedCard.hs_code,
      selectedCard.product_name,selectedCard.base_tariff,
      selectedCard.top10_data[0].name,selectedCard.top10_data[0].rate,
      unitPrice, quantity, calculation, chatGPTResponse);

    if(resultBookmark === "update"){
      setBookmarkMessage("북마크가 업데이트 되었습니다.");
    }else{
      setBookmarkMessage("북마크가 저장되었습니다.");
    }

    // if (currentBookmark && currentBookmark.id === selectedCard.id) {
    //   setBookmarkMessage(`${activeTab} 탭 북마크가 업데이트 되었습니다.`);
    //   setBookmarks(prev => ({
    //     ...prev,
    //     [activeTab]: { ...selectedCard }
    //   }));
    // } else {
    //   setBookmarkMessage(`${activeTab} 탭 북마크가 저장되었습니다.`);
    //   setBookmarks(prev => ({
    //     ...prev,
    //     [activeTab]: { ...selectedCard }
    //   }));
    // }

    setTimeout(() => setBookmarkMessage(''), 2000);
  };

  return (
    <div className='bookmark'>
      {bookmarkMessage && <div className='bookmarkMessage'>{bookmarkMessage}</div>}
      <img 
      src={bookmark} 
      alt="북마크 아이콘"
      onClick={clickBookmark}
      className='tabBtn bookmark'
      />
    </div>
  );
};

export default BookmarkButton;
