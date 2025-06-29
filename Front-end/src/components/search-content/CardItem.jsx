import React from 'react'
import testItemArray from "../../data/testItemArray"
import useCardStore from '../../stores/CardStore'

import '../../styles/CardItem.css'


const CardItem = ({card}) => {

  const { selectedCard, setSelectedCard } = useCardStore();

  const isSelected = (selectedCard && selectedCard.id) === card.id;

  const CardClick = () => {
    console.log(card);
    setSelectedCard(card);
  }

  return (
        <div 
        className={`card ${isSelected ? 'selected': ''}`} 
        key={card.id}
        onClick={CardClick}
        >
          <label className='card-text' id="HS">HS코드: {card.hsCode}</label>
          <label className='card-text' id="Name">품목명: {card.itemName}</label>
        </div>

  )
}

export default CardItem