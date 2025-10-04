import React from 'react';
import './Card.css';

/**
 * 퀴즈 페이지에서 사용될 뉴스 카드 컴포넌트입니다.
 * 이미지, 제목, 요약을 한 페이지에 모두 표시합니다.
 * @param {object} props - title, summary, imageUrl을 포함하는 객체
 */
function QuizCard({ title, summary, imageUrl }) {
    return (
        <div className="quiz-card-container">
            <img src={imageUrl} alt={title} className="quiz-card-image" />
            <div className="quiz-card-content">
                <h3 className="quiz-card-title">{title}</h3>
                {/* 툴팁 기능이 있는 요약 내용을 HTML로 렌더링합니다. */}
                <div
                    className="quiz-card-summary"
                    dangerouslySetInnerHTML={{ __html: summary }}
                />
            </div>
        </div>
    );
}

export default QuizCard;