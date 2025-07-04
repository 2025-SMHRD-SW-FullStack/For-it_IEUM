import React, { useEffect, useState } from 'react';
import './NewsPage.css';
import { newsItem } from '../services/newsService';
import NewsPanel from '../components/news/NewsPanel';

const stripTags = str => str.replace(/<\/?[^>]+(>|$)/g, "");

const NewsPage = () => {
  
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showNews, setShowNews] = useState(false);

  const fetchResults = async () => {
    try {
      const response = await newsItem();
      setItems(response);
    } catch (error) {
      console.error('검색 실패:', error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className={`newsPage ${showNews ? 'show-panel' : ''}`}>
        <div className="news-list">
          {items.map(item => (
            <div
              key={item.id}
              className="newsCard"
              onClick={() => {
                setSelectedItem(item);
                setShowNews(true);
              }}>
              <h3 className="newsTitle">{stripTags(item.title)}</h3>
              <small className="newsDate">
                {new Date(item.pubDate).toLocaleString('ko-KR')}
              </small>
              <div
                className="newsDescription"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          ))}
        </div>

      {showNews && (
        <NewsPanel
          item={selectedItem}
          setIsVisible={setShowNews}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default NewsPage;
