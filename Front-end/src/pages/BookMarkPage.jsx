import React, { useState, useEffect } from "react";
import './BookMarkPage.css';

const initialBookmarks = [
  {
    value: "item1",
    title: "커피머신",
    country: "미국",
    hasHistory: true,
    hasStrategy: true
  },
  {
    value: "item2",
    title: "스마트폰",
    country: "베트남",
    hasHistory: false,
    hasStrategy: true
  },
  {
    value: "item3",
    title: "의료용 장갑",
    country: "인도네시아",
    hasHistory: true,
    hasStrategy: false
  },
  {
    value: "item4",
    title: "TV 부품",
    country: "중국",
    hasHistory: false,
    hasStrategy: false
  },
  {
    value: "item5",
    title: "자동차 엔진",
    country: "독일",
    hasHistory: true,
    hasStrategy: true
  }
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
                <span className="accordion-title" title={item.title}>
                  {`${item.title.length > 10 ? item.title.slice(0, 10) + "..." : item.title} - ${item.country} - ${item.hasHistory ? "이력 있음" : "이력 없음"} - ${item.hasStrategy ? "전략 있음" : "전략 없음"}`}
                </span>
                <span className="accordion-icon">{isOpen ? "▲" : "▼"}</span>
              </button>

              <div className={`accordion-content ${isOpen ? "open" : ""}`}>
                <p><strong>품목명:</strong> {item.title}</p>
                <p><strong>최저 관세 국가:</strong> {item.country}</p>
                <p><strong>계산 이력:</strong> {item.hasHistory ? "있음" : "없음"}</p>
                <p><strong>AI 전략 추천:</strong> {item.hasStrategy ? "있음" : "없음"}</p>
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
