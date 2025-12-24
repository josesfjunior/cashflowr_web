"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleLogin() {
        if (!email || !password) {
            setError("Informe email e senha.");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const { data } = await api.post("/api/auth/login", {
                email,
                password,
            });

            const token = data?.token;
            if (!token) {
                throw new Error("Token não retornado pelo servidor.");
            }

            // 🔐 salva token
            localStorage.setItem("token", token);
            document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;

            router.push("/home");
        } catch (err: any) {
            setError(err?.response?.data?.error || "Email ou senha inválidos.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-3xl font-semibold">
                        Entrar
                    </CardTitle>
                    <CardDescription>
                        Acesse sua conta do CashFlowr
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="email@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Senha</Label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <Button
                        className="w-full h-11 gap-2 text-base"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                        Entrar
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
