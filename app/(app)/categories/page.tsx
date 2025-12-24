// app/(app)/categories/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/use-categories";
import { Category } from "@/services/categories";
import { CategoryForm } from "@/components/category-form";
import { Plus, Trash2 } from "lucide-react";

export default function CategoriesPage() {
    const { categories, create, update, remove } = useCategories();

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Category | null>(null);

    function openCreate() {
        setEditing(null);
        setOpen(true);
    }

    function openEdit(category: Category) {
        setEditing(category);
        setOpen(true);
    }

    async function handleSubmit(data: Partial<Category>) {
        if (editing) {
            await update(editing.id, data);
        } else {
            await create(data);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Categorias</h1>

                <Button onClick={openCreate}>
                    <Plus className="mr-2 h-4 w-4" />
                    Nova categoria
                </Button>
            </div>

            {categories.map((c) => (
                <Card
                    key={c.id}
                    className="cursor-pointer transition hover:bg-muted/50"
                    onClick={() => openEdit(c)}
                >
                    <CardContent className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-3">
                            {/* Color badge */}
                            {/*<span
                                className="h-4 w-4 rounded-full"
                                style={{ backgroundColor: c.color }}
                            />*/}

                            <span className="font-medium">{c.name}</span>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                remove(c.id);
                            }}
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </CardContent>
                </Card>
            ))}

            <CategoryForm
                open={open}
                initialData={editing}
                onClose={() => {
                    setOpen(false);
                    setEditing(null);
                }}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
