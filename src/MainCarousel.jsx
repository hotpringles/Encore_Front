import React, { useEffect, useMemo, useState } from 'react';
import { reportData } from './data';
import Card from './Card';
import './MainCarousel.css';

function DotIndicator ({totalCards, currentIndex}) {
        const dots = Array.from({length: totalCards}, (_, index) => index);
    
        return (<div className='page-indicator'>
                <div className='dot-container' aria-hidden="true">
                    {dots.map((dotIndex) => (
                        <span key={dotIndex}
                        className={`dot ${currentIndex === dotIndex ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>)
    }

function MainCarousel({ reports, activeGroup }) {
    const carouselData = useMemo(() => {
        if (Array.isArray(reports) && reports.length > 0) {
            return reports;
        }
        return reportData;
    }, [reports]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const totalCards = carouselData.length;

    useEffect(() => {
        setCurrentIndex(0);
    }, [carouselData]);

    const handlePrev = () => {
        if (totalCards === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalCards) % totalCards);
    };

    const handleNext = () => {
        if (totalCards === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
    };

    const getCardClass = (index) => {
        if (totalCards <= 1) {
            return 'card-item active';
        }

        const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
        const nextIndex = (currentIndex + 1) % totalCards;

        if (index === currentIndex) {
            return 'card-item active';
        }
        if (index === prevIndex) {
            return 'card-item prev';
        }
        if (index === nextIndex) {
            return 'card-item next';
        }
        return 'card-item';
    };

    if (totalCards === 0) {
        return (
            <div className="main-carousel-container">
                <div className="main-carousel-empty">표시할 카드가 없습니다.</div>
            </div>
        );
    }

    

    return (
        <div className="main-carousel-container">
            {activeGroup && (
                <div className="main-carousel-heading">
                    <span className="main-carousel-heading-date">{activeGroup.dateLabel}</span>
                    <span className="main-carousel-heading-day">{activeGroup.dayLabel}</span>
                </div>
            )}
            {totalCards > 1 && (
                <button onClick={handlePrev} className="main-carousel-arrow prev" aria-label="이전 카드">
                    &lt;
                </button>
            )}
            <div className="carousel-viewport">
                <div className="cards-wrapper">
                    {carouselData.map((report, index) => (
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
            <DotIndicator totalCards={totalCards} currentIndex={currentIndex} />
            {totalCards > 1 && (
                <button onClick={handleNext} className="main-carousel-arrow next" aria-label="다음 카드">
                    &gt;
                </button>
            )}
        </div>
    );
}

export default MainCarousel;
