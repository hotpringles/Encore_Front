import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import logo from './assets/react.svg'; // 로고 이미지를 import 합니다.
import userAvatar from './assets/seed.png'; // 사용자 아바타 이미지는 그대로 사용합니다.

function Nav({ onToggleChatSidebar, onToggleMenuSidebar }) {
    // 임시 경험치 데이터
    const currentExp = 75;
    const maxExp = 100;
    const expPercentage = (currentExp / maxExp) * 100;

    return (
        <nav className="navbar">
            <div className="nav-left">
                <button onClick={onToggleMenuSidebar} className="nav-button">☰</button>
            </div>
            <div className="nav-center">
                <div className="nav-logo">
                    <Link to="/">
                        <img src={logo} alt="App Logo" />
                        <span>FinanceForU</span>
                    </Link>
                </div>
            </div>
            <div className="nav-right">
                <Link to="/profile" className="nav-user-profile">
                    <div className="exp-bar-container">
                        <div 
                            className="exp-bar-progress" 
                            style={{ width: `${expPercentage}%` }}
                        ></div>
                    </div>
                    <img src={userAvatar} alt="User Avatar" className="user-avatar-img" />
                    <span className="user-name">최정우 님</span>
                </Link>
                <button onClick={onToggleChatSidebar} className="nav-button">💬</button>
            </div>
        </nav>
    );
}

export default Nav;