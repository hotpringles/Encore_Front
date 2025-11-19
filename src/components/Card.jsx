import { useState, useRef, useEffect, useCallback, useMemo } from "react"; // [추가] useRef, useEffect
import CardForNews from "./CardForNews.jsx"; // 같은 components 폴더 내
import CardForQuiz from "./CardForQuiz.jsx"; // 같은 components 폴더 내
import "../styles/Card.css";
import {
  fetchOxQuizzes,
  fetchMcQuizzes,
  fetchSaQuizzes,
} from "../api/quizApi.js";
import { useUserStore } from "../store/userStore.js";

const QUIZ_SEQUENCE_BY_GRADE = {
  씨앗: ["OX", "OX"],
  새싹: ["MC4", "MC4"],
  나무: ["MC4", "MC4"],
  숲: ["SC", "SC"],
};

function Card({
  title,
  imageUrl,
  summary,
  originalUrl,
  terms,
  quizId,
  onQuizCorrect,
}) {
  const userGrade = useUserStore((state) => state.user?.grade);
  const quizList = useMemo(() => {
    return QUIZ_SEQUENCE_BY_GRADE[userGrade] || ["OX", "OX"];
  }, [userGrade]);

  const hasQuiz = Boolean(quizId); // [수정] 'quiz'가 아닌 'quizId'의 존재 여부로 확인합니다.
  const [quizReady, setQuizReady] = useState(false);
  const scrollContainerRef = useRef(null); // [추가] 스크롤 컨테이너 Ref

  const [quizLoading, setQuizLoading] = useState(true); // [추가] 퀴즈 데이터 로딩 상태
  const [error, setError] = useState(null); // [추가] 에러 상태
  const [oxQuizzes, setOxQuizzes] = useState([]);
  const [mcQuizzes, setMcQuizzes] = useState([]);
  const [saQuizzes, setSaQuizzes] = useState([]);

  const loadQuiz = useCallback(async (id) => {
    if (!id) return; // quizId가 없으면 함수를 실행하지 않습니다.
    try {
      setQuizLoading(true); // 로딩 시작
      const ox = await fetchOxQuizzes();
      ox.filter((item) => quizId === item.summary);
      const mc = await fetchMcQuizzes();
      mc.filter((item) => quizId === item.summary);
      const sa = await fetchSaQuizzes();
      sa.filter((item) => quizId === item.summary);

      // [수정] API가 배열을 반환할 경우를 대비해 첫 번째 요소를 사용합니다.
      // API가 단일 객체를 반환한다면 이 코드는 그대로 두어도 안전합니다.
      setOxQuizzes(Array.isArray(ox) ? ox : ox ? [ox] : []);
      setMcQuizzes(Array.isArray(mc) ? mc : mc ? [mc] : []);
      setSaQuizzes(Array.isArray(sa) ? sa : sa ? [sa] : []);
    } catch (err) {
      console.error(err);
      setError("퀴즈를 불러오는 데 실패했습니다.");
    } finally {
      setQuizLoading(false); // 로딩 종료
    }
  }, []);

  useEffect(() => {
    // quizId가 있을 때만 퀴즈를 로드합니다.
    if (quizId) loadQuiz(quizId);
  }, [quizId, loadQuiz]);

  const quizContents = useMemo(() => {
    let oxCount = 0;
    let mcCount = 0;
    let saCount = 0;

    return quizList.map((type) => {
      if (type === "ox") {
        return oxQuizzes[oxCount++];
      } else if (type === "mc") {
        return mcQuizzes[mcCount++];
      } else if (type === "sa") {
        return saQuizzes[saCount++];
      } else {
        return null;
      }
    });
  }, [quizList, oxQuizzes, mcQuizzes, saQuizzes]);

  // ox 선택 답

  // const quizDataMap = useMemo(
  //   () => ({
  //     ox: oxQuizzes,
  //     mc: mcQuizzes,
  //     sa: saQuizzes,
  //   }),
  //   [oxQuizzes, mcQuizzes, saQuizzes]
  // );

  // const requiredCountByType = useMemo(() => {
  //   return quizList.reduce((acc, type) => {
  //     if (!["ox", "mc", "sa"].includes(type)) return acc;
  //     acc[type] = (acc[type] || 0) + 1;
  //     return acc;
  //   }, {});
  // }, [quizList]);

  // const isQuizDataReady = useMemo(() => {
  //   return Object.entries(requiredCountByType).every(([type, count]) => {
  //     const quizzes = quizDataMap[type] || [];
  //     return quizzes.length >= count;
  //   });
  // }, [requiredCountByType, quizDataMap]);

  // const sequenceData = useMemo(() => {
  //   if (!isQuizDataReady) return [];
  //   const counters = { ox: 0, mc: 0, sa: 0 };
  //   return quizList
  //     .map((type, orderIndex) => {
  //       if (!["ox", "mc", "sa"].includes(type)) return null;
  //       const currentIndex = counters[type] || 0;
  //       const quiz = quizDataMap[type]?.[currentIndex];
  //       counters[type] = currentIndex + 1;
  //       if (!quiz) return null;
  //       return {
  //         type,
  //         quiz,
  //         orderIndex,
  //         typeIndex: currentIndex,
  //       };
  //     })
  //     .filter(Boolean);
  // }, [isQuizDataReady, quizList, quizDataMap]);

  const handleGenerateQuiz = () => {
    // [수정] 퀴즈 데이터가 모두 로드되었을 때만 퀴즈를 준비시킵니다.
    if (!hasQuiz || quizLoading) return;

    setQuizReady(true); // 이 값 변경이 useEffect를 트리거합니다.
  };
  console.log(quizContents);

  return (
    // [추가] ref 연결
    <div className="report-cards" ref={scrollContainerRef}>
      <CardForNews
        title={title}
        imageUrl={imageUrl}
        summary={summary}
        originalUrl={originalUrl}
        terms={terms}
      />
      {/* 퀴즈 섹션 렌더링 로직 개선 */}
      {hasQuiz && quizLoading && (
        <div className="card-page quiz-page flex justify-center items-center">
          <p className="text-gray-500">퀴즈를 불러오는 중...</p>
        </div>
      )}
      {hasQuiz && error && (
        <div className="card-page quiz-page flex justify-center items-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      {hasQuiz && !quizLoading && !error && (
        <CardForQuiz
          hasQuiz={hasQuiz}
          quizReady={quizReady}
          onQuizCorrect={onQuizCorrect}
          handleGenerateQuiz={handleGenerateQuiz}
          quizContents={quizContents}
        />
      )}
    </div>
  );
}

export default Card;
