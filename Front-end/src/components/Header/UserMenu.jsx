import React from 'react'
import './UserMenu.css'
import star from "../../assets/image/star.png"
import login from '../../assets/image/login.png'
import mypage from '../../assets/image/mypage.png'
import bell from '../../assets/image/bell.png'
import { useNavigate,Link } from 'react-router-dom'
import { useTokenStore } from '../../stores/TokenStore'


// const UserMenu = ({ isLoggedIn,setIsLoggedIn }) => {
const UserMenu = () => {

  const navigate = useNavigate();
  const {isLoggedIn,setAccessToken,clearAccessToken} = useTokenStore();
  
  const userLogin = () => {
    navigate('/login')
  }
  
  const moveBookMarkPage = () => {
    console.log('북마크 페이지로 이동');
    navigate('/BookMarkPage');
  }
  
  // 토큰 클린(로그아웃임)
  const tokenClean = ()=>{

    clearAccessToken(); // 토큰 스토어에서 토큰 제거
    // 1. 로컬스토리지에서 토큰 삭제
    // localStorage.removeItem('accessToken');
    // 2. axios 인스턴스 헤더 초기화 (있다면)
    // delete apiClient.defaults.headers.common['accessToken'];
    // if(!localStorage.getItem('accessToken')){
    //   setIsLoggedIn(false); 
    // }
    navigate('/');
  }

  return (
    <div className="user-menu-container">
      {isLoggedIn ? (
        <>
          <img src={bell} alt='알림 아이콘'  className="user-menu-icon" style={{cursor:'pointner'}}/>
          <img src={mypage} alt="회원정보수정"  className="user-menu-icon" style={{cursor:'pointner'}}/>
          <img src={login} alt="로그인 아이콘"  onClick={() => tokenClean()}  className="user-menu-icon" style={{cursor:'pointner'}}/>
          <Link to="/BookMarkPage"><img src={star} alt='별 아이콘' className="user-menu-icon" style={{cursor:'pointner'}}/></Link>
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
      <button onClick={tokenClean}>토큰 클린</button>
    </div>
  )
}

export default UserMenu
