import React from 'react'
import testItemArray from "../../data/testItemArray"
import useCardStore from '../../stores/CardStore'


const CardItem = ({card}) => {

  const {setInterestedCard} = useCardStore();

  const CardClick = () => {
    console.log('Clicked card:', card);
    setInterestedCard(card);
  }

  return (
    <div className="card-list" style={{border: '1px solid black'}}>
        <div 
        className="card" 
        key={card.id} 
        style={{border: '1px solid black', margin:10}}
        onClick={CardClick}
        >
          <h6 className='card-text' style={{margin:10}}>HS코드:{card.hsCode}</h6>
          <h6 className='card-text' style={{margin:10}}>품목명:{card.itemName}</h6>
        </div>
      
    </div>
  )
}

export default CardItem