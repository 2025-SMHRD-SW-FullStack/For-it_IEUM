import React from 'react'
import login from '../../assets/image/login.png'
import mypage from '../../assets/image/mypage.png'

const UserMenu = ({ isLoggedIn }) => {
  return (
    <>
      {isLoggedIn ? (
        <>
          <img src={mypage} alt="회원정보수정" />
          <img src={login} alt="로그인 아이콘" />
        </>
      ) : (
        <img src={login} alt="로그인 아이콘" />
      )}
    </>
  )
}

export default UserMenu
