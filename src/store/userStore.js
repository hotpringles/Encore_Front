import { create } from "zustand";

const getGradeFromScore = (score) => {
  if (typeof score !== "number") return null;
  if (score >= 10000) return "숲";
  if (score >= 4000) return "나무";
  if (score >= 1000) return "새싹";
  return null;
};

export const useUserStore = create((set) => ({
  user: null,
  hasTested: false,

  setUser: (profile) => {
    const newGrade = getGradeFromScore(profile.score);
    set({
      user: { ...profile, grade: newGrade },
    });
  },
  setHasTested: (value) => set({ hasTested: value }),
  logOut: () => set({ user: null, hasTested: false }),
}));
