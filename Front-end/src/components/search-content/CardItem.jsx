import React, { useState } from 'react'
import useCardStore from '../../stores/CardStore'
import star from '../../assets/image/star.png'
import filledStar from '../../assets/image/filledStarO.png' // 채워진 별 아이콘 추가
import './CardItem.css'

const CardItem = ({ card }) => {
  const { selectedCard, setSelectedCard } = useCardStore();

  const isSelected = (selectedCard && selectedCard.hs_code) === card.hs_code;

  const [isFavorite, setIsFavorite] = useState(false); // 즐겨찾기 상태

  const handleCardClick = () => {
    setSelectedCard(card);
  }

  const toggleFavorite = (e) => {
    e.stopPropagation(); // 부모 div 클릭 방지
    setIsFavorite((prev) => !prev);
  }

  return (
    <div
      className={`card ${isSelected ? 'selected' : ''}`}
      key={card.id}
      onClick={handleCardClick}
    >
      <div className='cardText'>
        <div id="HS">HS코드: {card.hs_code}</div>
        <div id="Name" title={card.product_name}>
          품목명: {card.product_name.length > 7 ? card.product_name.slice(0, 7) + "..." : card.product_name}
        </div>
      </div>
      <img
        src={isFavorite ? filledStar : star}
        alt='별 아이콘'
        className='favorite'
        onClick={toggleFavorite}
      />
    </div>
  )
}

export default CardItem
