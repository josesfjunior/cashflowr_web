// utils/currency.ts
export function formatBRL(value: number) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

export function parseBRL(value: string): number {
    return Number(
        value
            .replace(/\s/g, "")
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", "."),
    );
}
