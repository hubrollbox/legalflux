
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Check, CreditCard, Calendar, Users, HardDrive, FileText, ArrowRight, AlertCircle } from 'lucide-react';

import { plans } from "@/shared/plans";
import type { Plan } from "@/types";

interface PlanFeature {
  name: string;
  included: boolean;
  details?: string;
}

const subscriptionPlans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Para advogados individuais',
    price: 49,
    billingCycle: 'monthly',
    features: [
      { name: 'Gestão de processos básica', included: true },
      { name: 'Portal do cliente', included: true },
      { name: '1 utilizador', included: true },
      { name: '5GB armazenamento', included: true },
      { name: 'Modelos de documentos básicos', included: true },
      { name: 'Gestão de equipas', included: false },
      { name: 'API e integrações', included: false },
      { name: 'Relatórios avançados', included: false },
    ],
    maxUsers: 1,
    storage: '5GB'
  },
  {
    id: 'solo',
    name: 'Solo',
    description: 'Para advogados independentes',
    price: 99,
    billingCycle: 'monthly',
    features: [
      { name: 'Gestão de processos avançada', included: true },
      { name: 'Portal do cliente', included: true },
      { name: 'Até 3 utilizadores', included: true },
      { name: '20GB armazenamento', included: true },
      { name: 'Modelos de documentos personalizáveis', included: true },
      { name: 'Gestão de equipas básica', included: true },
      { name: 'API e integrações', included: false },
      { name: 'Relatórios avançados', included: false },
    ],
    maxUsers: 3,
    storage: '20GB',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Para escritórios com equipas',
    price: 199,
    billingCycle: 'monthly',
    features: [
      { name: 'Gestão de processos completa', included: true },
      { name: 'Portal do cliente avançado', included: true },
      { name: 'Até 10 utilizadores', included: true },
      { name: '100GB armazenamento', included: true },
      { name: 'Biblioteca completa de modelos', included: true },
      { name: 'Gestão de equipas avançada', included: true },
      { name: 'API e integrações', included: true },
      { name: 'Relatórios avançados', included: true },
    ],
    maxUsers: 10,
    storage: '100GB'
  },
  {
    id: 'custom',
    name: 'Personalizado',
    description: 'Para grandes escritórios',
    price: 0,
    billingCycle: 'monthly',
    features: [
      { name: 'Funcionalidades personalizadas', included: true },
      { name: 'Portal do cliente personalizado', included: true },
      { name: 'Utilizadores ilimitados', included: true },
      { name: 'Armazenamento personalizado', included: true },
      { name: 'Modelos de documentos personalizados', included: true },
      { name: 'Gestão de equipas personalizada', included: true },
      { name: 'Integrações personalizadas', included: true },
      { name: 'Relatórios personalizados', included: true },
    ],
    maxUsers: 999,
    storage: 'Personalizado'
  },
];

// Mock dados da assinatura atual
const currentSubscription = {
  plan: 'solo',
  price: 99,
  billingCycle: 'monthly',
  nextBillingDate: '2023-06-15',
  status: 'active',
  paymentMethod: {
    type: 'credit_card',
    lastFour: '4242',
    expiryDate: '05/2025'
  },
  users: 2,
  usedStorage: '8.5GB',
  totalStorage: '20GB'
};

