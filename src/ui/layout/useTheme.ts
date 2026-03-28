import { useState, useEffect } from "react";

export interface UseThemeReturn {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function useTheme(): UseThemeReturn {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved: string | null = localStorage.getItem("theme");
    return saved === "dark";
  });

  useEffect(() => {
    // Clase .dark en <html> → activa las utilidades dark: de Tailwind
    document.documentElement.classList.toggle("dark", darkMode);
    // data-theme → compatibilidad con CSS legado del proyecto
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = (): void => setDarkMode((prev: boolean) => !prev);

  return { darkMode, toggleDarkMode };
}
