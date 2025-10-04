// 뉴스 및 퀴즈 데이터
export const reportData = [
    {
        id: 1,
        title: '원·달러 환율 1400원 돌파… 심리적 저항선 뚫렸다',
        summary: `9월 25일 서울외환시장에서 
            <span class="keyword-tooltip">원·달러 환율<span class="tooltip-text">대한민국 원화와 미국 달러화 간의 교환 비율을 의미합니다.</span></span> 
            주간 종가가 1400.6원으로 마감하며 심리적 저항선(1400원)을 넘어섰고, 야간 종가는 1403.8원까지 올라 달러 강세가 확인됐다.
            <br/><br/>
            배경엔 9월 
            <span class="keyword-tooltip">FOMC<span class="tooltip-text">Federal Open Market Committee(연방공개시장위원회)의 약자로, 미국의 통화 정책을 결정하는 연방준비제도(연준) 내의 기구입니다.</span></span> 
            이후 
            <span class="keyword-tooltip">연준<span class="tooltip-text">Federal Reserve System(연방준비제도)의 약칭으로, 미국의 중앙은행 시스템입니다.</span></span>
            의 추가 인하 신중론과 파월 의장의 발언, 
            <span class="keyword-tooltip">달러인덱스(DXY)<span class="tooltip-text">주요 6개국 통화 대비 미국 달러의 가치를 나타내는 지표입니다.</span></span> 
            96→97후반 상승이 있으며, 미 연방정부 
            <span class="keyword-tooltip">셧다운<span class="tooltip-text">미국 연방정부 예산안이 처리되지 못해 정부 기관이 일시적으로 업무를 중단하는 상태를 말합니다.</span></span> 
            우려·영·프 재정 리스크·한·미 관세 협상 불확실성이 달러 선호를 키웠다.
            <br/><br/>
            전문가들은 단기 하락 전환은 쉽지 않다고 보되, 3분기 이후 미국 물가 둔화와 관세 협상 불확실성 완화 시 연말엔 1400원 아래로 내려갈 가능성을 제시했다.`,
        imageUrl: 'https://imgnews.pstatic.net/image/005/2025/09/26/2025092522310480633_1758807064_1758791917_20250926002009351.jpg?type=w860',
        quiz: {
            question: '세계 주식 시장은 긍정적 경제 지표에도 불구하고 하락했다.',
            answer: false // O: true, X: false
        },
        mcq: {
            id: 'mcq-1',
            question: '기사에서 언급된 원·달러 환율 상승의 주요 배경이 아닌 것은?',
            options: ['미 연준의 신중한 금리 인하 태도', '미 연방정부 셧다운 우려', '한국의 기준금리 인상', '유럽의 재정 리스크'],
            answer: '한국의 기준금리 인상',
            explanation: '기사에서는 달러 강세의 배경으로 미국 내 요인과 유럽의 리스크를 언급했지만, 한국의 기준금리 인상에 대해서는 언급하지 않았습니다.'
        }
    },
    {
        id: 2,
        title: '일주일 새 20% 폭락한 솔라나…10월 현물 ETF 승인이 \'반등 키\'[특징코인]',
        summary: `최근 일주일 새 
            <span class="keyword-tooltip">솔라나(SOL)<span class="tooltip-text">높은 처리 속도와 낮은 거래 비용을 특징으로 하는 블록체인 플랫폼 및 해당 플랫폼의 고유 암호화폐입니다.</span></span>
            가 약 20% 하락해 9월 26일 15:50 기준 $195.73을 기록, 직전 고점 $253에서 상승분을 대부분 반납했다.
            <br/><br/>
            반등 모멘텀으로는 10월 10일 예정된 그레이스케일 솔라나 
            <span class="keyword-tooltip">현물 ETF<span class="tooltip-text">Exchange Traded Fund(상장지수펀드)의 한 종류로, 비트코인이나 금과 같은 실물 자산을 기초로 하여 주식처럼 거래소에서 거래되는 펀드입니다.</span></span> 
            1차 승인 결정이 거론되며, 승인 시 비트코인·이더리움 사례처럼 기관 자금 유입 기대가 커진다.
            <br/><br/>
            코인텔레그래프는 
            <span class="keyword-tooltip">스테이킹<span class="tooltip-text">보유한 암호화폐를 블록체인 네트워크에 맡기고(예치하고) 그 대가로 보상을 받는 과정입니다.</span></span> 
            기반 ETF의 효과는 제한적이라며, 현물 ETF가 유동성 확대에 핵심이라고 평가했다. 
            <span class="keyword-tooltip">SEC<span class="tooltip-text">U.S. Securities and Exchange Commission(미국 증권거래위원회)의 약자로, 미국의 증권 시장을 감독하고 규제하는 연방 기관입니다.</span></span>
            는 이와 별개로 비트와이즈·21셰어스·반에크·캐너리 등의 현물 ETF 심사도 진행 중이며 10월 16일이 기한이다.`,
        imageUrl: 'https://imgnews.pstatic.net/image/421/2025/09/26/0008511339_001_20250926160616644.jpg?type=w860',
        quiz: {
            question: '기술 대기업이 공개한 것은 새로운 AI 기반 비서가 맞다.',
            answer: true
        },
        mcq: {
            id: 'mcq-2',
            question: '솔라나(SOL)의 반등 모멘텀으로 가장 중요하게 거론되는 이벤트는 무엇인가요?',
            options: ['새로운 디파이 프로젝트 출시', '솔라나 재단의 토큰 소각', '그레이스케일의 현물 ETF 승인 결정', '대규모 에어드랍 이벤트'],
            answer: '그레이스케일의 현물 ETF 승인 결정',
            explanation: '기사에 따르면, 10월 10일로 예정된 그레이스케일의 솔라나 현물 ETF 승인 여부가 기관 자금 유입에 대한 기대로 중요한 반등 모멘텀으로 꼽히고 있습니다.'
        }
    },
    {
        id: 3,
        title: '민주당 디지털자산TF, “외국인 투자·파생상품 허용”…경쟁력 회복 해법 제시',
        summary: `더불어민주당 
            <span class="keyword-tooltip">디지털자산TF<span class="tooltip-text">디지털 자산(암호화폐 등) 관련 정책 및 입법을 논의하기 위해 구성된 특별 전담 조직(Task Force)입니다.</span></span>
            가 국내 산업 위축을 지적하며 외국인 투자 허용·
            <span class="keyword-tooltip">파생상품<span class="tooltip-text">기초자산(주식, 채권, 통화 등)의 가치 변동에 따라 가격이 결정되는 금융 상품입니다. 선물, 옵션, 스왑 등이 있습니다.</span></span> 
            도입 등 정책 전환을 촉구했다. TF 위원장 이정문 의원은 △디지털자산 업권법 제정 △원화 기반 
            <span class="keyword-tooltip">스테이블코인<span class="tooltip-text">가치를 미국 달러와 같은 법정화폐에 고정(pegging)하여 가격 변동성을 최소화한 암호화폐입니다.</span></span> 
            정책 마련 △금융소비자 보호장치 강화를 핵심 과제로 제시했고, 이강일 의원은 법인거래·파생상품·스테이블코인 분야의 입법 공백이 경쟁력을 저해한다며 2단계 입법의 조속한 추진을 요구했다. 
            <br/><br/>
            규제 불확실성으로 투자자 해외 이탈이 계속되는 가운데, 산업계와 협력해 시장 신뢰 회복과 제도 정비를 통해 한국을 글로벌 톱3 디지털자산 시장으로 재도약시키겠다는 입장이다.`,
        imageUrl: 'https://imgnews.pstatic.net/image/018/2025/09/25/0006125002_002_20250925190222034.jpg?type=w860',
        quiz: {
            question: '클린 에너지 스타트업은 투자 유치에 실패했다.',
            answer: false
        },
        mcq: {
            id: 'mcq-3',
            question: '더불어민주당 디지털자산TF가 국내 산업 경쟁력 회복을 위해 제안한 정책이 아닌 것은?',
            options: ['외국인 투자 허용', '디지털자산 파생상품 도입', '원화 기반 스테이블코인 정책 마련', '가상자산 거래세 즉시 도입'],
            answer: '가상자산 거래세 즉시 도입',
            explanation: 'TF는 외국인 투자 허용, 파생상품 도입, 스테이블코인 정책 마련 등을 촉구했으며, 거래세 즉시 도입은 논의된 내용이 아닙니다.'
        }
    },
];