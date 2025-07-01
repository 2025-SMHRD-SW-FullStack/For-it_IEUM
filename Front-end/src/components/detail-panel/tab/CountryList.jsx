import React from 'react'
import useCardStore from '../../../stores/CardStore'
import './CountryList.css'


const CountryList = ({ countries = [], dropDown = false }) => {

  if (!countries || countries.length === 0) {
    return <p>국가 정보가 없습니다.</p>;
  }

//   // 관세율로 정렬해서 저장하고 싶을때
//   const sortedCountries =
//   typeof countries?.[0] === 'object'
//     ? [...countries].sort((a, b) => a.tariff - b.tariff)
//     : countries;


  if(dropDown) {
    return(
        <div className='countryContainer'>
            <label>🌍 FTA 체결 국가 목록&nbsp;</label>
            <select className='countrySelect'>
                {countries.map((item, index) => (
                    <option 
                    key={index}
                    // className={}
                    >{item.country} | {item.tariff}%
                    </option>
                ))}
            </select>
        </div>
    )
  }

  return (
    <div>
        <div className='countryList'>
            <label >🌍 FTA 체결 국가 목록</label>
            <ul>
            {countries.map((item, index) => (
                <li 
                key={index}
                className={`country ${index === 0 ? 'lower': index === countries.length - 1 ? 'last' : ''}`}
                >{item.country} | {item.tariff}%</li>
            ))}
            </ul>
        </div>
    </div>
  )
}

export default CountryList