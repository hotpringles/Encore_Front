import './Nav.css';
import User from './User';

function Nav({ onToggleChatSidebar, onToggleMenuSidebar }) {
    return (
        <nav className="navbar">
            <div className="navbar-left-section">
                <button onClick={onToggleMenuSidebar} className="menu-toggle-button">
                    &#9776; {/* 햄버거 아이콘 */}
                </button>
            </div>
            <div className="navbar-logo">FinanceForU</div>
            <div className="navbar-right-section">
                <User username="jhcho" exp={75} />
                <button onClick={onToggleChatSidebar} className="sidebar-toggle-button">
                    ...
                </button>
            </div>
        </nav>
    );
}

export default Nav;