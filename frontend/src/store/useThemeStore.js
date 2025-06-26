import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("echo-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("echo-theme", theme);
    set({ theme });
  },
}));
