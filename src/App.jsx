import React, { useCallback, useState } from 'react';
import './tooltipGlobal';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './Nav';
import ChatSidebar from './ChatSidebar';
import MenuSidebar from './MenuSidebar';
import Profile from './Profile';
import MainCarousel from './MainCarousel';
import TestCarousel from './TestCarousel';
import LoginPage from './LoginPage';
import WelcomePage from './WelcomePage';
import SignupPage from './SignupPage';
import { historyGroups } from './historyGroups';

function App() {
  const [isChatSidebarVisible, setIsChatSidebarVisible] = useState(true);
  const [isMenuSidebarVisible, setIsMenuSidebarVisible] = useState(false);
  const defaultHistoryGroup = historyGroups[0] || null;
  const [selectedHistoryGroup, setSelectedHistoryGroup] = useState(defaultHistoryGroup);

  const location = useLocation();
  const isAuthPage = ['/', '/login', '/signup'].includes(location.pathname);

  const toggleChatSidebar = () => {
    setIsChatSidebarVisible((prev) => !prev);
  };

  const toggleMenuSidebar = () => {
    setIsMenuSidebarVisible((prev) => !prev);
  };

  const handleSelectHistoryGroup = useCallback((group) => {
    if (group) {
      setSelectedHistoryGroup(group);
    } else {
      setSelectedHistoryGroup(defaultHistoryGroup);
    }
  }, [defaultHistoryGroup]);

  const handleNavigateHome = useCallback(() => {
    setSelectedHistoryGroup(defaultHistoryGroup);
  }, [defaultHistoryGroup]);

  return (
    <div
      className={`app-container ${
        isChatSidebarVisible ? 'chat-sidebar-visible' : 'chat-sidebar-hidden'
      } ${isMenuSidebarVisible ? 'menu-sidebar-visible' : ''} ${isAuthPage ? 'auth-layout' : ''}`}
    >
      {!isAuthPage && (
        <>
          {isMenuSidebarVisible && <div className="overlay" onClick={toggleMenuSidebar}></div>}
          <MenuSidebar
            onClose={toggleMenuSidebar}
            onSelectHistoryGroup={handleSelectHistoryGroup}
            selectedHistoryGroupId={selectedHistoryGroup ? selectedHistoryGroup.id : null}
          />
          <header className="app-nav">
            <Nav
              onToggleChatSidebar={toggleChatSidebar}
              onToggleMenuSidebar={toggleMenuSidebar}
              onNavigateHome={handleNavigateHome}
            />
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
          <Route
            path="/main"
            element={
              <MainCarousel
                reports={selectedHistoryGroup ? selectedHistoryGroup.items : undefined}
                activeGroup={selectedHistoryGroup || undefined}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/test" element={<TestCarousel />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
