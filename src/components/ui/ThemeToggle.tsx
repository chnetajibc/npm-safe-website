"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function getSavedTheme(): Theme | null {
  try {
    const savedTheme = window.localStorage.getItem("npm-safe-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  } catch {
    // Fall back to the operating system preference when storage is unavailable.
  }

  return null;
}

function getThemeSnapshot(): Theme {
  return getSavedTheme() ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

function getServerSnapshot(): Theme {
  return "light";
}

function subscribeToTheme(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  window.addEventListener("storage", callback);
  window.addEventListener("npm-safe-theme-change", callback);
  mediaQuery.addEventListener("change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("npm-safe-theme-change", callback);
    mediaQuery.removeEventListener("change", callback);
  };
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
  try {
    window.localStorage.setItem("npm-safe-theme", theme);
  } catch {
    // The active theme still changes when browser storage is unavailable.
  }
  window.dispatchEvent(new Event("npm-safe-theme-change"));
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerSnapshot);

  useEffect(() => {
    const savedTheme = getSavedTheme();
    if (savedTheme) document.documentElement.dataset.theme = savedTheme;
    else delete document.documentElement.dataset.theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() => applyTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={theme === "dark"}
      title={`Switch to ${nextTheme} mode`}
    >
      {theme === "dark" ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707m12.728 0-.707-.707M6.343 6.343l-.707-.707" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.003.803.401Z" />
        </svg>
      )}
    </button>
  );
}
