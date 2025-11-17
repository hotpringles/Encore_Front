// src/api/quizApi.js
import api from "./client";

/**
 * ==========================
 * OX 퀴즈 관련 API
 * ==========================
 */

/**
 * [GET] /ox-quiz/
 * - OX 퀴즈 전체 목록을 가져오는 함수
 * - 예: OX 퀴즈 리스트 페이지, 레벨 테스트 문제 로딩 등
 */
export const fetchOxQuizzes = async () => {
  const res = await api.get("/ox-quiz/");
  return res.data.results;
};

/**
 * [GET] /ox-quiz/{id}/
 * - 특정 OX 퀴즈 하나의 상세 정보를 가져오는 함수
 *
 * @param {number|string} id - 조회할 OX 퀴즈 ID
 */
export const fetchOxQuizDetail = async (id) => {
  const res = await api.get(`/ox-quiz/?summary=${id}`);
  return res.data.results;
};

/**
 * [PUT] /ox-quiz/{id}/
 * - OX 퀴즈 내용을 수정하는 함수
 *
 * @param {number|string} id - 수정할 OX 퀴즈 ID
 * @param {Object} data - 수정할 퀴즈 데이터 (질문, 정답, 해설 등)
 */
export const updateOxQuiz = async (id, data) => {
  const res = await api.put(`/ox-quiz/${id}`, data);
  return res.data.results;
};

/**
 * [DELETE] /ox-quiz/{id}/
 * - 특정 OX 퀴즈를 삭제하는 함수
 *
 * @param {number|string} id - 삭제할 OX 퀴즈 ID
 */
export const deleteOxQuiz = async (id) => {
  const res = await api.delete(`/ox-quiz/${id}`);
  return res.data.results; // 삭제 성공 시 응답 데이터를 반환 (보통은 비어있음)
};

/**
 * ==========================
 * 객관식(MC) 퀴즈 관련 API
 * ==========================
 */

/**
 * [GET] /mc-quiz/
 * - 객관식 퀴즈 전체 목록을 가져오는 함수
 */
export const fetchMcQuizzes = async () => {
  const res = await api.get("/mc-quiz/");
  return res.data.results;
};

/**
 * [GET] /mc-quiz/{id}/
 * - 특정 객관식 퀴즈 상세 정보를 가져오는 함수
 *
 * @param {number|string} id - 조회할 객관식 퀴즈 ID
 */
export const fetchMcQuizDetail = async (id) => {
  const res = await api.get(`/mc-quiz/?summary=${id}`);
  return res.data.results;
};

/**
 * [PUT] /mc-quiz/{id}/
 * - 객관식 퀴즈를 수정하는 함수
 *
 * @param {number|string} id - 수정할 객관식 퀴즈 ID
 * @param {Object} data - 수정할 데이터 (보기, 정답, 난이도 등)
 */
export const updateMcQuiz = async (id, data) => {
  const res = await api.put(`/mc-quiz/${id}/`, data);
  return res.data.results;
};

/**
 * [DELETE] /mc-quiz/{id}/
 * - 특정 객관식 퀴즈를 삭제하는 함수
 *
 * @param {number|string} id - 삭제할 객관식 퀴즈 ID
 */
export const deleteMcQuiz = async (id) => {
  const res = await api.delete(`/mc-quiz/${id}/`);
  return res.data.results;
};

/**
 * ==========================
 * 단답형(SC) 퀴즈 관련 API
 * ==========================
 */

/**
 * [GET] /sc-quiz/
 * - 단답형 퀴즈 전체 목록을 가져오는 함수
 */
export const fetchSaQuizzes = async () => {
  const res = await api.get("/sc-quiz/");
  return res.data.results;
};

/**
 * [GET] /sc-quiz/{id}/
 * - 특정 단답형 퀴즈 상세 정보를 가져오는 함수
 *
 * @param {number|string} id - 조회할 단답형 퀴즈 ID
 */
export const fetchSaQuizDetail = async (id) => {
  const res = await api.get(`/sc-quiz/?summary=${id}`);
  return res.data.results;
};

/**
 * [PUT] /sc-quiz/{id}/
 * - 단답형 퀴즈를 수정하는 함수
 *
 * @param {number|string} id - 수정할 단답형 퀴즈 ID
 * @param {Object} data - 수정 내용 (문제, 정답, 해설 등)
 */
export const updateSaQuiz = async (id, data) => {
  const res = await api.put(`/sc-quiz/${id}/`, data);
  return res.data.results;
};

/**
 * [DELETE] /sc-quiz/{id}/
 * - 특정 단답형 퀴즈를 삭제하는 함수
 *
 * @param {number|string} id - 삭제할 단답형 퀴즈 ID
 */
export const deleteSaQuiz = async (id) => {
  const res = await api.delete(`/sc-quiz/${id}/`);
  return res.data.results;
};

/**
 * ==========================
 * 공통 퀴즈 생성 API
 * ==========================
 */

/**
 * [POST] /quiz/
 * - 새로운 퀴즈를 생성하는 함수
 * - 백엔드 설계에 따라 data 안에 type(ox/mc/sc), question, options 등의 정보를 담아 보낼 수 있음
 *
 * @param {Object} data - 생성할 퀴즈 데이터
 */
export const createQuiz = async (data) => {
  const res = await api.post("/quiz/", data);
  return res.data.results;
};
