import React from 'react'
import logo from '../../assets/image/logo.png'
import { useNavigate } from 'react-router-dom'

const Logo = () => {
  
const navigate = useNavigate();

const handleClick = () => {
  navigate('/');
}

  return (
    <div className="main_logo" onClick={handleClick}
    style={{cursor:'pointer'}}>
      {/* IEUM */}
      <span><img src={logo} alt="로고 이미지"></img></span>
    </div>
  )
}

export default Logo

