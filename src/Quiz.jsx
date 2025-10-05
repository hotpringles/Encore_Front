import React, { useState } from 'react';
import { reportData } from './data';
import './Quiz.css';
import Card from './Card'; // Card ì»´í¬?ŒíŠ¸ë¥?import ?©ë‹ˆ??

function Quiz() {
    const [userAnswers, setUserAnswers] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    // ?¬ëŸ¬ ?¬ì?? ë‹¤ ?´ì¦ˆ???µë?ê³??œì¶œ ?íƒœë¥?ê´€ë¦¬í•˜???íƒœ
    const [mcqAnswers, setMcqAnswers] = useState({});

    const handleAnswer = (questionId, answer) => {
        setUserAnswers({
            ...userAnswers,
            [questionId]: answer,
        });
        setSubmitted(false); // ?ˆë¡œ???µë???? íƒ?˜ë©´ ì±„ì  ê²°ê³¼ ?¨ê¸°ê¸?
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? reportData.length - 1 : prevIndex - 1));
        setSubmitted(false); // ?´ì¦ˆë¥??˜ê¸°ë©?ì±„ì  ê²°ê³¼ ?¨ê¸°ê¸?
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex === reportData.length - 1 ? 0 : prevIndex + 1));
        setSubmitted(false); // ?´ì¦ˆë¥??˜ê¸°ë©?ì±„ì  ê²°ê³¼ ?¨ê¸°ê¸?
    };

    // --- ?¬ì?? ë‹¤ ?´ì¦ˆ ?¸ë“¤??---
    const handleOptionSelect = (questionId, option) => {
        setMcqAnswers(prev => ({
            ...prev,
            [questionId]: {
                ...prev[questionId],
                selectedOption: option,
                isSubmitted: false, // ?ˆë¡œ??? íƒ ???¼ë“œë°??¨ê?
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
            <h2 className="quiz-title">ê²½ì œ ë¦¬í¬??OX ?´ì¦ˆ</h2>
            <div className="quiz-carousel">
                <button onClick={handlePrev} className="carousel-arrow prev-arrow">&lt;</button>
                <div className="quiz-content-area">
                    {/* ?ë‹¨: ?´ìŠ¤ ë¦¬í¬??ì¹´ë“œ */}
                    <Card
                        key={currentQuizItem.id}
                        title={currentQuizItem.title}
                        description={currentQuizItem.description}
                        summary={currentQuizItem.summary}
                        imageUrl={currentQuizItem.imageUrl}
                        viewType="quiz" // ?´ì¦ˆ ?˜ì´ì§€??variant ?„ë‹¬
                    />                    
                </div>
                <button onClick={handleNext} className="carousel-arrow next-arrow">&gt;</button>
            </div>

            {/* --- ?¬ì?? ë‹¤ ?´ì¦ˆ ?¹ì…˜ --- */}
            <div className="mcq-container">
                <h2 className="quiz-title">ê¸ˆìœµ ?ì‹ ?´ì¦ˆ</h2>
                {/* O/X ?´ì¦ˆ */}
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
                    {/* ?¼ë“œë°??ì—­: ë²„íŠ¼ ?ëŠ” ê²°ê³¼ ë©”ì‹œì§€ë¥??œì‹œ?©ë‹ˆ?? */}
                    <div className="quiz-feedback-section">
                        {submitted && userAnswer !== undefined ? (
                            <div className={`quiz-result ${isCorrect ? 'correct' : 'incorrect'}`}>
                                {isCorrect ? '?•ë‹µ?…ë‹ˆ??' : '?¤ë‹µ?…ë‹ˆ??'}
                            </div>
                        ) : (
                            <div className="quiz-submit-section">
                                <button onClick={handleSubmit} className="submit-button">ì±„ì ?˜ê¸°</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* ?¬ì?? ë‹¤ ?´ì¦ˆ */}
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
                                {currentMcqAnswer.selectedOption === currentQuizItem.mcq.answer ? '?•ë‹µ?…ë‹ˆ??' : '?¤ë‹µ?…ë‹ˆ??'}
                                <p className="mcq-explanation">{currentQuizItem.mcq.explanation}</p>
                            </div>
                        ) : (
                            <button onClick={() => handleMcqSubmit(currentQuizItem.mcq.id)} className="submit-button" disabled={!currentMcqAnswer.selectedOption}>
                                ?•ë‹µ ?•ì¸
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quiz;
