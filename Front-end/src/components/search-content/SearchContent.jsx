import React from 'react'
import SearchBar from './SearchBar'
import CardItem from './CardItem'
import DetailPanel from '../detail-panel/DetailPanel';
import testItemArray from '../../data/testItemArray';

const SearchContent = () => {

  return (
    <div style={{border: '1px solid black', display: 'inline-block'}}>
      <SearchBar/>
      {testItemArray.map((keyword)=>(
        <CardItem key={keyword.id} card={card}/>
      ))}
    </div>
  )
}

export default SearchContent