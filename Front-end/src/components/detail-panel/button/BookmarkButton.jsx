import React, { useState } from 'react';
import './Btn.css';
import bookmark from '../../../assets/image/bookmark.png';
import bookmarkchanged from '../../../assets/image/bookmarkchanged.png'
import useCalCulStore from '../../../stores/CalculStore';
import useChatGTPStore from '../../../stores/ChatGPTStore';
import { saveBookMarks, getBookMarkList } from '../../../services/bookMarkService';
import { useBookmarkStore } from '../../../stores/BookMarkStore';

const BookmarkButton = ({ activeTab, selectedCard }) => {
  const [bookmarkMessage, setBookmarkMessage] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { setBookmark } = useBookmarkStore();

  const { quantity, unitPrice, calculation, country, tariff } = useCalCulStore();
  const { chatGPTResponse } = useChatGTPStore();

  const clickBookmark = async () => {
    const resultBookmark = await saveBookMarks(
      selectedCard.hs_code,
      selectedCard.product_name,
      selectedCard.base_tariff,
      country,
      tariff,
      unitPrice,
      quantity,
      calculation,
      chatGPTResponse
    );

    if (resultBookmark === 'update') {
      setBookmarkMessage('북마크가 업데이트 되었습니다.');
    } else {
      setBookmark(await getBookMarkList()); // 북마크 목록을 새로고침
      setBookmarkMessage('북마크가 저장되었습니다.');
    }

    setIsBookmarked(true); // ✅ 아이콘 상태 변경
    setTimeout(() => {
      setIsBookmarked(false); // 원래대로
      setBookmarkMessage('');
    }, 2000);
  };

  return (
    <div className='bookmark'>
      {bookmarkMessage && <div className='bookmarkMessage'>{bookmarkMessage}</div>}
      <img
        src={isBookmarked ? bookmarkchanged : bookmark} // ✅ 조건부 렌더링
        alt="북마크 아이콘"
        onClick={clickBookmark}
        className='tabBtn bookmark'
      />
    </div>
  );
};

export default BookmarkButton;
