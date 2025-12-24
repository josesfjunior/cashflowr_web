// hooks/use-entries.ts
import { useCallback, useEffect, useState } from "react";
import * as service from "@/services/entries";

export function useEntries() {
    const [entries, setEntries] = useState<service.Entry[]>([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const data = await service.listEntries();
            setEntries(data);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let active = true;

        (async () => {
            if (!active) return;
            await load();
        })();

        return () => {
            active = false;
        };
    }, [load]);

    async function create(data: Partial<service.Entry>) {
        await service.createEntry(data);
        await load();
    }

    async function remove(id: string) {
        await service.deleteEntry(id);
        await load();
    }

    return {
        entries,
        loading,
        create,
        remove,
        reload: load,
    };
}
