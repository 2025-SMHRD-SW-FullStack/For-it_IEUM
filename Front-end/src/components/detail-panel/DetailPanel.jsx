import React from 'react'
import useCardStore from '../../stores/CardStore';

const DetailPanel = () => {

  const { interestedCard, clearInterestedCard } = useCardStore();
  // console.log('interestedCard in DetailPanel:', interestedCard);

  if (!interestedCard) return null; // 아무것도 선택 안 됐으면 패널 안 보여줌


  return (
    <aside style={{border: '1px black solid', padding: 5}}>
      {/* className, id 넣어서 나중에 수정하기 */}
      <button onClick={clearInterestedCard}>닫기</button>
      <h4>HS코드: {interestedCard.hsCode}</h4>
      <h4>품목명: {interestedCard.itemName}</h4>
    </aside>
  )
}

export default DetailPanel