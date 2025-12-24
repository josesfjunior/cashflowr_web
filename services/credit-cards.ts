import { api } from "@/lib/api";
import { CreditCard } from "@/types/credit-card";

export type CreditCardPayload = {
    name: string;
    currency: string;
    credit_limit: string;
    closing_day: number;
    due_day: number;
};

export async function listCreditCards(): Promise<CreditCard[]> {
    const { data } = await api.get("/api/credit-cards");
    return data;
}

export async function getCreditCard(id: string): Promise<CreditCard> {
    const { data } = await api.get(`/api/credit-cards/${id}`);
    return data;
}

export async function createCreditCard(payload: CreditCardPayload) {
    const { data } = await api.post("/api/credit-cards", payload);
    return data;
}

export async function updateCreditCard(
    id: string,
    payload: Partial<CreditCardPayload>,
) {
    const { data } = await api.put(`/api/credit-cards/${id}`, payload);
    return data;
}

export async function deleteCreditCard(id: string) {
    const { data } = await api.delete(`/api/credit-cards/${id}`);
    return data;
}
