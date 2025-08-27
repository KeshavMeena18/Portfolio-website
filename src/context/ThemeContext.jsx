import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const getInitial = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };
  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    const root = document.documentElement;
    if (theme === "dark") {
      root.style.setProperty("--bg", "rgb(10 10 12)");
      root.style.setProperty("--fg", "rgb(243 244 246)");
      root.style.setProperty("--card", "rgb(17 24 39)");
    } else {
      root.style.setProperty("--bg", "rgb(250 250 255)");
      root.style.setProperty("--fg", "rgb(17 24 39)");
      root.style.setProperty("--card", "white");
    }
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
