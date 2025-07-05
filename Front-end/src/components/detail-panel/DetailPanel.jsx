import React, { useState, useEffect } from 'react';
import './DetailPanel.css';
import TabMenu from './TabMenu';
import TariffComparisonTab from './tab/TariffComparisonTab';
import ProductCalculatorTab from './tab/ProductCalculatorTab';
import AIStrategyTab from './tab/AIStrategyTab';
import useCardStore from '../../stores/CardStore';

import CloseButton from './button/CloseButton';
import BookmarkButton from './button/BookmarkButton';

import buildPrompt4o from '../../api/Prompt4o';
import useOpenAI from '../../api/openAI';
import testItem from '../../data/testItem';
import { saveSearchData } from '../../services/searchService';
import useCalCulStore from '../../stores/CalculStore';


const DetailPanel = () => {
  const { selectedCard, clearSelectedCard } = useCardStore();
  const [activeTab, setActiveTab] = useState('tariff');
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // 품목 관련 상태
  const { reset } = useCalCulStore();

  // AI 전략 관련 상태
  const [aiSubmitted, setAiSubmitted] = useState(false);
  const { loading, response, fetchAI } = useOpenAI();

  // 카드 선택 시 상태 초기화
  useEffect(() => {
    if (selectedCard) {
      setActiveTab('tariff');
      reset();
      saveSearchData(
        selectedCard.product_name,
        selectedCard.hs_code,
        new Date()
      ).then(res => {
        console.log("검색 데이터 저장 성공:", res);})
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
      setAiSubmitted(false);  // 새 카드일 땐 전략 초기화
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 200);
    }
  }, [selectedCard]);

  // AI 전략 탭에 진입하면 자동 호출
  useEffect(() => {
    if (activeTab === 'strategy' && selectedCard && !aiSubmitted) {
      const selectedItem = testItem.find(item => item.id === selectedCard.id);
      const prompt = buildPrompt4o(selectedItem);
      fetchAI(prompt);
      setAiSubmitted(true);
    }
  }, [activeTab, selectedCard, aiSubmitted]);

  if (!shouldRender) return null;

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'tariff': return <TariffComparisonTab />;
      case 'calculator': return <ProductCalculatorTab />;
      case 'strategy': return (
        <AIStrategyTab
          loading={loading}
          response={response}
        />
      );
      default: return null;
    }
  };

  return (
    <aside className={`detailPanel ${isVisible ? 'open' : ''}`}>
      <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className='tabContent'>
        <div className='btnContainer'>
          <CloseButton clearSelectedCard={clearSelectedCard} setIsVisible={setIsVisible} />
          <BookmarkButton activeTab={activeTab} selectedCard={selectedCard} />
        </div>

      <div className='activeTab' key={activeTab}>
        {renderActiveTab()}
      </div>
      </div>
    </aside>
  );
};

export default DetailPanel;
