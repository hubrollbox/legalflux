import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import MetricsCard from "@/components/dashboard/MetricsCard";
import { getUserRoleName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, 
  CheckSquare, 
  Clock, 
  FileText, 
  Users, 
  Calendar, 
  MessageCircle,
  DollarSign,
  BarChart,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { 
  getCasesByUser, 
  getTasksByUser, 
  getMessagesByUser,
  getTransactionsByUser,
  getDocumentsByUser,
  getOrganizationById,
  getSubscriptionByOrgId
} from "@/services/mockData";
import { useNavigate } from "react-router-dom";
import { Case, Task, Message, FinancialTransaction, Document, Organization, Subscription } from "@/types";
import StatusBadge from "@/components/dashboard/StatusBadge";
import PriorityBadge from "@/components/dashboard/PriorityBadge";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cases, setCases] = useState<Case[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [organization, setOrganization] = useState<Organization | undefined>(undefined);
  const [subscription, setSubscription] = useState<Subscription | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (user) {
        // Fetch data based on user role
        const fetchedCases = getCasesByUser(user.id, user.role);
        const fetchedTasks = getTasksByUser(user.id, user.role);
        const fetchedMessages = getMessagesByUser(user.id);
        const fetchedTransactions = getTransactionsByUser(user.id, user.role);
        const fetchedDocuments = getDocumentsByUser(user.id, user.role);
        
        if (user.organizationId) {
          const fetchedOrganization = getOrganizationById(user.organizationId);
          setOrganization(fetchedOrganization);
          
          if (fetchedOrganization) {
            const fetchedSubscription = getSubscriptionByOrgId(fetchedOrganization.id);
            setSubscription(fetchedSubscription);
          }
        }
        
        setCases(fetchedCases);
        setTasks(fetchedTasks);
        setMessages(fetchedMessages);
        setTransactions(fetchedTransactions);
        setDocuments(fetchedDocuments);
      }
      setIsLoading(false);
    };
    
    fetchData();
  }, [user]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-lg">Carregando...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="text-gray-500">
            Bem-vindo, {user?.name} ({getUserRoleName(user?.role || "client")})
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigate("/calendar")}>
            <Calendar className="h-4 w-4 mr-2" />
            Agenda
          </Button>
          <Button onClick={() => navigate("/cases")}>
            <Briefcase className="h-4 w-4 mr-2" />
            Ver Processos
          </Button>
        </div>
      </div>

      {/* Subscription alert for lawyers */}
      {(user?.role === "lawyer" || user?.role === "senior_lawyer") && !subscription && (
        <Alert className="mb-6 bg-yellow-50 border-yellow-100">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">Assinatura necessária</AlertTitle>
          <AlertDescription className="text-yellow-700">
            Você ainda não possui uma assinatura ativa. Escolha um plano para acessar todos os recursos.
            <Button 
              variant="link" 
              className="text-primary-600 p-0 h-auto ml-2"
              onClick={() => navigate("/subscriptions")}
            >
              Ver planos
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Main metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricsCard 
          title="Processos Ativos" 
          value={cases.filter(c => c.status === "active").length.toString()} 
          icon={Briefcase} 
        />
        
        {(user?.role !== "client") && (
          <MetricsCard 
            title="Tarefas Pendentes" 
            value={tasks.filter(t => t.status !== "done").length.toString()} 
            icon={CheckSquare} 
          />
        )}
        
        <MetricsCard 
          title="Documentos" 
          value={documents.length.toString()} 
          icon={FileText} 
        />
        
        <MetricsCard 
          title="Mensagens Não Lidas" 
          value={messages.filter(m => !m.readAt).length.toString()} 
          icon={MessageCircle} 
        />
        
        {(user?.role === "admin" || user?.role === "senior_lawyer") && (
          <MetricsCard 
            title="Utilizadores" 
            value={organization?.memberCount.toString() || "0"} 
            icon={Users} 
          />
        )}
        
        {(user?.role !== "assistant") && (
          <MetricsCard 
            title="Transações" 
            value={transactions.length.toString()} 
            icon={DollarSign} 
          />
        )}
      </div>

      {/* Main dashboard content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="cases">Processos</TabsTrigger>
          {user?.role !== "client" && <TabsTrigger value="tasks">Tarefas</TabsTrigger>}
          <TabsTrigger value="messages">Mensagens</TabsTrigger>
          {user?.role !== "assistant" && <TabsTrigger value="financial">Financeiro</TabsTrigger>}
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Recent Cases */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Processos Recentes</CardTitle>
                <CardDescription>
                  Seus processos mais recentes e atualizações.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cases.length > 0 ? (
                  <div className="space-y-4">
                    {cases.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-gray-500 mt-1 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDate(item.updatedAt)}
                          </div>
                          <div className="flex gap-2 mt-2">
                            <StatusBadge status={item.status} />
                            <PriorityBadge priority={item.priority} />
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => navigate(`/cases/${item.id}`)}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => navigate("/cases")}
                    >
                      Ver todos
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Briefcase className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500">Nenhum processo encontrado</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mensagens Recentes</CardTitle>
                <CardDescription>
                  Suas conversas mais recentes e novas mensagens.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div>
                          <div className="font-medium">{item.senderName}</div>
                          <div className="text-sm text-gray-500 mt-1">{item.content.length > 50 ? `${item.content.substring(0, 50)}...` : item.content}</div>
                          <div className="text-xs text-gray-400 mt-1 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDate(item.createdAt)}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => navigate("/messages")}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => navigate("/messages")}
                    >
                      Ver todas
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <MessageCircle className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500">Nenhuma mensagem encontrada</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Tasks and Financial Overview */}
          <div className="grid gap-4 md:grid-cols-2">
            {user?.role !== "client" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tarefas Pendentes</CardTitle>
                  <CardDescription>
                    Suas tarefas mais urgentes que precisam de atenção.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {tasks.filter(t => t.status !== "done").length > 0 ? (
                    <div className="space-y-4">
                      {tasks.filter(t => t.status !== "done").slice(0, 3).map((item) => (
                        <div key={item.id} className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              {item.caseName}
                            </div>
                            <div className="flex gap-2 mt-2">
                              <StatusBadge status={item.status} />
                              <PriorityBadge priority={item.priority} />
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => navigate("/tasks")}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => navigate("/tasks")}
                      >
                        Ver todas
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <CheckSquare className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="mt-2 text-gray-500">Nenhuma tarefa pendente</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {(user?.role === "admin" || user?.role === "senior_lawyer" || user?.role === "lawyer" || user?.role === "client") && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resumo Financeiro</CardTitle>
                  <CardDescription>
                    Visão geral financeira e transações recentes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {transactions.length > 0 ? (
                    <div className="space-y-4">
                      {transactions.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                          <div>
                            <div className="font-medium">
                              {item.description || (item.type === "invoice" ? "Cobrança" : item.type === "payment" ? "Pagamento" : "Assinatura")}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {item.caseName || (item.type === "subscription" ? "Assinatura mensal" : "Transação geral")}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              {formatDate(item.date)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-medium ${item.type === "payment" || item.type === "subscription" ? "text-red-500" : "text-green-500"}`}>
                              {formatCurrency(item.amount, item.currency)}
                            </div>
                            <StatusBadge status={item.status} className="mt-1" />
                          </div>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => navigate("/financial")}
                      >
                        Ver todos
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <DollarSign className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="mt-2 text-gray-500">Nenhuma transação encontrada</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Analytics for admin and senior lawyer */}
          {(user?.role === "admin" || user?.role === "senior_lawyer") && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Métricas de Desempenho</CardTitle>
                <CardDescription>
                  Estatísticas e análises de performance do escritório.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart className="h-16 w-16 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-500">Estatísticas detalhadas estarão disponíveis em breve</p>
                  <Button 
                    variant="link" 
                    className="mt-2"
                    onClick={() => navigate("/reports")}
                  >
                    Ver relatórios preliminares
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Cases Tab */}
        <TabsContent value="cases" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Processos</CardTitle>
                  <CardDescription>Lista de todos os seus processos.</CardDescription>
                </div>
                <Button onClick={() => navigate("/cases")}>Ver todos</Button>
              </div>
            </CardHeader>
            <CardContent>
              {cases.length > 0 ? (
                <div className="space-y-4">
                  {cases.map((item) => (
                    <div key={item.id} className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {user?.role === "client" ? `Advogado: ${item.assignedLawyerName}` : `Cliente: ${item.clientName}`}
                        </div>
                        <div className="text-xs text-gray-400 mt-1 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Atualizado em {formatDate(item.updatedAt)}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <StatusBadge status={item.status} />
                          <PriorityBadge priority={item.priority} />
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => navigate(`/cases/${item.id}`)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Briefcase className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-500">Nenhum processo encontrado</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tasks Tab */}
        {user?.role !== "client" && (
          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Tarefas</CardTitle>
                    <CardDescription>Lista de todas as suas tarefas.</CardDescription>
                  </div>
                  <Button onClick={() => navigate("/tasks")}>Ver todas</Button>
                </div>
              </CardHeader>
              <CardContent>
                {tasks.length > 0 ? (
                  <div className="space-y-4">
                    {tasks.map((item) => (
                      <div key={item.id} className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            {item.caseName}
                          </div>
                          <div className="text-xs text-gray-400 mt-1 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {item.dueDate ? `Vence em ${formatDate(item.dueDate)}` : "Sem prazo definido"}
                          </div>
                          <div className="flex gap-2 mt-2">
                            <StatusBadge status={item.status} />
                            <PriorityBadge priority={item.priority} />
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => navigate("/tasks")}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <CheckSquare className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500">Nenhuma tarefa encontrada</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Mensagens</CardTitle>
                  <CardDescription>Suas conversas e mensagens recentes.</CardDescription>
                </div>
                <Button onClick={() => navigate("/messages")}>Ver todas</Button>
              </div>
            </CardHeader>
            <CardContent>
              {messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((item) => (
                    <div key={item.id} className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex-1">
                        <div className="font-medium">
                          {item.senderId === user?.id ? `Para: ${item.receiverName}` : `De: ${item.senderName}`}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{item.content}</div>
                        <div className="text-xs text-gray-400 mt-1 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(item.createdAt)}
                          {!item.readAt && item.senderId !== user?.id && (
                            <span className="ml-2 h-2 w-2 rounded-full bg-primary-500"></span>
                          )}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => navigate("/messages")}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <MessageCircle className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-500">Nenhuma mensagem encontrada</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Financial Tab */}
        {user?.role !== "assistant" && (
          <TabsContent value="financial" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Transações Financeiras</CardTitle>
                    <CardDescription>Histórico de pagamentos e cobranças.</CardDescription>
                  </div>
                  <Button onClick={() => navigate("/financial")}>Ver todas</Button>
                </div>
              </CardHeader>
              <CardContent>
                {transactions.length > 0 ? (
                  <div className="space-y-4">
                    {transactions.map((item) => (
                      <div key={item.id} className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div>
                          <div className="font-medium">
                            {item.description || (item.type === "invoice" ? "Cobrança" : item.type === "payment" ? "Pagamento" : "Assinatura")}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {item.caseName || (item.type === "subscription" ? "Assinatura mensal" : "Transação geral")}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {formatDate(item.date)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${item.type === "payment" || item.type === "subscription" ? "text-red-500" : "text-green-500"}`}>
                            {formatCurrency(item.amount, item.currency)}
                          </div>
                          <StatusBadge status={item.status} className="mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <DollarSign className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500">Nenhuma transação encontrada</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </DashboardLayout>
  );
};

export default Dashboard;
