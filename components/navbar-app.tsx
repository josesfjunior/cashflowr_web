"use client";

import { ModeToggle } from "@/components/mode-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Settings } from "lucide-react";
import { getAvatarInitials, getDisplayName } from "@/utils/user";
import Link from "next/link";

export function NavbarApp() {
    const { signOut, user } = useAuth();

    if (!user) return null;

    const displayName = getDisplayName(user);
    const initials = getAvatarInitials(user.name);

    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
            <div className="flex h-14 items-center justify-between px-6">
                <div className="flex items-center gap-2 font-semibold">
                    <span className="text-lg tracking-tight">💸 CashFlowr</span>
                </div>

                <div className="flex items-center gap-3">
                    <ModeToggle />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex items-center gap-2 px-2"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>

                                <span className="hidden sm:inline text-sm font-medium">
                                    {displayName}
                                </span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel className="text-xs text-muted-foreground">
                                Minha conta
                            </DropdownMenuLabel>

                            <DropdownMenuItem asChild className="gap-2">
                                <Link href="/settings/profile">
                                    <User className="h-4 w-4" />
                                    Perfil
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild className="gap-2">
                                <Link href="/settings">
                                    <Settings className="h-4 w-4" />
                                    Configurações
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                className="gap-2 text-destructive focus:text-destructive"
                                onClick={signOut}
                            >
                                <LogOut className="h-4 w-4" />
                                Sair
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
