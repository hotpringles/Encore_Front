import React, { useMemo, useState } from 'react';
import './Profile.css';
import userAvatar from './assets/seed.png';

const INITIAL_PROFILE = {
    name: '홍길동',
    email: 'finance4u@example.com',
};

function Profile() {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [profileValues, setProfileValues] = useState(INITIAL_PROFILE);
    const [passwordValues, setPasswordValues] = useState({
        currentPassword: '',
        newPassword: '',
    });

    const level = 7;
    const progress = 62;

    const handleProfileChange = (field) => (event) => {
        setProfileValues((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handlePasswordChange = (field) => (event) => {
        setPasswordValues((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const hasProfileChanges = useMemo(() => (
        profileValues.name !== INITIAL_PROFILE.name ||
        profileValues.email !== INITIAL_PROFILE.email
    ), [profileValues]);

    const handleProfileSubmit = (event) => {
        event.preventDefault();
        console.log('프로필 정보 저장', profileValues);
    };

    const handlePasswordSubmit = (event) => {
        event.preventDefault();
        console.log('비밀번호 변경 요청', passwordValues);
    };

    const handleLogout = () => {
        console.log('로그아웃 클릭');
    };

    const handleAvatarKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsImageModalOpen(true);
        }
    };

    return (
        <div className="profile-wrapper">
            <div className="profile-header">
                <h1 className="profile-title">프로필 설정</h1>
                <div className="profile-title-separator" />
            </div>

            <div className="profile-content">
                <aside className="profile-card">
                    <div
                        className="profile-avatar"
                        onClick={() => setIsImageModalOpen(true)}
                        onKeyDown={handleAvatarKeyDown}
                        role="button"
                        tabIndex={0}
                        aria-label="아바타 크게 보기"
                    >
                        <img src={userAvatar} alt="사용자 아바타" />
                    </div>
                    <p className="profile-name">{profileValues.name}</p>
                    <p className="profile-rank">등급 · 🐣</p>

                    <div className="profile-progress">
                        <div className="profile-progress-track">
                            <div className="profile-progress-fill" style={{ width: `${progress}%` }}>
                                <span>LV {level} · {progress}%</span>
                            </div>
                        </div>
                    </div>

                    <button type="button" className="profile-logout" onClick={handleLogout}>
                        로그아웃
                    </button>
                </aside>

                <div className="profile-panels">
                    <section className="profile-panel">
                        <h2 className="panel-title">기본 정보</h2>
                        <form className="profile-form" onSubmit={handleProfileSubmit}>
                            <div className="profile-form-row">
                                <label className="profile-label" htmlFor="profile-name">이름</label>
                                <input
                                    id="profile-name"
                                    type="text"
                                    className="profile-input"
                                    value={profileValues.name}
                                    onChange={handleProfileChange('name')}
                                />
                            </div>
                            <div className="profile-form-row">
                                <label className="profile-label" htmlFor="profile-email">이메일</label>
                                <input
                                    id="profile-email"
                                    type="email"
                                    className="profile-input"
                                    value={profileValues.email}
                                    onChange={handleProfileChange('email')}
                                />
                            </div>
                            <div className="profile-form-actions">
                                <button
                                    type="submit"
                                    className="profile-save"
                                    disabled={!hasProfileChanges}
                                >
                                    정보 저장
                                </button>
                            </div>
                        </form>
                    </section>

                    <section className="profile-panel">
                        <h2 className="panel-title">비밀번호 변경</h2>
                        <form className="profile-form" onSubmit={handlePasswordSubmit}>
                            <div className="profile-form-row">
                                <label className="profile-label" htmlFor="current-password">현재 비밀번호</label>
                                <input
                                    id="current-password"
                                    type="password"
                                    className="profile-input"
                                    placeholder="현재 비밀번호를 입력하세요"
                                    value={passwordValues.currentPassword}
                                    onChange={handlePasswordChange('currentPassword')}
                                />
                            </div>
                            <div className="profile-form-row">
                                <label className="profile-label" htmlFor="new-password">새 비밀번호</label>
                                <input
                                    id="new-password"
                                    type="password"
                                    className="profile-input"
                                    placeholder="새 비밀번호를 입력하세요"
                                    value={passwordValues.newPassword}
                                    onChange={handlePasswordChange('newPassword')}
                                />
                            </div>
                            <button
                                type="submit"
                                className="profile-submit"
                                disabled={!passwordValues.currentPassword || !passwordValues.newPassword}
                            >
                                비밀번호 변경
                            </button>
                        </form>
                    </section>
                </div>
            </div>

            {isImageModalOpen && (
                <div className="image-modal-overlay" onClick={() => setIsImageModalOpen(false)}>
                    <img src={userAvatar} alt="아바타 확대" className="enlarged-image" />
                </div>
            )}
        </div>
    );
}

export default Profile;

