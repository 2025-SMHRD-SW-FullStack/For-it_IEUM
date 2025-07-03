import React from 'react';
import { motion } from 'framer-motion';
import './Catchphrase.css';

const Catchphrase = () => {
  return (
    <section className="header_text">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.8, 0.25, 1], // cubic-bezier
        }}
      >
        최저 관세를 찾고<br />
        수익을 극대화하세요
      </motion.h1>
    </section>
  );
};

export default Catchphrase;
