import React from 'react'
import logo from '../../assets/image/logo.png'
import { useNavigate } from 'react-router-dom'
import './Logo.css'

const Logo = () => {
  
const navigate = useNavigate();

const handleClick = () => {
  navigate('/');
}

  return (
    <div onClick={handleClick}>
      {/* IEUM */}
      <span>
        <img 
        src={logo} 
        alt="로고 이미지"
        className='main_logo'></img>
      </span>
    </div>
  )
}

export default Logo

