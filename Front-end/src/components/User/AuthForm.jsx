import React, { useEffect, useState } from 'react';
import UserInput from './UserInput';
import './AuthForm.css';

const AuthForm = ({ type,  form,  setForm,  
                    onChange,  onSubmit,  onSocialClick,
                    socialButtons,  agree,  setAgree,  className = '' }) => {

  const isLogin = type === 'login';
  const [passwordMessage, setPasswordMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'tel') {
      const onlyNums = value.replace(/[^0-9]/g, '');
      let formatted = onlyNums;
      if (onlyNums.length <= 3) {
        formatted = onlyNums;
      } else if (onlyNums.length <= 7) {
        formatted = onlyNums.replace(/(\d{3})(\d+)/, '$1-$2');
      } else {
        formatted = onlyNums.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
      }

      setForm((prev) => ({ ...prev, [name]: formatted }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!isLogin) {
      if (form.passwordConfirm && form.password !== form.passwordConfirm) {
        setPasswordMessage('비밀번호가 일치하지 않습니다.');
      } else if (form.passwordConfirm && form.password === form.passwordConfirm) {
        setPasswordMessage('비밀번호가 일치합니다.');
      } else {
        setPasswordMessage('');
      }
    }
  }, [form.password, form.passwordConfirm, isLogin]);

  const onAgreeChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (type === 'checkbox') {
      setAgree((prev) => {
        const updated = { ...prev };

        if (name === 'all') {
          updated.all = checked;
          updated.terms = checked;
          updated.privacy = checked;
          updated.notice = checked;
          if (!checked) updated.noticeChannel = '';
        } else if (name === 'noticeChannel') {
          // 복수 선택 가능한 채널 로직
          const current = new Set((prev.noticeChannel || '').split(',').filter(Boolean));
          if (checked) {
            current.add(value);
          } else {
            current.delete(value);
          }
          updated.noticeChannel = Array.from(current).join(',');
        } else {
          updated[name] = checked;
          if (name === 'notice' && !checked) {
            updated.noticeChannel = '';
          }
        }

        return updated;
      });
    }
  };

  return (
    <div className='authWrapper'>
      <form className='authForm' onSubmit={onSubmit}>
        <h2>{isLogin ? '로그인' : '회원가입'}</h2>

        <div className='inputWrapper'>
          <UserInput
            name="userId"
            label="아이디"
            value={form.userid}
            onChange={handleChange}
            className={`${isLogin ? '' : 'joinInput'}`}
          />
          <UserInput
            name="password"
            label="비밀번호"
            value={form.password}
            onChange={handleChange}
            className={`${isLogin ? '' : 'joinInput'}`}
          />

          {!isLogin && (
            <>
            <div className='passwordWrapper'>
              <UserInput
                name="passwordConfirm"
                label="비밀번호 확인"
                value={form.passwordConfirm || ''}
                onChange={handleChange}
                className="joinInput"
              />
              {passwordMessage && (
                <div
                  className={`passwordMessage ${
                    passwordMessage.includes('일치하지') ? 'error' : ''
                  }`}
                >
                  {passwordMessage}
                </div>
              )}

            </div>

              <UserInput
                name="tel"
                label="전화번호"
                value={form.tel || ''}
                onChange={handleChange}
                className="joinInput"
              />
            </>
          )}
        </div>

        {!isLogin && (
          <>
            <div className="allCheck">
              <label>
                <input
                  type="checkbox"
                  name="all"
                  checked={agree.all}
                  onChange={onAgreeChange}
                />
                <strong> 모든 약관에 동의합니다.</strong>
              </label>
            </div>

            <div className="checkboxGroup">
              <label className='checkboxLabel'>
                <input
                  type="checkbox"
                  name="terms"
                  checked={agree.terms}
                  onChange={onAgreeChange}
                />
                [필수] 이용약관
              </label>
              <label className='checkboxLabel'>
                <input
                  type="checkbox"
                  name="privacy"
                  checked={agree.privacy}
                  onChange={onAgreeChange}
                />
                [필수] 개인정보 수집 및 이용 동의
              </label>
              <label className='checkboxLabel'>
                <input
                  type="checkbox"
                  name="notice"
                  checked={agree.notice}
                  onChange={onAgreeChange}
                />
                [선택] FTA 관련 정보 및 변경 사항 수신 동의
              </label>

              {agree.notice && (
                <div className="channelSelect">
                  <label className='checkboxLabel channel'>
                    <input
                      type="checkbox"
                      name="noticeChannel"
                      value="kakao"
                      checked={agree.noticeChannel?.includes('kakao')}
                      onChange={onAgreeChange}
                    />
                    카카오톡
                  </label>
                  <label className='checkboxLabel channel'>
                    <input
                      type="checkbox"
                      name="noticeChannel"
                      value="email"
                      checked={agree.noticeChannel?.includes('email')}
                      onChange={onAgreeChange}
                    />
                    이메일
                  </label>
                </div>
              )}
            </div>

            {agree.notice && agree.noticeChannel?.includes('email') && (
              <div className="emailWrapper">
                <input
                  type="text"
                  name="emailId"
                  value={form.emailId || ''}
                  onChange={onChange}
                />
                <span>@</span>
                <select
                  name="emailDomain"
                  value={form.emailDomain}
                  onChange={onChange}
                >
                  <option value="">직접입력</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                </select>
              </div>
            )}
          </>
        )}

        <button type="submit" className={`loginBtn ${isLogin ? '' : 'join'}`}>
          {isLogin ? '로그인' : '회원가입'}
        </button>
      </form>

      {isLogin && socialButtons && (
        <div className="social-login">
          {socialButtons.map(({ platform, image }) => (
            <button key={platform} onClick={() => onSocialClick(platform)}>
              <img src={image} alt={platform} />
              {platform}로 로그인
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthForm;
