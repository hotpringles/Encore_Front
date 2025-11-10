import React, { useCallback, useState } from 'react';
import './tooltipGlobal';
import './App.css';
// 1. Outlet을 import 합니다.
import { Routes, Route, Outlet } from 'react-router-dom'; 
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
import LevelTest from './LevelTest'; 

// 2. "메인 앱 레이아웃"을 위한 새 컴포넌트를 만듭니다.
// 사이드바, 헤더, <main> 태그를 포함합니다.
const MainLayout = ({
  isChatSidebarVisible,
  isMenuSidebarVisible,
  toggleChatSidebar,
  toggleMenuSidebar,
  handleSelectHistoryGroup,
  selectedHistoryGroup,
  handleNavigateHome,
}) => {
  return (
    <>
      {/* 기존의 사이드바/헤더 로직을 그대로 이곳으로 옮깁니다. */}
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

      {/* <main> 태그가 "메인 앱 레이아웃"의 일부가 됩니다. */}
      <main className="app-main">
        {/* Outlet은 "/main", "/profile" 등 자식 페이지가 렌더링될 위치입니다. */}
        <Outlet />
      </main>
    </>
  );
};


function App() {
  // 3. 기존의 state와 핸들러 함수들은 App 컴포넌트에 그대로 둡니다.
  const [isChatSidebarVisible, setIsChatSidebarVisible] = useState(true);
  const [isMenuSidebarVisible, setIsMenuSidebarVisible] = useState(false);
  const defaultHistoryGroup = historyGroups[0] || null;
  const [selectedHistoryGroup, setSelectedHistoryGroup] = useState(defaultHistoryGroup);

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

  // 4. App.js의 return 문에서는 레이아웃 CSS 클래스와 <Routes>만 남깁니다.
  return (
    <div
      className={`app-container ${
        isChatSidebarVisible ? 'chat-sidebar-visible' : 'chat-sidebar-hidden'
      } ${isMenuSidebarVisible ? 'menu-sidebar-visible' : ''}`}
    >
      <Routes>
        {/* --- 요청 1: 시작 페이지 변경 --- */}
        {/* "인증" 페이지들 (전체 화면 사용, 레이아웃 없음) */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/welcome" element={<WelcomePage />} /> 
        <Route path="/level-test" element={<LevelTest />} />

        {/* --- 요청 2: 레이아웃 비율 수정 --- */}
        {/* "메인 앱" 페이지들 (MainLayout 컴포넌트를 사용) */}
        <Route
          element={
            <MainLayout
              // state와 핸들러를 MainLayout으로 전달합니다.
              isChatSidebarVisible={isChatSidebarVisible}
              isMenuSidebarVisible={isMenuSidebarVisible}
              toggleChatSidebar={toggleChatSidebar}
              toggleMenuSidebar={toggleMenuSidebar}
              handleSelectHistoryGroup={handleSelectHistoryGroup}
              selectedHistoryGroup={selectedHistoryGroup}
              handleNavigateHome={handleNavigateHome}
            />
          }
        >
          {/* MainLayout의 <Outlet>에 렌더링될 페이지들 */}
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
        </Route>
      </Routes>
    </div>
  );
}

export default App;