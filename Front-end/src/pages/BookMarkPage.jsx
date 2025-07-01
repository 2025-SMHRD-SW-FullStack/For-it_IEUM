import React, { useState, useEffect } from "react";
import './BookMarkPage.css';

const initialBookmarks = [
  { value: "a", title: "말 - 미국 (8%) ", text: "내용 1.dkfjslkjdfklsjfkljswklfdjslkjdfklsjdkfjsldfjlskijflkjskljfkdl.." },
  { value: "b", title: "두 번째 아이템", text: "내용 2..." },
  { value: "c", title: "세 번째 아이템", text: "내용 3..." },
];

const BookMarkPage = () => {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [openItem, setOpenItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    } else {
      setBookmarks(initialBookmarks);
    }
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
                <span className="accordion-title">{item.title}</span>
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
