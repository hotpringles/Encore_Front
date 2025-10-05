import { useState } from 'react';
import './tooltipGlobal';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import ChatSidebar from './ChatSidebar';
import MenuSidebar from './MenuSidebar';
import Profile from './Profile';
import MainCarousel from './MainCarousel';
import History from './History';
import TestCarousel from './TestCarousel';

function App() {
    const [isChatSidebarVisible, setIsChatSidebarVisible] = useState(true);
    const [isMenuSidebarVisible, setIsMenuSidebarVisible] = useState(false);

    const toggleChatSidebar = () => {
        setIsChatSidebarVisible((prev) => !prev);
    };

    const toggleMenuSidebar = () => {
        setIsMenuSidebarVisible((prev) => !prev);
    };

    return (
        <div
            className={`app-container ${isChatSidebarVisible ? 'chat-sidebar-visible' : 'chat-sidebar-hidden'} ${isMenuSidebarVisible ? 'menu-sidebar-visible' : ''}`}
        >
            {isMenuSidebarVisible && <div className="overlay" onClick={toggleMenuSidebar}></div>}
            <MenuSidebar onClose={toggleMenuSidebar} />

            <header className="app-nav">
                <Nav onToggleChatSidebar={toggleChatSidebar} onToggleMenuSidebar={toggleMenuSidebar} />
            </header>

            <main className="app-main">
                <Routes>
                    <Route path="/" element={<MainCarousel />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/test" element={<TestCarousel />} />
                </Routes>
            </main>
            <aside className="app-sidebar">
                <ChatSidebar />
            </aside>
        </div>
    );
}

export default App;

