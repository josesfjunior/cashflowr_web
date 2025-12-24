"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type { CreditCardFormData } from "@/types/credit-card";

interface CreditCardFormProps {
    initialData?: CreditCardFormData;
    onSubmit: (data: CreditCardFormData) => void;
}

export function CreditCardForm({ initialData, onSubmit }: CreditCardFormProps) {
    const [form, setForm] = useState<CreditCardFormData>(
        initialData ?? {
            name: "",
            credit_limit: "",
            closing_day: 1,
            due_day: 1,
        },
    );

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                name === "closing_day" || name === "due_day"
                    ? Number(value)
                    : value,
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit(form);
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Nome */}
            <div className="space-y-2">
                <Label htmlFor="name">Nome do cartão</Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="Ex: Nubank Platinum"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Limite */}
            <div className="space-y-2">
                <Label htmlFor="credit_limit">Limite de crédito</Label>
                <Input
                    id="credit_limit"
                    name="credit_limit"
                    placeholder="Ex: 3500.00"
                    value={form.credit_limit}
                    onChange={handleChange}
                    inputMode="decimal"
                    required
                />
            </div>

            {/* Datas */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="closing_day">Dia de fechamento</Label>
                    <Input
                        id="closing_day"
                        name="closing_day"
                        type="number"
                        min={1}
                        max={31}
                        value={form.closing_day}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="due_day">Dia de vencimento</Label>
                    <Input
                        id="due_day"
                        name="due_day"
                        type="number"
                        min={1}
                        max={31}
                        value={form.due_day}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <Button type="submit" className="w-full">
                {initialData ? "Salvar alterações" : "Criar cartão"}
            </Button>
        </form>
    );
}
