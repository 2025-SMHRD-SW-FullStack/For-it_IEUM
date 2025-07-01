import React from 'react'
import login from '../../assets/image/login.png'
import mypage from '../../assets/image/mypage.png'
import { useNavigate } from 'react-router-dom'

const UserMenu = ({ isLoggedIn }) => {

  const navigate = useNavigate();

  const userLogin = () => {
    navigate("/login")
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <img src={mypage} alt="회원정보수정" />
          <img src={login} alt="로그인 아이콘" />
        </>
      ) : (
        <img 
        src={login} 
        alt="로그인 아이콘"
        onClick={userLogin} />
      )}
    </>
  )
}

export default UserMenu
