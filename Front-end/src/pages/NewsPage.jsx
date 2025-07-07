import React, { useEffect, useState } from 'react';
import './NewsPage.css';
import { newsItem } from '../services/newsService';
import NewsPanel from '../components/news/NewsPanel';

const NewsPage = () => {

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showNews, setShowNews] = useState(false);

  const stripTagsAndDecode = str => {
    const withoutTags = str.replace(/<\/?[^>]+(>|$)/g, "");
    const txt = document.createElement('textarea');
    txt.innerHTML = withoutTags;
    return txt.value;
  };


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
    
    <div className = 'newsPage' >
      <div className="news-list">
        {items.map(item => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="newsCard-link"
          >
            <div className="newsCard">
              <h3 className="newsTitle">{stripTagsAndDecode(item.title)}</h3>
              <small className="newsDate">
                {new Date(item.pubDate).toLocaleString('ko-KR')}
              </small>
              <div
                className="newsDescription"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          </a>
        ))}
      </div>
    </div >

        

  );
};

{/* 뉴스 패널이 띄워지도록 하는 코드
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
              <h3 className="newsTitle">{stripTagsAndDecode(item.title)}</h3>
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

      {showNews && selectedItem &&(
        <NewsPanel
          key={selectedItem.id}
          item={selectedItem}
          setIsVisible={setShowNews}
          onClose={() => setSelectedItem(null)}
        />
      )} 
      </div >  
    )
      */}

export default NewsPage;
