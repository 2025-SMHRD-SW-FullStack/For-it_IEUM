import React from 'react';
import './SocialBtn.css';

const SocialBtn = ({ buttons = [], onClick }) => {
  return (
    <div className='socialContainer'>
      {buttons.map((btn, index) => (
        <img
          key={index}
          src={btn.image}
          alt={`${btn.platform} 로그인`}
          className='socialIcon'
          onClick={() => onClick?.(btn.platform)}
        />
      ))}
    </div>
  );
};

export default SocialBtn
