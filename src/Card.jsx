import React, { useState } from 'react';
import './Card.css';
import QuizCard from './QuizCard';

/**
 * 개별 뉴스 리포트 카드를 렌더링하는 컴포넌트입니다.
 * 기본 카드에는 요약과 함께 퀴즈 생성 기능이 포함됩니다.
 */
function Card({ title, summary, imageUrl, viewType, quiz, mcq }) {
    if (viewType === 'quiz') {
        return <QuizCard title={title} summary={summary} imageUrl={imageUrl} />;
    }

    if (!title || !summary || !imageUrl) {
        return null;
    }

    const hasQuiz = Boolean(quiz && mcq);
    const [quizReady, setQuizReady] = useState(false);
    const [oxAnswer, setOxAnswer] = useState(null);
    const [mcqChoice, setMcqChoice] = useState(null);

    const handleGenerateQuiz = () => {
        if (!hasQuiz) return;
        setQuizReady(true);
        setOxAnswer(null);
        setMcqChoice(null);
    };

    const handleOxAnswer = (choice) => {
        setOxAnswer(choice);
    };

    const handleMcqChoice = (option) => {
        setMcqChoice(option);
    };

    const oxIsCorrect = quiz ? oxAnswer === quiz.answer : null;
    const mcqIsCorrect = mcq ? mcqChoice === mcq.answer : null;

    return (
        <div className="report-card">
            <div className="card-page">
                <img src={imageUrl} alt={title} className="card-image" />
                <h2 className="card-title">{title}</h2>
            </div>
            <div className="card-page">
                <div className="card-summary-content" dangerouslySetInnerHTML={{ __html: summary }} />
            </div>
            {hasQuiz && (
                <div className="card-page quiz-page quiz-intro-page">
                    <div className="card-quiz-section">
                        <h3 className="card-quiz-heading">퀴즈 생성하기</h3>
                        <p className="card-quiz-question">요약을 읽고 아래 버튼을 눌러 퀴즈를 시작해보세요.</p>
                        <button
                            className="generate-quiz-button"
                            onClick={handleGenerateQuiz}
                            disabled={quizReady}
                        >
                            {quizReady ? '퀴즈가 준비되었습니다' : '퀴즈 생성하기'}
                        </button>
                    </div>
                </div>
            )}
            {quizReady && hasQuiz && (
                <>
                    <div className="card-page quiz-page">
                        <div className="card-quiz-section">
                            <h3 className="card-quiz-heading">OX 퀴즈</h3>
                            <p className="card-quiz-question">{quiz.question}</p>
                            <div className="card-quiz-options">
                                <button
                                    className={`card-quiz-option ${oxAnswer === true ? 'selected' : ''}`}
                                    onClick={() => handleOxAnswer(true)}
                                >
                                    O
                                </button>
                                <button
                                    className={`card-quiz-option ${oxAnswer === false ? 'selected' : ''}`}
                                    onClick={() => handleOxAnswer(false)}
                                >
                                    X
                                </button>
                            </div>
                            {oxAnswer !== null && (
                                <div className={`card-quiz-feedback ${oxIsCorrect ? 'correct' : 'incorrect'}`}>
                                    {oxIsCorrect ? '정답입니다!' : '오답입니다!'}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="card-page quiz-page">
                        <div className="card-quiz-section">
                            <h3 className="card-quiz-heading">4지선다</h3>
                            <p className="card-quiz-question">{mcq.question}</p>
                            <div className="card-mcq-options">
                                {mcq.options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`card-mcq-option ${mcqChoice === option ? 'selected' : ''}`}
                                        onClick={() => handleMcqChoice(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            {mcqChoice !== null && (
                                <div className={`card-quiz-feedback ${mcqIsCorrect ? 'correct' : 'incorrect'}`}>
                                    {mcqIsCorrect ? '정답입니다!' : '오답입니다!'}
                                    <p className="card-quiz-explanation">{mcq.explanation}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Card;
