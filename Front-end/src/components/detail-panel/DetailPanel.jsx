import React, { useState } from 'react'
import './DetailPanel.css'
import TabMenu from './TabMenu';
import TariffComparisonTab from './tab/TariffComparisonTab';
import ProductCalculatorTab from './tab/ProductCalculatorTab';
import AIStrategyTab from './tab/AIStrategyTab';
import useCardStore from '../../stores/CardStore';

const DetailPanel = () => {

  const [activeTab, setActiveTab] = useState('tariff'); // 기본 탭: 관세 비교

  const { selectedCard, clearSelectedCard } = useCardStore();
  if (!selectedCard) return null;

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'tariff':
        return <TariffComparisonTab />;
      case 'calculator':
        return <ProductCalculatorTab />;
      case 'strategy':
        return <AIStrategyTab />;
      default:
        return null;
    }
  };


  return (
    <aside className='detailPanel'>
      <TabMenu 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      className='tabMenu' />
      <div className='tabContent'>
        <button onClick={clearSelectedCard} className='closeBtn'>닫기</button>
        <br/><br/>
        {renderActiveTab()}
      </div>
    </aside>
  )
}

export default DetailPanel