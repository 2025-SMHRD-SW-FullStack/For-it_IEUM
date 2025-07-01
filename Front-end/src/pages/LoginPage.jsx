import React, { useState } from 'react'
import UserInput from '../components/User/UserInput'
import './LoginPage.css'
import Social from '../components/User/Social'
import Join from '../components/User/Join'

const LoginPage = () => {

    const [form, setForm] = useState({ id: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('로그인 시도:', form);
        // 백엔드로 form.id, form.password 넘기기
    };

  return (
    <div className='LoginMain'>
        <h2>로그인</h2>
        <form onSubmit={handleSubmit} className='LoginForm'>
            <div>
                <UserInput name="id" label="아이디" value={form.id} onChange={handleChange} />
                <UserInput name="password" label="비밀번호" value={form.password} onChange={handleChange} />
            </div>
            <input type="submit" value="로그인하기" className='LoginBtn' />
        </form>
        <Social/>
        <Join/>
    </div>
  )
}

export default LoginPage