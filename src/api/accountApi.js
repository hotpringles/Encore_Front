// src/api/accountApi.js
import api from "./client";

const SIGNUP_URL = "/accounts/signup/";
const LOGIN_URL = "/accounts/login/";
const LOGOUT_URL = "/accounts/logout/";
const PROFILE_URL = "/accounts/profile/";
const ACCOUNT_URL = "/accounts/";

// 로그인 (POST /accounts/login)
export const login = async (data) => {
  const res = await api.post(LOGIN_URL, data);
  const { access } = res.data;
  localStorage.setItem("accessToken", access);

  return res.data;
};

// 로그아웃 (POST /accounts/logout)
export const logout = async () => {
  await api.post(LOGOUT_URL);
  localStorage.removeItem("accessToken");
};

// 회원가입 (POST /accounts)
export const signUp = async (data) => {
  const res = await api.post(SIGNUP_URL, data);
  return res.data;
};

// 내 정보 수정 (PUT /accounts)
export const updateMyInfo = async (data) => {
  const res = await api.put(ACCOUNT_URL, data);
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
