import React from 'react'
import useCardStore from '../../../stores/CardStore'
import './CountryList.css'


const CountryList = ({ countries = [], dropDown = false, className='' }) => {

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
            <label className='countryLabel'>🌍 FTA 체결 국가 목록&nbsp;</label>
            <select className='countrySelect'>
                {countries.map((item, index) => (
                    <option 
                    key={index}
                    // className={}
                    >{index+1}위 {item.country} | {item.tariff}%
                    </option>
                ))}
            </select>
        </div>
    )
  }

  return (
      <div className={`countryList ${className} listContent`}>
          <label className={`countryLabel ${className}`}>🌍 FTA 체결 국가 목록</label>
          <ul>
          {countries.map((item, index) => (
              <li 
              key={index}
              className={`country ${index === 0 ? 'lower': index === countries.length - 1 ? 'last' : ''} ${className} list`}
              >{index+1}위 {item.country} | {item.tariff}%</li>
          ))}
          </ul>
      </div>
  )
}

export default CountryList