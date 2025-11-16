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
  "w-full mt-6 px-6 py-3 border-none rounded-lg bg-primary text-white font-bold cursor-pointer transition-all duration-200 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed";
const primaryColorStyle = { backgroundColor: "#1b73ee" };

function CardForQuiz({
  hasQuiz,
  oxQuiz,
  mcQuiz,
  saQuiz,
  oxAnswer,
  mcAnswer,
  quizReady,
  saInput, // Card.jsx에서 saInput으로 전달하므로 맞춤
  saSubmittedAnswer,
  handleGenerateQuiz,
  handleOxAnswer,
  handleMcAnswer,
  handleSaInputChange,
  handleSaSubmit,
}) {
  const oxIsCorrect = oxAnswer !== null && oxQuiz.answer === oxAnswer;
  const mcIsCorrect = mcAnswer !== null && mcQuiz.answer === mcAnswer;
  const saIsCorrect = saSubmittedAnswer !== null && saSubmittedAnswer.isCorrect;

  // 퀴즈 고유 ID (라디오 버튼 name 속성에 사용)
  // [개선] React 18+ 환경에서는 useId 사용을 권장합니다.
  const uniqueId = useId();
  // 제출 전 선택한 답을 저장하는 로컬 상태
  const [localOxSelection, setLocalOxSelection] = useState(null);
  const [localMcSelection, setLocalMcSelection] = useState(null);

  // Enter 키로 폼을 제출하는 공통 핸들러
  const handleKeyDownOnRadio = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.form.requestSubmit();
    }
  };

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
          {/* === OX 퀴즈 페이지 === */}
          <div className="card-page quiz-page">
            <div className="flex flex-col justify-center h-full p-6 sm:p-10 gap-6">
              {/* Question Box */}
              <div className="w-full">
                <div className="flex flex-col items-stretch justify-start rounded-xl bg-white dark:bg-slate-800 p-6 sm:p-8 shadow-sm">
                  <p className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-xl">
                    (OX) {oxQuiz.question}
                  </p>
                </div>
              </div>

              {/* 폼(Form)으로 감싸기 */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (localOxSelection !== null) {
                    handleOxAnswer(localOxSelection); // 제출 시 부모 핸들러 호출
                    setLocalOxSelection(null); // [개선] 제출 후 선택 초기화
                  }
                }}
              >
                {/* Options */}
                <div className="flex flex-col gap-3">
                  {[
                    { label: "O (예)", value: true },
                    { label: "X (아니오)", value: false },
                  ].map((item, index) => (
                    <div className="relative" key={index}>
                      <input
                        className="custom-radio peer absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 border-2 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-0 focus:ring-offset-0"
                        id={`ox-${uniqueId}-${index}`}
                        name={`quiz-ox-${uniqueId}`}
                        type="radio"
                        checked={localOxSelection === item.value}
                        onChange={() => {
                          setLocalOxSelection(item.value);
                        }}
                        disabled={oxAnswer !== null} // 한 번이라도 제출했으면 비활성화
                        onKeyDown={handleKeyDownOnRadio}
                      />
                      <label
                        className="flex cursor-pointer items-center gap-4 rounded-lg border border-solid border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 pl-11 transition-colors duration-150"
                        htmlFor={`ox-${uniqueId}-${index}`}
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

                {/* 제출하기 버튼 */}
                <button
                  type="submit"
                  disabled={oxAnswer !== null || localOxSelection === null}
                  className={submitButtonStyles}
                  style={primaryColorStyle}
                >
                  제출하기
                </button>
              </form>

              {/* Feedback */}
              {oxAnswer !== null && (
                <FeedbackBlock
                  isCorrect={oxIsCorrect}
                  message={oxIsCorrect ? "정답입니다!" : "오답입니다!"}
                />
              )}
            </div>
          </div>

          {/* === 4지선다 퀴즈 페이지 === */}
          <div className="card-page quiz-page">
            <div className="flex flex-col justify-center h-full p-6 sm:p-10 gap-6">
              {/* Question Box */}
              <div className="w-full">
                <div className="flex flex-col items-stretch justify-start rounded-xl bg-white dark:bg-slate-800 p-6 sm:p-8 shadow-sm">
                  <p className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-xl">
                    {mcQuiz.question}
                  </p>
                </div>
              </div>

              {/* 폼(Form)으로 감싸기 */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (localMcSelection !== null) {
                    handleMcAnswer(localMcSelection); // 제출 시 부모 핸들러 호출
                    setLocalMcSelection(null); // [개선] 제출 후 선택 초기화
                  }
                }}
              >
                {/* Options */}
                <div className="flex flex-col gap-3">
                  {mcQuiz.options.map((option, index) => (
                    <div className="relative" key={index}>
                      <input
                        className="custom-radio peer absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 border-2 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-0 focus:ring-offset-0"
                        id={`mc-${uniqueId}-${index}`}
                        name={`quiz-mc-${uniqueId}`}
                        type="radio"
                        value={option}
                        checked={localMcSelection === option}
                        onChange={() => {
                          setLocalMcSelection(option);
                        }}
                        disabled={mcAnswer !== null} // 한 번이라도 제출했으면 비활성화
                        onKeyDown={handleKeyDownOnRadio}
                      />
                      <label
                        className="flex cursor-pointer items-center gap-4 rounded-lg border border-solid border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 pl-11 transition-colors duration-150"
                        htmlFor={`mc-${uniqueId}-${index}`}
                      >
                        <div className="flex grow flex-col">
                          <p className="text-sm font-medium leading-normal text-slate-800 dark:text-slate-200">
                            {option}
                          </p>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>

                {/* 제출하기 버튼 */}
                <button
                  type="submit"
                  disabled={mcAnswer !== null || localMcSelection === null}
                  className={submitButtonStyles}
                  style={primaryColorStyle}
                >
                  제출하기
                </button>
              </form>

              {/* Feedback */}
              {mcAnswer !== null && (
                <FeedbackBlock
                  isCorrect={mcIsCorrect}
                  message={mcIsCorrect ? "정답입니다!" : "오답입니다!"}
                  explanation={mcQuiz.explanation}
                />
              )}
            </div>
          </div>

          {/* === 단답형 퀴즈 페이지 === */}
          {saQuiz && (
            <div className="card-page quiz-page">
              <div className="flex flex-col justify-center h-full p-6 sm:p-10 gap-8">
                {/* Question Box */}
                <div className="flex flex-col gap-8 rounded-xl bg-white dark:bg-gray-800/50 shadow-sm p-6 sm:p-10">
                  <h1 className="text-[#111418] dark:text-white tracking-tight text-[22px] sm:text-[28px] font-bold leading-tight text-center">
                    {saQuiz.question}
                  </h1>
                  {/* Answer Form */}
                  <form
                    className="flex w-full flex-col gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (saSubmittedAnswer === null && saInput.trim()) {
                        handleSaSubmit(e);
                      }
                    }}
                  >
                    <label className="sr-only" htmlFor="user-answer">
                      Answer
                    </label>
                    <textarea
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] dark:border-gray-700 bg-background-light dark:bg-background-dark min-h-32 placeholder:text-[#617289] dark:placeholder:text-gray-500 p-[15px] font-normal leading-normal disabled:opacity-70 text-xl"
                      id="user-answer"
                      placeholder="여기에 답을 입력하세요..."
                      value={saInput}
                      onChange={handleSaInputChange}
                      disabled={saSubmittedAnswer !== null} // 한 번이라도 제출했으면 비활성화
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          e.currentTarget.form.requestSubmit();
                        }
                      }}
                    ></textarea>
                    <button
                      type="submit"
                      disabled={saSubmittedAnswer !== null || !saInput.trim()}
                      className={submitButtonStyles}
                      style={primaryColorStyle}
                    >
                      제출하기
                    </button>
                  </form>
                </div>
                {/* Feedback */}
                {saSubmittedAnswer !== null && (
                  <FeedbackBlock
                    isCorrect={saIsCorrect}
                    message={
                      saIsCorrect
                        ? "정답입니다!"
                        : `오답입니다! (정답: ${saQuiz.answer})`
                    }
                    explanation={saQuiz.explanation}
                  />
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default CardForQuiz;
