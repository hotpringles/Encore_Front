import { useState } from "react";
import CardForNews from "./CardForNews.jsx";
import CardForQuiz from "./CardForQuiz.jsx";
import "./Card.css";

function Card({ title, imageUrl, summary, originalUrl, quiz }) {
  const hasQuiz = Boolean(quiz);
  const [quizReady, setQuizReady] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // ox 선택 답
  const [oxAnswer, setOxAnswer] = useState(null);
  // 4지선다 선택 답
  const [mcAnswer, setMcAnswer] = useState(null);

  const handleGenerateQuiz = () => {
    if (!hasQuiz) return;
    setQuizReady(true);
    setOxAnswer(null);
    setMcAnswer(null);
  };
  const handleOxAnswer = (boolean) => {
    setOxAnswer(boolean);
  };

  const handleMcAnswer = (num) => {
    setMcAnswer(num);
  };

  return (
    <div className="report-cards">
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
          handleGenerateQuiz={handleGenerateQuiz}
          handleOxAnswer={handleOxAnswer}
          handleMcAnswer={handleMcAnswer}
        />
      )}
    </div>
  );
}

export default Card;
