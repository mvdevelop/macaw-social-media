"use client";

import { useTheme } from "@/context/ThemeProvider";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition"
      title={theme === "light" ? "Dark mode" : "Light mode"}
    >
      {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
    </button>
  );
}
