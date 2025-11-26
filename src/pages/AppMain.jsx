import { useState, useEffect } from "react";
import Card from "../components/Card.jsx";
import "../styles/AppMain.css";
import { useNewsStore } from "../store/newsStore.js";
import image_1 from "../assets/newsImage-1.jpg";
import image_2 from "../assets/newsImage-2.jpg";
import image_3 from "../assets/newsImage-3.jpg";

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

function AppMain({ onQuizCorrect }) {
  const selectedNewsGroup = useNewsStore((state) => state.selectedNewsGroup);
  // [개선] useMemo 대신 간단한 변수 할당 사용
  const cards =
    Array.isArray(selectedNewsGroup) && selectedNewsGroup.length > 0
      ? selectedNewsGroup
      : null;

  // console.log(selectedNewsGroup);
  const totalCards = cards?.length || 0;
  const [currentPage, setCurrentPage] = useState(0);

  const imageList = {
    0: image_1,
    1: image_2,
    2: image_3,
  };

  // [추가] 요일을 계산하는 로직
  const getDayOfWeek = (dateString) => {
    if (!dateString) return "";
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[new Date(dateString).getDay()];
  };

  // [추가] 뉴스 그룹이 변경될 때 currentPage를 0으로 리셋합니다.
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedNewsGroup]);

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
    <div className="main-container flex flex-col items-center justify-between w-full h-full relative overflow-hidden">
      <div className="date-indicator p-[10px_20px] shadow-[0_6px_20px_rgba(0,0,0,0.08)] flex items-baseline gap-[6px]  rounded-[999px] mt-3 mb-[15px]">
        <span className="cards-date font-bold">
          {selectedNewsGroup[0].date}
        </span>
        {/* [수정] 요일을 동적으로 표시합니다. */}
        <span className="cards-day text-blue-500 font-bold">
          {getDayOfWeek(selectedNewsGroup[0].date)}요일
        </span>
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
            {selectedNewsGroup
              .filter(
                (report) => report.summaries && report.summaries.length > 0
              )
              .map((report, index) => {
                return (
                  <div key={report.id} className={getCardClass(index)}>
                    <Card
                      title={report.summaries[0].title}
                      imageUrl={imageList[index]}
                      summary={report.summaries[0].content}
                      terms={report.summaries[0].terms}
                      originalUrl={report.summaries[0].article.url}
                      author={report.summaries[0].article.author}
                      quizId={report.summaries[0].id}
                      onQuizCorrect={onQuizCorrect}
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
