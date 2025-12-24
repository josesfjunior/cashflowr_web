"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Wallet,
    CreditCard,
    ArrowDownUp,
    LogOut,
    SquareStack,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { NavbarApp } from "@/components/navbar-app"; // 👈 IMPORTANTE

const menu = [
    { label: "Visão Geral", href: "/home", icon: Home },
    { label: "Contas", href: "/accounts", icon: Wallet },
    { label: "Cartões", href: "/credit-cards", icon: CreditCard },
    { label: "Lançamentos", href: "/transactions", icon: ArrowDownUp },
    { label: "Categorias", href: "/categories", icon: SquareStack },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { signOut } = useAuth();

    return (
        <div className="flex min-h-screen bg-background">
            {/* SIDEBAR */}
            <aside className="w-64 border-r bg-card px-4 py-6 flex flex-col">
                <h1 className="text-2xl font-semibold mb-8">CashFlowr</h1>

                <nav className="flex-1 space-y-1">
                    {menu.map((item) => {
                        const active = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                                    active
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted",
                                )}
                            >
                                <Icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <Button
                    variant="ghost"
                    className="mt-6 justify-start gap-2"
                    onClick={signOut}
                >
                    <LogOut size={18} />
                    Sair
                </Button>
            </aside>

            {/* ÁREA PRINCIPAL */}
            <div className="flex flex-1 flex-col">
                {/* NAVBAR */}
                <NavbarApp />

                {/* CONTEÚDO */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
