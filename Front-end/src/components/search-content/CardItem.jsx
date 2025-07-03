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
            <div id="HS">HS코드: {card.hs_code}</div>
            <div id="Name" title={card.product_name}>
  품목명: {card.product_name.length > 6 ? card.product_name.slice(0, 6) + "..." : card.product_name}
</div>

          </div>
          <img src={star} alt='별 아이콘' className='favorite'/>
        </div>

  )
}

export default CardItem