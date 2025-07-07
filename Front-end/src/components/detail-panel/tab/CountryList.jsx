import React from 'react'
import useCardStore from '../../../stores/CardStore'
import './CountryList.css'
import useCalculStore from '../../../stores/CalculStore'


const CountryList = ({ overrideData = null, dropDown = false, className = '' }) => {

  const { selectedCard } = useCardStore();
  const card = overrideData ?? selectedCard;
  const { setCountry, setTariff } = useCalculStore();

  if (!card || !Array.isArray(card.top10_data) || card.top10_data.length === 0) {
    return <p>국가 정보가 없습니다.</p>;
  }

  const data = card.top10_data;

  const setCountryAndTariff = (item) => {
    setCountry(item.name);
    setTariff(item.rate);
  }

  if (dropDown) {
    return (
      <div className='countryContainer'>
        <label className='countryLabel'>FTA 체결 국가 목록</label>
        <select defaultValue="" className="countrySelect"
          onChange={(e) => {
            const selectedIndex = e.target.selectedIndex;
            const selectedItem = data[selectedIndex - 1];
            if (selectedItem) {
              setCountryAndTariff(selectedItem);
            }
          }
          }>
          <option value="" disabled>FTA 세율을 선택해주세요</option>
          {data.map((item, index) => (
            <option
              key={index}

            >{index + 1}위 {item.name} | {(item.rate * 100).toFixed(2)}%
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
            className={`country ${index === 0 ? 'lower' : index === data.length - 1 ? 'last' : ''} ${className} list`}
          >{index + 1}위 {item.name} | {(item.rate * 100).toFixed(2)}%</li>
        ))}
      </ul>
    </div>
  )
}

export default CountryList