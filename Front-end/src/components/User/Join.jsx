import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Join.css'

const Join = () => {

  const navigate = useNavigate();

  const clickJoin = () => {
    navigate('/JoinPage');
  }

  return (
    <div className='loginJoin'>
        <label>아직 IEUM 회원이 아니신가요?</label>
        <button onClick={clickJoin}>회원가입</button>
    </div>
  )
}

export default Join