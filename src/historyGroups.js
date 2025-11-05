import { reportData } from "./data";

const placeholderImage = (label) =>
  `https://via.placeholder.com/1200x800.png?text=${encodeURIComponent(label)}`;

const baseSummary = (headline) =>
  `<p>${headline}</p><p>주요 지표와 시장 반응을 간단히 정리했습니다.</p>`;

const createHistoryItems = (dateKey, entries) =>
  entries.map((entry, index) => ({
    id: `${dateKey}-${index + 1}`,
    title: entry.title,
    summary: baseSummary(entry.highlight),
    imageUrl: placeholderImage(`${dateKey}-${index + 1}`),
    quiz: entry.quiz ?? null,
    mcq: entry.mcq ?? null,
  }));

export const historyGroups = [
  {
    id: "day-2024-10-19",
    dayLabel: "토요일",
    dateLabel: "2024.10.19",
    items: reportData,
  },
  {
    id: "day-2024-10-18",
    dayLabel: "금요일",
    dateLabel: "2024.10.18",
    items: createHistoryItems("2024-10-18", [
      {
        title: "미국 국채 금리 하락",
        highlight:
          "연준 위원 발언 이후 국채 금리가 하루 만에 10bp 하락했습니다.",
        quiz: {
          question: "연준 위원 발언 이후 미국 국채 금리는 상승했다.",
          answer: false,
        },
        mcq: {
          id: "mcq-2024-10-18-1",
          question: "기사에서 언급된 미국 국채 금리 움직임은?",
          options: ["10bp 하락", "변동 없음", "30bp 급등", "연중 최고치 경신"],
          answer: "10bp 하락",
          explanation:
            "본문에 하루 만에 10bp 하락했다고 명시되어 있습니다.",
        },
      },
      {
        title: "AI 섹터 자금 유입 확대",
        highlight:
          "메가캡 AI 기업 실적 호조로 관련 ETF에 자금이 유입됐습니다.",
        quiz: {
          question:
            "메가캡 AI 기업 실적 호조는 관련 ETF 자금 유입과 무관했다.",
          answer: false,
        },
        mcq: {
          id: "mcq-2024-10-18-2",
          question: "자금 유입이 확대된 분야는?",
          options: ["AI 섹터", "전통 에너지", "항공", "소매"],
          answer: "AI 섹터",
          explanation: "관련 ETF로 자금이 유입됐다는 내용입니다.",
        },
      },
      {
        title: "원자재 가격 진정세",
        highlight:
          "브렌트유가 배럴당 80달러 아래로 내려가며 인플레이션 우려가 완화됐습니다.",
        quiz: {
          question: "브렌트유 가격이 배럴당 80달러를 상회하며 급등했다.",
          answer: false,
        },
        mcq: {
          id: "mcq-2024-10-18-3",
          question: "기사 속 브렌트유 수준에 대한 설명으로 맞는 것은?",
          options: ["80달러 아래", "120달러 돌파", "100달러 근처", "60달러 아래"],
          answer: "80달러 아래",
          explanation: "본문에 80달러 아래로 내려갔다고 되어 있습니다.",
        },
      },
    ]),
  },
  {
    id: "day-2024-10-17",
    dayLabel: "목요일",
    dateLabel: "2024.10.17",
    items: createHistoryItems("2024-10-17", [
      {
        title: "코스피 외국인 순매수 지속",
        highlight: "외국인 투자자가 4거래일 연속 순매수를 기록했습니다.",
      },
      {
        title: "전기차 배터리 업계 협력 강화",
        highlight: "국내 배터리 3사가 공동 기술 개발을 발표했습니다.",
      },
      {
        title: "스타트업 IPO 모멘텀 회복",
        highlight: "핀테크 유니콘의 성공적인 상장이 투자 심리를 개선했습니다.",
      },
    ]),
  },
  {
    id: "day-2024-10-16",
    dayLabel: "수요일",
    dateLabel: "2024.10.16",
    items: createHistoryItems("2024-10-16", [
      {
        title: "중국 경기부양책 발표",
        highlight: "추가 부양책 소식에 아시아 증시가 동반 상승했습니다.",
      },
      {
        title: "국내 은행 실적 프리뷰",
        highlight: "이자이익 증가 전망으로 은행주가 강세를 보였습니다.",
      },
      {
        title: "바이오 업계 파이프라인 점검",
        highlight: "임상 데이터 발표를 앞둔 바이오 기업에 관심이 집중됐습니다.",
      },
    ]),
  },
  {
    id: "day-2024-10-15",
    dayLabel: "화요일",
    dateLabel: "2024.10.15",
    items: createHistoryItems("2024-10-15", [
      {
        title: "한국 수출 회복세",
        highlight: "9월 수출이 전년 대비 6% 증가하며 회복 흐름이 이어졌습니다.",
      },
      {
        title: "부동산 시장 브리핑",
        highlight: "주요 지역의 전세 수급이 안정화되며 시장이 안정을 찾고 있습니다.",
      },
      {
        title: "핀테크 규제 샌드박스 확대",
        highlight: "정부가 신규 샌드박스 과제를 발표하며 혁신 서비스 출시가 기대됩니다.",
      },
    ]),
  },
  {
    id: "day-2024-10-14",
    dayLabel: "월요일",
    dateLabel: "2024.10.14",
    items: createHistoryItems("2024-10-14", [
      {
        title: "주간 증시 전망",
        highlight: "증권사들이 이번 주 코스피 밴드를 2450~2520으로 제시했습니다.",
      },
      {
        title: "에너지 시장 이슈",
        highlight: "OPEC+ 감산 유지에도 국제유가가 안정세를 보였습니다.",
      },
      {
        title: "스타트업 투자 동향",
        highlight: "국내 벤처투자 규모가 3분기 누적 4조원을 돌파했습니다.",
      },
    ]),
  },
  {
    id: "day-2024-10-13",
    dayLabel: "일요일",
    dateLabel: "2024.10.13",
    items: createHistoryItems("2024-10-13", [
      {
        title: "글로벌 ESG 이슈",
        highlight: "기관 투자자들이 ESG 성과 공개 강화를 요구하고 있습니다.",
      },
      {
        title: "해외 주식 이슈",
        highlight: "미국 빅테크의 신규 서비스 발표 기대감이 커졌습니다.",
      },
      {
        title: "리서치 하이라이트",
        highlight: "증권사 리포트에서 소재·부품 기업이 다수 추천됐습니다.",
      },
    ]),
  },
  {
    id: "day-2024-10-12",
    dayLabel: "토요일",
    dateLabel: "2024.10.12",
    items: createHistoryItems("2024-10-12", [
      {
        title: "주말 체크포인트",
        highlight: "10월 FOMC 의사록 공개를 앞두고 시장이 경계감을 나타냈습니다.",
      },
      {
        title: "디지털 자산 시장",
        highlight: "비트코인이 다시 6만 달러를 돌파하며 투자심리가 개선됐습니다.",
      },
      {
        title: "관광산업 회복",
        highlight: "연휴 효과로 관광 관련 지표가 개선됐습니다.",
      },
    ]),
  },
  {
    id: "day-2024-10-11",
    dayLabel: "금요일",
    dateLabel: "2024.10.11",
    items: createHistoryItems("2024-10-11", [
      {
        title: "미국 CPI 리뷰",
        highlight: "헤드라인 물가가 예상치를 하회하며 긴축 완화 기대가 커졌습니다.",
      },
      {
        title: "국내 리츠 시장",
        highlight: "오피스 공실률이 하락하며 배당 매력이 부각됐습니다.",
      },
      {
        title: "친환경 모빌리티",
        highlight: "전동화 전환 전략 가속화로 글로벌 공급망이 재편되고 있습니다.",
      },
    ]),
  },
  {
    id: "day-2024-10-10",
    dayLabel: "목요일",
    dateLabel: "2024.10.10",
    items: createHistoryItems("2024-10-10", [
      {
        title: "제조업 PMI 개선",
        highlight: "9월 PMI가 50선을 회복하며 확장 국면에 진입했습니다.",
      },
      {
        title: "해외 채권 자금 흐름",
        highlight: "위험선호가 개선되며 신흥국 채권으로 자금이 유입됐습니다.",
      },
      {
        title: "스타트업 채용 동향",
        highlight: "기술 인재 수요가 늘어나며 채용 공고가 증가했습니다.",
      },
    ]),
  },
];
