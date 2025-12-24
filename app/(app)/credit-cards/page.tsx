"use client";

import { Button } from "@/components/ui/button";
import { CreditCardItem } from "@/components/credit-card-item";
import { CreditCardForm } from "@/components/credit-card-form";
import { useCreditCards } from "@/hooks/use-credit-cards";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import type { CreditCard, CreditCardFormData } from "@/types/credit-card";

export default function CreditCardsPage() {
    const { cards, loading, create, remove, update } = useCreditCards();

    const [open, setOpen] = useState(false);
    const [editingCard, setEditingCard] = useState<CreditCard | null>(null);

    if (loading) {
        return <p>Carregando cartões...</p>;
    }

    function handleCreate() {
        setEditingCard(null);
        setOpen(true);
    }

    function handleEdit(card: CreditCard) {
        setEditingCard(card);
        setOpen(true);
    }

    function handleSubmit(data: CreditCardFormData) {
        const payload = {
            name: data.name,
            currency: "BRL",
            account_type: "credit_card",
            credit_limit: data.credit_limit,
            closing_day: data.closing_day,
            due_day: data.due_day,
        };

        if (editingCard) {
            update(editingCard.id, payload);
        } else {
            create(payload);
        }

        setOpen(false);
        setEditingCard(null);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Cartões de Crédito</h1>

                <Button onClick={handleCreate}>Novo cartão</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => (
                    <CreditCardItem
                        key={card.id}
                        card={card}
                        onEdit={handleEdit}
                        onDelete={remove}
                    />
                ))}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingCard ? "Editar cartão" : "Novo cartão"}
                        </DialogTitle>
                    </DialogHeader>

                    <CreditCardForm
                        initialData={
                            editingCard
                                ? {
                                      name: editingCard.name,
                                      credit_limit:
                                          editingCard.credit_card_account
                                              .credit_limit,
                                      closing_day:
                                          editingCard.credit_card_account
                                              .closing_day,
                                      due_day:
                                          editingCard.credit_card_account
                                              .due_day,
                                  }
                                : undefined
                        }
                        onSubmit={handleSubmit}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
