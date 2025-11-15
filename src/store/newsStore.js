import { create } from "zustand";

export const useNewsStore = create((set) => ({
  newsGroup: [],
  selectedNewsGroup: [],
  news: null,

  setNewsGroup: (newsGroup) => set({ newsGroup }),
  setSelectedNewsGroup: (selectedNewsGroup) => set({ selectedNewsGroup }),
  setNews: (oneNews) => set({ oneNews }),
}));
