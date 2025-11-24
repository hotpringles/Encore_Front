import { useState, useId } from "react";
import "../styles/CardForQuiz.css";

// [추가] 정답/오답 피드백을 위한 헬퍼 컴포넌트
function FeedbackBlock({ isCorrect, message, explanation }) {
  const bgColor = isCorrect
    ? "bg-green-100 dark:bg-green-900/50"
    : "bg-red-100 dark:bg-red-900/50";
  const textColor = isCorrect
    ? "text-green-700 dark:text-green-300"
    : "text-red-700 dark:text-red-300";
  const borderColor = isCorrect
    ? "border-green-300 dark:border-green-700"
    : "border-red-300 dark:border-red-700";

  return (
    <div
      className={`mt-6 p-4 rounded-lg border ${bgColor} ${borderColor} ${textColor}`}
    >
      <p className="font-bold text-lg">{message}</p>
      {explanation && (
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          {explanation}
        </p>
      )}
    </div>
  );
}

// "제출하기" 버튼 공통 스타일
const submitButtonStyles =
  "w-full mt-6 px-6 py-3 border-none rounded-lg bg-primary text-white font-bold cursor-pointer transition-all duration-200 hover:bg-primary/15 disabled:bg-gray-400 disabled:cursor-not-allowed";
const primaryColorStyle = { backgroundColor: "#1b73ee" };

