import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/User/AuthForm';
import { join } from '../services/userService';

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree.terms) {
      alert('이용약관에 동의하셔야 가입이 가능합니다.');
      return;
    }
    const email = form.emailId && form.emailDomain
      ? `${form.emailId}@${form.emailDomain}`
      : '';

    const serviceCheck = {
      terms: agree.terms,
      privacy: agree.privacy,
      notice: agree.notice,
      noticeChannel: agree.noticeChannel,
    };
    try {
      // 3) 백엔드 호출
      const data = await join(
        form.userId,
        "",
        form.password,
        form.tel,
        email,
        serviceCheck
      );
      console.log('회원가입 성공:', data);
      alert('회원가입이 완료되었습니다.');

      // 4) 가입 성공 후 리다이렉트
      navigate('/');
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.message;
      alert('회원가입 실패: ' + msg);
    }
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
