import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Router from './routes/Router';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => setIsLoggedIn((prev) => !prev);

  return (
<BrowserRouter>
  <div className="page-wrapper">
    <Header isLoggedIn={isLoggedIn} />
    <main className="page-content">
      <Router isLoggedIn={isLoggedIn} />
    </main>
    {/* 로그인 토글 버튼은 화면 고정 */}
    <button
      onClick={toggleLogin}
      style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}
    >
      {isLoggedIn ? '로그아웃' : '로그인'}
    </button>
  </div>
</BrowserRouter>

  );
}

export default App
