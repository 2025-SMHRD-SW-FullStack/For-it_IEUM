import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import SearchPage from '../pages/SearchPage';
import FtaPage from '../pages/FtaPage';
import BookMarkPage from '../pages/BookMarkPage';
import LoginPage from '../pages/LoginPage';
import JoinPage from '../pages/JoinPage';
import NewsPage from '../pages/NewsPage';

function PrivateRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function Router({ isLoggedIn }) {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<MainPage key={location.key} />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/join' element={<JoinPage/>} />
      <Route path="/fta" element={<FtaPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route
        path="/BookMarkPage"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <BookMarkPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default Router;
