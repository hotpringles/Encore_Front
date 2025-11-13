// src/api/summaryApi.js
import api from "./client";

/**
 * [GET] /summary-group/
 * - 뉴스 요약 전체 목록을 가져오는 함수
 * - 예: 요약 리스트 페이지, 대시보드 등에서 사용
 */
export const fetchSummaries = () =>
  api
    .get("/summary-group/", {
      params: {
        ordering: "-id", // 백엔드 규칙에 맞게 필드명/값 설정
      },
    })
    .then((res) => res.data);

/**
 * [GET] /summary-group/{id}/
 * - 특정 요약 하나의 상세 정보를 가져오는 함수
 * - 예: 카드 클릭 시 상세 페이지, 모달 등에서 사용
 *
 * @param {number|string} id - 조회할 요약의 ID
 */
export const fetchSummaryDetail = (id) =>
  api.get(`/summary-group/${id}/`).then((res) => res.data);

/**
 * [POST] /summary-group/
 * - 새로운 요약을 생성하는 함수
 * - body 데이터(예: article, level, content 등)는 백엔드 스펙에 맞춰서 전달
 *
 * @param {Object} data - 생성할 요약 데이터
 */
export const createSummary = (data) =>
  api.post("/summary-group/", data).then((res) => res.data);

/**
 * [PUT] /summary-group/{id}/
 * - 기존 요약을 수정하는 함수 (전체 내용 교체 느낌)
 * - 부분 수정이 필요하면 PATCH 엔드포인트가 따로 있는지 확인
 *
 * @param {number|string} id - 수정할 요약의 ID
 * @param {Object} data - 수정할 필드를 포함한 데이터
 */
export const updateSummary = (id, data) =>
  api.put(`/summary-group/${id}/`, data).then((res) => res.data);

/**
 * [DELETE] /summary-group/{id}/
 * - 특정 요약을 삭제하는 함수
 *
 * @param {number|string} id - 삭제할 요약의 ID
 */
export const deleteSummary = (id) =>
  api.delete(`/summary-group/${id}/`).then((res) => res.data);
