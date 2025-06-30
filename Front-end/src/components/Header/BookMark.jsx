import React from 'react'
import bookmark from '../../assets/image/bookmark.png'
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
  <img src={bookmark} alt='북마크 아이콘' />
  </div>
)
}

export default BookMark
