import { Routes, Route, Navigate } from 'react-router-dom'; // ✅ Router는 제거
import { useState } from 'react';
import Header from '../components/Header/Header';
import MainPage from '../pages/MainPage';
import SearchPage from '../pages/SearchPage';
import FtaPage from '../pages/FtaPage';
import BookMarkPage from '../pages/BookMarkPage';
import FtaNews from '../components/FtaNews/FtaNews';

function PrivateRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => setIsLoggedIn((prev) => !prev);

  return (
    <div className="APP">
      <Header isLoggedIn={isLoggedIn} />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/fta" element={<FtaPage />} />
        <Route path="/FtaNews" element={<FtaNews />} />
        <Route
          path="/BookMarkPage"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <BookMarkPage />
            </PrivateRoute>
          }
        />
      </Routes>

      <button
        onClick={toggleLogin}
        style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}
      >
        {isLoggedIn ? '로그아웃' : '로그인'}
      </button>
    </div>
  );
}

export default Router;
