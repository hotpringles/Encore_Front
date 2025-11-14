// src/api/client.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 예: http://127.0.0.1:8000
  withCredentials: false, // 쿠키 인증 쓰면 true 로 변경
});

// 요청/응답 인터셉터에서 토큰 달기, 에러 공통 처리도 여기서 가능
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기
  if (token) {
    // 토큰이 있으면 Authorization 헤더에 추가
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    // 2xx 범위의 상태 코드에 대한 응답 처리
    return response;
  },
  async (error) => {
    // 2xx 범위를 벗어나는 상태 코드에 대한 응답 처리
    const originalRequest = error.config;

    // 401 에러이고, 재시도한 요청이 아닐 경우 토큰 갱신 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 플래그 설정 (무한 재시도 방지)

      try {
        // 백엔드에 토큰 갱신 API가 있다는 가정 (e.g., POST /accounts/token/refresh)
        // 실제 프로젝트에서는 refreshToken을 안전하게 관리해야 합니다.
        const refreshToken = localStorage.getItem("refreshToken"); // 예시
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/accounts/token/refresh`,
          { refresh: refreshToken }
        );

        const newAccessToken = data.access;
        localStorage.setItem("accessToken", newAccessToken);

        // axios 인스턴스의 기본 헤더 및 원래 요청 헤더 업데이트
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // 실패했던 원래 요청을 새로운 토큰으로 재시도
        return api(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 (e.g., 리프레시 토큰 만료)
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // 로그인 페이지로 이동
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
