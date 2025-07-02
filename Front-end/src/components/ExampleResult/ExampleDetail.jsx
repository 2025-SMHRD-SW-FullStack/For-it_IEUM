import React from 'react'
import TariffComparisonTab from '../detail-panel/tab/TariffComparisonTab'

const ExampleDetail = () => {
  return (
    <div className='ExampleGroup'>
        <p className="helper">
          품목을 검색하면, 이렇게 국가별 관세 정보를 확인할 수 있어요!
        </p>

        <TariffComparisonTab/>
      
    </div>
  )
}

export default ExampleDetail