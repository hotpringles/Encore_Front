import { useState } from 'react';
import Card from './Card';
import './MainContent.css';

function MainContent() {
    // 예시 뉴스 데이터
    const newsItems = [
        {
            id: 1,
            title: '글로벌 시장, 긍정적 경제 지표에 힘입어 상승',
            description: '세계 주식 시장이 강력한 제조업 데이터 발표 이후 상당한 상승세를 보였습니다.',
            imageUrl: 'https://via.placeholder.com/400x225.png?text=Market+Rally'
        },
        {
            id: 2,
            title: '기술 대기업, 새로운 AI 기반 비서 공개',
            description: '개인 생산성을 혁신적으로 변화시킬 새로운 인공지능 기술의 돌파구가 발표되었습니다.',
            imageUrl: 'https://via.placeholder.com/400x225.png?text=New+AI'
        },
        {
            id: 3,
            title: '지속 가능한 에너지 솔루션, 투자 유치 성공',
            description: '한 클린 에너지 스타트업이 재생 가능 에너지 기술 발전을 위해 대규모 펀딩을 확보했습니다.',
            imageUrl: 'https://via.placeholder.com/400x225.png?text=Green+Energy'
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? newsItems.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1));
    };

    const currentNewsItem = newsItems[currentIndex];

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