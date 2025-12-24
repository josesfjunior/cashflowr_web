// components/category-form.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Category } from "@/services/categories";

interface CategoryFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<Category>) => Promise<void>;
    initialData?: Category | null;
}

export function CategoryForm({
    open,
    onClose,
    onSubmit,
    initialData,
}: CategoryFormProps) {
    const [name, setName] = useState(() => initialData?.name ?? "");
    // const [color, setColor] = useState(() => initialData?.color ?? "#6366f1");

    async function handleSubmit() {
        await onSubmit({ name });
        // await onSubmit({ name, color });
        onClose();
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>
                        {initialData ? "Editar categoria" : "Nova categoria"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <Input
                        placeholder="Nome da categoria"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {/*<div className="flex items-center gap-3">
                        <Input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="h-10 w-14 cursor-pointer p-1"
                        />
                        <span className="text-sm text-muted-foreground">
                            Cor da categoria
                        </span>
                    </div>*/}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit}>
                        {initialData ? "Salvar" : "Criar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
