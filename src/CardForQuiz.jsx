import "./CardForQuiz.css";

function CardForQuiz({
  quiz,
  hasQuiz,
  oxAnswer,
  mcAnswer,
  quizReady,
  handleGenerateQuiz,
  handleOxAnswer,
  handleMcAnswer,
}) {
  const oxIsCorrect = oxAnswer !== null && quiz.ox.answer === oxAnswer;
  const mcIsCorrect = mcAnswer !== null && quiz.mc.answer === mcAnswer;

  return (
    <>
      {hasQuiz && (
        <div className="card-page quiz-page quiz-intro-page">
          <div className="card-quiz-section">
            <h3 className="card-quiz-heading">퀴즈 생성하기</h3>
            <p className="card-quiz-question">
              요약을 읽고 아래 버튼을 눌러 퀴즈를 시작해보세요.
            </p>
            <button
              className="generate-quiz-button"
              onClick={handleGenerateQuiz}
              disabled={quizReady}
            >
              {quizReady ? "퀴즈가 준비되었습니다" : "퀴즈 생성하기"}
            </button>
          </div>
        </div>
      )}
      {quizReady && hasQuiz && (
        <>
          <div className="card-page quiz-page">
            <div className="card-quiz-section">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-widest uppercase">
                OX 퀴즈
              </h3>
              <p className="text-[#111418] dark:text-white text-xl md:text-2xl font-bold leading-tight tracking-[-0.015em] max-w-2xl mx-auto">
                {quiz.ox.question}
              </p>
              <div className="quiz-options flex gap-8 mt-10 ">
                <button class="group flex flex-1 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-24 p-5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 transition-all duration-200">
                  <span class="flex items-center gap-4">
                    <span class="material-symbols-outlined text-4xl text-green-600 dark:text-green-400">
                      radio_button_unchecked
                    </span>
                    <span class="truncate text-[#111418] dark:text-gray-200 text-xl font-bold leading-normal">
                      O
                    </span>
                  </span>
                </button>
                <button class="group flex flex-1 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-24 p-5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200">
                  <span class="flex items-center gap-4">
                    <span class="material-symbols-outlined text-4xl text-red-600 dark:text-red-400">
                      close
                    </span>
                    <span class="truncate text-[#111418] dark:text-gray-200 text-xl font-bold leading-normal">
                      X
                    </span>
                  </span>
                </button>
              </div>
            </div>

            {oxAnswer !== null && (
              <div
                className={`quiz-feedback ${
                  oxIsCorrect ? "correct" : "incorrect"
                }`}
              >
                {oxIsCorrect ? "정답입니다!" : "오답입니다!"}
              </div>
            )}
          </div>
          <div className="card-page quiz-page">
            <div className="card-quiz-section">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-widest uppercase">
                4지선다
              </h3>
              <p className="text-[#111418] dark:text-white text-xl md:text-2xl font-bold leading-tight tracking-[-0.015em] max-w-2xl mx-auto-quiz-question">
                {quiz.mc.question}
              </p>
              <div className="card-mc-options">
                {quiz.mc.options.map((option, index) => (
                  <button
                    key={index}
                    className={`card-mc-option ${
                      mcAnswer === option ? "selected" : ""
                    } flex min-w-[84px] cursor-pointer items-center justify-start overflow-hidden rounded-lg border bg-primary/10 p-4 text-left text-base font-medium transition-all h-full`}
                    onClick={() => handleMcAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {mcAnswer !== null && (
                <div
                  className={`quiz-feedback ${
                    mcIsCorrect ? "correct" : "incorrect"
                  }`}
                >
                  {mcIsCorrect ? "정답입니다!" : "오답입니다!"}
                  <p className="mc-explanation">{quiz.mc.explanation}</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CardForQuiz;
