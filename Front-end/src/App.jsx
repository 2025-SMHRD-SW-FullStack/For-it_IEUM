import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Router from './routes/Router';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => setIsLoggedIn((prev) => !prev);

  return (
    <BrowserRouter>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} />
        <Router isLoggedIn={isLoggedIn} />
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
