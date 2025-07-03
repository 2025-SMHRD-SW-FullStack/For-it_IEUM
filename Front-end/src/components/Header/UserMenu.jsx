import React from 'react'
import './UserMenu.css'
import star from "../../assets/image/star.png"
import login from '../../assets/image/login.png'
import mypage from '../../assets/image/mypage.png'
import bell from '../../assets/image/bell.png'
import { useNavigate } from 'react-router-dom'

const UserMenu = ({ isLoggedIn }) => {

  const navigate = useNavigate();

  const userLogin = () => {
    navigate("/login")
  }

  return (
    <div className="user-menu-container">
      {isLoggedIn ? (
        <>
          <img src={bell} alt='알림 아이콘'  className="user-menu-icon" style={{cursor:'pointner'}}/>
          <img src={mypage} alt="회원정보수정"  className="user-menu-icon" style={{cursor:'pointner'}}/>
          <img src={login} alt="로그인 아이콘"  onClick={() => navigate('login')}  className="user-menu-icon" style={{cursor:'pointner'}}/>
           <img src={star} alt='별 아이콘'  onClick={() => navigate('/BookMarkPage')} className="user-menu-icon" style={{cursor:'pointner'}}/>
        </>
      ) : (
        <img 
        src={login} 
        alt="로그인 아이콘"
        onClick={userLogin}
        className="user-menu-icon"
        style={{cursor:'pointner'}}
        />
      )}
    </div>
  )
}

export default UserMenu
