import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DocumentTabs from '@/components/documents/DocumentTabs';
import { Button } from '@/components/ui/button';

export default function Onboarding() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Guia de Onboarding</h1>
      
      <Tabs defaultValue="conta" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="conta">Criar Conta</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="placeholders">Placeholders</TabsTrigger>
          <TabsTrigger value="assinatura">Assinatura</TabsTrigger>
        </TabsList>

        <TabsContent value="conta">
          <Card>
            <CardHeader>
              <CardTitle>Passo 1: Criação de Conta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Image src="/img/about-cta.png" alt="Registro" width={400} height={300} className="rounded-lg border" />
              <ol className="list-decimal pl-6 space-y-2">
                <li>Acesse a página de registro</li>
                <li>Preencha seus dados básicos</li>
                <li>Confirme seu e-mail</li>
                <li>Faça login pela primeira vez</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clientes">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentTabs
                viewMode="grid"
                searchTerm=""
                setSearchTerm={() => {}}
                filteredDocuments={[]}
                filteredTemplates={[]}
                setViewMode={() => {}}
                filters={{
                  type: "document",
                  date: undefined,
                  tags: []
                }}
                setFilters={() => {}}
              />
              <p className="mt-4 text-sm text-muted-foreground">
                Use o botão '+' acima para adicionar novos clientes
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <Button variant="outline" className="mt-6">
          📥 Download Guia Completo (PDF)
        </Button>
      </Tabs>
    </div>
  );
}