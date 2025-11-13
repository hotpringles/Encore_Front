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
export const fetchOxQuizzes = () => api.get("/ox-quiz/").then((r) => r.data);

/**
 * [GET] /ox-quiz/{id}/
 * - 특정 OX 퀴즈 하나의 상세 정보를 가져오는 함수
 *
 * @param {number|string} id - 조회할 OX 퀴즈 ID
 */
export const fetchOxQuizDetail = (id) =>
  api.get(`/ox-quiz/${id}/`).then((r) => r.data);

/**
 * [PUT] /ox-quiz/{id}/
 * - OX 퀴즈 내용을 수정하는 함수
 *
 * @param {number|string} id - 수정할 OX 퀴즈 ID
 * @param {Object} data - 수정할 퀴즈 데이터 (질문, 정답, 해설 등)
 */
export const updateOxQuiz = (id, data) =>
  api.put(`/ox-quiz/${id}/`, data).then((r) => r.data);

/**
 * [DELETE] /ox-quiz/{id}/
 * - 특정 OX 퀴즈를 삭제하는 함수
 *
 * @param {number|string} id - 삭제할 OX 퀴즈 ID
 */
export const deleteOxQuiz = (id) => api.delete(`/ox-quiz/${id}/`); // 보통 삭제는 body 없이 상태코드만 돌려줌

/**
 * ==========================
 * 객관식(MC) 퀴즈 관련 API
 * ==========================
 */

/**
 * [GET] /mc-quiz/
 * - 객관식 퀴즈 전체 목록을 가져오는 함수
 */
export const fetchMcQuizzes = () => api.get("/mc-quiz/").then((r) => r.data);

/**
 * [GET] /mc-quiz/{id}/
 * - 특정 객관식 퀴즈 상세 정보를 가져오는 함수
 *
 * @param {number|string} id - 조회할 객관식 퀴즈 ID
 */
export const fetchMcQuizDetail = (id) =>
  api.get(`/mc-quiz/${id}/`).then((r) => r.data);

/**
 * [PUT] /mc-quiz/{id}/
 * - 객관식 퀴즈를 수정하는 함수
 *
 * @param {number|string} id - 수정할 객관식 퀴즈 ID
 * @param {Object} data - 수정할 데이터 (보기, 정답, 난이도 등)
 */
export const updateMcQuiz = (id, data) =>
  api.put(`/mc-quiz/${id}/`, data).then((r) => r.data);

/**
 * [DELETE] /mc-quiz/{id}/
 * - 특정 객관식 퀴즈를 삭제하는 함수
 *
 * @param {number|string} id - 삭제할 객관식 퀴즈 ID
 */
export const deleteMcQuiz = (id) => api.delete(`/mc-quiz/${id}/`);

/**
 * ==========================
 * 단답형(SC) 퀴즈 관련 API
 * ==========================
 */

/**
 * [GET] /sc-quiz/
 * - 단답형 퀴즈 전체 목록을 가져오는 함수
 */
export const fetchScQuizzes = () => api.get("/sc-quiz/").then((r) => r.data);

/**
 * [GET] /sc-quiz/{id}/
 * - 특정 단답형 퀴즈 상세 정보를 가져오는 함수
 *
 * @param {number|string} id - 조회할 단답형 퀴즈 ID
 */
export const fetchScQuizDetail = (id) =>
  api.get(`/sc-quiz/${id}/`).then((r) => r.data);

/**
 * [PUT] /sc-quiz/{id}/
 * - 단답형 퀴즈를 수정하는 함수
 *
 * @param {number|string} id - 수정할 단답형 퀴즈 ID
 * @param {Object} data - 수정 내용 (문제, 정답, 해설 등)
 */
export const updateScQuiz = (id, data) =>
  api.put(`/sc-quiz/${id}/`, data).then((r) => r.data);

/**
 * [DELETE] /sc-quiz/{id}/
 * - 특정 단답형 퀴즈를 삭제하는 함수
 *
 * @param {number|string} id - 삭제할 단답형 퀴즈 ID
 */
export const deleteScQuiz = (id) => api.delete(`/sc-quiz/${id}/`);

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
export const createQuiz = (data) =>
  api.post("/quiz/", data).then((r) => r.data);
