"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

const ThemeContext = createContext<unknown>(null);

const applyTheme = (theme: Theme) => {
	const html = document.documentElement;
	theme === "dark" ? html.classList.add("dark") : html.classList.remove("dark");
};

export const ThemeProvider = ({
	initialTheme = "dark",
	children,
}: {
	initialTheme?: Theme;
	children: React.ReactNode;
}) => {
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window === "undefined") {
			return initialTheme;
		}

		const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
		return stored ?? initialTheme;
	});

	useEffect(() => {
		applyTheme(theme);
	}, [theme]);

	const updateTheme = (nextTheme: Theme) => {
		setTheme(nextTheme);
		localStorage.setItem(STORAGE_KEY, nextTheme);
		// TODO: 서버 DB 저장
	};

	const toggleTheme = () => {
		updateTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<ThemeContext.Provider
			value={{ theme, setTheme: updateTheme, toggleTheme }}
		>
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
