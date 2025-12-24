// services/entries.ts
import { api } from "@/lib/api";

export interface Entry {
    id: string;
    name: string;
    amount: number;
    type: "income" | "expense";
    date: string;
    category_id: string;
    account_id: string;
}

export async function listEntries(): Promise<Entry[]> {
    const { data } = await api.get("/api/entries");
    return data;
}

export async function createEntry(payload: Partial<Entry>) {
    return api.post("/api/entries", payload);
}

export async function updateEntry(id: string, payload: Partial<Entry>) {
    return api.put(`/api/entries/${id}`, payload);
}

export async function deleteEntry(id: string) {
    return api.delete(`/api/entries/${id}`);
}
