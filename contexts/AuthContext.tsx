"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

/* ============================
 * Types
 * ============================ */

export type User = {
    id: string;
    email: string;
    name: string;
    nickname?: string | null;
    birth_date?: string | null;
};

interface AuthContextData {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    signIn(email: string, password: string): Promise<void>;
    signOut(): void;
    refreshUser(): Promise<void>;
}

/* ============================
 * Context
 * ============================ */

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

/* ============================
 * Provider
 * ============================ */

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const [token, setToken] = useState<string | null>(() => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem("token");
    });

    const [user, setUser] = useState<User | null>(null);

    const isAuthenticated = !!token;

    /* ============================
     * Sign Out
     * ============================ */
    const signOut = useCallback(() => {
        localStorage.removeItem("token");
        document.cookie = "token=; path=/; max-age=0";
        setToken(null);
        setUser(null);
        router.push("/login");
    }, [router]);

    /* ============================
     * Load user from /api/me
     * ============================ */
    const loadUser = useCallback(async () => {
        try {
            const { data } = await api.get<User>("/api/me");
            setUser(data);
        } catch {
            signOut();
        }
    }, [signOut]);

    /* ============================
     * React to token changes
     * ============================ */
    useEffect(() => {
        if (!token) return;

        const syncUser = async () => {
            await loadUser();
        };

        syncUser();
    }, [token, loadUser]);

    /* ============================
     * Refresh user
     * ============================ */
    const refreshUser = useCallback(async () => {
        await loadUser();
    }, [loadUser]);

    /* ============================
     * Sign In
     * ============================ */
    async function signIn(email: string, password: string) {
        const { data } = await api.post("/api/auth/login", {
            email,
            password,
        });

        localStorage.setItem("token", data.token);
        setToken(data.token);

        router.push("/home");
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated,
                signIn,
                signOut,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

/* ============================
 * Hook
 * ============================ */

export function useAuth() {
    return useContext(AuthContext);
}
