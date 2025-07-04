import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/User/AuthForm';

const JoinPage = () => {
  const [form, setForm] = useState({
  userId: '',
  password: '',
  passwordConfirm: '',
  tel: '',
  emailId: '',
  emailDomain: '',
});

const [agree, setAgree] = useState({
  all: false,
  terms: false,
  privacy: false,
  notice: false,
  noticeChannel: '',
});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialClick = (platform) => {
    console.log(`${platform} 버튼 클릭됨`);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree.terms) {
      alert('이용약관에 동의하셔야 가입이 가능합니다.');
      return;
    }
    console.log('회원가입 시도:', form, agree);
    navigate('/');
  };

  return (
    <AuthForm
      type="join"
      form={form}
      setForm={setForm}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onSocialClick={handleSocialClick}
      agree={agree}
      setAgree={setAgree} 
    />

  );
};

export default JoinPage;
