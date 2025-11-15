import { create } from "zustand";

export const useNewsStore = create((set) => ({
  newsGroup: [],
  selectedNewsGroup: [],

  setNewsGroup: (newsGroup) => set({ newsGroup }),
  setSelectedNewsGroup: (selectedNewsGroup) => set({ selectedNewsGroup }),
}));
