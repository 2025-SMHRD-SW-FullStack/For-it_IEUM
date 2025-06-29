import React from 'react'
import useCardStore from '../../../stores/CardStore';

const ProductCalculatorTab = () => {

  const { selectedCard, clearSelectedCard } = useCardStore();

  if (!selectedCard) return null;

  return (
    <div>
      <button onClick={clearSelectedCard}>닫기</button>
      <br />
      ProductCalculatorTab
    </div>
  )
}

export default ProductCalculatorTab