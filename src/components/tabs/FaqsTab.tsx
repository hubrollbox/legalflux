
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
