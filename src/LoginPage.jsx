import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 이 아래에 styled-components 코드를 추가할 예정입니다.

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleLogin = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    console.log('로그인 시도:', { id, password });
    // 추후 이 부분에 axios를 이용한 서버 통신 코드를 추가합니다.
    // 로그인 성공 시 메인 페이지로 이동
    navigate('/main');
  };

  return (
    <LoginPageContainer>
      <LoginForm onSubmit={handleLogin}>
        {/* 로고는 public 폴더에 이미지가 있다면 <LogoImg src="/logo.png" /> 와 같이 추가할 수 있습니다. */}
        <h1>로그인</h1>
        <StyledInput
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <StyledInput
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton type="submit">로그인</LoginButton>
        <LinkContainer>
          <StyledLink to="/find-auth">아이디/비밀번호 찾기</StyledLink>
          <span>|</span>
          <StyledLink to="/signup">회원가입</StyledLink>
        </LinkContainer>
      </LoginForm>
    </LoginPageContainer>
  );
};

export default LoginPage;

// 여기에 스타일 코드를 작성합니다.

// LoginPage.js 파일의 export default... 바로 다음에 이어서 붙여넣으세요.

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LoginForm = styled.form`
  width: 400px;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: bold;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const LinkContainer = styled.div`
  margin-top: 20px;
  color: #888;
  font-size: 14px;

  span {
    margin: 0 10px;
  }
`;

const StyledLink = styled(Link)`
  color: #888;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;