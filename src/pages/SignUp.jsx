import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// [추가] accountApi에서 signUp 함수를 가져옵니다.
import { signUp } from "../api/accountApi.js";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // [개선] 로딩 및 에러 상태를 관리하기 위한 state 추가
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // [개선] 프론트엔드 유효성 검사 추가
    if (!username || !email || !password) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      // [개선] alert 대신 error 상태를 업데이트합니다.
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // [개선] API 요청 시작 시 로딩 상태 활성화 및 에러 초기화
    setIsLoading(true);
    setError(null);

    try {
      // [추가] API를 호출하여 회원가입을 시도합니다.
      await signUp({ username, email, password });

      // const { access } = await login({ username, password });
      // localStorage.setItem("accessToken", access);

      // const user = await fetchProfile();
      // setUser(user);

      // [수정] 회원가입 및 로그인 성공 후, 실제 동작에 맞는 알림을 보여줍니다.
      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      // if (user.hasTested) navigate("/main");
      // else navigate("/level-test");
      navigate("/login");
    } catch (err) {
      console.error("회원가입 실패:", err);

      // [개선] 서버에서 온 상세 에러 메시지를 사용자에게 보여줍니다.
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        // 예시: { username: ["이미 사용중인 아이디입니다."], email: ["이메일 형식이 올바르지 않습니다."] }
        const errorMessages = Object.entries(errorData)
          .map(([field, messages]) => {
            // 필드 이름을 한글로 변환 (선택적)
            const fieldName =
              { username: "아이디", email: "이메일", password: "비밀번호" }[
                field
              ] || field;
            return `${fieldName}: ${
              Array.isArray(messages) ? messages.join(" ") : messages
            }`;
          })
          .join("\n");
        setError(errorMessages || "알 수 없는 오류가 발생했습니다.");
      } else {
        // 서버에서 상세 에러를 보내주지 않는 경우를 위한 기본 메시지
        setError("회원가입에 실패했습니다. 입력 내용을 다시 확인해주세요.");
      }
    } finally {
      // [개선] API 요청 종료 시 로딩 상태 비활성화
      setIsLoading(false);
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
            {/* 왼쪽 패널 */}
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
                {/* [수정] 줄 바꿈 <br /> 태그 적용 */}
                <h1 className="text-white tracking-tight text-4xl font-bold leading-tight">
                  경제 기사를 통한
                  <br />
                  배움의 새로운 시작
                </h1>
                <p className="text-white/80 text-lg font-normal leading-normal">
                  Finance For U와 함께 금융 지식의 새로운 지평을 열어보세요.
                  회원가입하여 지금 바로 시작하세요.
                </p>
              </div>
            </div>

            {/* 오른쪽 패널 (회원가입 폼) */}
            <div className="flex w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark p-8 md:w-2/3 md:p-12 lg:p-16">
              <div className="w-full max-w-md">
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2 text-center md:text-left">
                    <h2 className="text-[#212529] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                      회원가입
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      새로운 계정을 만드세요.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* 사용자 이름 */}
                    <div className="flex flex-col">
                      <label
                        className="text-[#212529] dark:text-slate-200 text-base font-medium leading-normal pb-2"
                        htmlFor="username"
                      >
                        사용자 이름
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-4 text-slate-500 dark:text-slate-400">
                          account_circle
                        </span>
                        <input
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#212529] dark:text-white dark:focus:border-primary/80 focus:outline-0 focus:ring-2 focus:ring-primary/40 border border-[#cfd9e8] dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] pl-12 text-base font-normal leading-normal"
                          id="username"
                          placeholder="사용자 이름을 입력하세요"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* 이메일 */}
                    <div className="flex flex-col">
                      <label
                        className="text-[#212529] dark:text-slate-200 text-base font-medium leading-normal pb-2"
                        htmlFor="email"
                      >
                        이메일
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-4 text-slate-500 dark:text-slate-400">
                          mail
                        </span>
                        <input
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#212529] dark:text-white dark:focus:border-primary/80 focus:outline-0 focus:ring-2 focus:ring-primary/40 border border-[#cfd9e8] dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] pl-12 text-base font-normal leading-normal"
                          id="email"
                          placeholder="이메일을 입력하세요"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* 비밀번호 */}
                    <div className="flex flex-col">
                      <label
                        className="text-[#212529] dark:text-slate-200 text-base font-medium leading-normal pb-2"
                        htmlFor="password"
                      >
                        비밀번호
                      </label>
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
                          type="button"
                          className="absolute right-4 text-slate-500 dark:text-slate-400 border-none outline-none focus:border-none focus:outline-none"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <span className="material-symbols-outlined leading-[1.5]">
                            {showPassword ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* 비밀번호 확인 */}
                    <div className="flex flex-col">
                      <label
                        className="text-[#212529] dark:text-slate-200 text-base font-medium leading-normal pb-2"
                        htmlFor="confirm-password"
                      >
                        비밀번호 확인
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-4 text-slate-500 dark:text-slate-400">
                          lock
                        </span>
                        <input
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#212529] dark:text-white dark:focus:border-primary/80 focus:outline-0 focus:ring-2 focus:ring-primary/40 border border-[#cfd9e8] dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] pl-12 pr-12 text-base font-normal leading-normal"
                          id="confirm-password"
                          placeholder="비밀번호를 다시 입력하세요"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute right-4 text-slate-500 dark:text-slate-400 border-none outline-none focus:border-none focus:outline-none"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          <span className="material-symbols-outlined leading-[1.5]">
                            {showConfirmPassword
                              ? "visibility_off"
                              : "visibility"}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* [개선] 에러가 있을 경우, 메시지를 화면에 표시합니다. */}
                    {error && (
                      <div
                        className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700"
                        role="alert"
                      >
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="flex h-14 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-bold text-white shadow-sm transition-colors hover:bg-primary/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:bg-gray-400"
                      disabled={isLoading} // [개선] 로딩 중일 때 버튼 비활성화
                    >
                      {isLoading ? "가입 처리 중..." : "회원가입"}
                    </button>
                  </div>

                  <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                    이미 계정이 있으신가요?{" "}
                    <Link
                      className="font-bold text-primary hover:text-[#1976D2] hover:underline"
                      to="/login"
                    >
                      로그인
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

export default SignUp;
