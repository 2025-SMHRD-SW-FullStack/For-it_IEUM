import React from 'react';

const CloseButton = ({ clearSelectedCard, setIsVisible }) => {
  const close = () => {
    setIsVisible(false);
    setTimeout(() => {
      clearSelectedCard();
    }, 200); // 애니메이션 시간과 맞춤
  };

  return (
    <button onClick={close} className='btn'>닫기</button>
  );
};

export default CloseButton;
