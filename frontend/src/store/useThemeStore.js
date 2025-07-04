import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("echo-theme") || "lemonade",
  setTheme: (theme) => {
    localStorage.setItem("echo-theme", theme);
    set({ theme });
  },
}));
