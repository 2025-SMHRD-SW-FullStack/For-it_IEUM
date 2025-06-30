import React from 'react'
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navi">
      <Link to=''>사이트 소개</Link>
      <Link to='/fta'>FTA 체결 국가</Link>
      <Link to='/FtaNews'>뉴스</Link>
      {/* <a href="#">사이트 소개</a>
      <a href="#">FTA 체결 국가</a>
      <a href="#">뉴스</a> */}
    </nav>
  )
}

export default Navigation
