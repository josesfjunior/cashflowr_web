import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InvestmentsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Investimentos</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Reserva de Emergência</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Objetivo: R$ 20.000</p>
                    <p>Atual: R$ 8.500</p>
                </CardContent>
            </Card>
        </div>
    );
}
