"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextData {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    // 🔹 Inicialização
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as Theme | null;

        const initialTheme =
            storedTheme ??
            (window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light");

        setTheme(initialTheme);
        document.documentElement.classList.toggle(
            "dark",
            initialTheme === "dark",
        );
        setMounted(true);
    }, []);

    function toggleTheme() {
        setTheme((prev) => {
            const next = prev === "dark" ? "light" : "dark";

            document.documentElement.classList.toggle("dark", next === "dark");
            localStorage.setItem("theme", next);

            return next;
        });
    }

    // ⚠️ Evita hydration mismatch
    if (!mounted) return null;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme deve ser usado dentro de ThemeProvider");
    }
    return context;
}
