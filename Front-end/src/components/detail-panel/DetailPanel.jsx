import React, { useState } from 'react'
import '../../styles/DetailPanel.css'
import TabMenu from './TabMenu';
import TariffComparisonTab from './tab/TariffComparisonTab';
import ProductCalculatorTab from './tab/ProductCalculatorTab';
import AIStrategyTab from './tab/AIStrategyTab';
import useCardStore from '../../stores/CardStore';

const DetailPanel = () => {

  const [activeTab, setActiveTab] = useState('tariff'); // 기본 탭: 관세 비교

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
      <div className='tabContent'>{renderActiveTab()}</div>
    </aside>
  )
}

export default DetailPanel