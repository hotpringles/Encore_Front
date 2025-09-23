import { useState } from 'react';
import './App.css';
import Nav from './Nav';
import MainContent from './MainContent';
import ChatSidebar from './ChatSidebar';
import MenuSidebar from './MenuSidebar';

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
            <MenuSidebar />

            <header className="app-nav">
                <Nav 
                    onToggleChatSidebar={toggleChatSidebar} 
                    onToggleMenuSidebar={toggleMenuSidebar} 
                />
            </header>

            <main className="app-main">
                <MainContent />
            </main>
            <aside className="app-sidebar">
                <ChatSidebar />
            </aside>
        </div>
    );
}

export default App;
