"use client";

import { useEffect, useState } from "react";
import { CreditCard } from "@/types/credit-card";
import {
    listCreditCards,
    createCreditCard,
    updateCreditCard,
    deleteCreditCard,
    CreditCardPayload,
} from "../services/credit-cards";

export function useCreditCards() {
    const [cards, setCards] = useState<CreditCard[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchCards() {
        setLoading(true);
        try {
            setCards(await listCreditCards());
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCards();
    }, []);

    return {
        cards,
        loading,

        create: async (data: CreditCardPayload) => {
            await createCreditCard(data);
            fetchCards();
        },

        update: async (id: string, data: Partial<CreditCardPayload>) => {
            await updateCreditCard(id, data);
            fetchCards();
        },

        remove: async (id: string) => {
            await deleteCreditCard(id);
            fetchCards();
        },
    };
}
