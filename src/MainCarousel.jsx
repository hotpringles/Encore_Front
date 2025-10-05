import React, { useState } from 'react';
import { reportData } from './data';
import Card from './Card';
import './MainCarousel.css';

function MainCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalCards = reportData.length;

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + totalCards) % totalCards);
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % totalCards);
    };

    const getCardClass = (index) => {
        const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
        const nextIndex = (currentIndex + 1) % totalCards;

        if (index === currentIndex) {
            return 'card-item active';
        } else if (index === prevIndex) {
            return 'card-item prev';
        } else if (index === nextIndex) {
            return 'card-item next';
        }
        return 'card-item'; // 나머지 카드는 기본 클래스
    };

    return (
        <div className="main-carousel-container">
            <button onClick={handlePrev} className="main-carousel-arrow prev">&lt;</button>
            <div className="carousel-viewport">
                <div 
                    className="cards-wrapper"
                >
                    {reportData.map((report, index) => (
                        <div key={report.id} className={getCardClass(index)}>
                            <Card
                                title={report.title}
                                summary={report.summary}
                                imageUrl={report.imageUrl}
                                quiz={report.quiz}
                                mcq={report.mcq}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={handleNext} className="main-carousel-arrow next">&gt;</button>
        </div>
    );
}

export default MainCarousel;
