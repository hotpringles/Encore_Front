import { useState } from 'react';
import Card from './Card';
import './MainContent.css';
import { reportData } from './data'; // 데이터 가져오기

function MainContent() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? reportData.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex === reportData.length - 1 ? 0 : prevIndex + 1));
    };

    const currentNewsItem = reportData[currentIndex];

    return (
        <div className="main-content-wrapper">
            <h2 className="main-content-title">경제 리포트</h2>
            <div className="card-carousel">
                <button onClick={handlePrev} className="carousel-arrow prev-arrow">
                    &lt;
                </button>
                <Card
                    key={currentNewsItem.id}
                    title={currentNewsItem.title}
                    description={currentNewsItem.description}
                    summary={currentNewsItem.summary} // summary prop 추가
                    imageUrl={currentNewsItem.imageUrl}
                />
                <button onClick={handleNext} className="carousel-arrow next-arrow">
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default MainContent;