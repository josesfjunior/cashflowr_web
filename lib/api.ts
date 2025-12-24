import axios from "axios";

/**
 * Lê cookie no browser
 * (funciona apenas se NÃO for httpOnly)
 */
function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;

    const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)"),
    );

    return match ? decodeURIComponent(match[2]) : null;
}

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 🔐 INJETAR TOKEN EM TODA REQUEST
api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        // 1️⃣ tenta do localStorage
        let token = localStorage.getItem("token");

        // 2️⃣ fallback para cookie
        if (!token) {
            token = getCookie("token");
        }

        if (token) {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log(token);
    }

    return config;
});
