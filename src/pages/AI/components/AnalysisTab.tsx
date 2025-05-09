import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CheckCircle2, FileText, Send } from "lucide-react";
import { useState } from "react";

// Mock data for document analysis
const mockDocumentAnalysis = {
  summary: "Este documento é um contrato de arrendamento comercial entre a empresa ABC Ltda. e o proprietário João Silva para o imóvel situado na Rua das Flores, 123, Lisboa. O contrato tem duração de 5 anos com início em 01/01/2023 e término em 31/12/2027, com valor mensal de €2.500,00.",
  keyPoints: [
    "Duração do contrato: 5 anos (01/01/2023 a 31/12/2027)",
    "Valor mensal: €2.500,00 com reajuste anual pelo IPC",
    "Garantia: 3 meses de renda (€7.500,00)",
    "Multa por rescisão antecipada: 3 meses de renda",
    "Responsabilidade por reparações: Locatário para reparações ordinárias, Locador para estruturais"
  ],
  risks: [
    { level: "high", description: "Cláusula 8.3 permite ao locador rescindir o contrato com apenas 30 dias de aviso prévio" },
    { level: "medium", description: "Ausência de limitação para o percentual de reajuste anual" },
    { level: "medium", description: "Responsabilidade por danos estruturais não está claramente definida" }
  ],
  opportunities: [
    "Possibilidade de renovação automática por igual período (Cláusula 12.1)",
    "Direito de preferência na compra do imóvel (Cláusula 15.2)",
    "Permissão para sublocação mediante autorização prévia"
  ],
  recommendations: [
    "Negociar aumento do prazo de aviso prévio para rescisão pelo locador",
    "Estabelecer um limite máximo para o reajuste anual",
    "Clarificar as responsabilidades por reparações estruturais",
    "Incluir cláusula de força maior para situações excepcionais"
  ]
};

// Mock data for legal analysis
const mockLegalAnalysis = {
  compliance: [
    { status: "compliant", description: "Lei do Arrendamento Urbano (Lei n.º 6/2006)" },
    { status: "compliant", description: "Código Civil Português (Artigos 1022º a 1113º)" },
    { status: "warning", description: "Regulamento Geral de Proteção de Dados (RGPD)" },
    { status: "non-compliant", description: "Lei das Comunicações Eletrónicas (Lei n.º 5/2004)" }
  ],
  precedents: [
    "Acórdão do STJ de 12/05/2020 (Proc. 1234/18.5T8LSB) - Validade de cláusulas de rescisão unilateral",
    "Acórdão do TRL de 08/11/2019 (Proc. 5678/17.2T8LSB) - Limites ao reajuste de rendas comerciais"
  ],
  legalRisks: [
    "Cláusula de rescisão unilateral pode ser considerada abusiva conforme jurisprudência recente",
    "Ausência de cláusula específica sobre proteção de dados pode violar o RGPD",
    "Responsabilidades ambientais não estão adequadamente atribuídas"
  ]
};

export const AnalysisTab: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("document");
  const [userQuery, setUserQuery] = useState("");
  const [analysisHistory, setAnalysisHistory] = useState<{
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
  }[]>([
    {
      role: "assistant",
      content: "Olá! Estou pronto para analisar seu documento. Que aspectos específicos você gostaria de explorar?",
      timestamp: new Date()
    }
  ]);

  const handleSendQuery = () => {
    if (!userQuery.trim()) return;

    // Add user message to history
    setAnalysisHistory([
      ...analysisHistory,
      {
        role: "user",
        content: userQuery,
        timestamp: new Date()
      }
    ]);

    // Simulate AI response
    setTimeout(() => {
      let response = "Analisei o documento e encontrei alguns pontos importantes relacionados à sua pergunta.";
      
      if (userQuery.toLowerCase().includes("risco")) {
        response = "Os principais riscos identificados são: 1) Cláusula de rescisão com aviso prévio curto, 2) Ausência de limite para reajuste, 3) Responsabilidades estruturais ambíguas.";
      } else if (userQuery.toLowerCase().includes("prazo") || userQuery.toLowerCase().includes("duração")) {
        response = "O contrato tem duração de 5 anos, iniciando em 01/01/2023 e terminando em 31/12/2027, com possibilidade de renovação automática por igual período conforme Cláusula 12.1.";
      } else if (userQuery.toLowerCase().includes("valor") || userQuery.toLowerCase().includes("renda")) {
        response = "O valor mensal do arrendamento é de €2.500,00 com reajuste anual pelo IPC. Recomendo negociar um limite máximo para este reajuste.";
      }

      setAnalysisHistory(prev => [
        ...prev,
        {
          role: "assistant",
          content: response,
          timestamp: new Date()
        }
      ]);

      // Scroll to bottom
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 1000);

    setUserQuery("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
      {/* Document Preview Panel */}
      <Card className="col-span-1 md:col-span-1 h-[calc(100vh-220px)] flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Documento</CardTitle>
          <CardDescription>Contrato de Arrendamento Comercial.pdf</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <div className="bg-muted rounded-md h-full flex items-center justify-center">
            <div className="text-center p-4">
              <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Visualização do documento não disponível nesta demonstração.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Panel */}
      <Card className="col-span-1 md:col-span-2 h-[calc(100vh-220px)] flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Análise do Documento</CardTitle>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-[400px]">
              <TabsTrigger value="document">Análise Documental</TabsTrigger>
              <TabsTrigger value="legal">Análise Jurídica</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden">
          <TabsContent value="document" className="h-full">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Resumo</h3>
                  <p className="text-sm text-muted-foreground">
                    {mockDocumentAnalysis.summary}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Pontos-Chave</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {mockDocumentAnalysis.keyPoints.map((point, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Riscos Identificados</h3>
                  <div className="space-y-2">
                    {mockDocumentAnalysis.risks.map((risk, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Badge variant={risk.level === "high" ? "destructive" : "outline"} className="mt-0.5">
                          {risk.level}
                        </Badge>
                        <p className="text-sm text-muted-foreground">{risk.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Oportunidades</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {mockDocumentAnalysis.opportunities.map((opportunity, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {opportunity}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Recomendações</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {mockDocumentAnalysis.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="legal" className="h-full">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Conformidade Legal</h3>
                  <div className="space-y-2">
                    {mockLegalAnalysis.compliance.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        {item.status === "compliant" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        ) : item.status === "warning" ? (
                          <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                        )}
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Precedentes Jurídicos Relevantes</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {mockLegalAnalysis.precedents.map((precedent, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {precedent}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Riscos Jurídicos</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {mockLegalAnalysis.legalRisks.map((risk, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </CardContent>
        
        <CardFooter className="border-t pt-4">
          <div className="w-full space-y-4">
            <ScrollArea className="h-[120px] w-full rounded-md border p-2">
              <div className="space-y-3 pr-4">
                {analysisHistory.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`rounded-lg px-3 py-2 max-w-[80%] text-sm ${
                        message.role === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="flex gap-2">
              <Textarea 
                placeholder="Faça uma pergunta sobre o documento..." 
                className="flex-1"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendQuery();
                  }
                }}
              />
              <Button onClick={handleSendQuery} disabled={!userQuery.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
