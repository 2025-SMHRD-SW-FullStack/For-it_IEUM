import React from 'react'
import '../../styles/TabMenu.css'
import useCardStore from '../../stores/CardStore';

const TabMenu = () => {

  const { interestedCard, clearInterestedCard } = useCardStore();
  // console.log('interestedCard in DetailPanel:', interestedCard);

  if (!interestedCard) return null; // 아무것도 선택 안 됐으면 패널 안 보여줌

  return (
    <div id='TabMenu'>
        <button className='tabBtn'>관세비교</button>
        <button className='tabBtn'>품목계산</button>
        <button className='tabBtn' id='AITabBtn'>AI<br/>전략<br/>추천</button>
    </div>
  )
}

export default TabMenu