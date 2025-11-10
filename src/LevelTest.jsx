import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- 퀴즈 데이터 ---
// [수정] 12개의 레벨 테스트 문제로 교체
const quizQuestions = [
  {
    question: '경제학에서 "희소성(Scarcity)"이란 무엇을 의미하나요?',
    options: [
      '자원의 풍부함',
      '인간의 욕구는 무한한데 비해 자원은 한정되어 있는 상태',
      '물가가 지속적으로 상승하는 현상',
      '특정 상품을 독점적으로 판매하는 시장',
    ],
    correctAnswer: 1,
  },
  {
    question: '물가가 전반적으로 지속해서 상승하는 현상을 무엇이라고 하나요?',
    options: [
      '인플레이션 (Inflation)',
      '디플레이션 (Deflation)',
      '스태그플레이션 (Stagflation)',
      '환율 (Exchange Rate)',
    ],
    correctAnswer: 0,
  },
  {
    question: '상품의 가격이 오르면 수요량이 감소하고, 가격이 내리면 수요량이 증가하는 법칙을 무엇이라고 하나요?',
    options: [
      '공급의 법칙',
      '수요의 법칙',
      '기회비용',
      '매몰비용',
    ],
    correctAnswer: 1,
  },
  {
    question: '국가 경제 전체의 움직임을 다루는 경제학 분야는 무엇인가요?',
    options: [
      '미시경제학 (Microeconomics)',
      '거시경제학 (Macroeconomics)',
      '행동경제학 (Behavioral Economics)',
      '계량경제학 (Econometrics)',
    ],
    correctAnswer: 1,
  },
  {
    question: '한 국가의 총체적인 경제 성과를 측정하는 가장 대표적인 지표로, 일정 기간 국내에서 생산된 모든 최종 재화와 서비스의 시장 가치를 합한 것은 무엇인가요?',
    options: [
      'GNP (국민총생산)',
      'GDP (국내총생산)',
      'CPI (소비자물가지수)',
      '무역수지',
    ],
    correctAnswer: 1,
  },
  {
    question: '은행과 같은 금융기관에 돈을 맡길 때 받는 대가(이자)의 비율을 무엇이라고 하나요?',
    options: [
      '세율 (Tax Rate)',
      '수수료 (Fee)',
      '금리 (Interest Rate)',
      '배당 (Dividend)',
    ],
    correctAnswer: 2,
  },
  {
    question: '기업이 자금을 조달하기 위해 발행하는 유가증권으로, 소유자에게 회사의 지분 일부를 나눠주는 것은 무엇인가요?',
    options: [
      '채권 (Bond)',
      '주식 (Stock)',
      '어음 (Promissory Note)',
      '부동산 (Real Estate)',
    ],
    correctAnswer: 1,
  },
  {
    question: '시장에 단 하나의 공급자만 존재하여 가격 결정에 막대한 영향을 미치는 시장 구조를 무엇이라고 하나요?',
    options: [
      '완전 경쟁 (Perfect Competition)',
      '과점 (Oligopoly)',
      '독점 (Monopoly)',
      '독점적 경쟁 (Monopolistic Competition)',
    ],
    correctAnswer: 2,
  },
  {
    question: '중앙은행이 시중의 통화량을 조절하기 위해 사용하는 대표적인 정책 수단은 무엇인가요?',
    options: [
      '세금 인상',
      '정부 지출 확대',
      '기준금리 변경',
      '최저임금 인상',
    ],
    correctAnswer: 2,
  },
  {
    question: 'A라는 활동을 선택함으로써 포기해야 하는 B라는 활동의 가치 중 가장 큰 가치를 무엇이라고 하나요?',
    options: [
      '기회비용 (Opportunity Cost)',
      '매몰비용 (Sunk Cost)',
      '한계비용 (Marginal Cost)',
      '고정비용 (Fixed Cost)',
    ],
    correctAnswer: 0,
  },
  {
    question: '주식 시장에서 주가가 전반적으로 하락할 것으로 예상되는 시장을 무엇이라고 부르나요?',
    options: [
      '불 마켓 (Bull Market)',
      '베어 마켓 (Bear Market)',
      '블루오션 (Blue Ocean)',
      '레드오션 (Red Ocean)',
    ],
    correctAnswer: 1,
  },
  {
    question: '정부가 발행하거나 보증하는 \'빚\' 문서를 뜻하며, 정해진 날짜에 정해진 이자를 지급할 것을 약속하는 증서는 무엇인가요?',
    options: [
      '국채 (Government Bond)',
      '회사채 (Corporate Bond)',
      '주식 (Stock)',
      '펀드 (Fund)',
    ],
    correctAnswer: 0,
  },
];
const TOTAL_QUESTIONS = quizQuestions.length; // 총 문제 수 (12개)

