import { NavbarPublic } from "@/components/navbar-public";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
                <NavbarPublic />
            </header>

            {/* Conteúdo */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="border-t bg-muted/30">
                <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-muted-foreground">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <span>© {new Date().getFullYear()} CashFlowr</span>

                        <div className="flex gap-6">
                            <span>Privacidade</span>
                            <span>Termos</span>
                            <span>Contato</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
