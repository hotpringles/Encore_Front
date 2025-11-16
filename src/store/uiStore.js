import { create } from "zustand";

export const useUiStore = create((set) => ({
  isChatBotVisible: false,
  isMenuVisible: false,

  setIsMenuVisible: (value) => set({ isMenuVisible: value }),
  setIsChatBotVisible: (value) => set({ isChatBotVisible: value }),

  toggleMenu: () => set((state) => ({ isMenuVisible: !state.isMenuVisible })),
  closeMenu: () => set({ isMenuVisible: false }),
  toggleChatBot: () =>
    set((state) => ({ isChatBotVisible: !state.isChatBotVisible })),
}));
