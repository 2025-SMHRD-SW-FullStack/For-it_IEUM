import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/User/AuthForm';
import Social from '../components/User/SocialBtn';
import './LoginPage.css';
import { login } from '../services/userService';

import naverLogo from '../assets/image/naver.png';
import kakaoLogo from '../assets/image/kakao.jpg';
import googleLogo from '../assets/image/google.png';
import { useTokenStore } from '../stores/TokenStore'; // 토큰 스토어 사용 예시

const LoginPage = () => {
  const [form, setForm] = useState({ id: '', password: '' });
  const navigate = useNavigate();
  const { setAccessToken, isLoggedIn } = useTokenStore(); // 토큰 스토어에서 액세스 토큰 설정 함수 가져오기

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    fetchResults(form);

    navigate('/');
  };

  const handleSocialLogin = (platform) => {
  };

  const socialButtons = [
    { platform: 'Google', image: googleLogo },
    { platform: 'Kakao', image: kakaoLogo },
    { platform: 'Naver', image: naverLogo },
  ];

  return (
    <div className="LoginMain">
      <AuthForm
        type="login"
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        setForm={setForm}
      />

      <Social buttons={socialButtons} onClick={handleSocialLogin} />

      <div className="Join">
        <div className="joinLabel">
          <p>아직 IEUM 회원이 아니신가요?</p>
        </div>
        <button onClick={() => navigate('/join')} className="loginBtn join">
          회원가입
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
