import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './components/bookmarkpage/BookMarkPage.css'; // ✅ CSS는 이렇게 불러오세요
import FtaPage from './components/fta/FtaPage';
import Header from './components/Header/Header';
import FrequentlySearched from './components/Search/FrequentlySearched';
import SearchBar from './components/Search/SearchBar';
import SearchTypeToggle from './components/Search/SearchTypeToggle';
import ChartExample from './components/ExampleResult/ChartExample';
import CountryList from './components/ExampleResult/CountryList';
import InfoBox from './components/ExampleResult/InfoBox';
import Tabs from './components/ExampleResult/Tabs';
import Copyright from './components/Footer/Copyright';
import Links from './components/Footer/Links';
import SocialLinks from './components/Footer/SocialLinks';
import BookMarkPage from './components/bookmarkpage/BookMarkPage'; // ✅ 컴포넌트 import는 여기서
import FtaNews from './components/FtaNews/FtaNews';


function PrivateRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <Router>
      <div className="APP">
        <Header isLoggedIn={isLoggedIn} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <FrequentlySearched />
                <div className="search_box">
                  <SearchTypeToggle />
                  <SearchBar />
                </div>
                <ChartExample />
                <CountryList />
                <InfoBox />
                <Tabs />
                <Copyright />
                <Links />
                <SocialLinks />
              </>
            }
          />

          <Route
            path="/BookMarkPage"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <BookMarkPage />
              </PrivateRoute>
            }
          />

          <Route path="/fta" element={<FtaPage/>} />

          <Route path="/FtaNews" element={<FtaNews/>} />

        </Routes>

        

        {/* ✅ 버튼 태그 이름 수정 */}
        <button
          onClick={toggleLogin}
          style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}
        >
          {isLoggedIn ? '로그아웃' : '로그인'}
        </button>
      </div>
    </Router>
  );
}

export default App;
