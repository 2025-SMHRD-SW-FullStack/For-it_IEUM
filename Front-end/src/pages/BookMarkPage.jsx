import React, { useState, useEffect } from "react";
import './BookMarkPage.css';
import { getBookMarkList, deleteBookMark } from '../services/bookMarkService';
import { useBookmarkStore } from '../stores/BookMarkStore';

const BookMarkPage = () => {
  const [openItem, setOpenItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [calculationOpen, setCalculationOpen] = useState({});
  const [strategyOpen, setStrategyOpen] = useState({});
  const [btnAnimState, setBtnAnimState] = useState({});

  const { bookmarkList, setBookmark } = useBookmarkStore();

  useEffect(() => {
    const getList = async () => {
      const data = await getBookMarkList();
      setBookmark(data);
    };
    getList();
  }, [setBookmark]);

  const handleToggle = (value) => {
    setOpenItem((prev) => (prev === value ? null : value));
  };

  const handleDeleteClick = (value, e) => {
    e.stopPropagation(); // 삭제 버튼 클릭 시 토글 방지
    setSelectedValue(value);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    const newList = bookmarkList.filter(item => item.seqNumber !== selectedValue);
    const result = await deleteBookMark(selectedValue);
    if (result === "success") {
      setBookmark(newList);
      setModalOpen(false);
      setSelectedValue(null);
    }
  };

  const toggleCalculation = (seqNumber) => {
    setCalculationOpen(prev => ({ ...prev, [seqNumber]: !prev[seqNumber] }));
  };

  const toggleStrategy = (seqNumber) => {
    setStrategyOpen(prev => ({ ...prev, [seqNumber]: !prev[seqNumber] }));
  };

  const handleBtnClickWithAnim = (seqNumber, toggleFunc) => {
    setBtnAnimState(prev => ({ ...prev, [seqNumber]: true }));
    toggleFunc(seqNumber);
    setTimeout(() => {
      setBtnAnimState(prev => ({ ...prev, [seqNumber]: false }));
    }, 150);
  };

  return (
    <div className="bookmark-container">
      <h1 className="bookmark-title">북마크 페이지</h1>
      {bookmarkList.length === 0 ? (
        <p className="empty-message">아직 저장된 북마크가 없어요.</p>
      ) : (
        <div className="accordion-container">
          {bookmarkList.map((item, index) => {
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
                  type="button"
                >
                  <div className="accordion-title-wrapper">
                    <span className="accordion-title" title={item.productName}>
                      {`${shortTitle} | ${item.country ?? ""} (${item.tariff}%)`}
                    </span>
                    <div className="accordion-meta">
                      <span className={`status ${hasHistory ? 'on' : 'off'}`}>
                        계산 이력: {hasHistory ? "있음" : "없음"}
                      </span>
                      <span className={`status ${hasStrategy ? 'on' : 'off'}`}>
                        | AI 전략 추천: {hasStrategy ? "있음" : "없음"}
                      </span>
                    </div>
                  </div>

                  <button
                    className="delete-btn small"
                    onClick={(e) => handleDeleteClick(item.seqNumber, e)}
                    type="button"
                  >
                    삭제
                  </button>

                  <span className="accordion-icon">{isOpen ? "▲" : "▼"}</span>
                </button>

                <div className={`accordion-content ${isOpen ? "open" : ""}`}>
                  <div className="details-section">
                    <p><strong>품목명:</strong> {item.productName}</p>
                    <p><strong>최저 관세 국가:</strong> {item.country}</p>

                    <p>
                      <strong>계산 이력:</strong>{" "}
                      {hasHistory ? (
                        <button
                          className={`strategy-text-btn ${btnAnimState[item.seqNumber] ? 'animate' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBtnClickWithAnim(item.seqNumber, toggleCalculation);
                          }}
                          type="button"
                        >
                          {calculationOpen[item.seqNumber] ? '닫기' : '보기'}
                        </button>
                      ) : (
                        "없음"
                      )}
                    </p>

                    {hasHistory && (
                      <div className={`calculation-detail dropdown-slide ${calculationOpen[item.seqNumber] ? 'open' : ''}`}>
                        <ul>
                          {(() => {
                            let calcResult = item.calculation;
                            if (typeof calcResult === 'string') {
                              try {
                                calcResult = JSON.parse(calcResult);
                              } catch {
                                return <li>{item.calculation}</li>;
                              }
                            }
                            return Object.entries(calcResult).map(([key, value]) => (
                              <li key={key}>{key}: {value}</li>
                            ));
                          })()}
                        </ul>
                      </div>
                    )}

                    <p>
                      <strong>AI 전략 추천:</strong>{" "}
                      {hasStrategy ? (
                        <button
                          className={`strategy-text-btn ${btnAnimState[item.seqNumber] ? 'animate' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBtnClickWithAnim(item.seqNumber, toggleStrategy);
                          }}
                          type="button"
                        >
                          {strategyOpen[item.seqNumber] ? '닫기' : '보기'}
                        </button>
                      ) : (
                        "없음"
                      )}
                    </p>

                    {hasStrategy && (
                      <div className={`strategy-text dropdown-slide ${strategyOpen[item.seqNumber] ? 'open' : ''}`}>
                        {item.chatGPTAnswer}
                      </div>
                    )}
                  </div>
                </div>

                {index !== bookmarkList.length - 1 && <hr className="divider" />}
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
              <button className="confirm-btn" onClick={confirmDelete}>삭제</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookMarkPage;
