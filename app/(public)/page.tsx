"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/section-reveal";

import {
    LineChart as ReLineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
} from "recharts";

/* ================= DADOS ================= */

const expensesData = [
    { name: "Seg", value: 400 },
    { name: "Ter", value: 300 },
    { name: "Qua", value: 500 },
    { name: "Qui", value: 280 },
    { name: "Sex", value: 450 },
];

const balanceData = [
    { name: "Jan", value: 2000 },
    { name: "Fev", value: 2800 },
    { name: "Mar", value: 3200 },
    { name: "Abr", value: 4000 },
];

const cardsData = [
    { name: "Usado", value: 3200 },
    { name: "Disponível", value: 1800 },
];

const investmentsData = [
    { name: "Renda Fixa", value: 45 },
    { name: "Ações", value: 30 },
    { name: "Fundos", value: 25 },
];

/* ================= PAGE ================= */

export default function HomePage() {
    return (
        <main className="h-screen snap-y snap-mandatory overflow-y-scroll">
            {/* HERO */}
            <SectionReveal>
                <div className="mx-auto max-w-3xl px-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                        Controle financeiro claro,
                        <br className="hidden md:block" />
                        simples e centralizado
                    </h1>

                    <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                        Organize contas, cartões, investimentos e gastos em um
                        único painel visual, moderno e confiável.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Button size="lg" asChild>
                            <Link href="/register">Criar conta gratuita</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/login">Entrar</Link>
                        </Button>
                    </div>
                </div>
            </SectionReveal>

            {/* GASTOS */}
            <SectionReveal>
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
                    <div>
                        <h2 className="text-3xl font-semibold">
                            Entenda seus gastos
                        </h2>
                        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                            Identifique padrões de consumo e tenha clareza sobre
                            onde seu dinheiro está sendo utilizado.
                        </p>
                    </div>

                    <ChartCard>
                        <ResponsiveContainer width="100%" height={260}>
                            <ReLineChart data={expensesData}>
                                <defs>
                                    <linearGradient
                                        id="lineGradient"
                                        x1="0"
                                        y1="0"
                                        x2="1"
                                        y2="0"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="hsl(var(--primary))"
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="hsl(var(--primary) / 0.6)"
                                        />
                                    </linearGradient>
                                </defs>

                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{
                                        background: "hsl(var(--background))",
                                        borderRadius: 8,
                                        border: "1px solid hsl(var(--border))",
                                    }}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="url(#lineGradient)"
                                    strokeWidth={4}
                                    dot={false}
                                    animationDuration={1000}
                                />
                            </ReLineChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
            </SectionReveal>

            {/* SALDO */}
            <SectionReveal>
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
                    <ChartCard>
                        <ResponsiveContainer width="100%" height={260}>
                            <AreaChart data={balanceData}>
                                <defs>
                                    <linearGradient
                                        id="areaGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="hsl(var(--primary))"
                                            stopOpacity={0.4}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="hsl(var(--primary))"
                                            stopOpacity={0.05}
                                        />
                                    </linearGradient>
                                </defs>

                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />

                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={3}
                                    fill="url(#areaGradient)"
                                    animationDuration={1000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <div>
                        <h2 className="text-3xl font-semibold">
                            Evolução do saldo
                        </h2>
                        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                            Acompanhe o crescimento do seu patrimônio ao longo
                            do tempo de forma visual e intuitiva.
                        </p>
                    </div>
                </div>
            </SectionReveal>

            {/* CARTÕES */}
            <SectionReveal>
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
                    <div>
                        <h2 className="text-3xl font-semibold">
                            Limite de cartões
                        </h2>
                        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                            Visualize rapidamente quanto do limite já foi usado
                            e quanto ainda está disponível.
                        </p>
                    </div>

                    <ChartCard>
                        <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                                <Pie
                                    data={cardsData}
                                    dataKey="value"
                                    innerRadius={60}
                                    outerRadius={100}
                                    animationDuration={1000}
                                >
                                    <Cell fill="hsl(var(--primary))" />
                                    <Cell fill="hsl(var(--muted))" />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
            </SectionReveal>

            {/* INVESTIMENTOS */}
            <SectionReveal>
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
                    <ChartCard>
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={investmentsData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />

                                <Bar
                                    dataKey="value"
                                    fill="hsl(var(--primary))"
                                    radius={[6, 6, 0, 0]}
                                    animationDuration={1000}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <div>
                        <h2 className="text-3xl font-semibold">
                            Distribuição de investimentos
                        </h2>
                        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                            Tenha uma visão clara da sua estratégia e mantenha
                            equilíbrio entre segurança e crescimento.
                        </p>
                    </div>
                </div>
            </SectionReveal>

            {/* CTA */}
            <SectionReveal>
                <div className="mx-auto max-w-3xl px-6 text-center">
                    <h2 className="text-4xl font-semibold">
                        Comece hoje mesmo
                    </h2>
                    <p className="mt-6 leading-relaxed text-muted-foreground">
                        Crie sua conta gratuita e transforme sua forma de lidar
                        com dinheiro.
                    </p>
                    <div className="mt-10">
                        <Button size="lg" asChild>
                            <Link href="/register">Criar conta</Link>
                        </Button>
                    </div>
                </div>
            </SectionReveal>
        </main>
    );
}

/* ================= UI ================= */

function ChartCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-xl border bg-background p-6 shadow-sm">
            {children}
        </div>
    );
}
