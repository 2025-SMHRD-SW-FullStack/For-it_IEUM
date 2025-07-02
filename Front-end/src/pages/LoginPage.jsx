import React, { useState } from 'react';
import UserInput from '../components/User/UserInput';
import './LoginPage.css';
import Social from '../components/User/SocialBtn';
import { useNavigate } from 'react-router-dom';

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
    // 백엔드로 form.id, form.password 넘기기
  };

  const clickJoin = () => {
    navigate('/JoinPage');
  };

  const handleSocialLogin = (platform) => {
    console.log(`${platform} 로그인 시도 중`);
    // 실제 소셜 로그인 로직 연동
  };

  const socialButtons = [
      { platform: 'Google', image: googleLogo },
      { platform: 'Kakao', image: kakaoLogo },
      { platform: 'Naver', image: naverLogo },
  ];

  return (
    <div className='LoginMain'>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} className='LoginForm'>
        <div>
          <UserInput name="userId" label="아이디" value={form.id} onChange={handleChange} />
          <UserInput name="password" label="비밀번호" value={form.password} onChange={handleChange} />
        </div>
        <input 
        type="submit" 
        value="로그인하기" 
        onClick={()=>navigate('/')}
        className='loginBtn'
         />
      </form>

      <Social buttons={socialButtons} onClick={handleSocialLogin} />

      <div className='Join'>
        <div className='joinLabel'>
          <p>아직 IEUM 회원이 아니신가요?</p>
        </div>
        <button onClick={clickJoin} className='loginBtn join'>회원가입</button>
      </div>
    </div>
  );
};

export default LoginPage
