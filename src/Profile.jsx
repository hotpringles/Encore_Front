import React from 'react';
import './Profile.css';

function Profile() {
    // 실제 애플리케이션에서는 사용자 데이터를 props나 context API로 받아옵니다.
    const userData = {
        name: '최정우',
        email: 'jwooch@example.com',
        avatar: './assets/kiss.png' // Nav와 동일한 아바타 경로
    };

    const handlePasswordChange = (event) => {
        event.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지합니다.
        console.log('비밀번호 변경 로직을 여기에 구현합니다.');
    };

    return (
        <div className="profile-container">
            <h2 className="profile-title">프로필 설정</h2>

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
        </div>
    );
}

export default Profile;