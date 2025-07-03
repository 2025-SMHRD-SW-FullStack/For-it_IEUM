import React, { useEffect, useState } from "react";
import './AIStrategyTab.css'
import useCardStore from "../../../stores/CardStore";
import { chatGPTItem } from '../../../services/chatGPTService';

const AIStrategyTab = () => {

  const [chatResponse, setChatResponse] = useState(null); // chatResponse에 chatGPT 데이터 담겨있음
  const [loading, setLoading] = useState(false);

  const{selectedCard} = useCardStore();
  console.log(selectedCard);

  useEffect(() => {
  
    if (!selectedCard) return; // selectedCard가 빈값이면 return

    const fetchResults = async () => {
      setLoading(true);

      try {
        const data = await chatGPTItem(selectedCard);
        console.log(data.answer);
        
        setChatResponse(data.answer);
        console.log(chatResponse);
        
        // navigate('/search', { replace: true });
      } catch (error) {
        console.error('검색 실패:', error);
        setChatResponse(null);
      }finally{
        setLoading(false);
      }
    };
  
    fetchResults();
  }, [selectedCard]);


  

  return (
    <div>
      <pre className="AIText">
        {loading
          ? "AI가 전략을 분석 중입니다..."
          : chatResponse
            ? chatResponse
            : "AI 응답을 받지 못했습니다."}
      </pre>
      
    </div>
  );
};

export default AIStrategyTab;
