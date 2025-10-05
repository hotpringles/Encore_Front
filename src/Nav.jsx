import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import logo from './assets/logo.png';
import menuIcon from './assets/menuIcon.png';
import chatIcon from './assets/chatIcon.png';
import userAvatar from './assets/seed.png';

function Nav({ onToggleChatSidebar, onToggleMenuSidebar }) {
  const currentExp = 75;
  const maxExp = 100;
  const expPercentage = (currentExp / maxExp) * 100;

  return (
    <nav className="navbar">
      <div className="nav-left">
        <button onClick={onToggleMenuSidebar} className="nav-button" aria-label="메뉴 열기">
          <img src={menuIcon} alt="메뉴" className="menu-icon" />
        </button>
      </div>
      <div className="nav-center">
        <div className="nav-logo">
          <Link to="/main">
            <img src={logo} alt="FinanceForU 로고" />
            <span>FinanceForU</span>
          </Link>
        </div>
      </div>
      <div className="nav-right">
        <Link to="/profile" className="nav-user-profile">
          <div className="exp-bar-container">
            <div className="exp-bar-progress" style={{ width: `${expPercentage}%` }} />
          </div>
          <img src={userAvatar} alt="사용자 아바타" className="user-avatar-img" />
          <span className="user-name">최정우</span>
        </Link>
        <button onClick={onToggleChatSidebar} className="nav-button" aria-label="챗봇 열기">
          <img src={chatIcon} alt="챗봇" className="chat-icon" />
        </button>
      </div>
    </nav>
  );
}

export default Nav;

