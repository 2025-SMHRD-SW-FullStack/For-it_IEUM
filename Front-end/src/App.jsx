import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Router from './routes/Router'; // 내부에서 Route로 나누는 방식이면 그대로 유지
import './animations/animations.css';
import {useTokenStore} from './stores/TokenStore';

function App() {
  
    const {clearAccessToken,isLoggedIn} = useTokenStore();

    useEffect(() => {
    function handleBeforeUnload(e) {
      // 네비게이션 엔트리 얻기 (Level2 API)
      const [nav] = performance.getEntriesByType('navigation');
      // nav.type === 'reload' 이면 새로고침이므로 아무것도 안 하고 return
      if (nav?.type === 'reload')  return;

      // 그 외 (탭/창 닫기, 뒤로/앞으로가기 등) 일 때만 localStorage 에서 토큰 제거
      localStorage.removeItem('accessToken');
      clearAccessToken();
      
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () =>
      window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [clearAccessToken]);

  const location = useLocation();

  return (
    <div className="page-wrapper fade-in-up" key={location.pathname}>
      {/* <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/> */}
      <Header />
      <main className="page-content">
        {/* <Router isLoggedIn={isLoggedIn} /> */}
        <Router />
      </main>
      {/* 로그인 토글 버튼은 화면 고정 */}
      {/* <button
        // onClick={toggleLogin}
        style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}
      >
        {isLoggedIn ? '로그아웃' : '로그인'}
      </button> */}
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
