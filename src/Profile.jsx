import React, { useState } from 'react';

const Profile = () => {
  // 비밀번호 변경 폼을 위한 state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // 프로필 사진 변경 핸들러
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log('선택된 파일:', e.target.files[0].name);
      // TODO: 이미지 업로드 및 미리보기 로직 구현
    }
  };

  // 비밀번호 업데이트 핸들러
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log('비밀번호 업데이트 시도:', { currentPassword, newPassword });
    // TODO: 실제 비밀번호 변경 API 호출
  };

  // 계정 삭제 핸들러
  const handleAccountDelete = () => {
    if (window.confirm('정말 계정을 영구적으로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      console.log('계정 삭제 실행');
      // TODO: 실제 계정 삭제 API 호출
    }
  };

  return (
    // [수정] Profile 전용 클래스들을 기본 Tailwind 클래스로 변경
    <div className="max-w-4xl mx-auto">
      <header className="flex flex-wrap justify-between gap-3 mb-8">
        <p className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em]">
          마이페이지
        </p>
      </header>
      <div className="flex flex-col gap-8">
        {/* --- 프로필 섹션 --- */}
        <section className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-6">
            <label
              htmlFor="profile-picture-upload"
              className="relative group size-24 flex-shrink-0 cursor-pointer"
            >
              <div className="flex items-center justify-center bg-gray-100 rounded-full size-24 border-2 border-dashed border-gray-300">
                <span className="material-symbols-outlined text-gray-400 text-4xl">
                  add_a_photo
                </span>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-medium">사진 변경</span>
              </div>
              <input
                type="file"
                id="profile-picture-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-gray-900 text-2xl font-bold leading-normal">
                    John Doe
                  </h1>
                  <p className="text-gray-600 text-base font-normal leading-normal">
                    john.doe@email.com
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="bg-green-100 p-2 rounded-full">
                    <span className="text-3xl">🌱</span>
                  </div>
                  <span className="text-green-800 text-sm font-bold">새싹</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-600 text-sm font-medium">
                    경험치
                  </span>
                  {/* [수정] text-primary는 로그인 페이지의 파란색이 됩니다. (통일성) */}
                  <span className="text-primary text-sm font-bold">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  {/* [수정] bg-primary는 로그인 페이지의 파란색이 됩니다. (통일성) */}
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: '45%' }}
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
                <label className="flex flex-col w-full max-w-sm">
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
                className="flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50 text-white font-semibold text-sm h-10 px-5 rounded-lg bg-primary hover:bg-primary/90 transition-colors"
              >
                비밀번호 업데이트
              </button>
            </div>
          </form>
        </section>

        {/* --- 계정 삭s제 섹션 --- */}
        {/* [수정] destructive 클래스 대신 기본 red 색상 사용 */}
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
};

export default Profile;