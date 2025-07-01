import React from "react";
import './AIStrategyTab.css'

const AIStrategyTab = ({ loading, response }) => {
  return (
    <div>
      <pre className="AIText">
        {loading
          ? "AI가 전략을 분석 중입니다..."
          : response || "AI 응답을 받지 못했습니다."}
      </pre>
    </div>
  );
};

export default AIStrategyTab;
