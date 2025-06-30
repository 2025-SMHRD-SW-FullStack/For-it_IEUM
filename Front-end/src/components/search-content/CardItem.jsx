import React from 'react'
import testItemArray from "../../data/testItemArray"
import useCardStore from '../../stores/CardStore'

import '../../styles/CardItem.css'


const CardItem = ({card}) => {

  const { selectedCard, setSelectedCard } = useCardStore();

  const isSelected = (selectedCard && selectedCard.id) === card.id;

  const CardClick = () => {
    // console.log(card);
    setSelectedCard(card);
  }

  return (
        <div 
        className={`card ${isSelected ? 'selected': ''}`} 
        key={card.id}
        onClick={CardClick}
        >
          <div className='card-text'>
            <label id="HS">HS코드: {card.hsCode}</label>
            <label id="Name">품목명: {card.itemName}</label>
          </div>
          <div className='favorite'>☆</div>
        </div>

  )
}

export default CardItem