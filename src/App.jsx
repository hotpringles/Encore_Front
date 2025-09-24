import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import MainContent from './MainContent';
import ChatSidebar from './ChatSidebar';
import MenuSidebar from './MenuSidebar';
import Profile from './Profile'; // Profile 컴포넌트를 import 합니다.
import Quiz from './Quiz'; // Quiz 컴포넌트를 import 합니다.

function App() {
    const [isChatSidebarVisible, setIsChatSidebarVisible] = useState(true);
    const [isMenuSidebarVisible, setIsMenuSidebarVisible] = useState(false);

    const toggleChatSidebar = () => {
        setIsChatSidebarVisible(!isChatSidebarVisible);
    };

    const toggleMenuSidebar = () => {
        setIsMenuSidebarVisible(!isMenuSidebarVisible);
    };

    return (
        <div className={`app-container ${isChatSidebarVisible ? 'chat-sidebar-visible' : 'chat-sidebar-hidden'} ${isMenuSidebarVisible ? 'menu-sidebar-visible' : ''}`}>
            {isMenuSidebarVisible && <div className="overlay" onClick={toggleMenuSidebar}></div>}
            <MenuSidebar onClose={toggleMenuSidebar} />

            <header className="app-nav">
                <Nav 
                    onToggleChatSidebar={toggleChatSidebar} 
                    onToggleMenuSidebar={toggleMenuSidebar} 
                />
            </header>

            <main className="app-main">
                <Routes>
                    <Route path="/" element={<MainContent />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/quiz" element={<Quiz />} />
                </Routes>
            </main>
            <aside className="app-sidebar">
                <ChatSidebar />
            </aside>
        </div>
    );
}

export default App;
