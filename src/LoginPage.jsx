import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPages.css';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // TODO: 인증 API 연동
    console.log('로그인 시도:', { id, password });
    navigate('/main');
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleLogin}>
        <h1>로그인</h1>
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
        <button type="submit" className="auth-button">
          로그인
        </button>
        <div className="auth-links">
          <Link to="/find-auth">아이디·비밀번호 찾기</Link>
          <span>|</span>
          <Link to="/signup">회원가입</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

