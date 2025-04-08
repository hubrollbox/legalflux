import { aiService, ClauseSuggestion, TextCorrection } from './aiService';
import { randomUUID } from 'node:crypto';
import { documentService } from './documentService';
import { notifyUsers } from './notificationService';

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  usageCount: number;
}

export interface DocumentAnalysisResult {
  corrections: TextCorrection[];
  suggestions: ClauseSuggestion[];
  completeness: number; // 0-100%
  riskAreas: {
    area: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }[];
  missingClauses: {
    name: string;
    description: string;
    importance: 'optional' | 'recommended' | 'essential';
  }[];
}

export interface AutomationTask {
  id: string;
  name: string;
  description: string;
  documentType: string;
  triggerType: 'manual' | 'scheduled' | 'event';
  triggerDetails?: {
    schedule?: string; // Cron expression
    event?: string; // Event type
    conditions?: Record<string, any>; // Conditions for the trigger
  };
  actions: {
    type: 'generate' | 'update' | 'review' | 'notify' | 'custom';
    parameters: Record<string, any>;
  }[];
  lastRun?: Date;
  enabled: boolean;
  createdBy: string;
  createdAt: Date;
}

class DocumentAIService {
  private templates: Map<string, DocumentTemplate> = new Map();
  private automationTasks: Map<string, AutomationTask> = new Map();

