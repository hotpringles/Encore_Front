import { create } from "zustand";

export const useUiStore = create((set) => ({
  isChatBotVisible: false,
  isMenuVisible: false,

  setIsMenuVisible: (value) => set({ isMenuVisible: value }),
  setIsChatBotVisible: (value) => set({ isChatBotVisible: value }),

  closMenu: () => set({ isMenuVisible: false }),
}));
