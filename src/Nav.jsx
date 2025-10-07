import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import logo from './assets/logo.png';
import menuIcon from './assets/menuIcon.png';
import chatIcon from './assets/chatIcon.png';
import userAvatar from './assets/seed.png';

function Nav({ onToggleChatSidebar, onToggleMenuSidebar, onNavigateHome }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <button onClick={onToggleMenuSidebar} className="nav-button" aria-label='Open menu'>
          <img src={menuIcon} alt='Menu' className="menu-icon" />
        </button>
      </div>
      <div className="nav-center">
        <div className="nav-logo">
          <Link
            to="/main"
            onClick={() => {
              if (onNavigateHome) {
                onNavigateHome();
              }
            }}
          >
            <img src={logo} alt='FinanceForU logo' />
            <span>FinanceForU</span>
          </Link>
        </div>
      </div>
      <div className="nav-right">
        <Link to="/profile" className="nav-user-profile">
          <img src={userAvatar} alt='User avatar' className="user-avatar-img" />
          <span className="user-name">User</span>
        </Link>
        <button onClick={onToggleChatSidebar} className="nav-button" aria-label='Toggle chat sidebar'>
          <img src={chatIcon} alt='Chat' className="chat-icon" />
        </button>
      </div>
    </nav>
  );
}

export default Nav;

