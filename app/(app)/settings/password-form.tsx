"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";

export default function PasswordForm() {
    const { signOut } = useAuth();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            await api.put("/api/me/password", {
                current_password: currentPassword,
                password: newPassword,
            });

            // backend revoga tokens → força novo login
            signOut();
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
            <div className="space-y-2">
                <Label>Senha atual</Label>
                <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label>Nova senha</Label>
                <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>

            <Button type="submit" disabled={loading}>
                Atualizar senha
            </Button>

            <p className="text-xs text-muted-foreground">
                Após alterar a senha, você será desconectado automaticamente.
            </p>
        </form>
    );
}
