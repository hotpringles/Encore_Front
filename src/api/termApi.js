// src/api/termApi.js
import api from "./client";

/**
 * [GET] /term/
 * - 모든 경제용어(용어 사전) 목록을 가져오는 함수
 * - 예: 용어 리스트 페이지, 검색 기능 등에 사용
 */
export const fetchTerms = () => api.get("/term/").then((res) => res.data);

/**
 * [GET] /term/{id}/
 * - 특정 경제용어의 상세 정보를 가져오는 함수
 *
 * @param {number|string} id - 조회할 용어의 ID
 */
export const fetchTermDetail = (id) =>
  api.get(`/term/${id}/`).then((res) => res.data);

/**
 * [POST] /term/
 * - 새로운 경제용어를 생성하는 함수
 * - 관리자 페이지나 내부 툴에서 용어를 추가할 때 사용
 *
 * @param {Object} data - 생성할 용어 데이터 (term, definition, level 등)
 */
export const createTerm = (data) =>
  api.post("/term/", data).then((res) => res.data);

/**
 * [PUT] /term/{id}/
 * - 기존 경제용어 정보를 수정하는 함수 (전체 교체)
 * - 부분 수정이 필요하면 PATCH 엔드포인트 확인
 *
 * @param {number|string} id - 수정할 용어의 ID
 * @param {Object} data - 수정할 내용이 담긴 데이터
 */
export const updateTerm = (id, data) =>
  api.put(`/term/${id}/`, data).then((res) => res.data);

/**
 * [DELETE] /term/{id}/
 * - 특정 경제용어를 삭제하는 함수
 *
 * @param {number|string} id - 삭제할 용어의 ID
 */
export const deleteTerm = (id) =>
  api.delete(`/term/${id}/`).then((res) => res.data);
