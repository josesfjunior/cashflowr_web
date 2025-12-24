"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEntries } from "@/hooks/use-entries";
import { Entry } from "@/services/entries";
import { EntryForm } from "@/components/entry-form";
import { Trash2, Plus } from "lucide-react";

export default function TransactionsPage() {
    const { entries, create, remove, reload } = useEntries();

    const [openForm, setOpenForm] = useState(false);
    const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

    const incomes = useMemo(
        () => entries.filter((e) => e.type === "income"),
        [entries],
    );

    const expenses = useMemo(
        () => entries.filter((e) => e.type === "expense"),
        [entries],
    );

    function openCreate() {
        setEditingEntry(null);
        setOpenForm(true);
    }

    function openEdit(entry: Entry) {
        setEditingEntry(entry);
        setOpenForm(true);
    }

    async function handleSubmit(data: Partial<Entry>) {
        if (editingEntry) {
            await fetch(`/api/entries/${editingEntry.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
        } else {
            await create(data);
        }

        setOpenForm(false);
        setEditingEntry(null);
        reload();
    }

    function renderList(list: Entry[], emptyText: string) {
        if (list.length === 0) {
            return <p className="text-sm text-muted-foreground">{emptyText}</p>;
        }

        return list.map((e) => (
            <Card
                key={e.id}
                className="cursor-pointer transition hover:bg-muted/50"
                onClick={() => openEdit(e)}
            >
                <CardContent className="flex items-center justify-between py-4">
                    <div>
                        <p className="font-medium">{e.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {new Date(e.date).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <span
                            className={
                                e.type === "expense"
                                    ? "text-red-500"
                                    : "text-green-500"
                            }
                        >
                            R$ {Number(e.amount).toFixed(2)}
                        </span>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(ev) => {
                                ev.stopPropagation();
                                remove(e.id);
                            }}
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ));
    }

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Lançamentos</h1>

                <Button onClick={openCreate}>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo lançamento
                </Button>
            </div>

            {/* Entradas */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-green-600">
                    Entradas
                </h2>

                {renderList(incomes, "Nenhuma entrada registrada.")}
            </section>

            {/* Saídas */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-red-600">Saídas</h2>

                {renderList(expenses, "Nenhuma saída registrada.")}
            </section>

            {/* Modal */}
            <EntryForm
                open={openForm}
                initialData={editingEntry}
                onClose={() => {
                    setOpenForm(false);
                    setEditingEntry(null);
                }}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
