import React, { useState } from 'react';
//import bookmarks from '../data/bookmark.json'; // JSON 데이터 import
import BookmarkDetail from './BookmarkDetail';
import { useBookmarkStore } from '../stores/BookMarkStore';

const BookmarkList = () => {
  const [openTitle, setOpenTitle] = useState(null); // 현재 열려있는 북마크 title
  const { bookmark} = useBookmarkStore();

  // console.log("북마크 데이터", bookmark);

  const toggleDetail = (item) => {
    console.log("아이템 클릭됨:", item);
    setOpenTitle((prev) => (prev === item.productName ? null : item.seqNumber)); // prev: 이전 값이 true면 false로, false면 true로
  };

  return (
    <div className="p-4 space-y-4">
      {bookmark.map((item) => (
        <div key={item.seqNumber} className="border rounded-xl p-4 shadow">
          <h2
            className="cursor-pointer font-semibold text-lg"
            onClick={() => toggleDetail(item)}
          >
            📌 {item.productName}
          </h2>

          {openTitle === item.seqNumber && (
            <BookmarkDetail bookmark={item} />
          )}
        </div>
      ))}
    </div>
  );
};

export default BookmarkList;
