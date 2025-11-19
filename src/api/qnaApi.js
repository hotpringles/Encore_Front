import api from "./client";

export const fetchQna = async (userMessage) => {
  const res = await api.post("/qna/", userMessage);
  return res.data;
};
