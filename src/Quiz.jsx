import React, { useState } from 'react';
import { reportData } from './data';
import './Quiz.css';
import Card from './Card'; // Card 컴포넌트를 import 합니다.

function Quiz() {
    const [userAnswers, setUserAnswers] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleAnswer = (questionId, answer) => {
        setUserAnswers({
            ...userAnswers,
            [questionId]: answer,
        });
        setSubmitted(false); // 새로운 답변을 선택하면 채점 결과 숨기기
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? reportData.length - 1 : prevIndex - 1));
        setSubmitted(false); // 퀴즈를 넘기면 채점 결과 숨기기
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex === reportData.length - 1 ? 0 : prevIndex + 1));
        setSubmitted(false); // 퀴즈를 넘기면 채점 결과 숨기기
    };

    const currentQuizItem = reportData[currentIndex];
    const userAnswer = userAnswers[currentQuizItem.id];
    const isCorrect = userAnswer === currentQuizItem.quiz.answer;

    return (
        <div className="quiz-container">
            <h2 className="quiz-title">경제 리포트 OX 퀴즈</h2>
            <div className="quiz-carousel">
                <button onClick={handlePrev} className="carousel-arrow prev-arrow">&lt;</button> 
                <div className="quiz-content-area">
                    {/* 상단: 뉴스 리포트 카드 */}
                    <Card
                        key={currentQuizItem.id}
                        title={currentQuizItem.title}
                        description={currentQuizItem.description}
                        summary={currentQuizItem.summary} // summary prop 추가
                        imageUrl={currentQuizItem.imageUrl}
                    />

                    {/* 하단: 퀴즈 섹션 */}
                    <div className="quiz-card">
                        <p className="quiz-question">{currentQuizItem.quiz.question}</p>
                        <div className="quiz-options">
                            <button
                                onClick={() => handleAnswer(currentQuizItem.id, true)}
                                className={`quiz-button ${userAnswer === true ? 'selected' : ''}`}
                            >
                                O
                            </button>
                            <button
                                onClick={() => handleAnswer(currentQuizItem.id, false)}
                                className={`quiz-button ${userAnswer === false ? 'selected' : ''}`}
                            >
                                X
                            </button>
                        </div>
                        {/* 피드백 영역: 버튼 또는 결과 메시지를 표시합니다. */}
                        <div className="quiz-feedback-section">
                            {submitted && userAnswer !== undefined ? (
                                <div className={`quiz-result ${isCorrect ? 'correct' : 'incorrect'}`}>
                                    {isCorrect ? '정답입니다!' : '오답입니다.'}
                                </div>
                            ) : (
                                <div className="quiz-submit-section">
                                    <button onClick={handleSubmit} className="submit-button">채점하기</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={handleNext} className="carousel-arrow next-arrow">&gt;</button>
            </div>
        </div>
    );
}

export default Quiz;