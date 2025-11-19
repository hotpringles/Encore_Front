import api from "./client";

export const fetchQna = async (userMessage) => {
  const res = await api.post("/quiz/", userMessage);
  return res.data;
};
