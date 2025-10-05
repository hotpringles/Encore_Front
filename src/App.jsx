import React, { useState } from 'react';
import './tooltipGlobal';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './Nav';
import ChatSidebar from './ChatSidebar';
import MenuSidebar from './MenuSidebar';
import Profile from './Profile';
import History from './History';
import MainCarousel from './MainCarousel';
import TestCarousel from './TestCarousel';
import LoginPage from './LoginPage';
import WelcomePage from './WelcomePage';
import SignupPage from './SignupPage';

function App() {
  const [isChatSidebarVisible, setIsChatSidebarVisible] = useState(true);
  const [isMenuSidebarVisible, setIsMenuSidebarVisible] = useState(false);

  const location = useLocation();
  const isAuthPage = ['/', '/login', '/signup'].includes(location.pathname);

  const toggleChatSidebar = () => {
    setIsChatSidebarVisible((prev) => !prev);
  };

  const toggleMenuSidebar = () => {
    setIsMenuSidebarVisible((prev) => !prev);
  };

  return (
    <div
      className={`app-container ${
        isChatSidebarVisible ? 'chat-sidebar-visible' : 'chat-sidebar-hidden'
      } ${isMenuSidebarVisible ? 'menu-sidebar-visible' : ''} ${isAuthPage ? 'auth-layout' : ''}`}
    >
      {!isAuthPage && (
        <>
          {isMenuSidebarVisible && <div className="overlay" onClick={toggleMenuSidebar}></div>}
          <MenuSidebar onClose={toggleMenuSidebar} />
          <header className="app-nav">
            <Nav onToggleChatSidebar={toggleChatSidebar} onToggleMenuSidebar={toggleMenuSidebar} />
          </header>
          <aside className="app-sidebar">
            <ChatSidebar />
          </aside>
        </>
      )}

      <main className="app-main">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/main" element={<MainCarousel />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/test" element={<TestCarousel />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

