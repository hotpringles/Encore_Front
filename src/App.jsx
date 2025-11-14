import { useState, useEffect } from "react";
// import "./tooltipGlobal";
import { Routes, Route, useLocation } from "react-router-dom";
import { fetchSummaries } from "./api/summaryApi.js";
import Nav from "./Nav";
import Profile from "./Profile";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Menu from "./Menu";
import ChatBot from "./ChatBot";
import AppMain from "./AppMain";
import Description from "./Description";
import LevelTest from "./LevelTest";
import quizQuestions from "./quizQuestions.json";
import "./App.css";

function App() {
  const [isChatBotVisible, setIsChatBotVisible] = useState(false);
  const location = useLocation();
  const isSignPage = ["/", "/signin", "/signup"].includes(location.pathname);
  // const toggleMenu = () => {
  //   setIsMenuVisible((prev) => !prev);
  // };
  const onToggleChatBot = () => {
    setIsChatBotVisible((prev) => !prev);
  };

  const [hasTested, setHasTested] = useState(() => {
    const flag = !quizQuestions[0].hasTested;
    return flag;
  });
  const [articles, setArticles] = useState([]);
  const [selectedReports, setSelectedReports] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 메시지

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
  const loadArticles = async () => {
    try {
      setLoading(true); // 로딩 시작
      setError(null); // 에러 초기화

      const data = await fetchSummaries(); // ✅ 여기서 백엔드 요청

      dataObj = groupByDate(data.results);
      const sortedDates = Object.keys(dataObj).sort((a, b) =>
        b.localeCompare(a)
      ); // 최신순 (큰 날짜가 앞)

      // 날짜에 따라 정렬된 객체 배열을 배열로 관리
      const sortedData = sortedDates.reduce((acc, key) => {
        acc.push(dataObj[key]);
        return acc;
      }, []);

      setArticles(sortedData.slice(0, 7)); // 응답 데이터를 state에 저장
      setSelectedReports(articles[0]); // 첫 번째 날짜 기사들을 선택
    } catch (err) {
      console.error(err);
      setError("뉴스를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 3) 컴포넌트가 처음 화면에 나타날 때 딱 한 번 실행
  useEffect(() => {
    loadArticles();
  }, []); // [] = 최초 마운트 시 1번만 실행

  // 4) 상태에 따라 다른 화면 보여주기
  if (loading) return <div>뉴스 불러오는 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={`app-container min-h-screen`}>
      {/* isSignPage가 true일 때 (로그인/회원가입 페이지)는 Menu를 숨깁니다. */}
      {/* isSignPage가 false일 때 (메인 앱 페이지)는 Menu를 표시합니다. */}
      {!isSignPage && hasTested && (
        <nav className="app-menu border-r">
          <Menu
            location={location}
            articles={articles}
            setSelectedArticle={setSelectedArticle}
          />
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
            <Nav onToggleChatBot={onToggleChatBot} />
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
              <Route path="/" element={<SignIn hasTested={hasTested} />} />
              <Route
                path="/signup"
                element={<SignUp hasTested={hasTested} />}
              />
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
                element={<AppMain reports={selectedReports} />}
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
