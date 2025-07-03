import React from 'react'
import testItemArray from '../../data/testItemArray';
import TariffComparisonTab from '../detail-panel/tab/TariffComparisonTab'
import './ExampleDetail.css'
import CaculatorLogic from '../detail-panel/tab/CaculatorLogic';

const ExampleDetail = () => {

  const exampleData = testItemArray[0];

  return (
    <div className='ExampleGroup'>
        <p className='exampleText'>
          품목을 검색하면, 이렇게 국가별 관세 정보를 확인할 수 있어요!
        </p>

        <div className='exampleContent'>
          <TariffComparisonTab overrideData={exampleData} className='exampleTariff'/>
          <CaculatorLogic className='exampleLogic'/>
          <div className='exampleAIText'>
            📌 품목 요약 <br />  
            - 커피 원두(0921.21-0000) <br />
              : 특정 품목에 대한 정보가 제공되지 않음. <br />
            <br />
            📊 관세 비교 <br />
            - 기본 관세율: 8% <br />
            - FTA 최저 관세율: 0% (베트남)  <br />
            - 기타 FTA 체결국: 콜롬비아(0%), 페루(2%), 태국(8%) <br />
            <br />
            ✅ 전략 추천 <br />
            - 추천 수입국: 베트남 <br />
            - 이유: 베트남은 관세가 0%로 가장 낮음. <br />
              물류비와 납기 측면에서도 유리함. <br />
          </div>
        </div>
    </div>
  )
}

export default ExampleDetail