// hooks/use-categories.ts
import { useEffect, useState } from "react";
import * as service from "@/services/categories";

export function useCategories() {
    const [categories, setCategories] = useState<service.Category[]>([]);
    const [loading, setLoading] = useState(true);

    async function load() {
        setLoading(true);
        setCategories(await service.listCategories());
        setLoading(false);
    }

    async function create(data: Partial<service.Category>) {
        await service.createCategory(data);
        load();
    }

    async function update(id: string, data: Partial<service.Category>) {
        await service.updateCategory(id, data);
        load();
    }

    async function remove(id: string) {
        await service.deleteCategory(id);
        load();
    }

    useEffect(() => {
        load();
    }, []);

    return { categories, loading, create, update, remove };
}