// 1. 퀴즈 시작 화면 (수정 없음)
const QuizStart = ({ onStartQuiz }) => (
  <div className="w-full max-w-3xl">
    <div className="bg-white dark:bg-gray-900/50 rounded-xl shadow-lg border border-gray-200/80 dark:border-white/10 overflow-hidden">
      <div className="p-8 sm:p-12 md:p-16 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-5xl">
              school
            </span>
          </div>
        </div>
        <h1 className="text-gray-900 dark:text-white tracking-tight text-4xl font-extrabold leading-tight pb-2">
          경제 상식 퀴즈
        </h1>
        <h2 className="text-gray-700 dark:text-gray-300 text-lg font-medium leading-tight tracking-[-0.015em] pb-4">
          OOO님, 환영합니다!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-relaxed max-w-xl mx-auto">
          이 퀴즈는 개인의 경제 지식을 테스트하기 위해 만들어졌습니다.
        </p>
        <div className="mt-8 mb-10 p-6 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200/80 dark:border-white/10">
          <ul className="flex flex-col sm:flex-row justify-center items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 text-left">
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="material-symbols-outlined mr-3 text-primary">
                checklist
              </span>
              <span className="text-sm font-medium">총 {TOTAL_QUESTIONS}개의 문제</span>
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="material-symbols-outlined mr-3 text-primary">
                filter_1
              </span>
              <span className="text-sm font-medium">
                문제는 한 번에 하나씩 표시됩니다
              </span>
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="material-symbols-outlined mr-3 text-primary">
                psychology
              </span>
              <span className="text-sm font-medium">
                경제 지식을 점검해 보세요
              </span>
            </li>
          </ul>
        </div>
        <button
          onClick={onStartQuiz}
          className="w-full sm:w-auto flex-shrink-0 min-w-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-primary/30 hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 transition-all duration-300"
        >
          <span className="truncate">퀴즈 시작</span>
        </button>
      </div>
    </div>
  </div>
);

