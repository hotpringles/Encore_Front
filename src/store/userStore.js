import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  hasTested: false,
  levelIcon: null,

  setUser: (profile) => set({ user: profile }),
  setHasTested: (value) => set({ hasTested: value }),
  logOut: () => set({ user: null, hasTested: false }),
  setLevelIcon: (levelIcon) => set({ levelIcon }),
}));
