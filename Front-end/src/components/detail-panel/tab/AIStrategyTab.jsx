import React, { useEffect, useState, useRef } from "react";
import './AIStrategyTab.css'
import useCardStore from "../../../stores/CardStore";
import { chatGPTItem } from '../../../services/chatGPTService';
import useChatGPTStore from '../../../stores/ChatGPTStore';
import { toast, ToastContainer } from "react-toastify";

const AIStrategyTab = () => {
  const [chatResponse, setChatResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { selectedCard } = useCardStore();
  const { setChatGPTResponse } = useChatGPTStore();

  // 경고 메시지를 한 번만 표시하기 위한 ref를 사용합니다.
  // useRef는 컴포넌트가 리렌더링되어도 값을 유지하고, 값이 변경되어도 리렌더링을 유발하지 않습니다.
  const hasShownInitialWarning = useRef(false);

  useEffect(() => {
    // 선택된 카드가 없으면 아무것도 하지 않습니다.
    if (!selectedCard) {
      return; 
    }

    const isLoggedIn = !!localStorage.getItem("accessToken");

    // **회원이 아닐 때 경고 메시지를 한 번만 표시하는 로직**
    // 로그인되어 있지 않고, 아직 경고를 표시한 적이 없다면 경고 토스트를 띄웁니다.
    if (!isLoggedIn && !hasShownInitialWarning.current) {
      toast.warn("회원만 이용이 가능합니다. 가입을 먼저 해주세요");
      hasShownInitialWarning.current = true; // 경고를 표시했음을 기록합니다.
      // 이 경우, 데이터를 가져오지 않고 바로 함수를 종료합니다.
      setChatResponse("회원만 이용이 가능합니다. 가입을 먼저 해주세요"); // 탭 내부에 메시지 표시
      return; 
    }

    // 이미 경고가 표시되었고 여전히 로그인되어 있지 않은 경우 (다른 카드를 선택했을 때)
    // 데이터 요청은 하지 않고, 탭 내부에 메시지만 표시합니다.
    if (!isLoggedIn) {
        setChatResponse("회원만 이용이 가능합니다. 가입을 먼저 해주세요");
        return;
    }

    // **로그인되어 있는 경우에만 AI 전략 데이터를 가져오는 로직**
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await chatGPTItem(selectedCard);
        setChatGPTResponse(data.answer);
        setChatResponse(data.answer);
      } catch (error) {
        console.error("ChatGPT 응답을 가져오지 못했습니다:", error);
        setChatResponse("AI 응답을 받지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchResults();

  // selectedCard가 변경될 때만 이 useEffect가 실행되도록 의존성 배열에 추가합니다.
  }, [selectedCard]); 

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