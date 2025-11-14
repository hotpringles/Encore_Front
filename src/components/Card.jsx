import { useState, useRef, useEffect, useCallback } from "react"; // [추가] useRef, useEffect
import CardForNews from "./CardForNews.jsx"; // 같은 components 폴더 내
import CardForQuiz from "./CardForQuiz.jsx"; // 같은 components 폴더 내
import "../styles/Card.css";
import {
  fetchOxQuizDetail,
  fetchMcQuizDetail,
  fetchScQuizDetail,
} from "../api/quizApi.js";

function Card({
  title,
  imageUrl,
  summary,
  originalUrl,
  terms,
  quizId,
  onQuizCorrect,
}) {
  const hasQuiz = Boolean(quizId); // [수정] 'quiz'가 아닌 'quizId'의 존재 여부로 확인합니다.
  const [quizReady, setQuizReady] = useState(false);
  const scrollContainerRef = useRef(null); // [추가] 스크롤 컨테이너 Ref
  const [oxQuiz, setOxQuiz] = useState(null);
  const [mcQuiz, setMcQuiz] = useState(null);
  const [saQuiz, setSaQuiz] = useState(null);
  const [quizLoading, setQuizLoading] = useState(true); // [추가] 퀴즈 데이터 로딩 상태
  const [error, setError] = useState(null); // [추가] 에러 상태

  const loadQuiz = useCallback(async (id) => {
    if (!id) return; // quizId가 없으면 함수를 실행하지 않습니다.
    try {
      setQuizLoading(true); // 로딩 시작
      const ox = await fetchOxQuizDetail(id);
      const mc = await fetchMcQuizDetail(id);
      const sc = await fetchScQuizDetail(id);

      // [수정] API가 배열을 반환할 경우를 대비해 첫 번째 요소를 사용합니다.
      // API가 단일 객체를 반환한다면 이 코드는 그대로 두어도 안전합니다.
      setOxQuiz(Array.isArray(ox) ? ox[0] : ox);
      setMcQuiz(Array.isArray(mc) ? mc[0] : mc);
      setSaQuiz(Array.isArray(sc) ? sc[0] : sc);
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
  // ox 선택 답
  const [oxAnswer, setOxAnswer] = useState(null);
  // 4지선다 선택 답
  const [mcAnswer, setMcAnswer] = useState(null);
  // [추가] 단답형 입력 값 및 제출 답
  const [saInput, setSaInput] = useState("");
  const [saSubmittedAnswer, setSaSubmittedAnswer] = useState(null); // { text: string, isCorrect: bool }

  const handleGenerateQuiz = () => {
    // [수정] 퀴즈 데이터가 모두 로드되었을 때만 퀴즈를 준비시킵니다.
    if (!hasQuiz || quizLoading || !oxQuiz || !mcQuiz) return;
    setQuizReady(true); // 이 값 변경이 useEffect를 트리거합니다.
    setOxAnswer(null);
    setMcAnswer(null);
    setSaInput(""); // [추가] 단답형 상태 초기화
    setSaSubmittedAnswer(null); // [추가] 단답형 상태 초기화
  };

  const handleOxAnswer = (boolean) => {
    // [수정] 이미 제출한 문제라면 경험치를 주지 않습니다.
    if (oxAnswer !== null) return;
    // [추가] 정답을 맞혔을 때 경험치 획득 함수 호출
    if (oxQuiz.answer === boolean) {
      onQuizCorrect(10); // 예: 10점 획득
    }
    setOxAnswer(boolean);
  };

  const handleMcAnswer = (option) => {
    // [수정] 이미 제출한 문제라면 경험치를 주지 않습니다.
    if (mcAnswer !== null) return;
    if (mcQuiz.answer === option) {
      onQuizCorrect(10);
    }
    setMcAnswer(option);
  };

  // [추가] 단답형 입력 변경 핸들러
  const handleSaInputChange = (e) => {
    setSaInput(e.target.value);
    //setSaSubmittedAnswer(null); // 입력 중에는 피드백 숨김
  };

  // [추가] 단답형 제출 핸들러
  const handleSaSubmit = (e) => {
    //e.preventDefault();
    // [수정] 이미 제출한 문제라면 경험치를 주지 않습니다.
    if (saSubmittedAnswer !== null) return;
    if (!saInput.trim()) return; // 입력값이 없으면 반환

    // [수정] 'quiz' 변수 대신 상태에 저장된 'saQuiz'를 사용합니다.
    const isCorrect =
      saInput.trim().toLowerCase() === saQuiz.answer.toLowerCase();
    if (isCorrect) {
      onQuizCorrect(10);
    }
    setSaSubmittedAnswer({ text: saInput, isCorrect });
  };

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
      {/* [수정] 퀴즈 데이터가 모두 로드된 후에만 CardForQuiz를 렌더링합니다. */}
      {hasQuiz && !quizLoading && oxQuiz && mcQuiz && (
        <CardForQuiz
          oxQuiz={oxQuiz}
          mcQuiz={mcQuiz}
          saQuiz={saQuiz}
          hasQuiz={hasQuiz}
          quizReady={quizReady}
          oxAnswer={oxAnswer}
          mcAnswer={mcAnswer}
          saInput={saInput} // [추가]
          saSubmittedAnswer={saSubmittedAnswer} // [추가]
          handleGenerateQuiz={handleGenerateQuiz}
          handleOxAnswer={handleOxAnswer}
          handleMcAnswer={handleMcAnswer}
          handleSaInputChange={handleSaInputChange} // [추가]
          handleSaSubmit={handleSaSubmit} // [추가]
        />
      )}
    </div>
  );
}

export default Card;
