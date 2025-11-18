// src/api/accountApi.js
import api from "./client";

const SIGNUP_URL = "/accounts/signup/";
const LOGIN_URL = "/accounts/login/";
const LOGOUT_URL = "/accounts/logout/";
const PROFILE_URL = "/accounts/profile/";
const ACCOUNT_URL = "/accounts/";
const PASSWORD_UPADTE_URL = "/accounts/password-change/";

// 로그인 (POST /accounts/login)
export const login = async (data) => {
  const res = await api.post(LOGIN_URL, data);
  // [수정] access 토큰과 refresh 토큰을 모두 받아옵니다.
  const { access, refresh } = res.data;
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh); // [추가] refresh 토큰을 localStorage에 저장합니다.

  return res.data;
};

// 로그아웃 (POST /accounts/logout)
export const logout = async () => {
  // [수정] 로그아웃 시 서버에 refresh 토큰을 전송하여 만료시킵니다.
  const refreshToken = localStorage.getItem("refreshToken");
  await api.post(LOGOUT_URL, { refresh: refreshToken });
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken"); // [추가] localStorage에서 refresh 토큰도 제거합니다.
};

// 회원가입 (POST /accounts)
export const signUp = async (data) => {
  const res = await api.post(SIGNUP_URL, data);
  return res.data;
};

// 내 정보 수정 (PUT /accounts)
export const updateMyInfo = async (data) => {
  const res = await api.patch(PROFILE_URL, data);
  return res.data;
};

// 비밀번호 수정(PATCH /accounts)
export const updateMyPassword = async (data) => {
  const res = await api.post(PASSWORD_UPADTE_URL, data);
  return res.data;
};

export const fetchProfile = async () => {
  const res = await api.get(PROFILE_URL);
  return res.data;
};

// 삭제 (DELETE /accounts)
export const deleteMyAccount = async () => {
  const res = await api.delete(ACCOUNT_URL);
  return res.data;
};
