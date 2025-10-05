import React from 'react';
import { Link } from 'react-router-dom';
import './AuthPages.css';
import logo from './assets/logo.png';

const WelcomePage = () => (
  <div className="auth-wrapper">
    <div className="welcome-content">
      <img src={logo} alt="FinanceForU" className="welcome-logo" />
      <div className="welcome-actions">
        <Link to="/login">로그인</Link>
        <Link to="/signup" className="secondary">
          회원가입
        </Link>
      </div>
    </div>
  </div>
);

export default WelcomePage;

