// src/api/userApi.js
import api from "./client";

/**
 * [POST] /accounts/signup/
 * 회원가입
 *
 * @param {{ username: string, password: string, ... }} payload
 *  - 백엔드에서 요구하는 필드들(예: username, password, email 등)
 * @returns {Promise<any>} 생성된 유저 정보 또는 토큰이 담긴 응답
 */
export const signUp = async (payload) => {
  const res = await api.post("/accounts/signup/", payload);
  return res.data;
};

/**
 * [POST] /accounts/login/
 * 로그인
 *
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ access?: string, refresh?: string, user?: any }>}
 *  - 일반적으로 access / refresh / user 같은 필드를 돌려줄 것이라 가정
 */
export const login = async (credentials) => {
  const res = await api.post("/accounts/login/", credentials);
  return res.data;
};

/**
 * [POST] /accounts/token_refresh/
 * 토큰 재발급 (refresh token으로 access token 다시 받기)
 *
 * @param {string} refreshToken - 저장해 둔 refresh 토큰 값
 * @returns {Promise<{ access: string }>} 새 access 토큰
 */
export const refreshToken = async (refreshToken) => {
  const res = await api.post("/accounts/token_refresh/", {
    refresh: refreshToken, // 백엔드가 다른 키를 쓰면 여기를 맞춰주면 됨
  });
  return res.data;
};

/**
 * [GET] /accounts/profile/
 * 현재 로그인한 사용자 정보 가져오기
 * (Authorization 헤더에 access 토큰이 붙어 있어야 함)
 *
 * @returns {Promise<any>} 유저 프로필 정보
 */
export const fetchProfile = async () => {
  const res = await api.get("/accounts/profile/");
  return res.data;
};