// 2. 퀴즈 진행 화면 (수정 없음)
const QuizMiddle = ({
  question,
  questionIndex,
  onNextQuestion,
  selectedAnswer,
  setSelectedAnswer,
}) => {
  const progressPercent = ((questionIndex + 1) / TOTAL_QUESTIONS) * 100;

  return (
    <div className="flex flex-col max-w-[768px] flex-1 w-full">
      <div className="px-4 text-center">
        <h1 className="text-gray-900 dark:text-gray-50 tracking-tight text-[32px] font-bold leading-tight pt-6 pb-2">
          경제 상식 퀴즈
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal pb-3">
          {questionIndex + 1}/{TOTAL_QUESTIONS} 문제
        </p>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2 rounded-full bg-primary"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
      <div className="flex flex-col gap-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark p-6 sm:p-8 mt-6">
        <div className="flex flex-wrap justify-between gap-3">
          <p className="text-gray-900 dark:text-gray-50 text-3xl font-bold leading-tight tracking-[-0.03em] min-w-72">
            {question.question}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            return (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                className={`flex w-full cursor-pointer items-center gap-4 rounded-lg border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-2 border-primary bg-primary/10'
                    : 'border-gray-200 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? 'border-2 border-primary bg-primary text-white'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {isSelected && (
                    <span className="material-symbols-outlined text-sm">
                      check
                    </span>
                  )}
                </span>
                <span className="text-base font-medium text-gray-800 dark:text-gray-200">
                  {option}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-4">
          <button
            onClick={onNextQuestion}
            disabled={selectedAnswer === null}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-bold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-gray-300 dark:disabled:bg-gray-600"
          >
            <span>{questionIndex === TOTAL_QUESTIONS - 1 ? '결과 보기' : '다음'}</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. 퀴즈 완료 화면 (등급 로직 수정)
const QuizEnd = ({ score }) => {
  const navigate = useNavigate();

  // [수정] 4가지 등급 분류 로직
  let grade = '';
  let icon = ''; // 아이콘 URL
  let description = ''; // 등급 설명 (추가)

  // 등급 기준: 12문제 기준
  // 0-3점: 씨앗 (기본)
  // 4-6점: 새싹
  // 7-9점: 나무
  // 10-12점: 숲
  
  if (score >= 10) {
    grade = '숲';
    description = '경제 지식이 풍부하시네요!';
    icon = 'https://placehold.co/96x96/108918/FFFFFF?text=🌲'; // '숲' 아이콘 예시
  } else if (score >= 7) {
    grade = '나무';
    description = '경제의 기본기를 잘 갖추고 계세요!';
    icon = 'https://placehold.co/96x96/3E8918/FFFFFF?text=🌳'; // '나무' 아이콘 예시
  } else if (score >= 4) {
    grade = '새싹';
    description = '경제 상식에 대해 알아가고 계시군요!';
    icon = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvDAcvPLXbHkkQ84p1UdR2R3XX-Nm1XDNVWaN5s-a3Yxtd99p-IJTN7bbB_M4KyDIasJNweZGIDF4plNEFuRhVmmHjzP9JSQUKdtzo4C_j-6t191YPEbmbZG_Ot5a0R0O-aQcnI-JeNx7XIj9dzFz6uNBKOi9LAP0eEJ0R_mXSM0ibJTa07wDr-riC50SjZ44rwRguUjaYRSfS8Vt3FckobSLsUvoe43TsK6prHIwQvsj5B56ObDn7jzes-RHGmZ6oYn-zT-QsNh4'; // '새싹' 아이콘 (기존)
  } else {
    grade = '씨앗';
    description = '이제 막 경제 공부를 시작하셨네요!';
    icon = 'https://placehold.co/96x96/D2691E/FFFFFF?text=🌰'; // '씨앗' 아이콘 예시
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl text-center">
      <h1 className="text-[#111418] tracking-tight text-3xl sm:text-4xl font-bold leading-tight px-4 text-center pb-3 pt-6">
        테스트 완료!
      </h1>
      <p className="text-gray-600 text-base font-normal leading-normal pb-6 pt-1 px-4 text-center max-w-md">
        {TOTAL_QUESTIONS}개의 문제를 모두 완료했습니다.
      </p>
      <div className="w-full max-w-sm bg-white rounded-xl border border-gray-200 p-8 my-6 flex flex-col items-center">
        <p className="text-gray-500 text-sm font-medium">당신의 등급</p>
        <img
          alt={`${grade} 등급 아이콘`}
          className="w-24 h-24 mt-4 mb-2"
          src={icon} // [수정] 등급별 아이콘
        />
        <p className="text-2xl font-bold text-primary mt-2">{grade}</p>
        
        {/* [오류 수정] </BODY_TEXT> -> </p> 로 변경 */}
        <p className="text-gray-500 text-base font-medium mt-2">
          {description}
        </p>
        
        <p className="text-gray-500 text-sm font-medium mt-4">
          ({score} / {TOTAL_QUESTIONS})
        </p>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex flex-col sm:flex-row flex-1 gap-3 px-4 py-3 max-w-[480px] justify-center">
          <button
            onClick={() => navigate('/profile')}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#f0f2f4] text-[#111418] text-base font-bold leading-normal tracking-[0.015em] grow"
          >
            <span className="truncate">마이페이지</span>
          </button>
          <button
            onClick={() => navigate('/main')}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] grow"
          >
            <span className="truncate">학습 시작하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 메인 퀴즈 컴포넌트 ---
// (수정 없음)
const LevelTest = () => {
  const [quizState, setQuizState] = useState('start'); // 'start', 'middle', 'end'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleStartQuiz = () => {
    setQuizState('middle');
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizState('end');
    }
  };

  const renderQuizState = () => {
    switch (quizState) {
      case 'start':
        return <QuizStart onStartQuiz={handleStartQuiz} />;
      case 'middle':
        return (
          <QuizMiddle
            question={quizQuestions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            onNextQuestion={handleNextQuestion}
          />
        );
      case 'end':
        return <QuizEnd score={score} />;
      default:
        return <QuizStart onStartQuiz={handleStartQuiz} />;
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-50 dark:bg-background-dark">
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {renderQuizState()}
      </main>
    </div>
  );
};

export default LevelTest;