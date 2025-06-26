import React, { useState } from "react";
import buildPrompt from "../../../api/Prompt";
import buildPrompt4o from "../../../api/Prompt4o"
import useOpenAI from "../../../api/openAI";
import testItem from "../../../data/testItem";


const AIStrategyTab = () => {
  const [submitted, setSubmitted] = useState(false);
  // const prompt = buildPrompt(testItem);
  const prompt = buildPrompt4o(testItem);
  const { loading, response, fetchAI } = useOpenAI();

  const handleClick = () => {
    console.log(testItem); // buildPrompt 내부 맨 위에 찍어보기
    setSubmitted(true);
    fetchAI(prompt);
  };

  return (
    <div>
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
