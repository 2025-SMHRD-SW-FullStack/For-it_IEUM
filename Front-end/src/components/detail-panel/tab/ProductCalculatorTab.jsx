import React, { useRef, useState } from 'react'
import useCardStore from '../../../stores/CardStore';
import './ProductCalculatorTab.css'
import CountryList from './CountryList';
import CaculatorLogic from './CaculatorLogic';
import useCalCulStore from '../../../stores/CalculStore';

const ProductCalculatorTab = () => {

  const {selectedCard} = useCardStore();
  const {
    quantity,
    unitPrice,
    setQuantity,
    setUnitPrice,
    setValues,
  } = useCalCulStore();

  const [trigger, setTrigger] = useState(false);

  const handleCalcul = () => {
    setValues(quantity, unitPrice);
    setTrigger(prev => !prev);
  }

  return (
    <div>
      <div className='input'>
        <div className='inputContent'>
          <div className='inputContainer'>
            <label className="inputLabel">수량:</label>
            <input 
              type="number" 
              min="1" 
              className="ProductInput" 
              placeholder="ex) 500" 
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              />
            (개)
          </div>

          <div className='inputContainer'>
             <label className="inputLabel">단가:</label>
            <input 
              type="number" 
              className='ProductInput' 
              placeholder='ex) 125,000'
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}/>
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