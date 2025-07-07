import React, { useEffect, useState, useRef } from "react";
import './AIStrategyTab.css';
import useCardStore from "../../../stores/CardStore";
import { chatGPTItem } from '../../../services/chatGPTService';
import useChatGPTStore from '../../../stores/ChatGPTStore';
import { toast, ToastContainer } from "react-toastify";

const AIStrategyTab = () => {
  const [chatResponse, setChatResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { selectedCard } = useCardStore();
  const { setChatGPTResponse } = useChatGPTStore();

  // 마지막으로 fetch를 실행했던 카드를 기억할 ref
  const lastFetchedCardRef = useRef(null);
  // 경고 토스트를 한 번만 띄우기 위한 ref
  const hasShownInitialWarning = useRef(false);

  useEffect(() => {
    // 카드가 선택되지 않았으면 아무것도 안 함
    if (!selectedCard) return;

    // 이미 같은 카드에 대해 fetch를 했다면 중단
    if (lastFetchedCardRef.current === selectedCard) {
      return;
    }

    if(chatResponse){
      return;
    }

    const isLoggedIn = !!localStorage.getItem("accessToken");

    // 로그인 안 됐으면 한 번만 경고
    if (!isLoggedIn && !hasShownInitialWarning.current) {
      toast.warn("회원만 이용이 가능합니다. 가입을 먼저 해주세요");
      hasShownInitialWarning.current = true;
      setChatResponse("회원만 이용이 가능합니다. 가입을 먼저 해주세요");
      return;
    }

    // 이미 경고는 띄웠는데 여전히 미로그인 상태면 탭 메시지만 변경
    if (!isLoggedIn) {
      setChatResponse("회원만 이용이 가능합니다. 가입을 먼저 해주세요");
      return;
    }

    // 로그인된 상태일 때만 AI 전략 호출
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await chatGPTItem(selectedCard);
        setChatGPTResponse(data.answer);
        setChatResponse(data.answer);
        // 성공적으로 fetch 한 카드 정보 저장
        lastFetchedCardRef.current = selectedCard;
      } catch (error) {
        console.error("ChatGPT 응답을 가져오지 못했습니다:", error);
        setChatResponse("AI 응답을 받지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [selectedCard, setChatGPTResponse]);

  return (
    <pre className="AIText">
      {loading
        ? "AI가 전략을 분석 중입니다..."
        : chatResponse
          ? chatResponse
          : "AI 응답을 받지 못했습니다."}
      <ToastContainer
        position="top-center"
        autoClose={300}
        hideProgressBar={true}
        toastStyle={{ width: 'fit-content', whiteSpace: 'nowrap' }}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </pre>
  );
};

export default AIStrategyTab;
