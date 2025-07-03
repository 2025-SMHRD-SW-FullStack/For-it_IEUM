import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import SearchPage from '../pages/SearchPage';
import FtaPage from '../pages/FtaPage';
import BookMarkPage from '../pages/BookMarkPage';
import FtaNews from '../components/FtaNews/FtaNews';
import LoginPage from '../pages/LoginPage';
import JoinPage from '../pages/JoinPage';

function PrivateRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function Router({ isLoggedIn }) {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/join' element={<JoinPage/>} />
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
  );
}

export default Router;
