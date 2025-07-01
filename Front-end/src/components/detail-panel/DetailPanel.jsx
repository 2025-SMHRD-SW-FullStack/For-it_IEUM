import React, { useState, useEffect } from 'react';
import './DetailPanel.css';
import TabMenu from './TabMenu';
import TariffComparisonTab from './tab/TariffComparisonTab';
import ProductCalculatorTab from './tab/ProductCalculatorTab';
import AIStrategyTab from './tab/AIStrategyTab';
import useCardStore from '../../stores/CardStore';

import CloseButton from './button/CloseButton';
import BookmarkButton from './button/BookmarkButton';

const DetailPanel = () => {
  const { selectedCard, clearSelectedCard } = useCardStore();
  const [activeTab, setActiveTab] = useState('tariff');
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (selectedCard) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 200);
    }
  }, [selectedCard]);

  if (!shouldRender) return null;

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'tariff': return <TariffComparisonTab />;
      case 'calculator': return <ProductCalculatorTab />;
      case 'strategy': return <AIStrategyTab />;
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
        {renderActiveTab()}
      </div>
    </aside>
  );
};

export default DetailPanel;