function OxQuizSection({ sectionId, quiz, onAnswered }) {
  const [localSelection, setLocalSelection] = useState(null);
  const [submittedAnswer, setSubmittedAnswer] = useState(null);

  // const handleKeyDownOnRadio = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     e.currentTarget.form.requestSubmit();
  //   }
  // };

  if (!quiz) return null;

  const [isCorrect, setIsCorrect] = useState(
    submittedAnswer !== null && quiz.correct_answer === submittedAnswer
  );
  // const isCorrect = quiz.correct_answer === submittedAnswer;

  return (
    <div className="card-page quiz-page">
      <div className="flex flex-col justify-center h-full p-6 sm:p-10 gap-6">
        <div className="w-full">
          <div className="flex flex-col items-stretch justify-start rounded-xl bg-white dark:bg-slate-800 p-6 sm:p-8 shadow-sm">
            <p className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-xl">
              (OX) {quiz.question}
            </p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (submittedAnswer !== null) return;
            setSubmittedAnswer(localSelection);
            const correct = quiz.correct_answer === localSelection;
            setIsCorrect(correct);
            onAnswered?.(correct);
          }}
        >
          <div className="flex flex-col gap-3">
            {[
              { label: "O (예)", value: true },
              { label: "X (아니오)", value: false },
            ].map((item, index) => (
              <div className="relative" key={index}>
                <input
                  className="custom-radio peer absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 border-2 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-0 focus:ring-offset-0"
                  id={`ox-${sectionId}-${index}`}
                  name={`quiz-ox-${sectionId}`}
                  type="radio"
                  checked={localSelection === item.value}
                  onChange={() => {
                    setLocalSelection(item.value);
                  }}
                  disabled={submittedAnswer !== null}
                />
                <label
                  className="flex cursor-pointer items-center gap-4 rounded-lg border border-solid border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 pl-11 transition-colors duration-150"
                  htmlFor={`ox-${sectionId}-${index}`}
                >
                  <div className="flex grow flex-col">
                    <p className="text-sm font-medium leading-normal text-slate-800 dark:text-slate-200">
                      {item.label}
                    </p>
                  </div>
                </label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            disabled={submittedAnswer !== null || localSelection === null}
            className={submitButtonStyles}
            style={primaryColorStyle}
          >
            제출하기
          </button>
        </form>
        {submittedAnswer !== null && (
          <FeedbackBlock
            isCorrect={isCorrect}
            message={isCorrect ? "정답입니다!" : "오답입니다!"}
            explanation={quiz.explanation}
          />
        )}
      </div>
    </div>
  );
}

function McQuizSection({ sectionId, quiz, onAnswered }) {
  const [localSelection, setLocalSelection] = useState(null);
  const [submittedAnswer, setSubmittedAnswer] = useState(null);

  // const handleKeyDownOnRadio = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     e.currentTarget.form.requestSubmit();
  //   }
  // };

  if (!quiz) return null;

  const [isCorrect, setIsCorrect] = useState(
    submittedAnswer !== null && quiz.answer === submittedAnswer
  );

  return (
    <div className="card-page quiz-page">
      <div className="flex flex-col justify-center h-full p-6 sm:p-10 gap-6">
        <div className="w-full">
          <div className="flex flex-col items-stretch justify-start rounded-xl bg-white dark:bg-slate-800 p-6 sm:p-8 shadow-sm">
            <p className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-xl">
              {quiz.question}
            </p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (localSelection === null || submittedAnswer !== null) return;
            setSubmittedAnswer(localSelection);
            const correct = quiz.options[localSelection.order - 1].is_correct;
            setIsCorrect(correct);
            onAnswered?.(correct);
          }}
        >
          <div className="flex flex-col gap-3">
            {quiz.options.map((option, index) => (
              <div className="relative" key={index}>
                <input
                  className="custom-radio peer absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 border-2 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-0 focus:ring-offset-0"
                  id={`mc-${sectionId}-${index}`}
                  name={`quiz-mc-${sectionId}`}
                  type="radio"
                  value={option}
                  checked={localSelection === option}
                  onChange={() => {
                    setLocalSelection(option);
                  }}
                  disabled={submittedAnswer !== null}
                />
                <label
                  className="flex cursor-pointer items-center gap-4 rounded-lg border border-solid border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 pl-11 transition-colors duration-150"
                  htmlFor={`mc-${sectionId}-${index}`}
                >
                  <div className="flex grow flex-col">
                    <p className="text-sm font-medium leading-normal text-slate-800 dark:text-slate-200">
                      {option.text}
                    </p>
                  </div>
                </label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            disabled={submittedAnswer !== null || localSelection === null}
            className={submitButtonStyles}
            style={primaryColorStyle}
          >
            제출하기
          </button>
        </form>
        {submittedAnswer !== null && (
          <FeedbackBlock
            isCorrect={isCorrect}
            message={isCorrect ? "정답입니다!" : "오답입니다!"}
            explanation={quiz.explanation}
          />
        )}
      </div>
    </div>
  );
}

function SaQuizSection({ sectionId, quiz, onAnswered }) {
  const [inputValue, setInputValue] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState(null);

  if (!quiz) return null;

  const [isCorrect, setIsCorrect] = useState(
    submittedAnswer === quiz.correct_answer
  );

  return (
    <div className="card-page quiz-page">
      <div className="flex flex-col justify-center h-full p-6 sm:p-10 gap-8">
        <div className="flex flex-col gap-8 rounded-xl bg-white dark:bg-gray-800/50 shadow-sm p-6 sm:p-10">
          <h1 className="text-[#111418] dark:text-white tracking-tight text-[22px] sm:text-[28px] font-bold leading-tight text-center">
            {quiz.question}
          </h1>
          <form
            className="flex w-full flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (submittedAnswer !== null) return;
              if (!inputValue.trim()) return;
              const normalizedInput = inputValue.trim();
              const correct =
                normalizedInput.toLowerCase() ===
                quiz.correct_answer.toLowerCase();
              const result = {
                text: normalizedInput,
                isCorrect: correct,
              };
              setSubmittedAnswer(result);
              setIsCorrect(correct);
              onAnswered?.(correct);
            }}
          >
            <label className="sr-only" htmlFor="user-answer">
              Answer
            </label>
            <textarea
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] dark:border-gray-700 bg-background-light dark:bg-background-dark min-h-32 placeholder:text-[#617289] dark:placeholder:text-gray-500 p-[15px] font-normal leading-normal disabled:opacity-70 text-xl"
              id={`user-answer-${sectionId}`}
              placeholder="여기에 답을 입력하세요..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={submittedAnswer !== null}
            ></textarea>
            <button
              type="submit"
              disabled={submittedAnswer !== null || !inputValue.trim()}
              className={submitButtonStyles}
              style={primaryColorStyle}
            >
              제출하기
            </button>
          </form>
        </div>
        {submittedAnswer !== null && (
          <FeedbackBlock
            isCorrect={isCorrect}
            message={
              isCorrect
                ? "정답입니다!"
                : `오답입니다! (정답: ${quiz.correct_answer})`
            }
            explanation={quiz.explanation}
          />
        )}
      </div>
    </div>
  );
}

