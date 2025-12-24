"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

type AccountType = {
    id: string;
    code: string;
    description: string;
};

export default function NewAccountPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        accountType: "",
        initialBalance: "",
    });

    const [types, setTypes] = useState<AccountType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadAccountTypes() {
            try {
                const { data } = await api.get("/api/account-types");
                setTypes(data);
            } catch {
                setError("Erro ao carregar tipos de conta.");
            }
        }

        loadAccountTypes();
    }, []);

    async function handleSubmit() {
        if (!form.name || !form.accountType) {
            setError("Preencha todos os campos obrigatórios.");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            await api.post("/api/accounts", {
                name: form.name,
                currency: "BRL",
                account_type: form.accountType,
                initial_balance: form.initialBalance || "0.00",
            });

            router.push("/accounts");
        } catch (err: any) {
            setError(err?.response?.data?.error || "Erro ao criar conta.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full px-6 py-6">
            <div className="mx-auto max-w-4xl space-y-6">
                {/* Page header */}
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Nova Conta
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Cadastre uma nova conta financeira
                    </p>
                </div>

                <Card>
                    <CardContent className="space-y-6 pt-6">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {/* Nome */}
                        <div className="space-y-2">
                            <Label>Nome da Conta</Label>
                            <Input
                                placeholder="Ex: Conta Banco do Brasil"
                                value={form.name}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                                disabled={loading}
                            />
                        </div>

                        {/* Tipo */}
                        <div className="space-y-2">
                            <Label>Tipo de Conta</Label>
                            <Select
                                value={form.accountType}
                                onValueChange={(value) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        accountType: value,
                                    }))
                                }
                                disabled={loading}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>

                                <SelectContent>
                                    {types.map((type) => (
                                        <SelectItem
                                            key={type.id}
                                            value={type.code}
                                        >
                                            {type.description}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Saldo Inicial */}
                        <div className="space-y-2">
                            <Label>Saldo Inicial</Label>
                            <Input
                                type="number"
                                placeholder="0.00"
                                value={form.initialBalance}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        initialBalance: e.target.value,
                                    }))
                                }
                                disabled={loading}
                            />
                            <p className="text-xs text-muted-foreground">
                                Opcional — pode ser ajustado depois.
                            </p>
                        </div>

                        {/* Moeda */}
                        <div className="space-y-2">
                            <Label>Moeda</Label>
                            <Input value="BRL" disabled />
                        </div>

                        <div className="flex justify-end">
                            <Button
                                className="h-11 gap-2"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading && (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                )}
                                Criar Conta
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
