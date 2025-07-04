import React, { useState, useEffect } from "react";
import './BookMarkPage.css';
import { getBookMarkList,deleteBookMark } from '../services/bookMarkService';
import { useBookmarkStore } from '../stores/BookMarkStore';

const BookMarkPage = () => {
  const [openItem, setOpenItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const { bookmark, setBookmark } = useBookmarkStore();

  useEffect(() => {
    const getList = async () => {
      const data = await getBookMarkList();
      setBookmark(data);
      console.log("북마크 데이터Page", data);
    }
    getList();

  }, []);


  const handleToggle = (value) => {
    setOpenItem((prev) => (prev === value ? null : value));
  };

  const handleDeleteClick = (value) => {
    setSelectedValue(value);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    
    const newList = bookmark.filter(item => item.seqNumber !== selectedValue);
    const result = await deleteBookMark(selectedValue);
    if (result == "success") {
      setBookmark(newList);
      setModalOpen(false);
      setSelectedValue(null);
    }
  };

  return (
    <div className="bookmark-container">
      <h1 className="bookmark-title">북마크 페이지</h1>
      {bookmark.length === 0 ? (
         <p className="empty-message">아직 저장된 북마크가 없어요.</p>
        ):(
      <div className="accordion-container">
        {bookmark.map((item, index) => {
          const isOpen = openItem === item.seqNumber;
          const rawTitle = item.productName ?? "";
          const shortTitle = rawTitle.length > 20 ? rawTitle.slice(0, 20) + "..." : rawTitle;
          const hasHistory = Boolean(item.calculation);
          const hasStrategy = Boolean(item.chatGPTAnswer);
          return (
            <div key={item.seqNumber} className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => handleToggle(item.seqNumber)}
              >
                <span className="accordion-title" title={item.productName}>
                  {`${shortTitle} | ${item.country ?? ""} (${item.tariff}%) `}
                  <br/>
                  {` 계산 이력 : ${hasHistory ? "O" : "X"} | AI 전략 추천 : ${hasStrategy ? "O" : "X"}`}
                </span>
                <span className="accordion-icon">{isOpen ? "▲" : "▼"}</span>
              </button>

              <div className={`accordion-content ${isOpen ? "open" : ""}`}>
                <p><strong>품목명:</strong> {item.productName}</p>
                <p><strong>최저 관세 국가:</strong> {item.country}</p>
                <p><strong>계산 이력:</strong> {hasHistory ? "있음" : "없음"}</p>
                <p><strong>AI 전략 추천:</strong> {hasStrategy ? "있음" : "없음"}</p>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(item.seqNumber);
                  }}
                >
                  삭제
                </button>
              </div>

              {index !== bookmark.length - 1 && <hr className="divider" />}
            </div>
          );
        })}
      </div>
      )}
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
