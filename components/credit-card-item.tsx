import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, CreditCard as CreditCardIcon } from "lucide-react";
import type { CreditCard } from "@/types/credit-card";

interface CreditCardItemProps {
    card: CreditCard;
    onEdit: (card: CreditCard) => void;
    onDelete: (id: string) => void;
}

export function CreditCardItem({
    card,
    onEdit,
    onDelete,
}: CreditCardItemProps) {
    const creditLimit = Number(
        card.credit_card_account.credit_limit,
    ).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return (
        <Card className="group relative transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <CreditCardIcon className="h-5 w-5" />
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold leading-none">
                            {card.name}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Cartão de crédito
                        </p>
                    </div>
                </div>

                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onEdit(card)}
                        aria-label="Editar cartão"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => onDelete(card.id)}
                        aria-label="Excluir cartão"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                <div>
                    <p className="text-xs text-muted-foreground">
                        Limite disponível
                    </p>
                    <p className="text-lg font-semibold">{creditLimit}</p>
                </div>

                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                        Fecha dia {card.credit_card_account.closing_day}
                    </span>
                    <span>Vence dia {card.credit_card_account.due_day}</span>
                </div>
            </CardContent>
        </Card>
    );
}
