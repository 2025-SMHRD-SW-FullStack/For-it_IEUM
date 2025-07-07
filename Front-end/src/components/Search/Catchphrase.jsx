import React from 'react';
import { motion } from 'framer-motion';
import './Catchphrase.css';

const Catchphrase = () => {
  return (
      <h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.8, 0.25, 1], // cubic-bezier
        }}
        className='catchPhraseText'
      >
        최저 관세를 찾고<br />
        수익을 극대화하세요
      </h1>
  );
};

export default Catchphrase;
