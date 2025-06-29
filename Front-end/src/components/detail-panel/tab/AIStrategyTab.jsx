import React, { useState } from "react";
import buildPrompt from "../../../api/Prompt";
import buildPrompt4o from "../../../api/Prompt4o"
import useOpenAI from "../../../api/openAI";
import useCardStore from "../../../stores/CardStore";
import testItemArray from "../../../data/testItemArray";


const AIStrategyTab = () => {
  const [submitted, setSubmitted] = useState(false);
  // const prompt = buildPrompt(testItem);
  const prompt = buildPrompt4o(testItemArray); // 최종 수정 프롬프트
  const { loading, response, fetchAI } = useOpenAI();

  const { selectedCard, clearSelectedCard } = useCardStore();
  if (!selectedCard) return null;

  const handleClick = () => {
    console.log(testItemArray); // buildPrompt 내부 맨 위에 찍어보기
    setSubmitted(true);
    fetchAI(prompt);
  };

  return (
    <div>
      <button onClick={clearSelectedCard}>닫기</button>

      <h2>AI 수입 전략 추천</h2>

      <button onClick={handleClick} disabled={loading}>
        {loading ? "불러오는 중..." : "AI 전략 추천받기"}
      </button>

      {submitted && (
        <pre>
          {loading
            ? "AI가 전략을 분석 중입니다..."
            : response || "AI 응답을 받지 못했습니다."}
        </pre>
      )}
    </div>
  );
};

export default AIStrategyTab;
