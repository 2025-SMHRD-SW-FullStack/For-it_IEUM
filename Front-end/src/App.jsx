import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Router from './routes/Router'; // 내부에서 Route로 나누는 방식이면 그대로 유지
import './animations/animations.css';
// import {useTokenStore} from './stores/TokenStore';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const {accessToken,setAccessToken,isLoggedIn,clearAccessToken} = useTokenStore();
  // const navigate = Navigate;

  // const toggleLogin = () => setIsLoggedIn((prev) => !prev);

  // localStorage.getItem('accessToken');

  // useEffect(() => {
  //   const token = localStorage.getItem('accessToken');
  //   if (token) {
  //     setAccessToken(token);
  //   }
  // }, [setAccessToken]);

  // const handleAuthClick = () => {
  //   if (isLoggedIn){
  //     clearAccessToken();
  //     localStorage.removeItem('accessToken');
  //   }else{
  //     navigate('/login');
  //   }
  // }

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
