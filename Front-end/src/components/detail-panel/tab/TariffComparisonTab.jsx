import React from 'react'
import useCardStore from '../../../stores/CardStore';
import TariffGraph from './TariffGraph';
import './TariffComparisonTab.css'
import CountryList from './CountryList';
import testItemArray from '../../../data/testItemArray';

const TariffComparisonTab = () => {

  const { selectedCard, clearSelectedCard } = useCardStore();

  if (!selectedCard) return null; // 아무것도 선택 안 됐으면 패널 안 보여줌

  return (
    <div>
      <div className='selectedCard'>
        HS코드: {selectedCard.hsCode} | 품목명: {selectedCard.itemName} 
      </div>
      <br/>
      <TariffGraph/>
      <CountryList countries={selectedCard.availableCountries}/>     

    </div>
  )
}

export default TariffComparisonTab