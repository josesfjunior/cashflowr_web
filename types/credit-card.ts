export interface CreditCard {
    id: string;
    name: string;
    credit_card_account: {
        credit_limit: string;
        closing_day: number;
        due_day: number;
    };
}

export interface CreditCardFormData {
    name: string;
    credit_limit: string; // string porque vem do input
    closing_day: number;
    due_day: number;
}
