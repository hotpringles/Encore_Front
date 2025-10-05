import React, { useState } from 'react';
import { reportData } from './data';
import './Quiz.css';
import Card from './Card'; // Card 컴포?�트�?import ?�니??

function Quiz() {
    const [userAnswers, setUserAnswers] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    // ?�러 ?��??�다 ?�즈???��?�??�출 ?�태�?관리하???�태
    const [mcqAnswers, setMcqAnswers] = useState({});

    const handleAnswer = (questionId, answer) => {
        setUserAnswers({
            ...userAnswers,
            [questionId]: answer,
        });
        setSubmitted(false); // ?�로???��????�택?�면 채점 결과 ?�기�?
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? reportData.length - 1 : prevIndex - 1));
        setSubmitted(false); // ?�즈�??�기�?채점 결과 ?�기�?
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex === reportData.length - 1 ? 0 : prevIndex + 1));
        setSubmitted(false); // ?�즈�??�기�?채점 결과 ?�기�?
    };

    // --- ?��??�다 ?�즈 ?�들??---
    const handleOptionSelect = (questionId, option) => {
        setMcqAnswers(prev => ({
            ...prev,
            [questionId]: {
                ...prev[questionId],
                selectedOption: option,
                isSubmitted: false, // ?�로???�택 ???�드�??��?
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
            <h2 className="quiz-title">경제 리포??OX ?�즈</h2>
            <div className="quiz-carousel">
                <button onClick={handlePrev} className="carousel-arrow prev-arrow">&lt;</button>
                <div className="quiz-content-area">
                    {/* ?�단: ?�스 리포??카드 */}
                    <Card
                        key={currentQuizItem.id}
                        title={currentQuizItem.title}
                        description={currentQuizItem.description}
                        summary={currentQuizItem.summary}
                        imageUrl={currentQuizItem.imageUrl}
                        viewType="quiz" // ?�즈 ?�이지??variant ?�달
                    />                    
                </div>
                <button onClick={handleNext} className="carousel-arrow next-arrow">&gt;</button>
            </div>

            {/* --- ?��??�다 ?�즈 ?�션 --- */}
            <div className="mcq-container">
                <h2 className="quiz-title">금융 ?�식 ?�즈</h2>
                {/* O/X ?�즈 */}
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
                    {/* ?�드�??�역: 버튼 ?�는 결과 메시지�??�시?�니?? */}
                    <div className="quiz-feedback-section">
                        {submitted && userAnswer !== undefined ? (
                            <div className={`quiz-result ${isCorrect ? 'correct' : 'incorrect'}`}>
                                {isCorrect ? '?�답?�니??' : '?�답?�니??'}
                            </div>
                        ) : (
                            <div className="quiz-submit-section">
                                <button onClick={handleSubmit} className="submit-button">채점?�기</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* ?��??�다 ?�즈 */}
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
                                {currentMcqAnswer.selectedOption === currentQuizItem.mcq.answer ? '?�답?�니??' : '?�답?�니??'}
                                <p className="mcq-explanation">{currentQuizItem.mcq.explanation}</p>
                            </div>
                        ) : (
                            <button onClick={() => handleMcqSubmit(currentQuizItem.mcq.id)} className="submit-button" disabled={!currentMcqAnswer.selectedOption}>
                                ?�답 ?�인
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quiz;
