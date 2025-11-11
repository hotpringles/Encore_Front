import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MenuSidebar.css';
import { historyGroups } from './historyGroups';

function MenuSidebar({ onClose, onSelectHistoryGroup, selectedHistoryGroupId }) {
    const navigate = useNavigate();

    // 소개페이지 링크 추가
    const menuItems = [
        { path: '/main', label: 'Home' },
        { path: '/profile', label: '프로필' },
        { path: '/description', label: '서비스 소개'},
    ];

    const handleHistorySelect = (group) => {
        if (onSelectHistoryGroup) {
            onSelectHistoryGroup(group);
        }
        navigate('/main');
        if (onClose) {
            onClose();
        }
    };

    const handleMenuLinkClick = (itemPath) => {
        if (itemPath === '/main' && onSelectHistoryGroup) {
            onSelectHistoryGroup(historyGroups[0]);
        }
        if (onClose) {
            onClose();
        }
    };

    return (
        <nav className="menu-sidebar">
            <ul className="menu-sidebar-list">
                {menuItems.map((item) => (
                    <li key={item.path} className="menu-sidebar-item">
                        <Link
                            to={item.path}
                            className="menu-sidebar-link"
                            onClick={() => handleMenuLinkClick(item.path)}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
                <li className="menu-sidebar-item">
                    <Link to="/test" className="menu-sidebar-link" onClick={onClose}>
                        퀴즈 연습
                    </Link>
                </li>
            </ul>

            <div className="menu-sidebar-section">
                <h3 className="menu-sidebar-section-title">최근 뉴스</h3>
                <ul className="menu-sidebar-history-list">
                    {historyGroups.map((group) => (
                        <li key={group.id}>
                            <button
                                type="button"
                                className={`menu-sidebar-history-button ${selectedHistoryGroupId === group.id ? 'active' : ''}`}
                                onClick={() => handleHistorySelect(group)}
                            >
                                <span className="menu-sidebar-history-label">
                                    <span className="menu-sidebar-history-date">{group.dateLabel}</span>
                                    <span className="menu-sidebar-history-day">({group.dayLabel})</span>
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default MenuSidebar;
