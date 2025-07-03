import React from 'react'
import star from '../../assets/image/star.png'
import { useNavigate } from 'react-router-dom';


const BookMark = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/BookMarkPage');
  }

  return ( 
    <div className="main_icon" onClick={handleClick} 
    style={{cursor:'pointer'
    }}>
  {/* <img src={star} alt='별 아이콘' /> */}
  </div>
)
}

export default BookMark
