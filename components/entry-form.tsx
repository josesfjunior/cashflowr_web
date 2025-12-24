"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useCategories } from "@/hooks/use-categories";
import { useAccounts } from "@/hooks/use-accounts";
import { Entry } from "@/services/entries";
import { formatBRL, parseBRL } from "@/utils/currency";

interface EntryFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<Entry>) => Promise<void>;
    initialData?: Entry | null;
}

export function EntryForm({
    open,
    onClose,
    onSubmit,
    initialData,
}: EntryFormProps) {
    const { categories } = useCategories();
    const { accounts, loading: accountsLoading } = useAccounts();

    const [form, setForm] = useState<Partial<Entry>>(() => ({
        name: initialData?.name ?? "",
        amount: initialData?.amount ?? 0,
        type: initialData?.type ?? "expense",
        date: initialData?.date ?? new Date().toISOString().slice(0, 10),
        category_id: initialData?.category_id ?? "",
        account_id: initialData?.account_id ?? "",
    }));

    const [amountDisplay, setAmountDisplay] = useState(() =>
        formatBRL(form.amount ?? 0),
    );

    function update<K extends keyof Entry>(key: K, value: Entry[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    function handleAmountChange(value: string) {
        setAmountDisplay(value);
        update("amount", parseBRL(value));
    }

    async function handleSubmit() {
        await onSubmit(form);
        onClose();
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {initialData ? "Editar lançamento" : "Novo lançamento"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Descrição */}
                    <Input
                        placeholder="Descrição"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                    />

                    {/* Valor (BRL) */}
                    <Input
                        placeholder="Valor"
                        value={amountDisplay}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        inputMode="numeric"
                    />

                    {/* Tipo */}
                    <Select
                        value={form.type}
                        onValueChange={(v) =>
                            update("type", v as "income" | "expense")
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="income">Receita</SelectItem>
                            <SelectItem value="expense">Despesa</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Data */}
                    <Input
                        type="date"
                        value={form.date}
                        onChange={(e) => update("date", e.target.value)}
                    />

                    {/* Categoria */}
                    <Select
                        value={form.category_id}
                        onValueChange={(v) => update("category_id", v)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((c) => (
                                <SelectItem key={c.id} value={c.id}>
                                    {c.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Conta */}
                    <Select
                        value={form.account_id}
                        onValueChange={(v) => update("account_id", v)}
                        disabled={accountsLoading}
                    >
                        <SelectTrigger>
                            <SelectValue
                                placeholder={
                                    accountsLoading
                                        ? "Carregando contas..."
                                        : "Conta"
                                }
                            />
                        </SelectTrigger>

                        <SelectContent>
                            {accounts.map((a) => (
                                <SelectItem key={a.id} value={a.id}>
                                    <div className="flex flex-col">
                                        <span className="font-medium">
                                            {a.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {a.account_type.description}
                                        </span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit}>
                        {initialData ? "Salvar" : "Criar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
