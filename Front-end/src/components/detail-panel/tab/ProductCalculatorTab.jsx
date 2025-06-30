import React from 'react'
import useCardStore from '../../../stores/CardStore';
import '../../../styles/ProductCalculatorTab.css'
import CountryList from './CountryList';
import testItemArray from '../../../data/testItemArray';

const ProductCalculatorTab = () => {

  const {selectedCard} = useCardStore();

  return (
    <div>
      <div className='container'>
        <div className='inputContent'>
          <div className='inputContainer'>
            품목 수량:&nbsp;
            <input type="text" className='ProductInput' placeholder='ex) 500'/>
            (개)
          </div>

          <div className='inputContainer'>
            단위당 수량 가격:&nbsp;
            <input type="text" className='ProductInput' placeholder='ex) 125,000 (100개당)'/>
            (원)
          </div>
        </div>
        <CountryList className='countryList' countries={selectedCard.availableCountries} dropDown={true}/>
      </div>
      <br />
      <button>계산하기</button>
      <br/>
      <br/>
      <div className='logic'></div>
    </div>
  )
}

export default ProductCalculatorTab