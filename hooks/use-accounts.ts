import { useCallback, useEffect, useState } from "react";
import { Account, listAccounts } from "@/services/accounts";

export function useAccounts() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await listAccounts();
            setAccounts(data);
        } catch (_) {
            setError("Erro ao carregar contas");
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

    return {
        accounts,
        loading,
        error,
        reload: load,
    };
}