  constructor() {
    // Inicializar com alguns templates de exemplo
    const exampleTemplates: DocumentTemplate[] = [
      {
        id: randomUUID(),
        name: 'Contrato de Prestação de Serviços Advocatícios',
        description: 'Template padrão para contratos de prestação de serviços advocatícios',
        content: 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS ADVOCATÍCIOS\n\nPelo presente instrumento particular, de um lado [NOME_CLIENTE], [QUALIFICAÇÃO_CLIENTE], doravante denominado CONTRATANTE, e de outro lado [NOME_ADVOGADO], inscrito na OAB/[UF] sob o nº [NUMERO_OAB], com escritório em [ENDEREÇO_ESCRITÓRIO], doravante denominado CONTRATADO, têm entre si justo e contratado o seguinte:\n\nCLÁUSULA PRIMEIRA - DO OBJETO\nO presente contrato tem por objeto a prestação de serviços advocatícios pelo CONTRATADO ao CONTRATANTE, consistentes em [DESCRIÇÃO_SERVIÇOS].\n\nCLÁUSULA SEGUNDA - DOS HONORÁRIOS\nPelos serviços prestados, o CONTRATANTE pagará ao CONTRATADO o valor de R$ [VALOR] ([VALOR_POR_EXTENSO]), a ser pago da seguinte forma: [FORMA_PAGAMENTO].\n\nCLÁUSULA TERCEIRA - DAS OBRIGAÇÕES DO CONTRATADO\nO CONTRATADO se obriga a:\na) Prestar os serviços advocatícios com zelo e diligência;\nb) Manter o CONTRATANTE informado sobre o andamento dos serviços;\nc) Guardar sigilo sobre as informações recebidas do CONTRATANTE.\n\nCLÁUSULA QUARTA - DAS OBRIGAÇÕES DO CONTRATANTE\nO CONTRATANTE se obriga a:\na) Fornecer ao CONTRATADO todas as informações e documentos necessários à prestação dos serviços;\nb) Pagar os honorários advocatícios na forma e prazo estipulados;\nc) Arcar com as despesas processuais e outras necessárias ao bom andamento dos serviços.\n\nCLÁUSULA QUINTA - DA VIGÊNCIA\nO presente contrato terá vigência de [PRAZO], iniciando-se na data de sua assinatura.\n\nCLÁUSULA SEXTA - DA RESCISÃO\nO presente contrato poderá ser rescindido por qualquer das partes, mediante notificação prévia de 30 (trinta) dias.\n\nCLÁUSULA SÉTIMA - DO FORO\nFica eleito o foro da Comarca de [COMARCA] para dirimir quaisquer dúvidas oriundas do presente contrato.\n\nE, por estarem assim justos e contratados, firmam o presente instrumento em 2 (duas) vias de igual teor e forma, na presença de 2 (duas) testemunhas.\n\n[LOCAL], [DATA].\n\n_______________________\nCONTRATANTE\n\n_______________________\nCONTRATADO\n\nTestemunhas:\n\n1. _______________________\nNome:\nCPF:\n\n2. _______________________\nNome:\nCPF:',
        category: 'Contratos',
        tags: ['advocacia', 'serviços jurídicos', 'honorários'],
        createdBy: 'system',
        createdAt: new Date(),
        updatedAt: new Date(),
        usageCount: 0
      },
      {
        id: randomUUID(),
        name: 'Procuração Ad Judicia',
        description: 'Modelo de procuração para representação judicial',
        content: 'PROCURAÇÃO AD JUDICIA\n\n[NOME_OUTORGANTE], [NACIONALIDADE], [ESTADO_CIVIL], [PROFISSÃO], portador(a) do RG nº [RG], inscrito(a) no CPF sob o nº [CPF], residente e domiciliado(a) em [ENDEREÇO], nomeia e constitui como seu(sua) procurador(a) o(a) advogado(a) [NOME_ADVOGADO], inscrito(a) na OAB/[UF] sob o nº [NUMERO_OAB], com escritório profissional em [ENDEREÇO_ESCRITÓRIO], a quem confere amplos poderes para o foro em geral, com a cláusula ad judicia, em qualquer Juízo, Instância ou Tribunal, podendo propor contra quem de direito as ações competentes e defendê-lo(a) nas contrárias, seguindo umas e outras, até final decisão, usando os recursos legais e acompanhando-os, conferindo-lhe, ainda, poderes especiais para confessar, desistir, transigir, firmar compromissos ou acordos, receber e dar quitação, agindo em conjunto ou separadamente, podendo ainda substabelecer esta em outrem, com ou sem reservas de iguais poderes, dando tudo por bom, firme e valioso, especialmente para [FINALIDADE].\n\n[LOCAL], [DATA].\n\n_______________________\n[NOME_OUTORGANTE]',
        category: 'Procurações',
        tags: ['procuração', 'representação judicial'],
        createdBy: 'system',
        createdAt: new Date(),
        updatedAt: new Date(),
        usageCount: 0
      }
    ];

    exampleTemplates.forEach(template => {
      this.templates.set(template.id, template);
    });

    // Inicializar com algumas tarefas de automação de exemplo
    const exampleTasks: AutomationTask[] = [
      {
        id: randomUUID(),
        name: 'Revisão Automática de Contratos',
        description: 'Revisa automaticamente novos contratos para identificar problemas e sugerir melhorias',
        documentType: 'Contrato',
        triggerType: 'event',
        triggerDetails: {
          event: 'document.created',
          conditions: {
            documentType: ['contrato', 'acordo', 'termo']
          }
        },
        actions: [
          {
            type: 'review',
            parameters: {
              reviewType: 'comprehensive',
              notifyUsers: true
            }
          }
        ],
        enabled: true,
        createdBy: 'system',
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: 'Geração Mensal de Relatórios',
        description: 'Gera relatórios mensais de atividade processual para clientes',
        documentType: 'Relatório',
        triggerType: 'scheduled',
        triggerDetails: {
          schedule: '0 9 1 * *' // Às 9h do primeiro dia de cada mês
        },
        actions: [
          {
            type: 'generate',
            parameters: {
              templateId: 'monthly-report',
              sendToClients: true
            }
          }
        ],
        enabled: true,
        createdBy: 'system',
        createdAt: new Date()
      }
    ];

    exampleTasks.forEach(task => {
      this.automationTasks.set(task.id, task);
    });
  }

  /**
   * Analisa um documento jurídico e fornece sugestões de melhorias
   */
  async analyzeDocument(documentText: string, documentType: string): Promise<DocumentAnalysisResult> {
    try {
      const corrections: TextCorrection[] = await aiService.correctLegalText(documentText, `Tipo de documento: ${documentType}`);
      const suggestions: ClauseSuggestion[] = await aiService.suggestClauses(documentType, 'Análise de documento existente', documentText);
      const analysisResult = await this.performDeepAnalysis(documentText, documentType);
      return {
        corrections,
        suggestions,
        completeness: analysisResult.completeness,
        riskAreas: analysisResult.riskAreas,
        missingClauses: analysisResult.missingClauses
      };
    } catch (error) {
      console.error('Erro ao analisar documento:', error);
      return {
        corrections: [],
        suggestions: [],
        completeness: 0,
        riskAreas: [],
        missingClauses: []
      };
    }
  }

  /**
   * Realiza uma análise profunda do documento para identificar completude e riscos
   */
  private async performDeepAnalysis(documentText: string, documentType: string): Promise<{
    completeness: number;
    riskAreas: DocumentAnalysisResult['riskAreas'];
    missingClauses: DocumentAnalysisResult['missingClauses'];
  }> {
    try {
      // Em uma implementação real, isso seria uma chamada à API de IA
      // Aqui estamos simulando uma análise baseada em regras simples
      
      const documentLower = documentText.toLowerCase();
      const riskAreas = [];
      const missingClauses = [];
      
      // Verificar cláusulas essenciais com base no tipo de documento
      if (documentType.toLowerCase().includes('contrato')) {
        // Verificar cláusula de objeto
        if (!documentLower.includes('objeto') && !documentLower.includes('cláusula primeira')) {
          missingClauses.push({
            name: 'Cláusula de Objeto',
            description: 'Define o propósito e escopo do contrato',
            importance: 'essential'
          });
        }
        
        // Verificar cláusula de pagamento
        if (!documentLower.includes('pagamento') && !documentLower.includes('honorários')) {
          missingClauses.push({
            name: 'Cláusula de Pagamento',
            description: 'Estabelece valores, forma e prazo de pagamento',
            importance: 'essential'
          });
        }
        
        // Verificar cláusula de vigência
        if (!documentLower.includes('vigência') && !documentLower.includes('prazo')) {
          missingClauses.push({
            name: 'Cláusula de Vigência',
            description: 'Define o período de validade do contrato',
            importance: 'essential'
          });
        }
        
        // Verificar cláusula de rescisão
        if (!documentLower.includes('rescisão') && !documentLower.includes('resilição')) {
          missingClauses.push({
            name: 'Cláusula de Rescisão',
            description: 'Estabelece condições para término do contrato',
            importance: 'recommended'
          });
        }
        
        // Verificar cláusula de foro
        if (!documentLower.includes('foro')) {
          missingClauses.push({
            name: 'Cláusula de Foro',
            description: 'Define a jurisdição competente para resolver disputas',
            importance: 'recommended'
          });
        }
        
        // Identificar áreas de risco
        if (documentLower.includes('multa') && !documentLower.includes('valor da multa')) {
          riskAreas.push({
            area: 'Cláusula Penal',
            description: 'A multa mencionada não tem valor específico definido',
            severity: 'medium'
          });
        }
        
        if (!documentLower.includes('confidencialidade') && !documentLower.includes('sigilo')) {
          riskAreas.push({
            area: 'Confidencialidade',
            description: 'Não há cláusula de confidencialidade ou sigilo',
            severity: 'medium'
          });
        }
      }
      
      // Calcular completude com base nas cláusulas essenciais e recomendadas
      const totalEssentialClauses = missingClauses.filter(c => c.importance === 'essential').length + 3; // Assumindo que há 3 cláusulas essenciais
      const missingEssentialClauses = missingClauses.filter(c => c.importance === 'essential').length;
      const totalRecommendedClauses = missingClauses.filter(c => c.importance === 'recommended').length + 2; // Assumindo que há 2 cláusulas recomendadas
      const missingRecommendedClauses = missingClauses.filter(c => c.importance === 'recommended').length;
      
      const essentialWeight = 0.7;
      const recommendedWeight = 0.3;
      
      const essentialCompleteness = (totalEssentialClauses - missingEssentialClauses) / totalEssentialClauses;
      const recommendedCompleteness = (totalRecommendedClauses - missingRecommendedClauses) / totalRecommendedClauses;
      
      const completeness = Math.round((essentialCompleteness * essentialWeight + recommendedCompleteness * recommendedWeight) * 100);
      
      return {
        completeness,
        riskAreas,
        missingClauses
      };
    } catch (error) {
      console.error('Erro na análise profunda do documento:', error);
      return {
        completeness: 0,
        riskAreas: [],
        missingClauses: []
      };
    }
  }

  /**
   * Gera um documento a partir de um template e parâmetros
   */
  async generateDocument(templateId: string, parameters: Record<string, string>): Promise<string> {
    try {
      const template = this.templates.get(templateId);
      if (!template) {
        throw new Error(`Template com ID ${templateId} não encontrado`);
      }
      
      // Incrementar contador de uso do template
      template.usageCount += 1;
      template.updatedAt = new Date();
      this.templates.set(templateId, template);
      
      // Substituir parâmetros no template
      let documentContent = template.content;
      
      for (const [key, value] of Object.entries(parameters)) {
        const placeholder = `[${key.toUpperCase()}]`;
        documentContent = documentContent.replace(new RegExp(placeholder, 'g'), value);
      }
      
      return documentContent;
    } catch (error) {
      console.error('Erro ao gerar documento a partir do template:', error);
      throw error;
    }
  }

  /**
   * Obtém todos os templates disponíveis
   */
  getTemplates(): DocumentTemplate[] {
    return Array.from(this.templates.values());
  }

  /**
   * Obtém um template específico pelo ID
   */
  getTemplate(templateId: string): DocumentTemplate | undefined {
    return this.templates.get(templateId);
  }

  /**
   * Cria um novo template
   */
  createTemplate(template: Omit<DocumentTemplate, 'id' | 'createdAt' | 'updatedAt' | 'usageCount'>): DocumentTemplate {
    const newTemplate: DocumentTemplate = {
      ...template,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      usageCount: 0
    };
    
    this.templates.set(newTemplate.id, newTemplate);
    return newTemplate;
  }

  /**
   * Atualiza um template existente
   */
  updateTemplate(templateId: string, updates: Partial<Omit<DocumentTemplate, 'id' | 'createdAt' | 'usageCount'>>): DocumentTemplate {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template com ID ${templateId} não encontrado`);
    }
    
    const updatedTemplate = {
      ...template,
      ...updates,
      updatedAt: new Date()
    };
    
    this.templates.set(templateId, updatedTemplate);
    return updatedTemplate;
  }

  /**
   * Exclui um template
   */
  deleteTemplate(templateId: string): boolean {
    return this.templates.delete(templateId);
  }

  /**
   * Obtém todas as tarefas de automação
   */
  getAutomationTasks(): AutomationTask[] {
    return Array.from(this.automationTasks.values());
  }

  /**
   * Obtém uma tarefa de automação específica pelo ID
   */
  getAutomationTask(taskId: string): AutomationTask | undefined {
    return this.automationTasks.get(taskId);
  }

  /**
   * Cria uma nova tarefa de automação
   */
  createAutomationTask(task: Omit<AutomationTask, 'id' | 'createdAt'>): AutomationTask {
    const newTask: AutomationTask = {
      ...task,
      id: randomUUID(),
      createdAt: new Date()
    };
    
    this.automationTasks.set(newTask.id, newTask);
    return newTask;
  }

  /**
   * Atualiza uma tarefa de automação existente
   */
  updateAutomationTask(taskId: string, updates: Partial<Omit<AutomationTask, 'id' | 'createdAt'>>): AutomationTask {
    const task = this.automationTasks.get(taskId);
    if (!task) {
      throw new Error(`Tarefa de automação com ID ${taskId} não encontrada`);
    }
    
    const updatedTask = {
      ...task,
      ...updates
    };
    
    this.automationTasks.set(taskId, updatedTask);
    return updatedTask;
  }

  /**
   * Exclui uma tarefa de automação
   */
  deleteAutomationTask(taskId: string): boolean {
    return this.automationTasks.delete(taskId);
  }

  /**
   * Executa uma tarefa de automação específica
   */
  async executeAutomationTask(taskId: string): Promise<boolean> {
    try {
      const task = this.automationTasks.get(taskId);
      if (!task) {
        throw new Error(`Tarefa de automação com ID ${taskId} não encontrada`);
      }
      
      if (!task.enabled) {
        console.log(`Tarefa ${task.name} está desativada`);
        return false;
      }
      
      console.log(`Executando tarefa de automação: ${task.name}`);
      
      // Executar ações da tarefa
      for (const action of task.actions) {
        await this.executeAction(action, task);
      }
      
      // Atualizar data da última execução
      const updatedTask = {
        ...task,
        lastRun: new Date()
      };
      
      this.automationTasks.set(taskId, updatedTask);
      
      // Notificar sobre a execução bem-sucedida
      await notifyUsers({
        title: 'Automação Executada',
        message: `A tarefa de automação "${task.name}" foi executada com sucesso`,
        type: 'action',
        data: { taskId }
      });
      
      return true;
    } catch (error) {
      console.error(`Erro ao executar tarefa de automação ${taskId}:`, error);
      return false;
    }
  }

  /**
   * Executa uma ação específica de uma tarefa de automação
   */
  private async executeAction(action: AutomationTask['actions'][0], task: AutomationTask): Promise<void> {
    switch (action.type) {
      case 'generate':
        // Gerar documento a partir de template
        if (action.parameters.templateId) {
          const documentContent = await this.generateDocument(
            action.parameters.templateId,
            action.parameters.parameters || {}
          );
          
          console.log(`Documento gerado a partir do template ${action.parameters.templateId}`);
          
          // Se configurado para enviar aos clientes
          if (action.parameters.sendToClients) {
            console.log('Enviando documento aos clientes (simulado)');
            // Implementar lógica de envio
          }
        }
        break;
        
      case 'review':
        // Revisar documentos
        console.log(`Executando revisão de documentos do tipo ${task.documentType}`);
        // Implementar lógica de revisão
        break;
        
      case 'notify':
        // Enviar notificação
        await notifyUsers({
          title: action.parameters.title || 'Notificação Automática',
          message: action.parameters.message || `Notificação da tarefa "${task.name}"`,
          type: action.parameters.notificationType || 'info',
          data: { taskId: task.id, ...action.parameters.data }
        });
        break;
        
      case 'custom':
        // Ação personalizada
        console.log(`Executando ação personalizada: ${action.parameters.actionName || 'sem nome'}`);
        // Implementar lógica personalizada
        break;
        
      default:
        console.log(`Tipo de ação não implementado: ${action.type}`);
    }
  
    }

    private async correctText(documentText: string): Promise<TextCorrection[]> {
        try {
            return await aiService.correctLegalText(documentText, 'Correção de texto legal');
        } catch (error) {
            console.error('Erro ao corrigir texto:', error);
            return [];
        }
    }
}

export const documentAIService = new DocumentAIService();