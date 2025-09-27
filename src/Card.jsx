import React from 'react';
import './Card.css';

function Card({ title, description, imageUrl, summary, variant }) {
    // 퀴즈 페이지용 카드 렌더링
    if (variant === 'quiz') {
        return (
            <div className="report-card-in-quiz">
                <div className="card-image-container">
                    <img src={imageUrl} alt={title} className="card-image" />
                </div>
                <div className="card-content">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-description">{summary}</p>
                </div>
            </div>
        );
    }

    // 기본 리포트 카드 렌더링
    return (
        <div className="report-card">
            <div className="card-page">
                <img src={imageUrl} alt={title} className="card-image" />
                <h3 className="card-title">{title}</h3>
            </div>
            <div className="card-page">
                <div className="card-summary-content">{summary}</div>
            </div>
        </div>
    );
}

export default Card;