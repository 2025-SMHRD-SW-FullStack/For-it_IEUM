import React, { useEffect, useRef, useState } from 'react'
import './UserMenu.css'
import star from "../../assets/image/star.png"
import login from '../../assets/image/login.png'
import login_filled from '../../assets/image/login_filled.png'
import mypage from '../../assets/image/mypage.png'
import bell from '../../assets/image/bell.png'
import { useNavigate, Link } from 'react-router-dom'
import { useTokenStore } from '../../stores/TokenStore'


// const UserMenu = ({ isLoggedIn,setIsLoggedIn }) => {
const UserMenu = () => {

  const navigate = useNavigate();
  const { isLoggedIn, setAccessToken, clearAccessToken,hasNewNotifications,clearNotifications } = useTokenStore();
  const prevLoggedInRef = useRef(false);
  const [showNotifications, setShowNotifications] = useState(false);
  // const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const toggleNotifications = () => {
    setShowNotifications(prev => !prev);
    // setHasNewNotifications(false); // 알림 클릭 시 빨간 점 제거
    clearNotifications(); // ✅ 알림 읽은 상태로
    
    
    
  }


  const userLogin = () => {
    navigate('/login')
  }

  useEffect(() => {
    // 이전 상태가 false → true로 바뀔 때만 실행 (즉, 로그인된 최초 시점)
    if (isLoggedIn && !prevLoggedInRef.current) {
      // setHasNewNotifications(true);
    }
    prevLoggedInRef.current = isLoggedIn; // 상태 업데이트
  }, [isLoggedIn]);



  // 토큰 클린(로그아웃임)
  const tokenClean = () => {

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
          <div style={{ position: 'relative' }}>
            <img
              src={bell}
              alt='알림 아이콘'
              className="user-menu-icon"
              style={{ cursor: 'pointer' }}
              onClick={toggleNotifications}
            />
            {hasNewNotifications && (
              <div className="notification-dot"></div>
            )}
            {showNotifications && (
              <div className="notification-popup">
                <div className="notification-item">📢 새로운 공지사항이 있습니다!</div>
                <div className="notification-item">✅ 오늘 할 일 확인하세요!</div>
                <div className="notification-item">🔔 메시지가 도착했어요!</div>
                <div className="notification-item">📌 즐겨찾기 업데이트!</div>
              </div>
            )}
          </div>

          <img src={mypage} alt="회원정보수정" className="user-menu-icon" style={{ cursor: 'pointner' }} />
          <img src={login_filled} alt="로그아웃 아이콘" onClick={() => tokenClean()} className="user-menu-icon" style={{ cursor: 'pointner' }} />
          <Link to="/BookMarkPage"><img src={star} alt='별 아이콘' className="user-menu-icon" style={{ cursor: 'pointner' }} /></Link>
        </>
      ) : (
        <img
          src={login}
          alt="로그인 아이콘"
          onClick={userLogin}
          className="user-menu-icon"
          style={{ cursor: 'pointner' }}
        />
      )}
    </div>
  )
}

export default UserMenu
