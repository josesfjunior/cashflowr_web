"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function NavbarPublic() {
    return (
        <header className="border-b">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link href="/" className="text-lg font-semibold">
                    CashFlowr
                </Link>

                <nav className="flex items-center gap-3">
                    <Link href="/login">
                        <Button variant="ghost">Entrar</Button>
                    </Link>
                    <Link href="/register">
                        <Button>Começar</Button>
                    </Link>
                    <ModeToggle />
                </nav>
            </div>
        </header>
    );
}
