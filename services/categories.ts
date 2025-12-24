// services/categories.ts
import { api } from "@/lib/api";

export interface Category {
    id: string;
    name: string;
    // color?: string;
}

export async function listCategories(): Promise<Category[]> {
    const { data } = await api.get("/api/categories");
    return data;
}

export async function createCategory(payload: Partial<Category>) {
    return api.post("/api/categories", payload);
}

export async function updateCategory(id: string, payload: Partial<Category>) {
    return api.put(`/api/categories/${id}`, payload);
}

export async function deleteCategory(id: string) {
    return api.delete(`/api/categories/${id}`);
}
