
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DashboardLayout>
      <SectionHeader
        title="Perfil"
        description="Veja e edite as suas informações pessoais"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="text-xl">{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold mb-1">{user?.name || "Utilizador"}</h3>
            <p className="text-gray-500 mb-4">{user?.email || "email@exemplo.com"}</p>
            <Button variant="outline" className="w-full mb-2">Alterar Foto</Button>
            <Button variant="outline" className="w-full">Editar Perfil</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Detalhes da Conta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Nome Completo</h4>
                <p>{user?.name || "Utilizador"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p>{user?.email || "email@exemplo.com"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Número de Telefone</h4>
                <p>Não definido</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Cargo</h4>
                <p>Não definido</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Escritório</h4>
                <p>Não definido</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
