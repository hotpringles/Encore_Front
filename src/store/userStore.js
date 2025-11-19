import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  hasTested: false,
  levelIcon: null,

  setUser: (profile) =>
    set(() => {
      // newGrade를 함수 스코프에서 let으로 선언하고 초기화합니다.
      let newGrade = null;

      if (typeof profile.score === "number") {
        const score = profile.score;
        if (score >= 10000) {
          newGrade = "숲";
        } else if (score >= 4000) {
          newGrade = "나무";
        } else if (score >= 1000) {
          newGrade = "새싹";
        }
      }

      return { user: { ...profile, grade: newGrade }, levelIcon: newGrade };
    }),
  setHasTested: (value) => set({ hasTested: value }),
  logOut: () => set({ user: null, hasTested: false }),
  setLevelIcon: (value) => set({ levelIcon: value }),
}));
