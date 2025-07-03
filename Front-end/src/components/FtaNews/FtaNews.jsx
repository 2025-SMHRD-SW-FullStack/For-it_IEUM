import React, { useEffect, useState } from 'react'
import './FtaNews.css';
import { newsItem } from '../../services/newsService';
const FtaNews = () => {

  const [items, setItems] = useState([]);

const fetchResults = async () => {
    try {
      const response = await newsItem();   // axios.get 결과
      console.log(response);
        setItems(response);
      // navigate('/search', { replace: true });
    } catch (error) {
      console.error('검색 실패:', error);
    }
  };

useEffect(() => {
    fetchResults(); // 페이지 진입 시 초기화
  }, []);


  
  return (
    <div>
      {items.map(item => (
            <li key={item.id} className="fta-news__item">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <h3 className="fta-news__title">{item.title}</h3>
              </a>
              <small className="fta-news__date">
                {new Date(item.pubDate).toLocaleString('ko-KR')}
              </small>
              <div
                className="fta-news__description"
                // description 안의 <b> 같은 태그를 그대로 렌더링
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </li>
          ))}

    </div>
  )
}

export default FtaNews