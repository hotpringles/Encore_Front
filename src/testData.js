// 테스트 페이지용 OX 경제 문제 20개
// 각 항목은 기존 카드 틀(title, summary, imageUrl)을 그대로 사용하고,
// 채점 등을 위해 ox.answer(불린)과 explanation을 추가했습니다.
export const testData = [
  {
    id: 1,
    title: '문제 1. 명목 vs 실질 GDP',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "<span class="keyword-tooltip">명목GDP<span class="tooltip-text">현재 시장가격으로 산출된 GDP</span></span>는 물가 변동을 제거한 지표다."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q1',
    ox: { answer: false, explanation: '물가 변동을 제거한 지표는 실질GDP입니다.' },
  },
  {
    id: 2,
    title: '문제 2. 인플레이션과 구매력',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "<span class="keyword-tooltip">인플레이션<span class="tooltip-text">일반적인 물가의 지속 상승</span></span>이 지속되면 가계의 <span class="keyword-tooltip">실질구매력<span class="tooltip-text">소득으로 구매 가능한 양</span></span>은 감소한다."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q2',
    ox: { answer: true, explanation: '물가 상승은 동일 소득의 구매력을 떨어뜨립니다.' },
  },
  {
    id: 3,
    title: '문제 3. 기준금리와 환율',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "한 나라의 <span class="keyword-tooltip">기준금리<span class="tooltip-text">중앙은행 정책금리</span></span>가 인상되면 자국 통화는 강세 요인을 얻는다(기타 조건 동일)."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q3',
    ox: { answer: true, explanation: '금리 인상은 자금 유입 유인으로 통화 강세 압력입니다.' },
  },
  {
    id: 4,
    title: '문제 4. 채권 가격과 금리',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "시장금리가 상승하면 기존 <span class="keyword-tooltip">채권가격<span class="tooltip-text">채권이 거래되는 가격</span></span>은 상승한다."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q4',
    ox: { answer: false, explanation: '금리와 채권가격은 반대로 움직입니다.' },
  },
  {
    id: 5,
    title: '문제 5. 양적완화(QE)',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "<span class="keyword-tooltip">양적완화<span class="tooltip-text">중앙은행의 대규모 자산 매입</span></span>는 시중 유동성을 축소하는 정책이다."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q5',
    ox: { answer: false, explanation: 'QE는 유동성을 확대하는 비전통적 통화정책입니다.' },
  },
  {
    id: 6,
    title: '문제 6. 경상수지와 통화가치',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "<span class="keyword-tooltip">경상수지<span class="tooltip-text">대외거래 수지</span></span> 흑자는 일반적으로 자국 통화 가치에 상승 압력을 준다."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q6',
    ox: { answer: true, explanation: '흑자는 외화 유입 증가로 통화 강세 요인입니다.' },
  },
  {
    id: 7,
    title: '문제 7. 근원물가의 해석',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "<span class="keyword-tooltip">근원물가<span class="tooltip-text">변동성 큰 품목 제외 물가</span></span>는 기저 물가 흐름을 파악하는 데 유용하다."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q7',
    ox: { answer: true, explanation: '일시적 변동을 제거해 추세 파악에 유리합니다.' },
  },
  {
    id: 8,
    title: '문제 8. 총수요 증가의 효과',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "단기적으로 총수요가 증가하면 산출과 물가는 모두 상승한다(우상향 AS)."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q8',
    ox: { answer: true, explanation: 'AD 우측 이동은 단기 산출·물가 상승을 유발합니다.' },
  },
  {
    id: 9,
    title: '문제 9. 환율상승과 무역',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "원/달러 환율 상승(원화 약세)은 일반적으로 수출에는 유리, 수입에는 불리하다."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q9',
    ox: { answer: true, explanation: '약세는 수출 가격경쟁력 개선, 수입 비용 상승 요인입니다.' },
  },
  {
    id: 10,
    title: '문제 10. PER 해석',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "<span class="keyword-tooltip">PER<span class="tooltip-text">주가수익비율</span></span>이 낮을수록(기타 조건 동일) 저평가 가능성이 높다고 해석될 수 있다."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q10',
    ox: { answer: true, explanation: '낮은 PER은 이익 대비 주가가 낮음을 시사합니다.' },
  },
  {
    id: 11,
    title: '문제 11. PBR 1 미만',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "<span class="keyword-tooltip">PBR<span class="tooltip-text">주가순자산비율</span></span>이 1 미만이면 주가가 장부가치보다 낮게 평가된 것을 시사한다."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q11',
    ox: { answer: true, explanation: 'PBR<1은 장부가 대비 할인 거래를 의미합니다.' },
  },
  {
    id: 12,
    title: '문제 12. 베타 1.5',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "종목의 <span class="keyword-tooltip">베타<span class="tooltip-text">시장 민감도</span></span>가 1.5이면 시장 변동의 1.5배 정도로 움직일 가능성이 높다."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q12',
    ox: { answer: true, explanation: '베타>1은 시장 대비 고변동 특성입니다.' },
  },
  {
    id: 13,
    title: '문제 13. 분산투자와 위험',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "분산투자는 <span class="keyword-tooltip">체계적 위험<span class="tooltip-text">시장 전반 위험</span></span>을 제거한다."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q13',
    ox: { answer: false, explanation: '분산투자는 비체계적 위험을 낮추며, 체계적 위험은 남습니다.' },
  },
  {
    id: 14,
    title: '문제 14. 선물 ETF의 롤오버',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "<span class="keyword-tooltip">선물 ETF<span class="tooltip-text">선물로 간접 추종</span></span>는 롤오버 비용 등으로 추적 오차가 발생할 수 있다."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q14',
    ox: { answer: true, explanation: '만기 교체 시 비용/컨탱고 영향으로 괴리가 생길 수 있습니다.' },
  },
  {
    id: 15,
    title: '문제 15. DXY와 신흥국 통화',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "<span class="keyword-tooltip">달러 인덱스(DXY)<span class="tooltip-text">달러의 상대가치 지수</span></span> 상승은 일반적으로 신흥국 통화에 강세 압력이다."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q15',
    ox: { answer: false, explanation: '보통 약세 압력(자본 유출·차입비용 상승)입니다.' },
  },
  {
    id: 16,
    title: '문제 16. 스태그플레이션',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "<span class="keyword-tooltip">스태그플레이션<span class="tooltip-text">경기침체+물가상승</span></span>에서는 물가와 경기의 상충으로 정책 선택이 어려워진다."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q16',
    ox: { answer: true, explanation: '물가 안정과 경기 부양 목표가 충돌합니다.' },
  },
  {
    id: 17,
    title: '문제 17. 유동성 함정',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "<span class="keyword-tooltip">유동성 함정<span class="tooltip-text">초저금리에서도 통화정책이 비효율</span></span>에서 금리 인하는 수요 부양에 한계가 크다."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q17',
    ox: { answer: true, explanation: '유동성 선호 증가로 통화정책 파급이 약해집니다.' },
  },
  {
    id: 18,
    title: '문제 18. 금리 기대와 채권수익률',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "기준금리 인상 기대는 일반적으로 <span class="keyword-tooltip">국고채 수익률<span class="tooltip-text">시장금리 지표</span></span>에 하락 압력을 준다."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q18',
    ox: { answer: false, explanation: '인상 기대는 수익률(시장금리)에 상승 압력을 줍니다.' },
  },
  {
    id: 19,
    title: '문제 19. DSR 규제와 시장',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "<span class="keyword-tooltip">DSR<span class="tooltip-text">총부채원리금상환비율</span></span> 규제가 강화되면 단기적으로 대출 수요가 위축되고 거래가 감소할 수 있다."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q19',
    ox: { answer: true, explanation: '대출 한도 축소로 수요가 둔화되는 경향이 있습니다.' },
  },
  {
    id: 20,
    title: '문제 20. 재정적자와 금리',
    summary:
      `다음 진술이 맞으면 O, 틀리면 X를 선택하세요. <br/><br/>
      "재정적자 확대에 따른 국채 발행 증가는 일반적으로 금리 상승, 채권가격 하락 압력이다."`,
    imageUrl: 'https://via.placeholder.com/1200x800.png?text=Q20',
    ox: { answer: true, explanation: '공급 증가로 수익률 상승(가격 하락) 압력이 생깁니다.' },
  },
];

