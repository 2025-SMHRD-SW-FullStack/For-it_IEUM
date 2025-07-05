import React from 'react'
import useCardStore from '../../../stores/CardStore'
import './CountryList.css'


const CountryList = ({ overrideData = null, dropDown = false, className='' }) => {
  
  const { selectedCard } = useCardStore();
  const card = overrideData ?? selectedCard;
  
  if (!card || !Array.isArray(card.top10_data) || card.top10_data.length === 0) {
    return <p>국가 정보가 없습니다.</p>;
  }

  const data = card.top10_data;

  if(dropDown) {
    return(
        <div className='countryContainer'>
            <label className='countryLabel'>FTA 체결 국가 목록</label>
              <select defaultValue="" className="countrySelect">
                <option value="" disabled>FTA 세율을 선택해주세요</option>
                {data.map((item, index) => (
                    <option 
                    key={index}
                    >{index+1}위 {item.name} | {item.rate}%
                    </option>
                ))}
            </select>
        </div>
    )
  }

  return (
      <div className={`countryList ${className} listContent`}>
          <label className={`countryLabel ${className}`}>FTA 체결 국가 목록</label>
          <ul >
          {data.map((item, index) => (
              <li 
              key={index}
              className={`country ${index === 0 ? 'lower': index === data.length-1 ? 'last' : ''} ${className} list`}
              >{index+1}위 {item.name} | {item.rate*100}%</li>
          ))}
          </ul>
      </div>
  )  
}

export default CountryList