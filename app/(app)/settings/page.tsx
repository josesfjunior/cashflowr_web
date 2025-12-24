"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileForm from "@/app/(app)/settings/profile-form";
import PasswordForm from "@/app/(app)/settings/password-form";

export default function SettingsPage() {
    return (
        <div className="mx-auto max-w-3xl space-y-6 px-6 py-8">
            <div>
                <h1 className="text-2xl font-semibold">Configurações</h1>
                <p className="text-sm text-muted-foreground">
                    Gerencie suas informações pessoais e segurança da conta
                </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="profile">Perfil</TabsTrigger>
                    <TabsTrigger value="security">Segurança</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <ProfileForm />
                </TabsContent>

                <TabsContent value="security">
                    <PasswordForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}
