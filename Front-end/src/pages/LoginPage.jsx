import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/User/AuthForm';
import Social from '../components/User/SocialBtn';
import './LoginPage.css';
import { login } from '../services/userService';

import naverLogo from '../assets/image/naver.png';
import kakaoLogo from '../assets/image/kakao.jpg';
import googleLogo from '../assets/image/google.png';

const LoginPage = () => {
  const [form, setForm] = useState({ userId: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 현재 입력이 안되서 id, pasword 지정한거임 로그인 됨 
  const user= 'nano'
  const pw = '123'
  const fetchResults = async () => {
        try {
          const response = await login({
            userId:user,
            password:pw,
        });   // axios.get 결과
          console.log(response);
            localStorage.setItem('accessToken', response.result.token); // 해당 해더에 토큰 저장
          // navigate('/search', { replace: true });
          console.log(localStorage.getItem('accessToken'));
        } catch (error) {
          console.error('로그인:', error);
        }
      };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('로그인 시도:', form);

    fetchResults(form);

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
