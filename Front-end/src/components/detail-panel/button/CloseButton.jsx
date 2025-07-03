import React from 'react';
import x from '../../../assets/image/delete.png'
import './Btn.css'

const CloseButton = ({ onClick, clearSelectedCard }) => {
  
  const close = () => {
    if (onClick) {
      onClick(); // 뉴스패널 같은 곳에서 애니메이션용으로 사용
    } else if (clearSelectedCard) {
      clearSelectedCard(); // 디테일 패널에서는 이걸 사용
    }
  };

  return (
      <img src={x} alt="지우기" onClick={close} className='tabBtn'/>
  );
};

export default CloseButton;