function CardForQuiz({
  hasQuiz,
  quizReady,
  onQuizCorrect,
  handleGenerateQuiz,
  quizContents,
}) {
  // 퀴즈 고유 ID (라디오 버튼 name 속성에 사용)
  // [개선] React 18+ 환경에서는 useId 사용을 권장합니다.
  const uniqueId = useId();

  return (
    <>
      {/* === 퀴즈 생성 인트로 페이지 === */}
      {hasQuiz && (
        <div className="card-page quiz-page">
          <div className="flex flex-col justify-center items-center h-full p-6 text-center gap-4">
            <h3 className="text-2xl md:text-3xl font-bold text-[#111418] dark:text-white">
              퀴즈 생성하기
            </h3>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-md">
              요약을 읽고 아래 버튼을 눌러 퀴즈를 시작해보세요.
            </p>
            <button
              className="px-6 py-3 mt-4 border-none rounded-lg bg-[#111] dark:bg-gray-100 text-white dark:text-gray-900 font-bold cursor-pointer transition-all duration-200 hover:bg-gray-700 dark:hover:bg-gray-300 disabled:bg-gray-400 disabled:cursor-default"
              onClick={handleGenerateQuiz}
              disabled={quizReady}
            >
              {quizReady ? "퀴즈가 준비되었습니다" : "퀴즈 생성하기"}
            </button>

            {/* === [수정] 경고 문구 추가 === */}
            {quizReady && (
              <div className="mt-6 text-center w-full max-w-sm">
                <p className="text-lg font-medium text-primary dark:text-blue-400">
                  아래로 스크롤하여 퀴즈를 시작하세요.
                </p>
                <div className="mt-4 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/40 border border-yellow-200 dark:border-yellow-700">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300 leading-relaxed">
                    <span className="font-bold">주의:</span> 퀴즈 결과는 즉시
                    경험치에 반영되며,
                    <br />
                    제출한 답은 수정할 수 없습니다.
                  </p>
                </div>
              </div>
            )}
            {/* === [수정] 끝 === */}
          </div>
        </div>
      )}

      {/* 퀴즈가 준비되었을 때 렌더링 */}
      {quizReady && hasQuiz && (
        <>
          {quizContents.map((entry, index) => {
            if (!entry) return null;
            const sectionKey = `${index}`;
            const sectionId = `${uniqueId}-${index}`;
            const handleAnswered = (isCorrect) => {
              if (isCorrect) {
                onQuizCorrect?.(15);
              }
            };

            if (entry.quiz_type === "OX") {
              return (
                <OxQuizSection
                  key={sectionKey}
                  sectionId={sectionId}
                  quiz={entry}
                  onAnswered={handleAnswered}
                />
              );
            }
            if (entry.quiz_type === "MC4") {
              return (
                <McQuizSection
                  key={sectionKey}
                  sectionId={sectionId}
                  quiz={entry}
                  onAnswered={handleAnswered}
                />
              );
            }
            if (entry.quiz_type === "SC") {
              return (
                <SaQuizSection
                  key={sectionKey}
                  sectionId={sectionId}
                  quiz={entry}
                  onAnswered={handleAnswered}
                />
              );
            }
            return null;
          })}
        </>
      )}
    </>
  );
}

export default CardForQuiz;
