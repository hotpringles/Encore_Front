// src/api/accountApi.js
import api from "./client";

// 로그인 (POST /accounts/login)
export const login = (data) => api.post("/accounts/login", data);

// 로그아웃 (POST /accounts/logout)
export const logout = () => api.post("/accounts/logout");

// 회원가입 (POST /accounts)
export const signUp = async (data) => {
  const res = await api.post("/accounts/signup", data);
  return res.data;
};

// 내 정보 수정 (PUT /accounts)
export const updateMyInfo = async (data) => {
  const res = await api.put("/accounts", data);
  return res.data;
};

// 특정 유저 조회 (GET /accounts/{userId})
export const fetchUser = async (id) => {
  const res = await api.get(`/accounts/${id}`);
  return res.data;
};

// 삭제 (DELETE /accounts)
export const deleteMyAccount = async () => {
  const res = await api.delete("/accounts");
  return res.data;
};
