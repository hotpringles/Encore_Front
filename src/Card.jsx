import React, { useState, useRef, useEffect } from 'react';
import './Card.css';

function Card({ title, description, imageUrl, summary }) {
    const [isSummaryVisible, setIsSummaryVisible] = useState(false); // 초기 상태: 요약 숨김
    const cardContentRef = useRef(null);

    const handleScroll = () => {
        if (cardContentRef.current) {
            const { scrollTop } = cardContentRef.current;
            // 스크롤을 아래로 내리면 요약본 보이기
            if (scrollTop > 20) {
                setIsSummaryVisible(true);
            // 스크롤을 다시 맨 위로 올리면 요약본 숨기기
            } else if (scrollTop === 0) {
                setIsSummaryVisible(false);
            }
        }
    };

    // 카드가 변경될 때 확장 상태 및 스크롤 위치 초기화
    useEffect(() => {
        setIsSummaryVisible(false); // 새 카드는 항상 요약본이 숨겨진 상태로 시작
        if (cardContentRef.current) {
            cardContentRef.current.scrollTop = 0;
        }
    }, [title]); // title이 바뀔 때마다 초기화

    return (
        <div className="report-card">
            <img src={imageUrl} alt={title} className="card-image" />
            <div className="card-content" ref={cardContentRef} onScroll={handleScroll}>
                <div className="content-wrapper">
                    <h3 className="card-title">{title}</h3>

                    {/* 스크롤 안내 문구 */}
                    {!isSummaryVisible && <div className="scroll-prompt">아래로 스크롤하여 요약 보기 ▼</div>}

                    {/* 요약 내용 */}
                    <p className={`card-summary-desc ${isSummaryVisible ? 'visible' : ''}`}>{summary}</p>

                    {/* 스크롤을 가능하게 만드는 스페이서 */}
                    <div className="scroll-spacer"></div>
                </div>
            </div>
        </div>
    );
}

export default Card;