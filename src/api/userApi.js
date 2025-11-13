// src/api/userApi.js
import api from "./client";

/**
 * [POST] /accounts
 * - 회원가입(새 계정 생성)을 요청하는 함수
 * - 아이디, 비밀번호, 닉네임 등 폼 데이터를 넘겨줌
 *
 * @param {Object} data - 회원가입에 필요한 정보 (username, password 등)
 */
export const signUp = (data) => api.post("/accounts", data).then((r) => r.data);

/**
 * [PUT] /accounts
 * - 내 계정 정보를 수정하는 함수
 * - 예: 닉네임, 선호 난이도, 구독 설정 등
 *
 * @param {Object} data - 수정할 프로필 정보
 */
export const updateMyInfo = (data) =>
  api.put("/accounts", data).then((r) => r.data);

/**
 * [GET] /accounts/{userId}
 * - 특정 유저의 정보를 조회하는 함수
 * - 관리자 페이지나 친구 프로필 보기 등에 사용 가능
 *
 * @param {number|string} id - 조회할 유저 ID
 */
export const fetchUser = (id) => api.get(`/accounts/${id}`).then((r) => r.data);

/**
 * [DELETE] /accounts
 * - 내 계정을 탈퇴/삭제하는 함수
 * - 일반적으로 “회원 탈퇴” 버튼에 연결
 */
export const deleteMyAccount = () =>
  api.delete("/accounts").then((r) => r.data);
