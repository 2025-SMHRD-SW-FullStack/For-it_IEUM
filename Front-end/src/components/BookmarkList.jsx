import React, { useEffect, useState } from 'react';
import bookmarks from '../data/bookmark.json'; // JSON 데이터 import
import BookmarkDetail from './BookmarkDetail';

const BookmarkList = () => {
  const [openTitle, setOpenTitle] = useState(null); // 현재 열려있는 북마크 title

  const toggleDetail = (title) => {
    setOpenTitle((prev) => (prev === title ? null : title)); // prev: 이전 값이 true면 false로, false면 true로
  };

  return (
    <div className="p-4 space-y-4">
      {bookmarks.map((bookmark) => (
        <div key={bookmark.id} className="border rounded-xl p-4 shadow">
          <h2
            className="cursor-pointer font-semibold text-lg"
            onClick={() => toggleDetail(bookmark.id)}
          >
            📌 {bookmark.title}
          </h2>

          {openTitle === bookmark.id && (
            <BookmarkDetail bookmark={bookmark} />
          )}
        </div>
      ))}
    </div>
  );
};

export default BookmarkList;
