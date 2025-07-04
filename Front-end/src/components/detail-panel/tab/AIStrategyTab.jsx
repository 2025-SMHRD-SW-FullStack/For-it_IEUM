import React, { useEffect, useState } from "react";
import './AIStrategyTab.css'
import useCardStore from "../../../stores/CardStore";
import { chatGPTItem } from '../../../services/chatGPTService';
import useChatGPTStore from '../../../stores/ChatGPTStore';

const AIStrategyTab = () => {

  const [chatResponse, setChatResponse] = useState(null); // chatResponse에 chatGPT 데이터 담겨있음
  const [loading, setLoading] = useState(false);

  const{selectedCard} = useCardStore();
  const {setChatGPTResponse} = useChatGPTStore();

  useEffect(() => {
  
    if (!selectedCard) return; // selectedCard가 빈값이면 return

    const fetchResults = async () => {
      setLoading(true);

      try {
        const data = await chatGPTItem(selectedCard);
        setChatGPTResponse(data.answer); // chatGPTStore에 데이터 저장
        setChatResponse(data.answer);
      } catch (error) {
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
