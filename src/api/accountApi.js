import api from "./apiClient";

export const login = async (data) => {
  const res = await api.post("/accounts/login/", data);
  const { access, refresh } = res.data;
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh); // 리프레시 토큰 저장
  return res.data;
};

export const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");
  if (!refresh) {
    throw new Error("No refresh token available.");
  }
  try {
    const response = await api.post("/accounts/token/refresh/", { refresh });
    const { access } = response.data;
    localStorage.setItem("accessToken", access);
    return access;
  } catch (error) {
    console.error("Failed to refresh token", error);
    // 리프레시 토큰이 만료되었거나 유효하지 않으면 저장된 토큰 삭제
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    throw error;
  }
};

export const fetchProfile = async () => {
  const response = await api.get("/accounts/profile/");
  return response.data;
};

export const logout = async () => {
  const refresh = localStorage.getItem("refreshToken");
  try {
    if (refresh) {
      // 서버에 refreshToken을 보내 블랙리스트에 추가하도록 요청합니다.
      // 서버의 로그아웃 엔드포인트('/logout/')로 요청을 보냅니다.
      await api.post("/logout/", { refresh });
    }
  } catch (error) {
    console.error("서버 로그아웃 실패:", error);
    // 서버 로그아웃이 실패하더라도 클라이언트 측에서는 로그아웃 처리를 계속 진행합니다.
  } finally {
    // 로컬 스토리지에서 토큰들을 제거합니다.
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

export const updateMyInfo = async (data) => {
  const response = await api.patch("/accounts/profile/", data);
  return response.data;
};

export const updateMyPassword = async (data) => {
  // data 객체에는 일반적으로 old_password, new_password1, new_password2 필드가 포함됩니다.
  // 백엔드 API 명세에 따라 필드 이름과 엔드포인트('/auth/password/change/')를 확인하고 수정해주세요.
  const response = await api.post("/accounts/password-change/", data);
  return response.data;
};

export const signUp = async (data) => {
  // data 객체에는 username, email, password, password2 등이 포함될 수 있습니다.
  // 백엔드 API 명세에 따라 엔드포인트('/auth/registration/')와 필드 이름을 확인하고 수정해주세요.
  const response = await api.post("/accounts/signup/", data);
  return response.data;
};

// deleteMyAccount 등 다른 함수들도 여기에 추가할 수 있습니다.
