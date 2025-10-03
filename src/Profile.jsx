import React, { useState } from 'react';
import './Profile.css';
// 1. 사용자 이미지를 import 합니다. 이미지 경로가 올바른지 확인해주세요.
import userAvatar from './assets/seed.png';

function Profile() {
    // 실제 애플리케이션에서는 사용자 데이터를 props나 context API로 받아옵니다.
    // 이미지 확대를 위한 상태
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    // 임시 경험치 데이터
    const currentExp = 75;
    const maxExp = 100;
    const expPercentage = (currentExp / maxExp) * 100;

    const userData = {
        name: '최정우',
        email: 'jwooch@example.com',
        avatar: userAvatar // import한 이미지 변수를 사용합니다.
    };

    const handlePasswordChange = (event) => {
        event.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지합니다.
        console.log('비밀번호 변경 로직을 여기에 구현합니다.');
    };

    return (
        <div className="profile-container">
            <h1 className="profile-title">프로필 설정</h1>

            {/* 2. 사용자 이미지와 정보를 표시하는 섹션을 추가합니다. */}
            <div className="profile-header">
                <div className="profile-image-container">
                    <img
                        src={userData.avatar}
                        alt="사용자 프로필"
                        className="profile-image"
                        onClick={() => setIsImageModalOpen(true)} // 이미지 클릭 시 모달 열기
                    />
                </div>
                <div className="profile-info">
                    <h2 className="section-title" style={{ marginBottom: '8px', borderBottom: 'none' }}>{userData.name}</h2>
                    <p style={{ color: '#555', margin: '0 0 12px 0' }}>{userData.email}</p>
                    <div className="exp-bar-container">
                        <div 
                            className="exp-bar-progress" 
                            style={{ width: `${expPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <h3 className="section-title">기본 정보</h3>
                <form className="profile-form">
                    <div className="form-group">
                        <label htmlFor="name">이름</label>
                        <input type="text" id="name" defaultValue={userData.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input type="email" id="email" defaultValue={userData.email} readOnly />
                    </div>
                </form>
            </div>

            <div className="profile-section">
                <h3 className="section-title">비밀번호 변경</h3>
                <form className="profile-form" onSubmit={handlePasswordChange}>
                    <div className="form-group">
                        <label htmlFor="current-password">현재 비밀번호</label>
                        <input type="password" id="current-password" placeholder="••••••••" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="new-password">새 비밀번호</label>
                        <input type="password" id="new-password" placeholder="새 비밀번호 입력" />
                    </div>
                    <button type="submit" className="btn btn-primary">비밀번호 변경</button>
                </form>
            </div>

            <div className="profile-section danger-zone">
                <h3 className="section-title">계정 관리</h3>
                <p>계정을 삭제하면 모든 데이터가 영구적으로 제거됩니다.</p>
                <button type="button" className="btn btn-danger">계정 삭제</button>
            </div>

            {/* 이미지 확대 모달 */}
            {isImageModalOpen && (
                <div className="image-modal-overlay" onClick={() => setIsImageModalOpen(false)}>
                    <img src={userData.avatar} alt="사용자 프로필 확대" className="enlarged-image" />
                </div>
            )}
        </div>
    );
}

export default Profile;