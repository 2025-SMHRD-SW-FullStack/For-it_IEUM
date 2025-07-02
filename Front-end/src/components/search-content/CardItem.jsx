import React from 'react'
import testItemArray from "../../data/testItemArray"
import useCardStore from '../../stores/CardStore'
import star from '../../assets/image/star.png'

import './CardItem.css'


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
          <div className='cardText'>
            <div id="HS">HS코드: {card.hsCode}</div>
            <div id="Name" title={card.itemName}>
  품목명: {card.itemName.length > 6 ? card.itemName.slice(0, 6) + "..." : card.itemName}
</div>

          </div>
          <img src={star} alt='별 아이콘' className='favorite'/>
        </div>

  )
}

export default CardItem