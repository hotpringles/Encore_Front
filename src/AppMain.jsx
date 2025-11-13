import { useState, useMemo } from "react";
import Card from "./Card.jsx";
import "./AppMain.css";

function PageIndicator({ totalCards, currentPage }) {
  const dots = Array.from({ length: totalCards }, (_, index) => index);

  return (
    <div className="page-indicator mb-4">
      {dots.map((dotIndex) => {
        return (
          <span
            key={`dot-${dotIndex}`}
            className={`dot ${dotIndex == currentPage ? "active" : ""}`}
          ></span>
        );
      })}
    </div>
  );
}

function AppMain({ reports }) {
  const cards = useMemo(() => {
    if (Array.isArray(reports) && reports.length > 0) return reports;
    else return null;
  }, [reports]);

  const totalCards = cards?.length || 0;
  const [currentPage, setCurrentPage] = useState(0);
  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalCards) % totalCards);
  };
  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalCards);
  };

  const getCardClass = (index) => {
    const ACTIVE = "card-item active";
    const NONACTIVE = "card-item";
    if (totalCards <= 1) return ACTIVE;

    const prevPage = (currentPage - 1 + totalCards) % totalCards;
    const nextPage = (currentPage + 1) % totalCards;

    if (index === currentPage) return ACTIVE;

    if (index == prevPage) return NONACTIVE + " prev";
    if (index == currentPage) return ACTIVE;
    if (index == nextPage) return NONACTIVE + " next";

    return NONACTIVE;
  };

  if (totalCards === 0) {
    return (
      <div className="main-carousel-container">
        <div className="main-carousel-empty">표시할 카드가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="main-container flex flex-col items-center justify-between w-full h-full relative overflow-x-hidden">
      <div className="date-indicator p-[10px_20px] shadow-[0_6px_20px_rgba(0,0,0,0.08)] flex items-baseline gap-[6px]  rounded-[999px] mt-3 mb-[15px]">
        <span className="cards-date font-bold">2025.12.09</span>
        <span className="cards.day text-blue-500 font-bold">토요일</span>
      </div>
      <div className="main-reports flex items-center justify-center w-full relative">
        {totalCards > 1 && (
          <button
            onClick={handlePrev}
            className="main-arrow prev p-3 bg-white hover:bg-gray-100 text-gray-700 hover:text-blue-600 rounded-lg focus:outline-none
          transition-colors no-underline font-['Pretendard','Noto_Sans_KR',sans-serif] border-0 outline-none ring-0"
            aria-label="이전 카드"
          >
            &lt;
          </button>
        )}
        <div className="cards-viewport">
          <div className="cards-wrapper">
            {reports.map((report, index) => {
              return (
                <div key={report.id} className={getCardClass(index)}>
                  <Card
                    title={report.summaries.title}
                    imageUrl={report.summaries.article.imageUrl}
                    summary={report.summaries.content}
                    originalUrl={report.summaries.article.url}
                    author={report.summaries.article.author}
                    quiz={report.quiz}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {totalCards > 1 && (
          <button
            className="main-arrow next p-3 bg-white hover:bg-gray-100 text-gray-700 hover:text-blue-600 rounded-lg focus:outline-none
          transition-colors no-underline font-['Pretendard','Noto_Sans_KR',sans-serif] border-0 outline-none ring-0"
            onClick={handleNext}
            aria-label="이후 카드"
          >
            &gt;
          </button>
        )}
      </div>
      <PageIndicator totalCards={totalCards} currentPage={currentPage} />
    </div>
  );
}

export default AppMain;
