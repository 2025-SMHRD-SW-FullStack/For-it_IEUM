import React from 'react'
import useCardStore from '../../../stores/CardStore';
import './ProductCalculatorTab.css'
import CountryList from './CountryList';
import testItemArray from '../../../data/testItemArray';

const ProductCalculatorTab = () => {

  const {selectedCard} = useCardStore();

  return (
    <div>
      <div className='input'>
        <div className='inputContent'>
          <div className='inputContainer quantity'>
            품목 수량:&nbsp;
            <input type="text" className='ProductInput quantity' placeholder='ex) 500'/>
            (개)
          </div>

          <div className='inputContainer'>
            단위당 수량 가격:&nbsp;
            <input type="text" className='ProductInput' placeholder='ex) 125,000 (100개당)'/>
            (원)
          </div>
        </div>
      
          <div>
            <CountryList countries={selectedCard.availableCountries} dropDown={true}/>
            <button className='CacultateBtn'>계산하기</button>
          </div>
      </div>
      <div className='logic'></div>
    </div>
  )
}

export default ProductCalculatorTab