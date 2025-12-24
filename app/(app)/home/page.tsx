import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, CreditCard, TrendingUp, ArrowDownUp } from "lucide-react";

export default function HomePage() {
    // 🔹 mock (depois vira API)
    const summary = {
        balance: 12450.75,
        creditUsed: 3200,
        investments: 8500,
        transactions: 42,
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold">Visão Geral</h1>

            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                        <Wallet />
                        <CardTitle>Saldo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            R$ {summary.balance.toFixed(2)}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                        <CreditCard />
                        <CardTitle>Cartões</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            R$ {summary.creditUsed.toFixed(2)}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                        <TrendingUp />
                        <CardTitle>Investimentos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            R$ {summary.investments.toFixed(2)}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                        <ArrowDownUp />
                        <CardTitle>Lançamentos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {summary.transactions}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
