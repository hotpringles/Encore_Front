import { useState, useRef, useEffect, useCallback } from "react"; // [추가] useRef, useEffect
import CardForNews from "./CardForNews.jsx";
import CardForQuiz from "./CardForQuiz.jsx";
import "./Card.css";
import { fetchOxQuizDetail, fetchMcQuizDetail } from "./api/quizApi.js";

function Card({ title, imageUrl, summary, originalUrl, terms, quizId }) {
  const hasQuiz = Boolean(quiz);
  const [quizReady, setQuizReady] = useState(false);
  const scrollContainerRef = useRef(null); // [추가] 스크롤 컨테이너 Ref
  const [oxQuiz, setOxQuiz] = useState(null);
  const [mcQuiz, setMcQuiz] = useState(null);
  const [scQuiz, setScQuiz] = useState(null);

  const loadQuiz = useCallback(async (id) => {
    try {
      const ox = await fetchOxQuizDetail(id);
      const mc = await fetchMcQuizDetail(id);
      const sc = await fetchScQuizDetail(id);
      setOxQuiz(ox);
      setMcQuiz(mc);
      setScQuiz(sc);
    } catch (err) {
      console.error(err);
      setError("퀴즈를 불러오는 데 실패했습니다.");
    }
  }, []);

  useEffect(() => {
    loadQuiz(quizId);
  }, [quizId, loadQuiz]);
  // ox 선택 답
  const [oxAnswer, setOxAnswer] = useState(null);
  // 4지선다 선택 답
  const [mcAnswer, setMcAnswer] = useState(null);
  // [추가] 단답형 입력 값 및 제출 답
  const [saInput, setSaInput] = useState("");
  const [saSubmittedAnswer, setSaSubmittedAnswer] = useState(null); // { text: string, isCorrect: bool }

  const handleGenerateQuiz = () => {
    if (!hasQuiz) return;
    setQuizReady(true); // 이 값 변경이 useEffect를 트리거합니다.
    setOxAnswer(null);
    setMcAnswer(null);
    setSaInput(""); // [추가] 단답형 상태 초기화
    setSaSubmittedAnswer(null); // [추가] 단답형 상태 초기화
  };

  const handleOxAnswer = (boolean) => {
    setOxAnswer(boolean);
  };

  const handleMcAnswer = (option) => {
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
    if (!saInput.trim()) return; // 입력값이 없으면 반환

    const isCorrect =
      saInput.trim().toLowerCase() === quiz.sa.answer.toLowerCase();
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
      {hasQuiz && (
        <CardForQuiz
          oxQuiz={oxQuiz}
          mcQuiz={mcQuiz}
          scQuiz={scQuiz}
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
