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
  const isChatBotVisible = useUiStore((state) => state.isChatBotVisible);
  const { user, setUser, hasTested, setHasTested } = useUserStore();
  // const [articles, setArticles] = useState([]);
  // const [selectedReports, setSelectedReports] = useState(null);
  const { setNewsGroup, setSelectedNewsGroup } = useNewsStore();

  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 메시지

  const [authLoading, setAuthLoading] = useState(true); // [수정] 인증 로딩 상태 주석 해제

  // [추가] 사용자 점수(경험치)를 업데이트하는 함수
  const updateUserScore = async (amount, flag) => {
    if (!user || flag) return;

    const newScore = (user.score || 0) + amount;
    const updatedUser = { ...user, score: newScore };

    try {
      // 1. UI를 즉시 업데이트 (Optimistic Update)
      setUser(updatedUser);
      // 2. 백엔드에 변경사항을 저장
      await updateMyInfo({ score: newScore });
    } catch (error) {
      console.error("점수 업데이트 실패:", error);
      // TODO: 필요하다면 여기서 원래 user 상태로 롤백하는 로직을 추가할 수 있습니다.
    }
  };

  // filter 메소드를 사용해 summaries 배열에서 id가 일치하는 요소를 찾습니다.
  // [수정] filter와 map의 반환 값을 올바르게 사용하도록 함수를 수정합니다.
  const filteredSummaries = (groups) => {
    // [수정] user.id가 없을 때, 그리고 summaries 배열이 비어있을 때를 모두 안전하게 처리합니다.
    if (!user?.id) {
      return []; // 사용자 정보가 없으면 빈 배열을 반환하여 아무것도 필터링하지 않습니다.
    }
    return groups.filter(
      (group) => group.summaries[0].article.user === user.id
    );
  };

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
      // [수정] API 응답 객체 전체가 아닌, 실제 데이터가 담긴 data.results 배열을 전달합니다.
      // console.log(data);
      // console.log(data.results[0]);
      // console.log(data.results[0].summaries[0]);
      // console.log(data.results[0].summaries[0].id);
      // console.log(data.results);
      const filteredList = filteredSummaries(data.results); // 21개 받아오게 고정해야됨
      console.log(filteredList);
      const dataObj = groupByDate(filteredList);
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

  // [수정] useEffect를 분리하여 역할에 따라 실행 시점을 제어합니다.

  // 1. 컴포넌트가 처음 마운트될 때 사용자 인증 상태를 확인합니다.
  useEffect(() => {
    // [수정] 앱 시작 시 로그인 상태 확인 로직 활성화
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const userData = await fetchProfile();
          setUser(userData);
          setHasTested(!!userData.grade); // [추가] 등급 유무로 hasTested 설정
        } catch (error) {
          console.error("자동 로그인 실패:", error);
          localStorage.removeItem("accessToken"); // 유효하지 않은 토큰 제거
          localStorage.removeItem("refreshToken");
        } finally {
          setAuthLoading(false); // 인증 확인 완료 (성공/실패 여부와 관계없이)
        }
      } else {
        setAuthLoading(false); // 토큰이 없는 경우에도 인증 확인은 완료된 것임
      }
    };

    checkLoginStatus();
  }, []); // 의존성 배열이 비어있으므로 최초 1회만 실행됩니다.

  // 2. 사용자 인증이 완료된 후 (authLoading이 false가 되면) 뉴스 데이터를 로드합니다.
  useEffect(() => {
    if (authLoading || !user) return;
    loadNewsGroup();
  }, [authLoading, user?.id]); // 인증 완료 후 사용자 정보가 있을 때만 실행합니다.

  // 4) 상태에 따라 다른 화면 보여주기
  // [수정] 인증 로딩 상태를 먼저 확인합니다.
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark text-text-primary dark:text-white">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined animate-spin">sync</span>
          <span>인증 정보를 확인하는 중...</span>
        </div>
      </div>
    );
  }
  if (loading) return <div>뉴스 데이터를 불러오는 중...</div>;
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
            <Nav />
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
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/level-test"
                element={<LevelTest quizQuestions={quizQuestions} />}
              />
              <Route
                path="/main"
                element={<AppMain onQuizCorrect={updateUserScore} />}
              />
              <Route path="/profile" element={<Profile />} />
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
