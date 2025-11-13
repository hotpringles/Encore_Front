// src/api/client.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 예: http://127.0.0.1:8000
  withCredentials: false, // 쿠키 인증 쓰면 true 로 변경
});

// 요청/응답 인터셉터에서 토큰 달기, 에러 공통 처리도 여기서 가능
// api.interceptors.request.use((config) => { ... });

export default api;
