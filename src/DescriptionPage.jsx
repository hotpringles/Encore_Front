import React from 'react';
// Link 컴포넌트는 "무료로 시작하기" 버튼을 제거하면서 필요 없어졌습니다.
// (만약 다른 링크를 추가하고 싶다면, import { Link } from 'react-router-dom';을 다시 추가하세요.)

// --- 각 섹션 컴포넌트 ---

const HeroSection = () => (
  <section className="w-full py-20 text-center sm:py-28 md:py-32">
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-4xl font-black leading-tight tracking-tighter text-text-primary dark:text-white md:text-5xl lg:text-6xl">
        EconoLearn AI 작동 방식
      </h1>
      <p className="max-w-3xl text-base font-normal leading-normal text-text-secondary dark:text-gray-300 md:text-lg">
        EconoLearn AI에 오신 것을 환영합니다! 저희 AI 에이전트가 어떻게
        당신의 맞춤형 경제 학습을 돕는지 자세히 알아보세요.
      </p>
      {/* "무료로 시작하기" 버튼 제거 */}
    </div>
  </section>
);

const FeatureCard = ({ icon, title, description, className }) => (
  <div
    className={`flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-background-light p-6 text-center dark:border-gray-800 dark:bg-background-dark ${className}`}
  >
    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary">
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div className="flex flex-col gap-1">
      <h3 className="text-lg font-bold leading-tight text-text-primary dark:text-white">
        {title}
      </h3>
      <p className="text-sm font-normal leading-normal text-text-secondary dark:text-gray-400">
        {description}
      </p>
    </div>
  </div>
);

const HowItWorksSection = () => (
  <section className="w-full py-16 sm:py-20 md:py-24">
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4 text-center">
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-text-primary dark:text-white md:text-4xl">
          EconoLearn AI 핵심 기능
        </h2>
        <p className="mx-auto max-w-2xl text-base font-normal leading-normal text-text-secondary dark:text-gray-300 md:text-lg">
          당신의 경제 지식 성장을 돕는 3가지 핵심 기능을 소개합니다.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon="newspaper"
          title="1. 맞춤형 기사 요약 및 용어 설명"
          description="메인 페이지에서 당신의 등급에 맞춘 경제 기사 요약을 보세요. 어려운 용어는 마우스를 올리면 친절한 설명(툴팁)이 나옵니다."
        />
        <FeatureCard
          icon="spark"
          title="2. AI 챗봇 및 추가 퀴즈"
          description="우측 상단 챗봇 AI에게 궁금한 것을 질문하고, 언제든지 추가 퀴즈 생성을 요청하세요. AI가 당신의 학습을 1:1로 돕습니다."
        />
        <FeatureCard
          icon="trending_up"
          title="3. 퀴즈를 통한 등급 성장"
          description="기사를 다 읽으면 퀴즈가 생성됩니다. 퀴즈를 풀고 경험치를 쌓아 '씨앗'에서 '숲'으로 당신의 경제 등급을 올려보세요!"
          className="sm:col-span-2 lg:col-span-1"
        />
      </div>
    </div>
  </section>
);

const FeatureSplitSection = ({
  title,
  text,
  imageUrl,
  alt,
  reverse = false,
}) => (
  <section className="w-full py-16 sm:py-20 md:py-24">
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
      <div className={`flex flex-col gap-4 ${reverse ? 'md:order-1' : ''}`}>
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-text-primary dark:text-white md:text-4xl">
          {title}
        </h2>
        <p className="text-base leading-relaxed text-text-secondary dark:text-gray-300">
          {text}
        </p>
      </div>
      <div
        className={`aspect-[4/3] w-full rounded-xl bg-gray-100 bg-cover bg-center bg-no-repeat dark:bg-gray-800/50 ${
          reverse ? 'md:order-2' : ''
        }`}
        data-alt={alt}
        style={{ backgroundImage: `url("${imageUrl}")` }}
      ></div>
    </div>
  </section>
);

const MissionSection = () => (
  <section className="w-full py-16 sm:py-20 md:py-24">
    <div className="flex flex-col items-center gap-6 rounded-xl bg-primary/5 p-8 text-center dark:bg-secondary/10 sm:p-12">
      <h3 className="text-2xl font-bold leading-tight tracking-tight text-text-primary dark:text-white">
        우리의 미션
      </h3>
      <blockquote className="max-w-3xl">
        <p className="text-xl italic leading-relaxed text-text-secondary dark:text-gray-300">
          "모두를 위해 경제의 신비를 벗기는 것. 경제 지식을 접근하기 쉽고 매력적으로
          만듦으로써, 개인이 자신의 삶과 주변 세계에 대해 더 나은 정보에 입각한
          결정을 내릴 수 있도록 힘을 실어줄 수 있다고 믿습니다."
        </p>
      </blockquote>
    </div>
  </section>
);

// "무료로 시작하기" CtaSection 제거

// --- 메인 페이지 컴포넌트 ---
function DescriptionPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center px-4 sm:px-8 md:px-16">
      <HeroSection />
      <HowItWorksSection />
      <FeatureSplitSection
        title="당신만을 위한 맞춤형 학습 경험"
        text="EconoLearn AI의 모든 콘텐츠는 당신의 현재 경제 등급(씨앗, 새싹, 나무, 숲)에 맞춰 제공됩니다. 기사 요약부터 퀴즈의 난이도까지, 당신의 수준에 꼭 맞는 맞춤형 학습을 경험하세요. 사이드바에서는 이전에 학습한 기사 내역을 언제든 다시 확인할 수 있습니다."
        imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuB2Qt2gInc5_fZv8qSucSFiJ13khemLLVZnjG3DauplkfeK2-MYH3FMvoJjHUPD8kABQVxWV-eg1xEbu6vbMQgFN_MMHWU0SFRhzwaYXDQMr3TWGsMBkx_qSk2BsSIAemPE6aQ5A2qxFx-b5rzmbMSIghAJGCuk7LOvlLXXbeajl47TLQd0qjgU5M4ryTbEpSuUNR_t-cW4NxcGe0lnpsxEMeDy28OB9w_oxMqY4ZnIaDeHDAX_RGhTTmnekyeY4WWNbXfKDsmynPk"
        alt="경제 뉴스 기사에 대해 토론하는 AI 채팅 인터페이스의 UI 목업"
      />
      <FeatureSplitSection
        title="읽기, 퀴즈, 성장의 선순환"
        text="경제 기사를 읽는 것에서 끝나지 않습니다. AI가 생성한 퀴즈를 풀면서 내가 정확히 무엇을 이해했는지 확인하고, 경험치를 얻어 등급을 올리는 재미를 느껴보세요. 학습은 게임처럼 즐거워야 합니다."
        imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAUSpt3De1lj5HBCBzxICbQOGQWWUXMjF58Gc73E0lPY5-H6k_LpT4A1ZczuFtwxjLbduKv6ogpd7l-QZdlbTTP3xSz763afTL4xZ8Dh22AolqpHYkA19-Uz-ymJ9B_S-42CzjVn8Z__NLl9iKV6zsfttVYGb_9acvedjbBqlSQX6tu9jYJ6Rwy-r1xMiVqT2r1uqnPl6Hxkhkv6EcUar7nD1SlNdVgEfxmG2IIIvx8NUmH62ijWr7Bn88slZraO4crSD5ml8rAdPU"
        alt="주요 경제 지표가 강조된 인터랙티브 뉴스 카드 UI 목업"
        reverse={true}
      />
      <MissionSection />
      {/* "무료로 시작하기" CtaSection 제거 */}
    </div>
  );
}

export default DescriptionPage;