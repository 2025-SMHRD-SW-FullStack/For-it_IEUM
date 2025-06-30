import React from 'react'
import Logo from './Logo'
import Navigation from './Navigation'
import NotificationBell from './NotificationBell'
import UserMenu from './UserMenu'
import BookMark from './BookMark'

// 로그인 여부에 따라 컴포넌트 조건부 렌더링

const Header = ({isLoggedIn}) => {
  return (
    <header className="header_main">
    <div className="header_left">
        <Logo/>
        <Navigation/>
        </div>
        <div className="header_right">
        {isLoggedIn && <NotificationBell />}
        <UserMenu isLoggedIn={isLoggedIn} />
        {isLoggedIn && <BookMark/>}
     </div>
    </header>
  );
};

export default Header