const SubscriptionManagement: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  
  const currentPlan = subscriptionPlans.find(plan => plan.id === currentSubscription.plan);
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gestão de Subscrição</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Plano Atual: {currentPlan?.name}</CardTitle>
                  <CardDescription>Detalhes da sua subscrição</CardDescription>
                </div>
                <Badge className={currentSubscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                  {currentSubscription.status === 'active' ? 'Ativo' : 'Pendente'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Detalhes</TabsTrigger>
                  <TabsTrigger value="usage">Utilização</TabsTrigger>
                  <TabsTrigger value="billing">Faturação</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4 pt-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Informações do Plano</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Plano:</span>
                          <span className="font-medium">{currentPlan?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Preço:</span>
                          <span className="font-medium">{currentPlan?.price}€/{currentSubscription.billingCycle === 'monthly' ? 'mês' : 'ano'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Próxima faturação:</span>
                          <span className="font-medium">15/06/2023</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Estado:</span>
                          <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Limites do Plano</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Utilizadores:</span>
                          <span className="font-medium">{currentSubscription.users} de {currentPlan?.maxUsers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Armazenamento:</span>
                          <span className="font-medium">{currentSubscription.usedStorage} de {currentPlan?.storage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Processos:</span>
                          <span className="font-medium">12 (Ilimitado)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Documentos:</span>
                          <span className="font-medium">87 (Ilimitado)</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Funcionalidades Incluídas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {currentPlan?.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            {feature.included ? (
                              <Check className="h-4 w-4 mr-2 text-green-600" />
                            ) : (
                              <div className="h-4 w-4 mr-2 border border-muted rounded-full" />
                            )}
                            <span className={feature.included ? '' : 'text-muted-foreground line-through'}>
                              {feature.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="usage" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Armazenamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Utilização: {currentSubscription.usedStorage} de {currentPlan?.storage}</span>
                          <span>42.5%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '42.5%' }}></div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="flex items-center">
                              <FileText className="h-4 w-4 mr-2" /> Documentos
                            </span>
                            <span>5.2GB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="flex items-center">
                              <HardDrive className="h-4 w-4 mr-2" /> Anexos de Email
                            </span>
                            <span>2.1GB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" /> Backups
                            </span>
                            <span>1.2GB</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Utilizadores</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Utilização: {currentSubscription.users} de {currentPlan?.maxUsers} utilizadores</span>
                          <span>66.7%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '66.7%' }}></div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-2" /> Administradores
                            </span>
                            <span>1</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-2" /> Advogados
                            </span>
                            <span>1</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-2" /> Assistentes
                            </span>
                            <span>0</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Gerir Utilizadores
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="billing" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Método de Pagamento</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center">
                          <CreditCard className="h-8 w-8 mr-4" />
                          <div>
                            <p className="font-medium">Cartão terminado em {currentSubscription.paymentMethod.lastFour}</p>
                            <p className="text-sm text-muted-foreground">Expira em {currentSubscription.paymentMethod.expiryDate}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                      <Button variant="outline" className="w-full">
                        Adicionar Novo Método de Pagamento
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Histórico de Faturação</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b">
                          <div>
                            <p className="font-medium">Fatura #INV-2023-05</p>
                            <p className="text-sm text-muted-foreground">15/05/2023</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">99.00€</p>
                            <Badge className="bg-green-100 text-green-800">Pago</Badge>
                          </div>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <div>
                            <p className="font-medium">Fatura #INV-2023-04</p>
                            <p className="text-sm text-muted-foreground">15/04/2023</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">99.00€</p>
                            <Badge className="bg-green-100 text-green-800">Pago</Badge>
                          </div>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <div>
                            <p className="font-medium">Fatura #INV-2023-03</p>
                            <p className="text-sm text-muted-foreground">15/03/2023</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">99.00€</p>
                            <Badge className="bg-green-100 text-green-800">Pago</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Ver Todas as Faturas
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="text-red-600" onClick={() => setIsCancelDialogOpen(true)}>
                Cancelar Subscrição
              </Button>
              <Button onClick={() => setIsUpgradeDialogOpen(true)}>
                Alterar Plano
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Precisa de Ajuda?</CardTitle>
              <CardDescription>
                Estamos aqui para ajudar com a sua subscrição.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-md">
                <h3 className="font-medium mb-2">Agendar uma Demonstração</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Conheça todas as funcionalidades do LegalFlux numa demonstração personalizada.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Agendar Demonstração <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium mb-2">Contactar Suporte</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Tem dúvidas sobre a sua subscrição? A nossa equipa está pronta para ajudar.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Contactar Suporte <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium mb-2">Recursos Úteis</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex">
                    <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
                    <a href="#" className="text-blue-600 hover:underline">FAQ sobre Subscrições</a>
                  </li>
                  <li className="flex">
                    <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
                    <a href="#" className="text-blue-600 hover:underline">Guia de Funcionalidades</a>
                  </li>
                  <li className="flex">
                    <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
                    <a href="#" className="text-blue-600 hover:underline">Política de Reembolso</a>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Upgrade Plan Dialog */}
      <Dialog open={isUpgradeDialogOpen} onOpenChange={setIsUpgradeDialogOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Escolha um Plano</DialogTitle>
            <DialogDescription>
              Compare os planos disponíveis e escolha o mais adequado para as suas necessidades.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid md:grid-cols-4 gap-4 py-4">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`cursor-pointer border-2 transition-all ${selectedPlan?.id === plan.id ? 'border-blue-600' : 'hover:border-blue-300'} ${plan.popular ? 'relative overflow-hidden' : ''}`}
                onClick={() => setSelectedPlan(plan)}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 text-xs">
                    Mais Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  
                  <div className="mt-2">
                    {plan.id === 'custom' ? (
                      <div className="text-xl font-bold">Sob orçamento</div>
                    ) : (
                      <div>
                        <span className="text-2xl font-bold">{plan.price}€</span>
                        <span className="text-sm ml-1">/mês</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <div className="flex items-center mb-1">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{plan.id === 'custom' ? 'Ilimitados' : `Até ${plan.maxUsers}`} utilizadores</span>
                    </div>
                    <div className="flex items-center">
                      <HardDrive className="h-4 w-4 mr-1" />
                      <span>{plan.storage} armazenamento</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 space-y-1">
                    {plan.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        {feature.included ? (
                          <Check className="h-4 w-4 mr-1 text-green-600 flex-shrink-0" />
                        ) : (
                          <div className="h-4 w-4 mr-1 border border-muted rounded-full flex-shrink-0" />
                        )}
                        <span className={feature.included ? '' : 'text-muted-foreground'}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                    {plan.features.length > 4 && (
                      <div className="text-sm text-muted-foreground">
                        + {plan.features.length - 4} mais funcionalidades
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  {plan.id === currentSubscription.plan ? (
                    <Button disabled className="w-full">Plano Atual</Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className={`w-full ${selectedPlan?.id === plan.id ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
                    >
                      Selecionar
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpgradeDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              disabled={!selectedPlan || selectedPlan.id === currentSubscription.plan}
              onClick={() => {
                // Implementar lógica de alteração de plano
                setIsUpgradeDialogOpen(false);
              }}
            >
              {selectedPlan?.id === 'custom' ? 'Solicitar Orçamento' : 'Confirmar Alteração'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Cancel Subscription Dialog */}
      <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
              Cancelar Subscrição?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Ao cancelar a sua subscrição, perderá acesso às funcionalidades premium no final do período de faturação atual (15/06/2023).
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
                <h4 className="font-semibold text-amber-700 mb-2">O que acontecerá:</h4>
                <ul className="list-disc pl-5 space-y-1 text-amber-700">
                  <li>Mantém acesso completo até 15/06/2023</li>
                  <li>Não serão cobrados valores adicionais</li>
                  <li>Os seus dados serão preservados por 30 dias</li>
                  <li>O acesso será limitado após esse período</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700">
              Cancelar Subscrição
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SubscriptionManagement;
