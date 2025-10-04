import React from 'react';
import './Card.css';
import QuizCard from './QuizCard'; // 퀴즈 페이지용 카드를 import 합니다.

/**
 * 개별 뉴스 리포트 카드를 렌더링하는 컴포넌트입니다.
 * viewType prop에 따라 다른 스타일의 카드를 렌더링합니다.
 * @param {object} props - title, summary, imageUrl, viewType 등을 포함하는 객체
 */
function Card({ title, summary, imageUrl, viewType }) {
    // 퀴즈 페이지 뷰 타입일 경우 QuizCard를 렌더링합니다.
    if (viewType === 'quiz') {
        return <QuizCard title={title} summary={summary} imageUrl={imageUrl} />;
    }

    // 데이터가 없으면 아무것도 렌더링하지 않습니다.
    if (!title || !summary || !imageUrl) {
        return null;
    }

    // 기본 뷰 타입 (메인 캐러셀용)
    return (
        <div className="report-card">
            <div className="card-page">
                <img src={imageUrl} alt={title} className="card-image" />
                <h2 className="card-title">{title}</h2>
            </div>
            <div className="card-page">
                {/* 'dangerouslySetInnerHTML'을 사용하여 summary에 포함된 HTML 태그를 렌더링합니다. */}
                <div className="card-summary-content" dangerouslySetInnerHTML={{ __html: summary }} />
            </div>
            {/* TODO: 퀴즈 및 객관식 문제 페이지 추가 */}
        </div>
    );
}

export default Card;