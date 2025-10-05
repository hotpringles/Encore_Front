import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from './assets/logo.png'; // 로고 이미지 경로

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Logo = styled.img`
  width: 200px;
  margin-bottom: 50px;
`;

const ActionButton = styled(Link)`
  width: 300px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  margin-bottom: 15px;

  &:hover {
    background-color: #0056b3;
  }

  &.signup {
    background-color: #6c757d;
    &:hover {
      background-color: #5a6268;
    }
  }
`;

const WelcomePage = () => (
  <WelcomeContainer>
    <Logo src={logo} alt="FinanceForU Logo" />
    <ActionButton to="/login">로그인</ActionButton>
    <ActionButton to="/signup" className="signup">회원가입</ActionButton>
  </WelcomeContainer>
);

export default WelcomePage;