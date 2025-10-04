import React, { useMemo, useState } from "react";
import { testData } from "./testData";
import TestCard from "./TestCard";
import "./MainCarousel.css";

function TestCarousel() {
  const totalCards = testData.length; // question count
  const totalSlides = totalCards + 2; // start + questions + submit

  const [currentIndex, setCurrentIndex] = useState(0); // 0=start, 1..N=questions, N+1=submit
  const [answers, setAnswers] = useState(() => Array(totalCards).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrev = () =>
    setCurrentIndex((p) => (p - 1 + totalSlides) % totalSlides);
  const handleNext = () => setCurrentIndex((p) => (p + 1) % totalSlides);

  const getCardClass = (index) => {
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    const nextIndex = (currentIndex + 1) % totalSlides;
    if (index === currentIndex) return "card-item active";
    if (index === prevIndex) return "card-item prev";
    if (index === nextIndex) return "card-item next";
    return "card-item";
  };

  const allAnswered = useMemo(
    () => answers.every((a) => a !== null),
    [answers]
  );
  const score = useMemo(
    () =>
      answers.reduce(
        (acc, a, i) => acc + (a === testData[i].ox?.answer ? 1 : 0),
        0
      ),
    [answers]
  );

  const onAnswer = (qIndex, choice) => {
    setAnswers((prev) => {
      if (prev[qIndex] !== null) return prev;
      const next = prev.slice();
      next[qIndex] = choice;
      return next;
    });
  };

  return (
    <div className="main-carousel-container">
      {currentIndex > 1 && (
        <button onClick={handlePrev} className="main-carousel-arrow prev">
          &lt;
        </button>
      )}
      <div className="carousel-viewport">
        <div className="cards-wrapper">
          {Array.from({ length: totalSlides }).map((_, slideIndex) => {
            // Start card
            if (slideIndex === 0) {
              return (
                <div key="start" className={getCardClass(slideIndex)}>
                  <div className="test-card">
                    <div className="test-card-content">
                      <div className="test-start-screen">
                        <div className="test-start-desc">
                          {totalCards}개의 문제를 통해 사용자의 경제 수준을
                          파악하려고 합니다. 준비가 완료되면 Test 시작 버튼을
                          눌러주세요.
                        </div>
                        <button
                          className="test-start-btn"
                          disabled={isLoading}
                          onClick={() => {
                            setIsLoading(true);
                            setTimeout(() => {
                              setCurrentIndex(1);
                              setIsLoading(false);
                            }, 700);
                          }}
                        >
                          {isLoading ? "로딩 중..." : "테스트 시작"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Submit card
            if (slideIndex === totalSlides - 1) {
              return (
                <div key="submit" className={getCardClass(slideIndex)}>
                  <div className="test-card">
                    <div className="test-card-content" style={{ gap: 12 }}>
                      {/* <div className="test-result">제출하기</div> */}
                      {!allAnswered && (
                        <div style={{ color: "#666" }}>
                          모든 문항에 답하면 제출할 수 있어요.
                        </div>
                      )}
                      {!submitted && (
                        <button
                          className="test-submit-btn"
                          onClick={() => setSubmitted(true)}
                          disabled={!allAnswered}
                        >
                          제출하기
                        </button>
                      )}
                      {submitted && (
                        <div className="test-result">
                          점수: {score} / {totalCards}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            // Question slides (1..N)
            const qIndex = slideIndex - 1;
            const q = testData[qIndex];
            const selected = answers[qIndex];
            const isCorrect =
              selected === null ? null : selected === q.ox?.answer;
            return (
              <div key={q.id} className={getCardClass(slideIndex)}>
                <TestCard
                  summary={q.summary}
                  ox={q.ox}
                  index={qIndex}
                  total={totalCards}
                  selected={selected}
                  isCorrect={isCorrect}
                  onAnswer={(choice) => onAnswer(qIndex, choice)}
                />
              </div>
            );
          })}
        </div>
      </div>
      {currentIndex !== 0 && currentIndex !== totalSlides - 1 && (
        <button onClick={handleNext} className="main-carousel-arrow next">
          &gt;
        </button>
      )}
    </div>
  );
}

export default TestCarousel;
