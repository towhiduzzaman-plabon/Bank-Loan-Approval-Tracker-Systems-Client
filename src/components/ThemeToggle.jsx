import { FiMoon, FiSun } from "react-icons/fi";
import React, { useState, useEffect } from "react";


const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("loanlink-theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("loanlink-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? <FiMoon /> : <FiSun />}
    </button>
  );
};

export default ThemeToggle;
