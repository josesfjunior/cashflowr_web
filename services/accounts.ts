import { api } from "@/lib/api";

/* =======================
 * Tipos
 * ======================= */

export type AccountTypeCode = "bank" | "credit_card" | "wallet" | "investment";

export interface AccountType {
    id: string;
    code: AccountTypeCode;
    description: string;
}

export interface BankAccount {
    initial_balance: string;
}

export interface CreditCardAccount {
    credit_limit: string;
    closing_day: number;
    due_day: number;
}

export interface WalletAccount {
    initial_balance: string;
}

export interface InvestmentAccount {
    initial_balance: string;
    goal?: string;
}

export interface Account {
    id: string;
    name: string;
    currency: string;
    active: boolean;
    account_type: AccountType;

    bank_account: BankAccount | null;
    credit_card_account: CreditCardAccount | null;
    wallet_account: WalletAccount | null;
    investment_account: InvestmentAccount | null;
}

/* =======================
 * API
 * ======================= */

export async function listAccounts(): Promise<Account[]> {
    const { data } = await api.get<Account[]>("/api/accounts");
    return data;
}
