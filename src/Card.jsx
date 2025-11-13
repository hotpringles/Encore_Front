import { useState, useRef, useEffect } from "react"; // [추가] useRef, useEffect
import CardForNews from "./CardForNews.jsx";
import CardForQuiz from "./CardForQuiz.jsx";
import "./Card.css";

function Card({ title, imageUrl, summary, originalUrl, quiz }) {
  const hasQuiz = Boolean(quiz);
  const [quizReady, setQuizReady] = useState(false);
  const scrollContainerRef = useRef(null); // [추가] 스크롤 컨테이너 Ref

  // ox 선택 답
  const [oxAnswer, setOxAnswer] = useState(null);
  // 4지선다 선택 답
  const [mcAnswer, setMcAnswer] = useState(null);
  // [추가] 단답형 입력 값 및 제출 답
  const [saInput, setSaInput] = useState("");
  const [saSubmittedAnswer, setSaSubmittedAnswer] = useState(null); // { text: string, isCorrect: bool }

  // [추가] quizReady가 true로 변경되면 스크롤 실행
  /*useEffect(() => {
    if (quizReady && scrollContainerRef.current) {
      // 퀴즈 인트로 페이지(2번째) 다음 페이지(OX 퀴즈)로 스크롤
      // CardForNews 2페이지 + 퀴즈 인트로 1페이지 = 총 3페이지
      // 3번째 페이지(index 2)의 높이만큼 스크롤합니다.
      const pageHeight = scrollContainerRef.current.clientHeight;
      scrollContainerRef.current.scrollTo({
        top: pageHeight * 2, // 3번째 페이지(퀴즈 인트로)로 먼저 이동
        behavior: "smooth",
      });

      // 퀴즈 인트로 스크롤 후, 잠시 뒤 퀴즈 첫 페이지로 스크롤
      setTimeout(() => {
        scrollContainerRef.current.scrollTo({
          top: pageHeight * 3, // 4번째 페이지(OX 퀴즈)로 이동
          behavior: "smooth",
        });
      }, 300); // 0.3초 대기
    }
  }, [quizReady]);*/

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
      />
      {hasQuiz && (
        <CardForQuiz
          quiz={quiz}
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