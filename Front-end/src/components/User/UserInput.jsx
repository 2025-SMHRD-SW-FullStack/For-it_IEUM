import React from 'react';
import './UserInput.css'

const UserInput = ({ name, label, value, onChange }) => {
  return (
    <div className='inputGroup'>
      <label htmlFor={name}>{label}</label>
      <input
        type={name === 'password' ? 'password' : 'text'}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`${label}를 입력하세요`}
        className='loginInput'
      />
    </div>
  );
};

export default UserInput
