import React from 'react'
import './TariffComparisonTab.css'
import useCardStore from '../../../stores/CardStore';
import TariffGraph from './TariffGraph';
import CountryList from './CountryList';
import testItemArray from '../../../data/testItemArray';

const TariffComparisonTab = () => {

  const { selectedCard, clearSelectedCard } = useCardStore();

  if (!selectedCard) return null; // 아무것도 선택 안 됐으면 패널 안 보여줌

  return (
    <div className='tariffGroup'>
      <div className='selectedCard'>
        <div className='textDetail'>
          <div className='DetailLabel'>HS코드</div>
          {selectedCard.hsCode}
        </div>
        <div className='textDetail'>
          <div className='DetailLabel'>품목명</div>
          {selectedCard.itemName} 
        </div>
      </div>
      <br/>
      <div className='TariffContainer'>
        <TariffGraph />
        <CountryList countries={selectedCard.availableCountries}/>     
      </div>
    </div>
  )
}

export default TariffComparisonTab