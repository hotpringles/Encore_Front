import "../styles/CardForNews.css";
import KeywordTooltip from "./KeywordTooltip";

function CardForNews({ title, imageUrl, summary, originalUrl, terms }) {
  const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const wrapKeywordsWithComponent = (
    summary,
    terms,
    Wrapper = KeywordTooltip
  ) => {
    if (!summary || !Array.isArray(terms) || terms.length === 0) return summary;

    // "금리|물가|환율" 이런 패턴 생성
    // [수정] terms 배열의 각 객체에서 'term' 속성을 추출하여 패턴을 만듭니다.
    const pattern = terms
      .filter((t) => t.term && t.term.trim() !== "") // [개선] 빈 키워드 필터링
      .map((t) => escapeRegExp(t.term))
      .join("|");
    const regex = new RegExp(`(${pattern})`, "gi"); // 대소문자 무시하고 싶으면 gi

    const parts = summary.split(regex); // [일반문자열, 매칭된단어, 일반문자열, 매칭된단어, ...]

    return parts.map((part, index) => {
      if (!part) return null;

      // [수정] part가 terms 배열의 'term' 중 하나와 일치하는지 찾습니다.
      const matchedTermObject = terms.find(
        (t) => t.term.toLowerCase() === part.toLowerCase()
      );

      if (matchedTermObject) {
        return (
          // [수정] Wrapper(KeywordTooltip)에 term과 definition을 props로 전달합니다.
          <Wrapper
            key={index}
            term={matchedTermObject.term}
            definition={matchedTermObject.meaning}
          >
            {part}
          </Wrapper>
        );
      }

      // 키워드가 아니면 그냥 문자열로 반환
      return <span key={index}>{part}</span>;
    });
  };
  return (
    <>
      <div className="card-page">
        <img className="card-image" src={imageUrl} alt={title} />
        <h1 className="card-title">{title}</h1>
      </div>
      <div className="card-page">
        <div className="card-summary">
          <p>{wrapKeywordsWithComponent(summary, terms, KeywordTooltip)}</p>
          <p className="text-end">
            출처: <a>{originalUrl}</a>
          </p>
        </div>
      </div>
    </>
  );
}
export default CardForNews;
