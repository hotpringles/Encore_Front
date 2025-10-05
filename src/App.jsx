import React, { useState } from 'react';
import './tooltipGlobal';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './Nav';
import ChatSidebar from './ChatSidebar';
import MenuSidebar from './MenuSidebar';
import Profile from './Profile';
import Quiz from './Quiz';
import MainCarousel from './MainCarousel';
import TestCarousel from './TestCarousel';
import LoginPage from './LoginPage';
import WelcomePage from './WelcomePage'; // WelcomePage 추가
import SignupPage from './SignupPage'; // SignupPage 추가

function App() {
    const [isChatSidebarVisible, setIsChatSidebarVisible] = useState(true);
    const [isMenuSidebarVisible, setIsMenuSidebarVisible] = useState(false);

    const location = useLocation();
    // 시작, 로그인, 회원가입 페이지인지 확인하는 변수
    const isAuthPage = ['/', '/login', '/signup'].includes(location.pathname);

    const toggleChatSidebar = () => {
        setIsChatSidebarVisible(!isChatSidebarVisible);
    };
    const toggleMenuSidebar = () => {
        setIsMenuSidebarVisible(!isMenuSidebarVisible);
    };

    return (
        <div className={`app-container ${isChatSidebarVisible ? 'chat-sidebar-visible' : 'chat-sidebar-hidden'} ${isMenuSidebarVisible ? 'menu-sidebar-visible' : ''} ${isAuthPage ? 'auth-layout' : ''}`}>
            
            {/* 인증 관련 페이지가 아닐 때만 사이드바와 헤더를 렌더링합니다. */}
            {!isAuthPage && (
                <>
                    {isMenuSidebarVisible && <div className="overlay" onClick={toggleMenuSidebar}></div>}
                    <MenuSidebar onClose={toggleMenuSidebar} />
                    <header className="app-nav">
                        <Nav
                            onToggleChatSidebar={toggleChatSidebar}
                            onToggleMenuSidebar={toggleMenuSidebar}
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
                    <Route path="/main" element={<MainCarousel />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/test" element={<TestCarousel />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
