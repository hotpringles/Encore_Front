import axios from "axios";
import { refreshToken } from "./accountApi";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/accounts", // 백엔드 API 기본 URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. 요청 인터셉터: 모든 요청에 액세스 토큰을 자동으로 추가합니다.
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 2. 응답 인터셉터: 401 에러 발생 시 토큰 갱신을 시도합니다.
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 아직 토큰 갱신 시도를 하지 않았다면
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 토큰 갱신이 이미 진행 중이면, 갱신이 끝날 때까지 기다립니다.
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshToken();
        processQueue(null, newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest); // 실패했던 원래 요청을 다시 시도
      } catch (refreshError) {
        processQueue(refreshError, null);
        // 갱신 실패 시 로그아웃 처리 (App.jsx 등에서 처리하거나 여기서 직접 처리)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // 로그인 페이지로 리디렉션
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
