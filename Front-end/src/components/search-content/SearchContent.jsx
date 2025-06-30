import React from 'react'
import CardItem from './CardItem'
import testItemArray from '../../data/testItemArray';

import './SearchContent.css'

const SearchContent = () => {

  return (
    <div className='searchContent'>
      <div className='card-list'>
        {testItemArray.map((card)=>(
          <CardItem 
          key={card.id} 
          card={card} />
        ))}
      </div>
    </div>
  )
}

export default SearchContent