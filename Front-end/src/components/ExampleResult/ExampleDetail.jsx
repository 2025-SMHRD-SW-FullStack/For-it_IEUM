import React from 'react'
import testItem from '../../data/testItem';
import TariffComparisonTab from '../detail-panel/tab/TariffComparisonTab'
import './ExampleDetail.css'
import CaculatorLogic from '../detail-panel/tab/CaculatorLogic';

const ExampleDetail = () => {
  const exampleData = testItem[0];

  return (
    <div className='ExampleGroup'>
      <p className='exampleText'>
        품목 검색 하나로, 관세 비교부터 AI 전략 추천까지! 누구나 쉽게 무역 정보를 확인할 수 있어요.
      </p>

      <div className='exampleContent'>

        {/* 1. 관세 비교 탭  */}
        <div className='exampleBox'>
          <TariffComparisonTab overrideData={exampleData} className='exampleTariff'/>
        </div>

        {/* 2. 계산기 로직  */}
        <div className='exampleBox'>
          <div className='exampleDetailText'>
            <b>계산 결과</b><br /> 
            ✅ 수입 원가 계산 (FTA 적용 기준)<br /> 
            물품 가격: 5,000,000원 (500개 × 10,000원)<br /> 
            CIF 기준 가격: 5,500,000원<br /> 
            관세 (FTA 0.0%): 0원<br /> 
            부가세 (VAT 10%): 550,000원<br /> 
            총 세금: 550,000원<br /> 
            <br /> 
            ✅ 총 수입 비용: 약 6,050,000원<br /> 
            1개당 총 수입단가: 약 12,100원<br /> 
            <br /> 
            ✅ 차이점: 3,025원<br /> 
          </div>
        </div>

        {/* 3. AI 요약   */}
        <div className='exampleBox'>
          <div className='exampleDetailText'>
            📌 품목 요약 <br />  
            - 인스턴트 커피(2101.11-1000) <br />
            : 전 세계적으로 수요가 많은 품목. <br />
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
    </div>
  )
}

export default ExampleDetail;
