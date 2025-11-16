import React, { useState } from "react";
// [수정] react-router-dom에서 Link 외에 useNavigate도 가져옵니다.
import { Link, useNavigate } from "react-router-dom";
// [추가] accountApi에서 login 함수를 가져옵니다.
import { fetchProfile, login } from "../api/accountApi.js";
import { useUserStore } from "../store/userStore.js";

const LogIn = () => {
  // [수정] API 명세에 맞춰 'username'으로 상태 이름을 변경합니다.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setUser, setHasTested } = useUserStore();

  // [수정] useNavigate 훅을 실행해서 navigate 함수를 만듭니다.
  const navigate = useNavigate();

  // 비밀번호 보이기/숨기기 토글 핸들러
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 제출 동작 방지

    try {
      // 1. API를 호출하여 로그인 시도 (성공 시 토큰이 저장됨)
      await login({ username, password });

      // 2. 저장된 토큰으로 사용자 프로필 정보를 가져옴
      const user = await fetchProfile();
      setUser(user);
      // [개선] user.grade 존재 여부를 boolean으로 변환
      setHasTested(!!user.grade);

      // 3. 등급(grade) 유무에 따라 적절한 페이지로 이동
      if (user.grade) navigate("/main");
      else navigate("/level-test");
    } catch (error) {
      // [추가] 로그인 실패 시 에러를 처리합니다.
      console.error("로그인 실패:", error);
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      // [개선] 보안을 위해 로그인 시도 후 비밀번호 필드를 비웁니다.
      setPassword("");
    }
  };

  return (
    <div
      className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root"
      style={{ fontFamily: 'Inter, "Noto Sans KR", sans-serif' }}
    >
      <div className="flex h-full min-h-screen w-full grow flex-col">
        <div className="flex flex-1">
          <div className="flex w-full flex-col items-stretch md:flex-row">
            {/* 왼쪽 패널 (디자인) */}
            <div
              className="relative flex w-full flex-col items-center justify-center p-8 md:w-1/3 md:p-12 lg:p-16"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(25, 118, 210, 0.9) 0%, rgba(13, 71, 161, 0.95) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAdPPnwE8Z8hagq5q_4tPoBI6DsmdD4BavTFGI2cCRLVKIBnbK7mNMD-t_tJw_O20aUZoiQ_jDR1DphFiupz_v6ZFGDOs3opwi9MGeBIbCjg54UVAUKwfZer5micGWzWWrt_sydDZhqoggMtF8b6D0hQKoIlNNkzaXET9rFOkZ20ySBmwXiXzarR8zpsc4DE_lEijA4Z4ywt3GhfS7LhCQJK0IQkDUaWfcR94JqYR2JyJkpJ_F55s2RsAIDLv-xwhsHE8u8uQX2IIc')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/95"></div>
              <div className="relative z-10 flex w-full max-w-md flex-col items-start gap-6 text-white">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-4xl">
                    insights
                  </span>
                  <span className="text-2xl font-bold">Finance For U</span>
                </div>
                <h1 className="text-white tracking-tight text-4xl font-bold leading-tight">
                  경제 기사를 통한
                  <br />
                  배움의 새로운 시작
                </h1>
                <p className="text-white/80 text-lg font-normal leading-normal">
                  Finance For U와 함께 금융 지식의 새로운 지평을 열어보세요.
                  로그인하여 지금 바로 시작하세요.
                </p>
              </div>
            </div>

            {/* 오른쪽 패널 (로그인 폼) */}
            <div className="flex w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark p-8 md:w-2/3 md:p-12 lg:p-16">
              <div className="w-full max-w-md">
                {/* [수정] 폼 태그에 onSubmit={handleSubmit} 이벤트를 연결합니다. */}
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2 text-center md:text-left">
                    <h2 className="text-[#212529] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                      로그인
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      계속하려면 정보를 입력하세요.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* 이메일 입력 */}
                    <div className="flex flex-col">
                      <label
                        className="text-[#212529] dark:text-slate-200 text-base font-medium leading-normal pb-2"
                        htmlFor="email"
                      >
                        이메일 또는 사용자 이름
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-4 text-slate-500 dark:text-slate-400">
                          person
                        </span>
                        <input
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#212529] dark:text-white dark:focus:border-primary/80 focus:outline-0 focus:ring-2 focus:ring-primary/40 border border-[#cfd9e8] dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] pl-12 text-base font-normal leading-normal"
                          id="email"
                          placeholder="이메일 또는 사용자 이름을 입력하세요"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* 비밀번호 입력 */}
                    <div className="flex flex-col">
                      <div className="flex items-baseline justify-between pb-2">
                        <label
                          className="text-[#212529] dark:text-slate-200 text-base font-medium leading-normal"
                          htmlFor="password"
                        >
                          비밀번호
                        </label>
                      </div>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-4 text-slate-500 dark:text-slate-400">
                          lock
                        </span>
                        <input
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#212529] dark:text-white dark:focus:border-primary/80 focus:outline-0 focus:ring-2 focus:ring-primary/40 border border-[#cfd9e8] dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] pl-12 pr-12 text-base font-normal leading-normal"
                          id="password"
                          placeholder="비밀번호를 입력하세요"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button" // 폼 제출 방지
                          className="absolute right-4 text-slate-500 dark:text-slate-400"
                          onClick={handleTogglePassword}
                        >
                          <span className="material-symbols-outlined">
                            {showPassword ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* 로그인 버튼 */}
                    <button
                      type="submit" // [수정] 이 버튼이 눌리면 <form>의 onSubmit이 실행됩니다.
                      className="flex h-14 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#1976D2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      로그인
                    </button>
                  </div>

                  {/* 회원가입 링크 */}
                  <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                    계정이 없으신가요?{" "}
                    <Link
                      className="font-bold text-primary hover:text-[#1976D2] hover:underline"
                      to="/signup" // 회원가입 페이지 경로
                    >
                      회원가입
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
