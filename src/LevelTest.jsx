import { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- 퀴즈 데이터 ---
// [수정] 12개의 레벨 테스트 문제로 교체

const TOTAL_QUESTIONS = 12; // 총 문제 수 (12개)

// 1. 퀴즈 시작 화면 (수정 없음)
const QuizStart = ({ onStartQuiz }) => (
  <div className="w-full max-w-3xl h-full">
    <div className="bg-white dark:bg-gray-900/50 rounded-xl shadow-lg border border-gray-200/80 dark:border-white/10 overflow-hidden">
      <div className="p-8 sm:p-12 md:p-16 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-5xl">
              school
            </span>
          </div>
        </div>
        <h1 className="text-gray-900 dark:text-white tracking-tight text-4xl font-extrabold leading-tight pb-2">
          경제 상식 퀴즈
        </h1>
        <h2 className="text-gray-700 dark:text-gray-300 text-lg font-medium leading-tight tracking-[-0.015em] pb-4">
          OOO님, 환영합니다!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-relaxed max-w-xl mx-auto">
          이 퀴즈는 개인의 경제 지식을 테스트하기 위해 만들어졌습니다.
        </p>
        <div className="mt-8 mb-10 p-6 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200/80 dark:border-white/10">
          <ul className="flex flex-col sm:flex-row justify-center items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 text-left">
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="material-symbols-outlined mr-3 text-primary">
                checklist
              </span>
              <span className="text-sm font-medium">
                총 {TOTAL_QUESTIONS}개의 문제
              </span>
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="material-symbols-outlined mr-3 text-primary">
                filter_1
              </span>
              <span className="text-sm font-medium">
                문제는 한 번에 하나씩 표시됩니다
              </span>
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="material-symbols-outlined mr-3 text-primary">
                psychology
              </span>
              <span className="text-sm font-medium">
                경제 지식을 점검해 보세요
              </span>
            </li>
          </ul>
        </div>
        <button
          onClick={onStartQuiz}
          className="w-full sm:w-auto flex-shrink-0 min-w-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-primary/30 hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 transition-all duration-300"
        >
          <span className="truncate">퀴즈 시작</span>
        </button>
      </div>
    </div>
  </div>
);

// 2. 퀴즈 진행 화면 (수정 없음)
const QuizMiddle = ({
  question,
  questionIndex,
  onNextQuestion,
  selectedAnswer,
  setSelectedAnswer,
}) => {
  const progressPercent = ((questionIndex + 1) / TOTAL_QUESTIONS) * 100;

  return (
    <div className="flex flex-col justify-center max-w-[768px] flex-1 w-full">
      <div className="px-4 text-center">
        <h1 className="text-gray-900 dark:text-gray-50 tracking-tight text-[28px] font-bold leading-tight pt-4 pb-1">
          경제 상식 퀴즈
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal pb-3">
          {questionIndex + 1}/{TOTAL_QUESTIONS} 문제
        </p>
      </div>
      <div className="flex flex-col gap-3 p-3">
        <div className="rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2 rounded-full bg-primary"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
      <div className="flex flex-col gap-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark p-6 mt-4">
        <div className="flex flex-wrap justify-between gap-3">
          <p className="text-gray-900 dark:text-gray-50 text-2xl font-bold leading-tight tracking-[-0.03em] min-w-72">
            {question.question}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            return (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                className={`flex w-full cursor-pointer items-center gap-4 rounded-lg border p-3 text-left transition-all ${
                  isSelected
                    ? "border-2 border-primary bg-primary/10"
                    : "border-gray-200 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? "border-2 border-primary bg-primary text-white"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {isSelected && (
                    <span className="material-symbols-outlined text-sm">
                      check
                    </span>
                  )}
                </span>
                <span className="text-base font-medium text-gray-800 dark:text-gray-200">
                  {option}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-4">
          <button
            onClick={onNextQuestion}
            disabled={selectedAnswer === null}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-bold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-gray-300 dark:disabled:bg-gray-600"
          >
            <span>
              {questionIndex === TOTAL_QUESTIONS - 1 ? "결과 보기" : "다음"}
            </span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. 퀴즈 완료 화면 (등급 로직 수정)
const QuizEnd = ({ score, setHasTested }) => {
  const navigate = useNavigate();

  // [수정] 등급 분류 로직을 Profile.jsx와 유사하게 변경
  const getTierInfoFromResult = (resultScore) => {
    if (resultScore >= 10) {
      return {
        name: "숲",
        icon: "🌲",
        description: "경제 지식이 풍부하시네요!",
      };
    } else if (resultScore >= 7) {
      return {
        name: "나무",
        icon: "🌳",
        description: "경제의 기본기를 잘 갖추고 계세요!",
      };
    } else if (resultScore >= 4) {
      return {
        name: "새싹",
        icon: "🌱",
        description: "경제 상식에 대해 알아가고 계시군요!",
      };
    } else {
      return {
        name: "씨앗",
        icon: "🌰",
        description: "이제 막 경제 공부를 시작하셨네요!",
      };
    }
  };
  const tier = getTierInfoFromResult(score);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl text-center">
      <h1 className="text-[#111418] tracking-tight text-3xl sm:text-4xl font-bold leading-tight px-4 text-center pb-3 pt-6">
        테스트 완료!
      </h1>
      <p className="text-gray-600 text-base font-normal leading-normal pb-6 pt-1 px-4 text-center max-w-md">
        {TOTAL_QUESTIONS}개의 문제를 모두 완료했습니다.
      </p>
      <div className="w-full max-w-sm bg-white rounded-xl border border-gray-200 p-8 my-6 flex flex-col items-center">
        <p className="text-gray-500 text-sm font-medium">당신의 등급</p>
        <img
          alt={`${grade} 등급 아이콘`}
          className="w-24 h-24 mt-4 mb-2"
          src={icon} // [수정] 등급별 아이콘
        />
        <p className="text-2xl font-bold text-primary mt-2">{grade}</p>

        {/* [오류 수정] </BODY_TEXT> -> </p> 로 변경 */}
        <p className="text-gray-500 text-base font-medium mt-2">
          {tier.description}
        </p>

        <p className="text-gray-500 text-sm font-medium mt-4">
          ({score} / {TOTAL_QUESTIONS})
        </p>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex flex-col sm:flex-row flex-1 gap-3 px-4 py-3 max-w-[480px] justify-center">
          <button
            onClick={() => {
              setHasTested(true);
              navigate("/profile");
            }}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#f0f2f4] text-[#111418] text-base font-bold leading-normal tracking-[0.015em] grow"
          >
            <span className="truncate">마이페이지</span>
          </button>
          <button
            onClick={() => {
              setHasTested(true);
              navigate("/main");
            }}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] grow"
          >
            <span className="truncate">학습 시작하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 메인 퀴즈 컴포넌트 ---
// (수정 없음)
const LevelTest = ({ quizQuestions, setHasTested }) => {
  const [quizState, setQuizState] = useState("start"); // 'start', 'middle', 'end'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleStartQuiz = () => {
    setQuizState("middle");
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizState("end");
    }
  };

  const renderQuizState = () => {
    switch (quizState) {
      case "start":
        return <QuizStart onStartQuiz={handleStartQuiz} />;
      case "middle":
        return (
          <QuizMiddle
            question={quizQuestions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            onNextQuestion={handleNextQuestion}
          />
        );
      case "end":
        return <QuizEnd setHasTested={setHasTested} score={score} />;
      default:
        return <QuizStart onStartQuiz={handleStartQuiz} />;
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-50 dark:bg-background-dark">
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {renderQuizState()}
      </main>
    </div>
  );
};

export default LevelTest;
