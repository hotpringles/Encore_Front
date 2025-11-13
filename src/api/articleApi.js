// src/api/articleApi.js
import api from "./client";

/**
 * [GET] /article/
 * - 뉴스(기사) 전체 목록을 가져오는 함수
 * - 예: 메인 페이지, 카드/캐러셀용 리스트 데이터
 */
export const fetchArticles = () =>
  api
    .get("/article/", {
      params: {
        ordering: "-id", // 백엔드 규칙에 맞게 필드명/값 설정
      },
    })
    .then((res) => res.data);
/**
 * [GET] /article/{id}/
 * - 특정 기사 하나의 상세 정보를 가져오는 함수
 *
 * @param {number|string} id - 조회할 기사 ID
 */
export const fetchArticleDetail = (id) =>
  api.get(`/article/${id}/`).then((res) => res.data);

/**
 * [POST] /article/
 * - 새로운 기사를 생성하는 함수
 * - 주로 관리자용/백오피스에서 사용될 가능성이 높음
 *
 * @param {Object} data - 생성할 기사 데이터 (title, content, url 등)
 */
export const createArticle = (data) =>
  api.post("/article/", data).then((res) => res.data);

/**
 * [PUT] /article/{id}/
 * - 기존 기사 전체를 수정하는 함수 (전체 교체 느낌)
 * - 부분 수정이 필요하면 PATCH 엔드포인트를 따로 쓰는지 확인
 *
 * @param {number|string} id - 수정할 기사 ID
 * @param {Object} data - 수정할 내용이 담긴 데이터
 */
export const updateArticle = (id, data) =>
  api.put(`/article/${id}/`, data).then((res) => res.data);

/**
 * [DELETE] /article/{id}/
 * - 특정 기사를 삭제하는 함수
 *
 * @param {number|string} id - 삭제할 기사 ID
 */
export const deleteArticle = (id) =>
  api.delete(`/article/${id}/`).then((res) => res.data);
