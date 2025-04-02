
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FAQItem } from "./FAQItem";
import { ContactInfo } from "./ContactInfo";

const faqItems = [
  {
    question: "Como posso iniciar o meu período experimental?",
    answer: "Basta registar-se na plataforma. Terá acesso gratuito por 14 dias a todas as funcionalidades do plano Enterprise."
  },
  {
    question: "Posso migrar os meus dados de outro sistema?",
    answer: "Sim, oferecemos serviços de migração de dados para sistemas legados. Entre em contacto com o nosso suporte para mais informações."
  },
  {
    question: "Como funcionam as permissões de utilizadores?",
    answer: "O LegalFlux utiliza um sistema de controlo baseado em funções (RBAC), que permite definir exatamente o que cada utilizador pode ver e fazer."
  },
  {
    question: "Os meus dados estão seguros?",
    answer: "Sim, utilizamos encriptação de ponta a ponta e estamos em conformidade com o RGPD. Todos os dados são armazenados com redundância geográfica."
  },
  {
    question: "Posso cancelar a minha assinatura a qualquer momento?",
    answer: "Sim, as assinaturas podem ser canceladas a qualquer momento, sem penalizações. Os dados ficarão disponíveis para exportação por 30 dias após o cancelamento."
  }
];

const SupportTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Perguntas Frequentes</CardTitle>
            <CardDescription>
              Respostas para as dúvidas mais comuns sobre a plataforma LegalFlux
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {faqItems.map((item, index) => (
              <FAQItem 
                key={index} 
                question={item.question} 
                answer={item.answer} 
              />
            ))}
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Contacte-nos</CardTitle>
            <CardDescription>
              Estamos disponíveis para ajudar em todas as suas questões
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ContactInfo />
            
            <div className="mt-6">
              <Button className="w-full">
                Solicitar Contacto
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportTab;
