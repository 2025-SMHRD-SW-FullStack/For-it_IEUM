import React from 'react';
import x from '../../../assets/image/delete.png'
import './Btn.css'

const CloseButton = ({ clearSelectedCard, setIsVisible }) => {
  
  const close = () => {
    setIsVisible(false);
    setTimeout(() => {
      clearSelectedCard();
    }, 200); // 애니메이션 시간과 맞춤
  };

  return (
      <img src={x} alt="지우기" onClick={close} className='btn'/>
  );
};

export default CloseButton;
