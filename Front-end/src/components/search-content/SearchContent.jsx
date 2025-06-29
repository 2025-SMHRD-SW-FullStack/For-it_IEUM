import React from 'react'
import SearchBar from './SearchBar'
import CardItem from './CardItem'
import DetailPanel from '../detail-panel/DetailPanel';
import testItemArray from '../../data/testItemArray';

import '../../styles/SearchContent.css'

const SearchContent = () => {

  return (
    <div className='searchContent'>
      <SearchBar/>
      <div className='card-list'>
        {testItemArray.map((card)=>(
          <CardItem 
          key={card.id} 
          card={card} 
          id='cardItem'/>
        ))}
      </div>
        {/* <DetailPanel/> */}
    </div>
  )
}

export default SearchContent