import React, { useState, useEffect } from "react";
import './BookMarkPage.css';
import { getBookMarkList } from '../services/bookMarkService';

const initialBookmarks = [
  { value: "a", title: "커피-(아아아러러러아아아러러러아아아어러러라앙아아ㅏ어러러러러러럴아ㅏㅇ아알아러ㅏ얼", text: "내용 1.dkfjslkjdfklsjfkljswklfdjslkjdfklsjdkfjsldfjlskijflkjskljfkdl.." },
  { value: "b", title: "두 번째 아이템dkfjslkdfjsldkjflkdjfl", text: "내용 2..." },
  { value: "c", title: "세 번째 아이템", text: "내용 3..." },
];

const BookMarkPage = () => {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [openItem, setOpenItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

    const id = "ddddd"; // 예시로 사용된 아이디, 바꿔야함

  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    } else {
      setBookmarks(initialBookmarks);
    }
    console.log("북마크 데이터 로드 시작");
    const getList = async () => {
      // 예시로 북마크 데이터를 가져오는 함수
      const data = await getBookMarkList(id);
      console.log("북마크 데이터:", data);
      console.log("북마크 데이터 로드됨");
    }
    getList();

  }, []);

  console.log("bookmarks: ", bookmarks);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleToggle = (value) => {
    setOpenItem((prev) => (prev === value ? null : value));
  };

  const handleDeleteClick = (value) => {
    setSelectedValue(value);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    setBookmarks((prev) => prev.filter((item) => item.value !== selectedValue));
    setModalOpen(false);
    setSelectedValue(null);
  };

  return (
    <div className="bookmark-container">
      <h1 className="bookmark-title">북마크 페이지</h1>
      <div className="accordion-container">
        {bookmarks.map((item, index) => {
          const isOpen = openItem === item.value;
          return (
            <div key={item.value} className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => handleToggle(item.value)}
              >
                <span
                  className="accordion-title"
                  title={item.title}
                >
                  {item.title.length > 10 ? item.title.slice(0, 10) + "..." : item.title}
                </span>

                <span className="accordion-icon">{isOpen ? "▲" : "▼"}</span>
              </button>

              <div
                className={`accordion-content ${isOpen ? "open" : ""}`}>
                {item.text}
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(item.value);
                  }}
                >
                  삭제
                </button>
              </div>
              {index !== bookmarks.length - 1 && <hr className="divider" />}
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>정말 삭제할까요?</h2>
            <p>복구할 수 없습니다.</p>
            <div className="modal-actions">
              <button onClick={() => setModalOpen(false)}>취소</button>
              <button className="confirm-btn" onClick={confirmDelete}>
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookMarkPage;
