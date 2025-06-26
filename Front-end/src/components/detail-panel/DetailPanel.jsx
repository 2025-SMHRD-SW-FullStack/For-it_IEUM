import React from 'react'
import useCardStore from '../../stores/CardStore';

const DetailPanel = () => {

  const { selectedCard, clearSelectedCard } = useCardStore();
  console.log('selectedCard in DetailPanel:', selectedCard);

  if (!selectedCard) return null; // 아무것도 선택 안 됐으면 패널 안 보여줌


  return (
    <aside>
      <button onClick={clearSelectedCard}>닫기</button>
      <h2>{selectedCard.itemName}</h2>
      <p>HS코드: {selectedCard.hsCode}</p>
    </aside>
  )
}

export default DetailPanel