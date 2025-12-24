import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/"]; // acessível por todos
const GUEST_ONLY_ROUTES = ["/login", "/register"]; // só quem NÃO está logado

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const pathname = request.nextUrl.pathname;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isGuestOnlyRoute = GUEST_ONLY_ROUTES.includes(pathname);

    // 🔒 Não autenticado tentando acessar rota privada
    if (!token && !isPublicRoute && !isGuestOnlyRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // 🔓 Autenticado tentando acessar rota apenas de guest
    if (token && isGuestOnlyRoute) {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    // ✅ "/" nunca redireciona
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"],
};
