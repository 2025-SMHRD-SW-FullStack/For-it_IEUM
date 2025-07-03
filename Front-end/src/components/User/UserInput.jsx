import React from 'react';
import './UserInput.css';

const UserInput = ({ name, label, value, onChange, className = '' }) => {
  
  const inputType = name === 'password' || name === 'passwordConfirm' ? 'password'
                    : name === 'tel' ? 'tel'
                    : 'text';

  return (
    <div className={`inputGroup ${className}`}>
      <label htmlFor={name} className="loginLabel">{label}</label>
      <input
        type={inputType}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`${label}를 입력하세요`}
        className={`loginInput ${className}`}
      />
    </div>
  );
};

export default UserInput;
