import React from 'react';
import './Card.css';

function Card({ title, description, imageUrl, summary }) {
    return (
        <div className="report-card">
            {/* 페이지 1: 표지 (이미지 + 제목) */}
            <div className="card-page">
                <img src={imageUrl} alt={title} className="card-image" />
                <h3 className="card-title">{title}</h3>
            </div>
            {/* 페이지 2: 요약 내용 */}
            <div className="card-page">
                <div className="card-summary-content">{summary}</div>
            </div>
        </div>
    );
}

export default Card;