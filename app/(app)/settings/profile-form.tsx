"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";

export default function ProfileForm() {
    const { user, refreshUser } = useAuth();

    const [name, setName] = useState(user?.name ?? "");
    const [nickname, setNickname] = useState(user?.nickname ?? "");
    const [birthDate, setBirthDate] = useState(user?.birth_date ?? "");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            await api.put("/api/me", {
                name,
                nickname,
                birth_date: birthDate || null,
            });

            await refreshUser();
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
            <div className="space-y-2">
                <Label>Nome completo</Label>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                />
            </div>

            <div className="space-y-2">
                <Label>Apelido</Label>
                <Input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Como prefere ser chamado"
                />
            </div>

            <div className="space-y-2">
                <Label>Data de nascimento</Label>
                <Input
                    type="date"
                    value={birthDate ?? ""}
                    onChange={(e) => setBirthDate(e.target.value)}
                />
            </div>

            <Button type="submit" disabled={loading}>
                Salvar alterações
            </Button>
        </form>
    );
}
