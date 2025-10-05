import React, { useState } from 'react';
import './AuthPages.css';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // TODO: 회원가입 API 연동
    console.log('회원가입 시도:', { id, password });
    alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
    navigate('/login');
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleSignup}>
        <h1>회원가입</h1>
        <input
          type="text"
          className="auth-input"
          placeholder="아이디"
          value={id}
          onChange={(event) => setId(event.target.value)}
          required
        />
        <input
          type="password"
          className="auth-input"
          placeholder="비밀번호"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <input
          type="password"
          className="auth-input"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
        <button type="submit" className="auth-button">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupPage;

