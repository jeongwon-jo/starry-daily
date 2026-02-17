"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export type Theme = "dark" | "light";

type ThemeContextType = {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "theme";
const ThemeContext = createContext<ThemeContextType | null>(null);

const applyTheme = (theme: Theme) => {
  const html = document.documentElement;
  theme === "dark"
    ? html.classList.add("dark")
    : html.classList.remove("dark");
};

export const ThemeProvider = ({
  initialTheme = "dark",
  children,
}: {
  initialTheme?: Theme;
  children: React.ReactNode;
}) => {
  const supabase = createClient();
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const loadTheme = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        applyTheme("dark");
        return;
      }

      const darkMode = user.user_metadata?.dark_mode;

      const nextTheme =
        darkMode === false ? "light" : "dark";

      setTheme(nextTheme);
      applyTheme(nextTheme);
    };

    loadTheme();
  }, []);

  const updateTheme = async (nextTheme: Theme) => {
    setTheme(nextTheme);
    applyTheme(nextTheme);

    localStorage.setItem(STORAGE_KEY, nextTheme);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.auth.updateUser({
      data: {
        dark_mode: nextTheme === "dark",
      },
    });
  };

  const toggleTheme = () => {
    updateTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};
