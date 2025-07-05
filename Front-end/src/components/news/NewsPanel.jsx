import React, { useEffect, useRef, useState } from 'react';
import './NewsPanel.css';
import CloseButton from '../detail-panel/button/CloseButton';

const NewsPanel = ({ item, setIsVisible, onClose }) => {
  const [isShown, setIsShown] = useState(false);
  const [canIframe, setCanIframe] = useState(null);
  const timerRef = useRef(null);

  const stripTagsAndDecode = str => {
    const withoutTags = str.replace(/<\/?[^>]+(>|$)/g, "");
    const txt = document.createElement('textarea');
    txt.innerHTML = withoutTags;
    return txt.value;
  };

  useEffect(() => {
    if (!item) return;

    // 초기화
    clearTimeout(timerRef.current);
    setCanIframe(null);
    setIsShown(false);

    // 짧은 딜레이 후 슬라이드 인
    setTimeout(() => setIsShown(true), 10);

    // 2초 내 onLoad/onError 없으면 실패 처리
    timerRef.current = setTimeout(() => {
      setCanIframe(prev => (prev === null ? false : prev));
    }, 2000);

    return () => clearTimeout(timerRef.current);
  }, [item]);

  const handleIframeLoad = () => {
    clearTimeout(timerRef.current);
    setCanIframe(true);
  };

  const handleIframeError = () => {
    clearTimeout(timerRef.current);
    setCanIframe(false);
  };

  const handleClose = () => {
    setIsShown(false);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  return (
    <div className={`news-panel ${isShown ? 'show' : ''}`}>
      <div className="btnContainer">
        <CloseButton onClick={handleClose} />
      </div>

      {canIframe === null && (
        <p className="loading-text">원문을 불러오는 중입니다...</p>
      )}

      <iframe
        key={item?.link} // 중요: item 변경 시 iframe도 강제 remount
        className={`news-iframe ${
          canIframe === null
            ? 'hidden'
            : canIframe === true
            ? 'visible'
            : ''
        }`}
        src={item.link}
        title={stripTagsAndDecode(item.title)}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />

      {canIframe === false && (
        <div className="fallback-news">
          <h3 className="newsTitle">{stripTagsAndDecode(item.title)}</h3>
          <small>{new Date(item.pubDate).toLocaleString('ko-KR')}</small>
          <div
            className="news-html"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            원문 보기 →
          </a>
        </div>
      )}
    </div>
  );
};

export default NewsPanel;
