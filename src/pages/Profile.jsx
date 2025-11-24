import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateMyPassword } from "../api/accountApi";
import { useUserStore } from "../store/userStore";

// [추가] 등급 아이콘 이미지 import
import seed from "../assets/seed.png";
import sprout from "../assets/sprout.png";
import tree from "../assets/tree.png";
import forest from "../assets/forest.png";

function Profile() {
  const navigate = useNavigate();
  // 비밀번호 변경 폼을 위한 state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const user = useUserStore((state) => state.user);
  const levelIcons = {
    씨앗: seed,
    새싹: sprout,
    나무: tree,
    숲: forest,
  };

  // 비밀번호 업데이트 핸들러
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      // [수정] 실제 비밀번호 변경 API 호출
      await updateMyPassword({
        old_password: currentPassword,
        new_password: newPassword,
      });
      alert("비밀번호가 성공적으로 변경되었습니다.");
      // 입력 필드 초기화
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      alert("비밀번호가 8자리 이상인지 확인해주세요.");
    }
  };

  // 계정 삭제 핸들러
  const handleAccountDelete = async () => {
    if (
      window.confirm(
        "정말 계정을 영구적으로 삭제하시겠습니까? 저를 해치지 말아주세요."
      )
    ) {
      // try {
      //   await deleteMyAccount();
      //   await logout(); // 서버 측 로그아웃
      //   localStorage.removeItem("accessToken"); // 클라이언트 측 토큰 제거
      //   setUser({}); // App 상태의 user 정보 초기화
      //   alert("계정이 삭제되었습니다. 로그인 페이지로 이동합니다.");
      //   navigate("/login", { replace: true });
      //   // window.location.reload(); // App 상태를 완전히 초기화하기 위해 필요할 수 있음
      // } catch (error) {
      //   console.error("계정 삭제 실패:", error);
      //   alert("계정 삭제에 실패했습니다. 다시 시도해주세요.");
      // }
    }
  };

  return (
    // [수정] 여기에 'pt' 클래스를 추가해 여백의 미
    <div className="max-w-4xl mx-auto px-8 py-12">
      <header className="flex flex-wrap justify-between gap-3 mb-8">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em]">
          마이페이지
        </p>
      </header>
      <div className="flex flex-col gap-8">
        {/* --- 프로필 섹션 --- */}
        <section className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-6">
            <img
              src={levelIcons[user?.grade]}
              alt={user?.grade}
              className="size-24 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-start">
                <div>
                  {/* [수정] 실제 사용자 이름으로 변경 */}
                  <h1 className="text-gray-900 text-2xl font-bold leading-normal">
                    {user?.username || "사용자"}
                  </h1>
                  {/* [수정] 실제 사용자 이메일로 변경 */}
                  <p className="text-gray-600 text-base font-normal leading-normal">
                    {user?.email || "이메일 정보 없음"}
                  </p>
                </div>
                {/* [수정] 등급 정보 동적 표시 */}
                {/* <div className={`flex flex-col items-center gap-1`}>
                  <div className={`${tier.bg} p-2 rounded-full`}>
                    <img src={tier.icon} alt={tier.name} className="size-8" />
                  </div>
                  <span className={`${tier.color} text-sm font-bold`}>
                    {tier.name}
                  </span>
                </div> */}
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-600 text-sm font-medium">
                    다음 등급까지
                  </span>
                  {/* [수정] 실제 점수로 변경 */}
                  <span className="text-primary text-sm font-bold">
                    {user?.score || 0} / 1000
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  {/* [수정] 실제 점수를 기반으로 경험치 바 표시 */}
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${(user?.score || 0) % 1000}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 비밀번호 변경 섹션 --- */}
        <section className="bg-white rounded-lg border border-gray-200">
          <form onSubmit={handlePasswordUpdate}>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900 text-[22px] font-bold leading-tight tracking-[-0.015em]">
                비밀번호 변경
              </h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-6">
                <label className="flex flex-col w-full">
                  <p className="text-gray-600 text-base font-medium leading-normal pb-2">
                    현재 비밀번호
                  </p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-white h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
                    placeholder="현재 비밀번호를 입력하세요"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </label>
                <div className="flex flex-col sm:flex-row gap-6">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-gray-600 text-base font-medium leading-normal pb-2">
                      새 비밀번호
                    </p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-white h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
                      placeholder="새 비밀번호를 입력하세요"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </label>
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-gray-600 text-base font-medium leading-normal pb-2">
                      새 비밀번호 확인
                    </p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-white h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
                      placeholder="새 비밀번호를 다시 입력하세요"
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-b-lg flex justify-end border-t border-gray-200">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50 text-white font-semibold text-sm h-10 px-5 rounded-lg bg-primary hover:bg-primary/15 transition-colors"
              >
                비밀번호 업데이트
              </button>
            </div>
          </form>
        </section>

        {/* --- 계정 삭제 섹션 --- */}
        <section className="bg-white rounded-lg border border-red-300">
          <div className="p-6 border-b border-red-300">
            <h2 className="text-gray-900 text-[22px] font-bold leading-tight tracking-[-0.015em]">
              계정 삭제
            </h2>
          </div>
          <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-gray-900 font-medium">
                이 작업은 되돌릴 수 없습니다.
              </p>
              <p className="text-gray-600 text-sm mt-1 max-w-lg">
                계정을 영구적으로 삭제하면 강좌, 진행 상황, 재무 정보를 포함한
                모든 데이터가 제거됩니다. 이 작업은 되돌릴 수 없습니다.
              </p>
            </div>
            <button
              onClick={handleAccountDelete}
              className="flex-shrink-0 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50 text-white font-semibold text-sm h-10 px-5 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
            >
              내 계정 삭제
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
