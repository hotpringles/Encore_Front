import { useState, useEffect } from "react";
// import "./tooltipGlobal";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { fetchSummaries } from "./api/summaryApi.js"; // 경로는 그대로 유지
import Nav from "./components/Nav";
import { updateMyInfo, fetchProfile } from "./api/accountApi.js"; // 경로는 그대로 유지
import Profile from "./pages/Profile";
import LogIn from "./pages/LogIn.jsx";
import SignUp from "./pages/SignUp";
import Menu from "./components/Menu";
import ChatBot from "./components/ChatBot";
import AppMain from "./pages/AppMain";
import Description from "./pages/Description";
import LevelTest from "./pages/LevelTest";
import quizQuestions from "./quizQuestions.json";
import "./styles/App.css";
import { useUiStore } from "./store/uiStore.js";
import { useUserStore } from "./store/userStore.js";
import { useNewsStore } from "./store/newsStore.js";

function App() {
  const location = useLocation();
  const isSignPage = ["/", "/login", "/signup"].includes(location.pathname);
  const { isChatBotVisible, toggleChatBot } = useUiStore();
  const { user, setUser, hasTested, setHasTested, updateUserExp } =
    useUserStore();
  // const [articles, setArticles] = useState([]);
  // const [selectedReports, setSelectedReports] = useState(null);
  const { newsGroup, setNewsGroup, selectedNewsGroup, setSelectedNewsGroup } =
    useNewsStore();

  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 메시지

  const [authLoading, setAuthLoading] = useState(true); // [추가] 인증 로딩 상태
  // [추가] 사용자 경험치를 업데이트하는 함수
  // const updateUserExp = async (amount) => {
  //   if (!user || !user.id) return;

  //   const newExp = Math.min(100, (user.exp || 0) + amount); // 경험치는 100을 넘지 않도록
  //   const updatedUser = { ...user, exp: newExp };

  //   try {
  //     // 1. UI를 즉시 업데이트
  //     setUser(updatedUser);
  //     // 2. 백엔드에 변경사항을 저장
  //     await updateMyInfo({ exp: newExp });
  //   } catch (error) {
  //     console.error("경험치 업데이트 실패:", error);
  //     // 필요하다면 여기서 원래 user 상태로 롤백할 수 있습니다.
  //   }
  // };

  // groups를 날짜에 따라 분류하는 함수(key: value(같은 날짜 객체 배열))
  const groupByDate = (groups) => {
    return groups.reduce((acc, item) => {
      const date = item.date;

      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});
  };

  // 2) 뉴스를 불러오는 함수
  const loadNewsGroup = async () => {
    try {
      setLoading(true); // 로딩 시작
      setError(null); // 에러 초기화

      const data = await fetchSummaries(); // ✅ 여기서 백엔드 요청
      const list = Array.isArray(data) ? data : data?.results ?? [];
      const dataObj = groupByDate(list);
      const sortedDates = Object.keys(dataObj).sort((a, b) =>
        b.localeCompare(a)
      ); // 최신순 (큰 날짜가 앞)

      // 날짜에 따라 정렬된 객체 배열을 배열로 관리
      const sortedData = sortedDates.reduce((acc, key) => {
        acc.push(dataObj[key]);
        return acc;
      }, []);

      const recent7days = sortedData.slice(0, 7);
      setNewsGroup(recent7days); // 응답 데이터를 state에 저장
      setSelectedNewsGroup(recent7days[0] ?? null); // 첫 번째 날짜 기사들을 선택
    } catch (err) {
      console.error(err);
      setError("뉴스를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 3) 컴포넌트가 처음 화면에 나타날 때 딱 한 번 실행
  useEffect(() => {
    // [추가] 앱 시작 시 뉴스 데이터 로드
    loadNewsGroup();

    // [추가] 앱 시작 시 로그인 상태 확인
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const userData = await fetchProfile();
          setUser(userData);
        } catch (error) {
          console.error("자동 로그인 실패:", error);
          localStorage.removeItem("accessToken"); // 유효하지 않은 토큰 제거
        }
      }
      setAuthLoading(false); // 인증 확인 완료
    };

    checkLoginStatus();
  }, []); // [] = 최초 마운트 시 1번만 실행

  // 4) 상태에 따라 다른 화면 보여주기
  // [수정] 뉴스 로딩과 인증 로딩을 모두 기다립니다.
  if (loading || authLoading) return <div>데이터를 불러오는 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={`app-container min-h-screen`}>
      {/* isSignPage가 true일 때 (로그인/회원가입 페이지)는 Menu를 숨깁니다. */}
      {/* isSignPage가 false일 때 (메인 앱 페이지)는 Menu를 표시합니다. */}
      {!isSignPage && hasTested && (
        <nav className="app-menu border-r">
          <Menu />
        </nav>
      )}

      <div
        className={`content-container ${isSignPage ? "sign-page" : ""} ${
          !hasTested ? "test-page" : ""
        }`}
      >
        {/* isSignPage가 true일 때 (로그인/회원가입 페이지)는 Nav를 숨깁니다. */}
        {!isSignPage && hasTested && (
          <header className={"app-nav"}>
            <Nav onToggleChatBot={toggleChatBot} user={user} />
          </header>
        )}
        <main className={"app-main grow"}>
          <div
            className={`panel-container ${
              !isSignPage && isChatBotVisible ? "chat-bot-visible" : ""
            }`}
          >
            {/* Routes는 항상 렌더링되어야 합니다. 그렇지 않으면 페이지가 보이지 않습니다. */}
            <Routes>
              <Route index element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LogIn setUser={setUser} />} />
              <Route path="/signup" element={<SignUp setUser={setUser} />} />
              <Route
                path="/level-test"
                element={
                  <LevelTest // [수정] splice() -> slice() 로 변경하여 원본 배열 수정을 방지합니다.
                    quizQuestions={quizQuestions.slice(1)}
                    setHasTested={setHasTested}
                  />
                }
              />
              <Route
                path="/main"
                element={
                  <AppMain
                    selectedNewsGroup={selectedNewsGroup}
                    onQuizCorrect={updateUserExp}
                  />
                }
              />
              <Route
                path="/profile"
                element={<Profile user={user} setUser={setUser} />}
              />
              <Route path="/description" element={<Description />} />
            </Routes>
            {/* isSignPage가 true일 때 (로그인/회원가입 페이지)는 ChatBot을 숨깁니다. */}
          </div>
          {!isSignPage && (
            <aside
              className={`app-chat-bot ${
                isChatBotVisible ? "chat-bot-visible" : ""
              } border-l
              overflow-y-hidden`}
            >
              <ChatBot />
            </aside>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
