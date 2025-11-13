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

export default api;
