import React, { useRef, useState } from 'react'
import useCardStore from '../../../stores/CardStore';
import './ProductCalculatorTab.css'
import CountryList from './CountryList';
import testItemArray from '../../../data/testItemArray';
import CaculatorLogic from './CaculatorLogic';
import useCalCulStore from '../../../stores/CalculStore';

const ProductCalculatorTab = () => {

  const {selectedCard} = useCardStore();
  const {setValues} = useCalCulStore();
  const [trigger, setTrigger] = useState(false);

  const quantityRef = useRef();
  const unitPriceRef = useRef();

  const handleCalcul = () => {
    setValues(quantityRef.current.value, unitPriceRef.current.value);
    setTrigger(prev=> !prev);
  }

  return (
    <div>
      <div className='input'>
        <div className='inputContent'>
          <div className='inputContainer quantity'>
            품목 수량:&nbsp;
            <input type="text" className='ProductInput quantity' placeholder='ex) 500' ref={quantityRef}/>
            (개)
          </div>

          <div className='inputContainer'>
            단위당 수량 가격:&nbsp;
            <input type="text" className='ProductInput' placeholder='ex) 125,000 (100개당)' ref={unitPriceRef}/>
            (원)
          </div>
        </div>
      
          <div>
            <CountryList countries={selectedCard.availableCountries} dropDown={true}/>
            <button className='CacultateBtn' onClick={handleCalcul}>계산하기</button>
          </div>
      </div>
      
      <CaculatorLogic className='resultLogic' trigger={trigger} />
    </div>
  )
}

export default ProductCalculatorTab