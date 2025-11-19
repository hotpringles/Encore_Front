import apiClient from "./apiClient";

export const login = async ({ username, password }) => {
  const response = await apiClient.post("/token/", {
    username,
    password,
  });
  const { access, refresh } = response.data;
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh); // 리프레시 토큰 저장
  return response.data;
};

export const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");
  if (!refresh) {
    throw new Error("No refresh token available.");
  }
  try {
    const response = await apiClient.post("/token/refresh/", { refresh });
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
  const response = await apiClient.get("/profile/");
  return response.data;
};

export const logout = async () => {
  // 서버에 로그아웃 요청이 필요하다면 여기에 구현
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const updateMyInfo = async (data) => {
  const response = await apiClient.patch("/profile/", data);
  return response.data;
};

// signUp, updateMyPassword, deleteMyAccount 등 다른 함수들도 apiClient를 사용하도록 변환합니다.
