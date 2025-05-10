
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ContextualAssistantTabProps {
  contextText: string;
  onContextChange: (text: string) => void;
}

const ContextualAssistantTab: React.FC<ContextualAssistantTabProps> = ({
  contextText,
  onContextChange,
}) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Assistente Contextual</h2>
      <p className="mb-4 text-muted-foreground">
        Cole aqui o texto jurídico que deseja analisar ou sobre o qual tem dúvidas.
        O assistente irá considerar este contexto nas suas respostas.
      </p>
      <div className="space-y-4">
        <Textarea
          placeholder="Cole aqui o texto jurídico..."
          className="min-h-[200px]"
          value={contextText}
          onChange={(e) => onContextChange(e.target.value)}
        />
        <Button className="w-full">Analisar Contexto</Button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Conversa com Contexto</h3>
        <div className="bg-muted/50 p-4 rounded-md h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">
            Cole um texto jurídico acima para começar a análise contextual.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContextualAssistantTab;
