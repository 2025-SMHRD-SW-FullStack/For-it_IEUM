import React, { useEffect, useState } from 'react';
import './NewsPanel.css';
import CloseButton from '../detail-panel/button/CloseButton';

const stripTags = str => str.replace(/<\/?[^>]+(>|$)/g, '');

const NewsPanel = ({ item, setIsVisible, onClose }) => {
  const [isShown, setIsShown] = useState(false);
  const [canIframe, setCanIframe] = useState(null);

  useEffect(() => {
    if (item) {
      setCanIframe(null);
      setTimeout(() => setIsShown(true), 10);
    }
  }, [item]);

  const handleIframeLoad = () => setCanIframe(true);
  const handleIframeError = () => setCanIframe(false);

  const handleClose = () => {
    setIsShown(false);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!item) return null;

  return (
    <div className={`news-panel ${isShown ? 'show' : 'hide'}`}>
      <div className="btnContainer">
        <CloseButton onClick={handleClose} />
      </div>

      <div className="news-content">
        {canIframe === true && (
          <iframe
            className="news-iframe"
            src={item.link}
            title={stripTags(item.title)}
          />
        )}

        {canIframe === false && (
          <>
            <h3 className="newsTitle">{stripTags(item.title)}</h3>
            <small>{new Date(item.pubDate).toLocaleString('ko-KR')}</small>
            <div
              className="news-html"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              원문 보기 →
            </a>
          </>
        )}

        {canIframe === null && (
          <iframe
            className="news-iframe"
            src={item.link}
            title={stripTags(item.title)}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            style={{ display: 'none' }}
          />
        )}
      </div>
    </div>
  );
};

export default NewsPanel;
