import React from 'react';
import { useLocation } from 'react-router-dom'; // ✅ 추가
import Logo from './Logo';
import Navigation from './Navigation';
import NotificationBell from './NotificationBell';
import UserMenu from './UserMenu';
import BookMark from './BookMark';
import SearchBar from '../Search/SearchBar';
import './Header.css';
import { useTokenStore } from '../../stores/TokenStore';
//Front-end\src\stores\TokenStore.js

// 로그인 여부에 따라 컴포넌트 조건부 렌더링
const Header = () => {
  const location = useLocation(); // 현재 경로 감지
  const hideSearchBar = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/search';
  const { isLoggedIn } = useTokenStore();

  return (
    <header className="header_main">
      <div className="header_inner">
        <div className="header_left">
          <Logo />
          <Navigation />
          {/* 조건부 렌더링 */}
          {!hideSearchBar && <SearchBar />}
        </div>
        <div className="header_right">
          <UserMenu />
          {isLoggedIn && <BookMark />}
        </div>
      </div>
    </header>
  );
};

export default Header;
