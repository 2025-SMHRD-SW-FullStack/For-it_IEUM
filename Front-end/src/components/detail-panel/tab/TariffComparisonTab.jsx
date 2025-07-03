import React from 'react'
import './TariffComparisonTab.css'
import useCardStore from '../../../stores/CardStore';
import TariffGraph from './TariffGraph';
import CountryList from './CountryList';
import testItemArray from '../../../data/testItemArray';

const TariffComparisonTab = ({ overrideData = null, className = '' }) => {

   const { selectedCard } = useCardStore();

  // 예시 데이터가 있으면 그걸 우선 사용
  const cardData = overrideData || selectedCard;

  if (!cardData) return null;

  return (
    <div className={`tariffGroup ${className}`}>
      <div className='selectedCard'>
        <div className='textDetail'>
          <div className={`DetailLabel ${className}`}>HS코드</div>
          <div className={`${className}`}>{cardData.hs_code}</div>
        </div>
        <div className='textDetail'>
          <div className={`DetailLabel ${className}`}>품목명</div>
          <div className={`${className}`}>{cardData.product_name}</div>
        </div>
      </div>
      <br/>
      <div className='TariffContainer'>
        <TariffGraph overrideData={cardData}/>
        <CountryList countries={cardData.availableCountries} className={`${className}`}/>
      </div>
    </div>
  )
}

export default TariffComparisonTab