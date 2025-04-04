import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FaqsTab = () => {
  const faqs = [
    {
      question: "Como posso aceder ao portal do cliente?",
      answer: "Pode aceder através do menu principal ou diretamente em legalflux.pt/client-portal"
    },
    {
      question: "Como faço upload de documentos?",
      answer: "Na secção de Documentos do portal, clique no botão 'Upload' e selecione os ficheiros"
    },
    {
      question: "Como contacto o meu advogado?",
      answer: "Use a secção de Comunicação no portal para enviar mensagens diretamente"
    },
    {
      question: "Onde vejo os meus processos ativos?",
      answer: "Todos os processos aparecem na dashboard principal do portal do cliente"
    },
    {
      question: "Como posso alterar a minha senha?",
      answer: "Aceda ao seu perfil e clique na opção 'Alterar senha'"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-6">Perguntas Frequentes</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqsTab;