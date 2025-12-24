"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Plus, MoreVertical, Pencil, Trash } from "lucide-react";

type Account = {
    id: string;
    name: string;
    currency: string;
    active: boolean;
    account_type: {
        code: string;
    };
    bank_account?: {
        initial_balance: string;
    };
    wallet_account?: {
        initial_balance: string;
    };
    credit_card_account?: {
        credit_limit: string;
    };
    investment_account?: {
        initial_balance: string;
        goal?: string;
    };
};

export default function AccountsPage() {
    const router = useRouter();
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAccounts() {
            try {
                const { data } = await api.get("/api/accounts");
                setAccounts(data);
            } catch (err) {
                console.error("Erro ao carregar contas", err);
            } finally {
                setLoading(false);
            }
        }

        loadAccounts();
    }, []);

    function formatMoney(value?: string) {
        if (!value) return "—";
        return Number(value).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    function getMainValue(account: Account) {
        if (account.bank_account)
            return formatMoney(account.bank_account.initial_balance);

        if (account.wallet_account)
            return formatMoney(account.wallet_account.initial_balance);

        if (account.credit_card_account)
            return `Limite: ${formatMoney(
                account.credit_card_account.credit_limit,
            )}`;

        if (account.investment_account)
            return formatMoney(account.investment_account.initial_balance);

        return "—";
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Contas</h1>

                <Button onClick={() => router.push("/accounts/new")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Conta
                </Button>
            </div>

            {/* Conteúdo */}
            {loading ? (
                <p>Carregando contas...</p>
            ) : accounts.length === 0 ? (
                <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                        Nenhuma conta cadastrada ainda.
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {accounts.map((account) => (
                        <Card key={account.id}>
                            <CardHeader className="flex flex-row items-start justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-lg">
                                        {account.name}
                                    </CardTitle>

                                    <Badge variant="secondary">
                                        {account.account_type.code}
                                    </Badge>
                                </div>

                                {/* Ações */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                        >
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            onClick={() =>
                                                router.push(
                                                    `/accounts/${account.id}/edit`,
                                                )
                                            }
                                        >
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Editar
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            className="text-red-600"
                                            onClick={() =>
                                                console.log(
                                                    "Excluir conta",
                                                    account.id,
                                                )
                                            }
                                        >
                                            <Trash className="mr-2 h-4 w-4" />
                                            Excluir
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardHeader>

                            <CardContent>
                                <p className="text-xl font-bold">
                                    {getMainValue(account)}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
