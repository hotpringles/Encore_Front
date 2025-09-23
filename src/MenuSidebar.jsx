import React from 'react';
import { Link } from 'react-router-dom';
import './MenuSidebar.css';

function MenuSidebar() {
    const menuItems = [
        { path: '/', label: 'Home' },
        { path: '/profile', label: '프로필 설정' },
        { path: '/quiz', label: '퀴즈' },
    ];

    return (
        <nav className="menu-sidebar">
            <ul className="menu-sidebar-list">
                {menuItems.map(item => (
                    <li key={item.path} className="menu-sidebar-item">
                        <Link to={item.path} className="menu-sidebar-link">{item.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default MenuSidebar;