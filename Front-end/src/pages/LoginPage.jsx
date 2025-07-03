import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/User/AuthForm';
import Social from '../components/User/SocialBtn';
import './LoginPage.css';

import naverLogo from '../assets/image/naver.png';
import kakaoLogo from '../assets/image/kakao.jpg';
import googleLogo from '../assets/image/google.png';

const LoginPage = () => {
  const [form, setForm] = useState({ id: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('로그인 시도:', form);
    navigate('/');
  };

  const handleSocialLogin = (platform) => {
    console.log(`${platform} 로그인 시도 중`);
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
