import { useEffect, useState } from "react";
export default function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "dark",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#141714" : "#f5f4ec");
    try {
      localStorage.setItem("nirmik-theme", theme);
    } catch {
      /* Theme still works if storage is unavailable. */
    }
  }, [theme]);
  return [
    theme,
    () => setTheme((value) => (value === "dark" ? "light" : "dark")),
  ];
}
