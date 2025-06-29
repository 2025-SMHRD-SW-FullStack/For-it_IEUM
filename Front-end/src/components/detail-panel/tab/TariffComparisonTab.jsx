import React from 'react'
import useCardStore from '../../../stores/CardStore';

const TariffComparisonTab = () => {

  const { selectedCard, clearSelectedCard } = useCardStore();

  if (!selectedCard) return null; // 아무것도 선택 안 됐으면 패널 안 보여줌

  return (
    <div>
      <button onClick={clearSelectedCard}>닫기</button>
      <h4>HS코드: {selectedCard.hsCode}</h4>
      <h4>품목명: {selectedCard.itemName}</h4>
    </div>
  )
}

export default TariffComparisonTab