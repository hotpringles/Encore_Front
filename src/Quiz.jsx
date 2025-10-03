import React, { useState } from 'react';
import { reportData } from './data';
import './Quiz.css';
import Card from './Card'; // Card 컴포넌트를 import 합니다.

function Quiz() {
    const [userAnswers, setUserAnswers] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    // 여러 사지선다 퀴즈의 답변과 제출 상태를 관리하는 상태
    const [mcqAnswers, setMcqAnswers] = useState({});

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

    // --- 사지선다 퀴즈 핸들러 ---
    const handleOptionSelect = (questionId, option) => {
        setMcqAnswers(prev => ({
            ...prev,
            [questionId]: {
                ...prev[questionId],
                selectedOption: option,
                isSubmitted: false, // 새로운 선택 시 피드백 숨김
            }
        }));
    };

    const handleMcqSubmit = (questionId) => {
        setMcqAnswers(prev => ({
            ...prev,
            [questionId]: { ...prev[questionId], isSubmitted: true }
        }));
    };
    // ---------------------------

    const currentQuizItem = reportData[currentIndex];
    const userAnswer = userAnswers[currentQuizItem.id];
    const isCorrect = userAnswer === currentQuizItem.quiz.answer;
    const currentMcqAnswer = mcqAnswers[currentQuizItem.mcq.id] || {};

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
                        summary={currentQuizItem.summary}
                        imageUrl={currentQuizItem.imageUrl}
                        variant="quiz" // 퀴즈 페이지용 variant 전달
                    />                    
                </div>
                <button onClick={handleNext} className="carousel-arrow next-arrow">&gt;</button>
            </div>

            {/* --- 사지선다 퀴즈 섹션 --- */}
            <div className="mcq-container">
                <h2 className="quiz-title">금융 상식 퀴즈</h2>
                {/* O/X 퀴즈 */}
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

                {/* 사지선다 퀴즈 */}
                <div className="mcq-card">
                    <p className="mcq-question">{currentQuizItem.mcq.question}</p>
                    <div className="mcq-options">
                        {currentQuizItem.mcq.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(currentQuizItem.mcq.id, option)}
                                className={`mcq-option-button ${currentMcqAnswer.selectedOption === option ? 'selected' : ''}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <div className="mcq-feedback-section">
                        {currentMcqAnswer.isSubmitted ? (
                            <div className={`mcq-result ${currentMcqAnswer.selectedOption === currentQuizItem.mcq.answer ? 'correct' : 'incorrect'}`}>
                                {currentMcqAnswer.selectedOption === currentQuizItem.mcq.answer ? '정답입니다!' : '오답입니다.'}
                                <p className="mcq-explanation">{currentQuizItem.mcq.explanation}</p>
                            </div>
                        ) : (
                            <button onClick={() => handleMcqSubmit(currentQuizItem.mcq.id)} className="submit-button" disabled={!currentMcqAnswer.selectedOption}>
                                정답 확인
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quiz;