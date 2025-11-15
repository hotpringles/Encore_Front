import { create } from "zustand";

export const useUiStore = create((set) => ({
  isChatBotVisible: false,
  isMenuVisible: false,

  toggleMenu: () =>
    set((state) => ({
      isMenuVisible: !state.isMenuVisible,
    })),
  toggleChatBot: () =>
    set((state) => ({
      isChatBotVisible: !state.isChatBotVisible,
    })),
  clostMenu: () => set({ isMenuVisible: false }),
}));
