import React, { useState } from 'react';
// zustand나 Context 스토어 import 필요시 추가
// import useBookmarkStore from '../../stores/BookmarkStore';

const BookmarkButton = ({ activeTab, selectedCard }) => {
  const [bookmarkMessage, setBookmarkMessage] = useState('');

  // 여기선 로컬 상태로 예시, 필요시 전역 상태로 변경 가능
  const [bookmarks, setBookmarks] = React.useState({
    tariff: null,
    calculator: null,
    strategy: null,
  });

  const bookmark = () => {
    const currentBookmark = bookmarks[activeTab];

    if (currentBookmark && currentBookmark.id === selectedCard.id) {
      setBookmarkMessage(`${activeTab} 탭 북마크가 업데이트 되었습니다.`);
      setBookmarks(prev => ({
        ...prev,
        [activeTab]: { ...selectedCard }
      }));
    } else {
      setBookmarkMessage(`${activeTab} 탭 북마크가 저장되었습니다.`);
      setBookmarks(prev => ({
        ...prev,
        [activeTab]: { ...selectedCard }
      }));
    }

    setTimeout(() => setBookmarkMessage(''), 2000);
  };

  return (
    <div className='bookmark'>
      {bookmarkMessage && <div className='bookmarkMessage'>{bookmarkMessage}</div>}
      <button onClick={bookmark} className='btn'>북마크</button>
    </div>
  );
};

export default BookmarkButton;
