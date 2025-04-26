import { documentAIService, AutomationTask } from './documentAIService';
import { documentService } from './documentService';
import { notifyUsers } from './notificationService';

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  triggerType: 'manual' | 'scheduled' | 'event';
  triggerDetails?: {
    schedule?: string; // Cron expression
    event?: string; // Event type
    conditions?: Record<string, any>; // Conditions for the trigger
  };
  steps: WorkflowStep[];
  enabled: boolean;
  createdBy: string;
  createdAt: Date;
  lastRun?: Date;
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'document_generation' | 'document_review' | 'notification' | 'approval' | 'external_integration' | 'custom';
  parameters: Record<string, any>;
  condition?: {
    field: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than';
    value: any;
  };
  nextStepOnSuccess?: string;
  nextStepOnFailure?: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled' | 'waiting_approval';
  startedAt: Date;
  completedAt?: Date;
  currentStepId?: string;
  results: {
    stepId: string;
    status: 'success' | 'failure' | 'skipped';
    output?: any;
    error?: string;
    startedAt: Date;
    completedAt?: Date;
  }[];
  context: Record<string, any>;
  initiatedBy: string;
}

export interface DocumentProcessingRule {
  id: string;
  name: string;
  description: string;
  documentTypes: string[];
  conditions: {
    field: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than';
    value: any;
  }[];
  actions: {
    type: 'tag' | 'categorize' | 'route' | 'extract_data' | 'notify' | 'custom';
    parameters: Record<string, any>;
  }[];
  priority: number;
  enabled: boolean;
  createdBy: string;
  createdAt: Date;
  lastRun?: Date;
}

class AutomationService {
  private workflows: Map<string, WorkflowDefinition> = new Map();
  private workflowExecutions: Map<string, WorkflowExecution> = new Map();
  private documentRules: Map<string, DocumentProcessingRule> = new Map();
  private approvalTasks: Map<string, any> = new Map();

  constructor() {
    // Inicializar com alguns fluxos de trabalho de exemplo
    const exampleWorkflows: WorkflowDefinition[] = [
      {
        id: crypto.randomUUID(),
        name: 'Processo de Onboarding de Cliente',
        description: 'Fluxo de trabalho para integração de novos clientes',
        triggerType: 'manual',
        steps: [
          {
            id: 'step1',
            name: 'Gerar Contrato de Prestação de Serviços',
            type: 'document_generation',
            parameters: {
              templateId: 'contrato-servicos',
              parameterMapping: {
                'NOME_CLIENTE': 'context.client.name',
                'QUALIFICACAO_CLIENTE': 'context.client.details',
                'NOME_ADVOGADO': 'context.lawyer.name',
                'NUMERO_OAB': 'context.lawyer.oabNumber',
                'ENDERECO_ESCRITORIO': 'context.lawyer.address',
                'DESCRICAO_SERVICOS': 'context.serviceDescription',
                'VALOR': 'context.fee.amount',
                'VALOR_POR_EXTENSO': 'context.fee.amountInWords',
                'FORMA_PAGAMENTO': 'context.fee.paymentTerms',
                'PRAZO': 'context.contractDuration',
                'COMARCA': 'context.jurisdiction',
                'LOCAL': 'context.location',
                'DATA': 'context.currentDate'
              },
              outputVariable: 'contract'
            },
            nextStepOnSuccess: 'step2'
          },
          {
            id: 'step2',
            name: 'Revisar Contrato',
            type: 'document_review',
            parameters: {
              documentVariable: 'contract',
              reviewType: 'comprehensive',
              outputVariable: 'reviewResults'
            },
            nextStepOnSuccess: 'step3'
          },
          {
            id: 'step3',
            name: 'Notificar Responsável',
            type: 'notification',
            parameters: {
              title: 'Contrato Pronto para Revisão',
              message: 'O contrato para o cliente {{context.client.name}} foi gerado e está pronto para revisão final.',
              recipients: ['{{context.responsibleLawyer}}'],
              includeDocument: true,
              documentVariable: 'contract'
            }
          }
        ],
        enabled: true,
        createdBy: 'system',
        createdAt: new Date()
      },
      {
        id: crypto.randomUUID(),
        name: 'Processamento de Documentos Recebidos',
        description: 'Classifica e roteia automaticamente documentos recebidos',
        triggerType: 'event',
        triggerDetails: {
          event: 'document.uploaded',
          conditions: {
            documentSource: 'external'
          }
        },
        steps: [
          {
            id: 'step1',
            name: 'Classificar Documento',
            type: 'custom',
            parameters: {
              action: 'classifyDocument',
              inputVariable: 'document',
              outputVariable: 'classification'
            },
            nextStepOnSuccess: 'step2'
          },
          {
            id: 'step2',
            name: 'Decisão de Roteamento',
            type: 'custom',
            parameters: {
              action: 'conditionalBranch',
              condition: {
                variable: 'classification.type',
                equals: 'legal_notice'
              },
              trueStep: 'step3a',
              falseStep: 'step3b'
            }
          },
          {
            id: 'step3a',
            name: 'Notificar Urgente',
            type: 'notification',
            parameters: {
              title: 'Notificação Legal Recebida - URGENTE',
              message: 'Uma notificação legal foi recebida e requer atenção imediata.',
              recipients: ['{{context.legalTeam}}'],
              priority: 'high',
              includeDocument: true,
              documentVariable: 'document'
            }
          },
          {
            id: 'step3b',
            name: 'Arquivar e Notificar',
            type: 'custom',
            parameters: {
              action: 'fileDocument',
              documentVariable: 'document',
              classification: '{{classification}}',
              notifyUsers: true,
              notificationPriority: 'normal'
            }
          }
        ],
        enabled: true,
        createdBy: 'system',
        createdAt: new Date()
      }
    ];

    exampleWorkflows.forEach(workflow => {
      this.workflows.set(workflow.id, workflow);
    });

    // Inicializar com algumas regras de processamento de documentos de exemplo
    const exampleRules: DocumentProcessingRule[] = [
      {
        id: crypto.randomUUID(),
        name: 'Categorização de Contratos',
        description: 'Categoriza automaticamente documentos de contrato',
        documentTypes: ['pdf', 'docx', 'doc'],
        conditions: [
          {
            field: 'content',
            operator: 'contains',
            value: 'contrato'
          }
        ],
        actions: [
          {
            type: 'categorize',
            parameters: {
              category: 'Contratos'
            }
          },
          {
            type: 'tag',
            parameters: {
              tags: ['contrato', 'documento legal']
            }
          }
        ],
        priority: 10,
        enabled: true,
        createdBy: 'system',
        createdAt: new Date()
      },
      {
        id: crypto.randomUUID(),
        name: 'Extração de Dados de Processos',
        description: 'Extrai automaticamente informações de documentos processuais',
        documentTypes: ['pdf', 'docx', 'doc'],
        conditions: [
          {
            field: 'content',
            operator: 'contains',
            value: 'processo'
          }
        ],
        actions: [
          {
            type: 'extract_data',
            parameters: {
              dataPoints: [
                { name: 'numeroProcesso', pattern: '\\d{7}-\\d{2}\\.\\d{4}\\.\\d{1}\\.\\d{2}\\.\\d{4}' },
                { name: 'partes', pattern: 'entre\\s+(.+?)\\s+e\\s+(.+?)\\s' },
                { name: 'dataAudiencia', pattern: 'audiência[^\\d]+(\\d{2}/\\d{2}/\\d{4})' }
              ],
              storeResults: true
            }
          },
          {
            type: 'notify',
            parameters: {
              title: 'Novo Documento Processual',
              message: 'Um novo documento processual foi recebido e processado automaticamente.',
              includeExtractedData: true
            }
          }
        ],
        priority: 20,
        enabled: true,
        createdBy: 'system',
        createdAt: new Date()
      }
    ];

    exampleRules.forEach(rule => {
      this.documentRules.set(rule.id, rule);
    });
  }

  /**
   * Obtém todos os fluxos de trabalho
   * @param useDatabase Se verdadeiro, busca do banco de dados; caso contrário, usa o cache local
   */
  async getWorkflows(useDatabase = true): Promise<WorkflowDefinition[]> {
    // Verificar primeiro no cache local
    const cachedWorkflows = Array.from(this.workflows.values());
    
    if (!useDatabase) {
      return cachedWorkflows;
    }
    
    try {
      // Importar o cliente Supabase
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Buscar os fluxos de trabalho no banco de dados
      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Erro ao buscar fluxos de trabalho:', error);
        return cachedWorkflows; // Fallback para o cache local em caso de erro
      }
      
      if (data && data.length > 0) {
        // Converter o formato do banco de dados para o formato da aplicação
        const workflows: WorkflowDefinition[] = data.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          triggerType: item.trigger_type,
          triggerDetails: item.trigger_details,
          steps: item.steps,
          enabled: item.enabled,
          createdBy: item.created_by,
          createdAt: new Date(item.created_at),
          lastRun: item.last_run ? new Date(item.last_run) : undefined
        }));
        
        // Atualizar o cache local
        workflows.forEach(workflow => {
          this.workflows.set(workflow.id, workflow);
        });
        
        return workflows;
      }
      
      return cachedWorkflows;
    } catch (error) {
      console.error('Erro ao acessar o banco de dados:', error);
      return cachedWorkflows; // Fallback para o cache local em caso de erro
    }
  }

  /**
   * Obtém um fluxo de trabalho específico pelo ID
   * @param workflowId ID do fluxo de trabalho
   * @param useDatabase Se verdadeiro, busca do banco de dados; caso contrário, usa o cache local
   */
  async getWorkflow(workflowId: string, useDatabase = true): Promise<WorkflowDefinition | undefined> {
    // Verificar primeiro no cache local
    const cachedWorkflow = this.workflows.get(workflowId);
    
    if (!useDatabase || !workflowId) {
      return cachedWorkflow;
    }
    
    try {
      // Importar o cliente Supabase
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Buscar o fluxo de trabalho no banco de dados
      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .eq('id', workflowId)
        .single();
      
      if (error) {
        console.error('Erro ao buscar fluxo de trabalho:', error);
        return cachedWorkflow; // Fallback para o cache local em caso de erro
      }
      
      if (data) {
        // Converter o formato do banco de dados para o formato da aplicação
        const workflow: WorkflowDefinition = {
          id: data.id,
          name: data.name,
          description: data.description,
          triggerType: data.trigger_type,
          triggerDetails: data.trigger_details,
          steps: data.steps,
          enabled: data.enabled,
          createdBy: data.created_by,
          createdAt: new Date(data.created_at),
          lastRun: data.last_run ? new Date(data.last_run) : undefined
        };
        
        // Atualizar o cache local
        this.workflows.set(workflow.id, workflow);
        
        return workflow;
      }
      
      return cachedWorkflow;
    } catch (error) {
      console.error('Erro ao acessar o banco de dados:', error);
      return cachedWorkflow; // Fallback para o cache local em caso de erro
    }
  }

  /**
   * Cria um novo fluxo de trabalho
   * @param workflow Dados do fluxo de trabalho a ser criado
   * @param persistToDatabase Se verdadeiro, persiste no banco de dados; caso contrário, apenas no cache local
   */
  async createWorkflow(
    workflow: Omit<WorkflowDefinition, 'id' | 'createdAt'>,
    persistToDatabase = true
  ): Promise<WorkflowDefinition> {
    // Validate workflow input
    if (!workflow.name || !workflow.description || !workflow.triggerType) {
      throw new Error('Workflow name, description and triggerType are required');
    }
    
    if (workflow.steps.length === 0) {
      throw new Error('Workflow must have at least one step');
    }
    
    // Validate each step
    workflow.steps.forEach(step => {
      if (!step.id || !step.name || !step.type) {
        throw new Error('Step id, name and type are required');
      }
      
      if (step.type === 'document_generation' && !step.parameters.templateId) {
        throw new Error('templateId is required for document_generation steps');
      }
    });
    const newWorkflow: WorkflowDefinition = {
      ...workflow,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    
    // Armazenar no cache local
    this.workflows.set(newWorkflow.id, newWorkflow);
    
    if (persistToDatabase) {
      try {
        // Importar o cliente Supabase
        const { supabase } = await import('@/integrations/supabase/client');
        
        // Converter para o formato do banco de dados
        const dbWorkflow = {
          id: newWorkflow.id,
          name: newWorkflow.name,
          description: newWorkflow.description,
          trigger_type: newWorkflow.triggerType,
          trigger_details: newWorkflow.triggerDetails,
          steps: newWorkflow.steps,
          enabled: newWorkflow.enabled,
          created_by: newWorkflow.createdBy,
          created_at: newWorkflow.createdAt.toISOString(),
          last_run: newWorkflow.lastRun ? newWorkflow.lastRun.toISOString() : null
        };
        
        // Inserir no banco de dados
        const { error } = await supabase
          .from('workflows')
          .insert(dbWorkflow);
        
        if (error) {
          console.error('Erro ao persistir fluxo de trabalho:', error);
          // Continuar mesmo com erro, pois já temos o fluxo no cache local
        }
      } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error);
        // Continuar mesmo com erro, pois já temos o fluxo no cache local
      }
    }
    
    return newWorkflow;
  }

  /**
   * Atualiza um fluxo de trabalho existente
   * @param workflowId ID do fluxo de trabalho a ser atualizado
   * @param updates Atualizações a serem aplicadas
   * @param persistToDatabase Se verdadeiro, persiste no banco de dados; caso contrário, apenas no cache local
   */
  async updateWorkflow(
    workflowId: string,
    updates: Partial<Omit<WorkflowDefinition, 'id' | 'createdAt'>>,
    persistToDatabase = true
  ): Promise<WorkflowDefinition> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Fluxo de trabalho com ID ${workflowId} não encontrado`);
    }
    
    const updatedWorkflow = {
      ...workflow,
      ...updates
    };
    
    // Atualizar no cache local
    this.workflows.set(workflowId, updatedWorkflow);
    
    if (persistToDatabase) {
      try {
        // Importar o cliente Supabase
        const { supabase } = await import('@/integrations/supabase/client');
        
        // Converter para o formato do banco de dados
        const dbUpdates: Record<string, any> = {};
        
        if (updates.name !== undefined) dbUpdates.name = updates.name;
        if (updates.description !== undefined) dbUpdates.description = updates.description;
        if (updates.triggerType !== undefined) dbUpdates.trigger_type = updates.triggerType;
        if (updates.triggerDetails !== undefined) dbUpdates.trigger_details = updates.triggerDetails;
        if (updates.steps !== undefined) dbUpdates.steps = updates.steps;
        if (updates.enabled !== undefined) dbUpdates.enabled = updates.enabled;
        if (updates.lastRun !== undefined) dbUpdates.last_run = updates.lastRun?.toISOString();
        
        // Atualizar no banco de dados
        const { error } = await supabase
          .from('workflows')
          .update(dbUpdates)
          .eq('id', workflowId);
        
        if (error) {
          console.error('Erro ao atualizar fluxo de trabalho:', error);
          // Continuar mesmo com erro, pois já temos o fluxo atualizado no cache local
        }
      } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error);
        // Continuar mesmo com erro, pois já temos o fluxo atualizado no cache local
      }
    }
    
    return updatedWorkflow;
  }

  /**
   * Exclui um fluxo de trabalho
   * @param workflowId ID do fluxo de trabalho a ser excluído
   * @param persistToDatabase Se verdadeiro, exclui do banco de dados; caso contrário, apenas do cache local
   */
  async deleteWorkflow(workflowId: string, persistToDatabase = true): Promise<boolean> {
    // Remover do cache local
    const deleted = this.workflows.delete(workflowId);
    
    if (persistToDatabase && deleted) {
      try {
        // Importar o cliente Supabase
        const { supabase } = await import('@/integrations/supabase/client');
        
        // Excluir do banco de dados
        const { error } = await supabase
          .from('workflows')
          .delete()
          .eq('id', workflowId);
        
        if (error) {
          console.error('Erro ao excluir fluxo de trabalho:', error);
          // Continuar mesmo com erro, pois já removemos do cache local
        }
      } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error);
        // Continuar mesmo com erro, pois já removemos do cache local
      }
    }
    
    return deleted;
  }

  /**
   * Executa um fluxo de trabalho
   */
  async executeWorkflow(workflowId: string, context: Record<string, any>, userId: string): Promise<WorkflowExecution> {
    // Validate inputs
    if (!workflowId || !userId) {
      throw new Error('workflowId and userId are required');
    }
    
    if (typeof context !== 'object' || context === null) {
      throw new Error('context must be an object');
    }
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Fluxo de trabalho com ID ${workflowId} não encontrado`);
    }
    
    if (!workflow.enabled) {
      throw new Error(`Fluxo de trabalho ${workflow.name} está desativado`);
    }
    
    // Criar registro de execução
    const execution: WorkflowExecution = {
      id: crypto.randomUUID(),
      workflowId,
      status: 'running',
      startedAt: new Date(),
      results: [],
      context,
      initiatedBy: userId
    };
    
    this.workflowExecutions.set(execution.id, execution);
    
    // Notificar início da execução
    await notifyUsers({
      title: 'Fluxo de Trabalho Iniciado',
      message: `O fluxo de trabalho "${workflow.name}" foi iniciado`,
      type: 'action',
      data: { workflowId, executionId: execution.id }
    });
    
    try {
      // Encontrar o primeiro passo
      if (workflow.steps.length === 0) {
        throw new Error('O fluxo de trabalho não possui passos definidos');
      }
      
      const firstStep = workflow.steps[0];
      await this.executeWorkflowStep(execution.id, firstStep.id);
      
      // Atualizar o registro de execução
      const updatedExecution = this.workflowExecutions.get(execution.id);
      if (updatedExecution) {
        updatedExecution.status = 'completed';
        updatedExecution.completedAt = new Date();
        this.workflowExecutions.set(execution.id, updatedExecution);
        
        // Atualizar o registro do fluxo de trabalho
        workflow.lastRun = new Date();
        this.workflows.set(workflowId, workflow);
        
        // Notificar conclusão da execução
        await notifyUsers({
          title: 'Fluxo de Trabalho Concluído',
          message: `O fluxo de trabalho "${workflow.name}" foi concluído com sucesso`,
          type: 'action',
          data: { workflowId, executionId: execution.id }
        });
        
        return updatedExecution;
      }
      
      return execution;
    } catch (error) {
      // Atualizar o registro de execução em caso de erro
      const updatedExecution = this.workflowExecutions.get(execution.id);
      if (updatedExecution) {
        updatedExecution.status = 'failed';
        updatedExecution.completedAt = new Date();
        this.workflowExecutions.set(execution.id, updatedExecution);
        
        // Notificar falha na execução
        await notifyUsers({
          title: 'Falha no Fluxo de Trabalho',
          message: `O fluxo de trabalho "${workflow.name}" falhou: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
          type: 'process',
          data: { workflowId, executionId: execution.id, error: error instanceof Error ? error.message : 'Erro desconhecido' }
        });
        
        return updatedExecution;
      }
      
      throw error;
    }
  }

  /**
   * Executa um passo específico de um fluxo de trabalho
   */
  private async executeWorkflowStep(executionId: string, stepId: string): Promise<void> {
    const execution = this.workflowExecutions.get(executionId);
    if (!execution) {
      throw new Error(`Execução com ID ${executionId} não encontrada`);
    }
    
    const workflow = this.workflows.get(execution.workflowId);
    if (!workflow) {
      throw new Error(`Fluxo de trabalho com ID ${execution.workflowId} não encontrado`);
    }
    
    const step = workflow.steps.find(s => s.id === stepId);
    if (!step) {
      throw new Error(`Passo com ID ${stepId} não encontrado no fluxo de trabalho`);
    }
    
    // Atualizar o passo atual na execução
    execution.currentStepId = stepId;
    this.workflowExecutions.set(executionId, execution);
    
    // Registrar início da execução do passo
    const stepResult = {
      stepId,
      status: 'success' as 'success' | 'failure' | 'skipped',
      startedAt: new Date(),
      output: undefined,
      error: undefined,
      completedAt: undefined
    };
    
    try {
      // Verificar condição do passo, se existir
      if (step.condition) {
        const conditionMet = this.evaluateCondition(step.condition, execution.context);
        if (!conditionMet) {
          stepResult.status = 'skipped';
          stepResult.completedAt = new Date();
          execution.results.push(stepResult);
          this.workflowExecutions.set(executionId, execution);
          
          // Se o passo foi pulado, verificar se há próximo passo
          if (step.nextStepOnFailure) {
            await this.executeWorkflowStep(executionId, step.nextStepOnFailure);
          }
          
          return;
        }
      }
      
      // Executar o passo com base no tipo
      let output;
      switch (step.type) {
        case 'document_generation':
          output = await this.executeDocumentGenerationStep(step, execution.context);
          break;
          
        case 'document_review':
          output = await this.executeDocumentReviewStep(step, execution.context);
          break;
          
        case 'notification':
          output = await this.executeNotificationStep(step, execution.context);
          break;
          
        case 'approval':
          output = await this.executeApprovalStep(step, execution.context);
          break;
          
        case 'external_integration':
          output = await this.executeExternalIntegrationStep(step, execution.context);
          break;
          
        case 'custom':
          output = await this.executeCustomStep(step, execution.context);
          break;
          
        default:
          throw new Error(`Tipo de passo não suportado: ${step.type}`);
      }
      
      // Armazenar o resultado na variável de saída, se especificada
      if (step.parameters.outputVariable && output !== undefined) {
        execution.context[step.parameters.outputVariable] = output;
      }
      
      // Registrar conclusão bem-sucedida do passo
      stepResult.output = output;
      stepResult.completedAt = new Date();
      execution.results.push(stepResult);
      this.workflowExecutions.set(executionId, execution);
      
      // Executar o próximo passo, se existir
      if (step.nextStepOnSuccess) {
        await this.executeWorkflowStep(executionId, step.nextStepOnSuccess);
      }
    } catch (error) {
      // Registrar falha na execução do passo
      stepResult.status = 'failure';
      stepResult.error = error instanceof Error ? error.message : 'Erro desconhecido';
      stepResult.completedAt = new Date();
      execution.results.push(stepResult);
      this.workflowExecutions.set(executionId, execution);
      
      // Executar o próximo passo em caso de falha, se existir
      if (step.nextStepOnFailure) {
        await this.executeWorkflowStep(executionId, step.nextStepOnFailure);
      } else {
        throw error; // Propagar o erro se não houver próximo passo definido
      }
    }
  }

  /**
   * Avalia uma condição com base no contexto da execução
   */
  private evaluateCondition(condition: WorkflowStep['condition'], context: Record<string, any>): boolean {
    if (!condition) return true;
    
    const { field, operator, value } = condition;
    const fieldValue = this.getNestedValue(context, field);
    
    switch (operator) {
      case 'equals':
        return fieldValue === value;
      case 'not_equals':
        return fieldValue !== value;
      case 'contains':
        return typeof fieldValue === 'string' && fieldValue.includes(value);
      case 'not_contains':
        return typeof fieldValue === 'string' && !fieldValue.includes(value);
      case 'greater_than':
        return typeof fieldValue === 'number' && fieldValue > value;
      case 'less_than':
        return typeof fieldValue === 'number' && fieldValue < value;
      default:
        return false;
    }
  }

  /**
   * Obtém um valor aninhado de um objeto usando notação de ponto
   */
  private getNestedValue(obj: Record<string, any>, path: string): any {
    return path.split('.').reduce((prev, curr) => {
      return prev && prev[curr] !== undefined ? prev[curr] : undefined;
    }, obj);
  }

  /**
   * Executa um passo de geração de documento
   */
  private async executeDocumentGenerationStep(step: WorkflowStep, context: Record<string, any>): Promise<string> {
    const { templateId, parameterMapping } = step.parameters;
    
    if (!templateId) {
      throw new Error('ID do template não especificado');
    }
    
    // Mapear parâmetros do contexto para o template
    const templateParameters: Record<string, string> = {};
    
    if (parameterMapping) {
      for (const [paramName, contextPath] of Object.entries(parameterMapping)) {
        if (typeof contextPath === 'string') {
          const value = this.getNestedValue(context, contextPath);
          if (value !== undefined) {
            templateParameters[paramName] = String(value);
          }
        }
      }
    }
    
    // Gerar o documento usando o serviço de IA de documentos
    return await documentAIService.generateDocument(templateId, templateParameters);
  }

  /**
   * Executa um passo de revisão de documento
   */
  private async executeDocumentReviewStep(step: WorkflowStep, context: Record<string, any>): Promise<any> {
    const { documentVariable, reviewType } = step.parameters;
    
    if (!documentVariable) {
      throw new Error('Variável do documento não especificada');
    }
    
    const documentText = this.getNestedValue(context, documentVariable);
    if (!documentText) {
      throw new Error(`Documento não encontrado na variável ${documentVariable}`);
    }
    
    // Analisar o documento usando o serviço de IA de documentos
    return await documentAIService.analyzeDocument(documentText, reviewType || 'general');
  }

  /**
   * Executa um passo de notificação
   */
  private async executeNotificationStep(step: WorkflowStep, context: Record<string, any>): Promise<boolean> {
    const { title, message, recipients, includeDocument, documentVariable } = step.parameters;

    // Verificar se os parâmetros essenciais estão definidos
    if (!title || !message || !recipients) {
      console.error('Parâmetros de notificação ausentes:', { title, message, recipients });
      return false;
    }
    
    // Substituir placeholders no título e mensagem
    const processedTitle = this.replacePlaceholders(title, context);
    const processedMessage = this.replacePlaceholders(message, context);
    
    // Preparar dados adicionais para a notificação
    const notificationData: Record<string, any> = { workflowStepId: step.id };
    
    // Incluir documento, se solicitado
    if (includeDocument && documentVariable) {
      const documentText = this.getNestedValue(context, documentVariable);
      if (documentText) {
        notificationData.document = documentText;
      }
    }
    
    // Enviar notificação
    await notifyUsers({
      title: processedTitle,
      message: processedMessage,
      type: 'action',
      data: notificationData
    });
    
    return true;
  }

  /**
   * Executa um passo de aprovação
   * Cria uma tarefa de aprovação no sistema e notifica os usuários responsáveis
   */

  private async executeApprovalStep(step: WorkflowStep, context: Record<string, any>): Promise<boolean> {
    const { approvers, title, description, dueDate, priority = 'medium' } = step.parameters;
    
    if (!approvers || !Array.isArray(approvers) || approvers.length === 0) {
      throw new Error('Nenhum aprovador especificado para o passo de aprovação');
    }

    const execution = this.workflowExecutions.get(context.executionId);
    if (!execution) {
      throw new Error(`Execução com ID ${context.executionId} não encontrada`);
    }

    const workflow = this.workflows.get(execution.workflowId);
    if (!workflow) {
      throw new Error(`Fluxo de trabalho com ID ${execution.workflowId} não encontrado`);
    }

    try {
      // Processar os aprovadores (podem ser IDs diretos ou referências no contexto)
      const resolvedApprovers = approvers.map(approver => {
        if (typeof approver === 'string') {
          // Verificar se é uma referência ao contexto
          if (approver.startsWith('{{') && approver.endsWith('}}')) {
            const path = approver.slice(2, -2).trim();
            return this.getNestedValue(context, path);
          }
          return approver;
        }
        return approver;
      }).filter(Boolean);

      if (resolvedApprovers.length === 0) {
        throw new Error('Nenhum aprovador válido encontrado após resolução de contexto');
      }

      // Resolver o título e descrição com variáveis do contexto
      const resolvedTitle = this.replaceContextVariables(title || `Aprovação necessária: ${workflow.name}`, context);
      const resolvedDescription = this.replaceContextVariables(
        description || `Aprovação necessária para o passo "${step.name}" no fluxo de trabalho "${workflow.name}"`,
        context
      );

      // Criar tarefas de aprovação para cada aprovador
      const approvalTasks = [];
      for (const approver of resolvedApprovers) {
        // Obter informações do aprovador (em uma implementação real, isso viria do banco de dados)
        const approverName = typeof approver === 'object' && approver.name ? approver.name : 'Aprovador';
        const approverId = typeof approver === 'object' && approver.id ? approver.id : approver;

        // Criar a tarefa de aprovação no Supabase
        try {
          // Importar o cliente Supabase
          const { supabase } = await import('@/integrations/supabase/client');
          
          // Criar a tarefa no banco de dados
          const { data, error } = await supabase
            .from('workflow_tasks')
            .insert({
              workflow_id: workflow.id,
              workflow_execution_id: execution.id,
              step_id: step.id,
              title: resolvedTitle,
              description: resolvedDescription,
              assigned_to_id: approverId,
              assigned_to_name: approverName,
              created_by_id: execution.initiatedBy,
              created_by_name: 'Sistema', // Em uma implementação real, obter o nome do usuário
              status: 'pending',
              priority: priority,
              due_date: dueDate ? new Date(dueDate).toISOString() : undefined,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              metadata: { context: JSON.stringify(context) }
            })
            .select();

          if (error) {
            console.error('Erro ao criar tarefa de aprovação:', error);
            throw new Error(`Erro ao criar tarefa de aprovação: ${error.message}`);
          }

          if (data && data.length > 0) {
            approvalTasks.push(data[0]);
          }
        } catch (dbError) {
          console.error('Erro ao acessar o banco de dados:', dbError);
          // Fallback para armazenamento em memória se o banco de dados falhar
          const taskId = crypto.randomUUID();
          const task = {
            id: taskId,
            workflow_id: workflow.id,
            workflow_execution_id: execution.id,
            step_id: step.id,
            title: resolvedTitle,
            description: resolvedDescription,
            assigned_to_id: approverId,
            assigned_to_name: approverName,
            created_by_id: execution.initiatedBy,
            created_by_name: 'Sistema',
            status: 'pending',
            priority: priority,
            due_date: dueDate ? new Date(dueDate).toISOString() : undefined,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          
          // Armazenar em um Map local (em uma implementação real, isso seria persistido)
          if (!this.approvalTasks) {
            this.approvalTasks = new Map();
          }
          this.approvalTasks.set(taskId, task);
          approvalTasks.push(task);
        }

        // Notificar o aprovador
        await notifyUsers({
          title: resolvedTitle,
          message: resolvedDescription,
          type: 'approval',
          recipients: [approverId],
          priority: priority,
          data: {
            workflowId: workflow.id,
            executionId: execution.id,
            stepId: step.id,
            taskId: approvalTasks[approvalTasks.length - 1]?.id
          }
        });
      }

      // Armazenar as tarefas de aprovação no contexto para referência futura
      context.approvalTasks = approvalTasks;

      // Em uma implementação real, aqui aguardaríamos a resposta da aprovação
      // Para esta simulação, vamos apenas retornar sucesso
      console.log(`Criadas ${approvalTasks.length} tarefas de aprovação para o passo ${step.id}`);
      
      // Atualizar o status da execução para aguardando aprovação
      execution.status = 'waiting_approval';
      this.workflowExecutions.set(execution.id, execution);
      
      // Retornar true para indicar que o passo foi iniciado com sucesso
      // O fluxo de trabalho ficará em espera até que todas as aprovações sejam concluídas
      return true;
    } catch (error) {
      console.error('Erro ao executar passo de aprovação:', error);
      throw error;
    }
  }

  /**
   * Substitui variáveis de contexto em uma string
   * Formato: {{variavel.caminho}}
   */
  private replaceContextVariables(text: string, context: Record<string, any>): string {
    return text.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
      const value = this.getNestedValue(context, path.trim());
      return value !== undefined ? String(value) : match;
    });
  }

  /**
   * Executa um passo de integração externa
   */
  private async executeExternalIntegrationStep(step: WorkflowStep, context: Record<string, any>): Promise<any> {
    // Em uma implementação real, isso se integraria com sistemas externos
    // Para esta simulação, vamos apenas retornar sucesso
    console.log(`Simulando integração externa para o passo ${step.id}`);
    return { success: true, message: 'Integração simulada com sucesso' };
  }

  /**
   * Processa uma resposta de aprovação
   * @param taskId ID da tarefa de aprovação
   * @param approved Indica se a aprovação foi concedida ou negada
   * @param comments Comentários opcionais sobre a decisão
   * @param userId ID do usuário que respondeu à aprovação
   */
  async processApprovalResponse(taskId: string, approved: boolean, comments?: string, userId?: string): Promise<void> {
    try {
      // Importar o cliente Supabase
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Buscar a tarefa de aprovação
      const { data: taskData, error: taskError } = await supabase
        .from('workflow_tasks')
        .select('*')
        .eq('id', taskId)
        .single();
      
      if (taskError) {
        console.error('Erro ao buscar tarefa de aprovação:', taskError);
        throw new Error(`Erro ao buscar tarefa de aprovação: ${taskError.message}`);
      }
      
      if (!taskData) {
        throw new Error(`Tarefa de aprovação com ID ${taskId} não encontrada`);
      }
      
      // Verificar se a tarefa já foi concluída
      if (taskData.status !== 'pending') {
        throw new Error(`Tarefa de aprovação já foi ${taskData.status === 'approved' ? 'aprovada' : 'rejeitada'}`);
      }
      
      // Atualizar o status da tarefa
      const newStatus = approved ? 'approved' : 'rejected';
      const { error: updateError } = await supabase
        .from('workflow_tasks')
        .update({
          status: newStatus,
          comments: comments,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', taskId);
      
      if (updateError) {
        console.error('Erro ao atualizar tarefa de aprovação:', updateError);
        throw new Error(`Erro ao atualizar tarefa de aprovação: ${updateError.message}`);
      }
      
      // Verificar se todas as aprovações para este passo foram concluídas
      const { data: relatedTasks, error: relatedError } = await supabase
        .from('workflow_tasks')
        .select('*')
        .eq('workflow_execution_id', taskData.workflow_execution_id)
        .eq('step_id', taskData.step_id);
      
      if (relatedError) {
        console.error('Erro ao buscar tarefas relacionadas:', relatedError);
        throw new Error(`Erro ao buscar tarefas relacionadas: ${relatedError.message}`);
      }
      
      // Verificar se todas as tarefas foram concluídas (aprovadas ou rejeitadas)
      const allTasksCompleted = relatedTasks.every(task => 
        task.status === 'approved' || task.status === 'rejected'
      );
      
      // Se todas as tarefas foram concluídas, continuar o fluxo de trabalho
      if (allTasksCompleted) {
        // Verificar se todas as aprovações foram concedidas
        const allApproved = relatedTasks.every(task => task.status === 'approved');
        
        // Buscar a execução do fluxo de trabalho
        const execution = this.workflowExecutions.get(taskData.workflow_execution_id);
        if (!execution) {
          throw new Error(`Execução com ID ${taskData.workflow_execution_id} não encontrada`);
        }
        
        // Buscar o fluxo de trabalho
        const workflow = this.workflows.get(taskData.workflow_id);
        if (!workflow) {
          throw new Error(`Fluxo de trabalho com ID ${taskData.workflow_id} não encontrado`);
        }
        
        // Buscar o passo atual
        const currentStep = workflow.steps.find(s => s.id === taskData.step_id);
        if (!currentStep) {
          throw new Error(`Passo com ID ${taskData.step_id} não encontrado no fluxo de trabalho`);
        }
        
        // Atualizar o status da execução
        execution.status = 'running';
        
        // Adicionar o resultado da aprovação ao contexto
        execution.context.approvalResult = {
          approved: allApproved,
          tasks: relatedTasks,
          completedAt: new Date().toISOString()
        };
        
        this.workflowExecutions.set(execution.id, execution);
        
        // Notificar sobre o resultado da aprovação
        await notifyUsers({
          title: `Aprovação ${allApproved ? 'Concedida' : 'Negada'}: ${workflow.name}`,
          message: `A aprovação para o passo "${currentStep.name}" foi ${allApproved ? 'concedida' : 'negada'}.`,
          type: 'process',
          recipients: [execution.initiatedBy],
          data: {
            workflowId: workflow.id,
            executionId: execution.id,
            stepId: currentStep.id,
            approved: allApproved
          }
        });
        
        // Continuar o fluxo de trabalho com o próximo passo apropriado
        if (allApproved && currentStep.nextStepOnSuccess) {
          // Se aprovado, seguir para o próximo passo de sucesso
          await this.executeWorkflowStep(execution.id, currentStep.nextStepOnSuccess);
        } else if (!allApproved && currentStep.nextStepOnFailure) {
          // Se rejeitado, seguir para o próximo passo de falha
          await this.executeWorkflowStep(execution.id, currentStep.nextStepOnFailure);
        } else {
          // Se não houver próximo passo definido, concluir o fluxo de trabalho
          execution.status = 'completed';
          execution.completedAt = new Date();
          this.workflowExecutions.set(execution.id, execution);
          
          // Atualizar o registro do fluxo de trabalho
          workflow.lastRun = new Date();
          this.workflows.set(workflow.id, workflow);
          
          // Notificar conclusão do fluxo de trabalho
          await notifyUsers({
            title: 'Fluxo de Trabalho Concluído',
            message: `O fluxo de trabalho "${workflow.name}" foi concluído.`,
            type: 'success',
            recipients: [execution.initiatedBy],
            data: {
              workflowId: workflow.id,
              executionId: execution.id
            }
          });
        }
      }
    } catch (error) {
      console.error('Erro ao processar resposta de aprovação:', error);
      throw error;
    }
  }

  /**
   * Verifica o status das tarefas de aprovação pendentes
   * @param executionId ID da execução do fluxo de trabalho
   */
  async checkPendingApprovals(executionId: string): Promise<{
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    tasks: any[];
  }> {
    try {
      // Importar o cliente Supabase
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Buscar todas as tarefas de aprovação para esta execução
      const { data, error } = await supabase
        .from('workflow_tasks')
        .select('*')
        .eq('workflow_execution_id', executionId);
      
      if (error) {
        console.error('Erro ao buscar tarefas de aprovação:', error);
        throw new Error(`Erro ao buscar tarefas de aprovação: ${error.message}`);
      }
      
      // Contar tarefas por status
      const result = {
        total: data.length,
        pending: data.filter(task => task.status === 'pending').length,
        approved: data.filter(task => task.status === 'approved').length,
        rejected: data.filter(task => task.status === 'rejected').length,
        tasks: data
      };
      
      return result;
    } catch (error) {
      console.error('Erro ao verificar aprovações pendentes:', error);
      
      // Fallback para armazenamento em memória
      if (this.approvalTasks) {
        const tasks = Array.from(this.approvalTasks.values())
          .filter(task => task.workflow_execution_id === executionId);
        
        return {
          total: tasks.length,
          pending: tasks.filter(task => task.status === 'pending').length,
          approved: tasks.filter(task => task.status === 'approved').length,
          rejected: tasks.filter(task => task.status === 'rejected').length,
          tasks
        };
      }
      
      return { total: 0, pending: 0, approved: 0, rejected: 0, tasks: [] };
    }
  }

  /**
   * Executa um passo personalizado
   */
  private async executeCustomStep(step: WorkflowStep, context: Record<string, any>): Promise<any> {
    const { action } = step.parameters;
    
    if (!action) {
      throw new Error('Ação personalizada não especificada');
    }
    
    // Executar ação personalizada com base no tipo
    switch (action) {
      case 'classifyDocument':
        return this.classifyDocument(step, context);
        
      case 'conditionalBranch':
        return this.handleConditionalBranch(step, context);
        
      case 'fileDocument':
        return this.fileDocument(step, context);
        
      default:
        console.log(`Ação personalizada não implementada: ${action}`);
        return { success: false, message: `Ação personalizada não implementada: ${action}` };
    }
  }

  /**
   * Classifica um documento usando IA
   */
  private async classifyDocument(step: WorkflowStep, context: Record<string, any>): Promise<any> {
    const { inputVariable } = step.parameters;
    
    if (!inputVariable) {
      throw new Error('Variável de entrada não especificada');
    }
    
    const documentText = this.getNestedValue(context, inputVariable);
    if (!documentText) {
      throw new Error(`Documento não encontrado na variável ${inputVariable}`);
    }
    
    // Simular classificação de documento
    // Em uma implementação real, isso usaria IA para classificar o documento
    const documentLower = documentText.toLowerCase();
    let type = 'general';
    let priority = 'normal';
    
    if (documentLower.includes('urgente') || documentLower.includes('prazo') || documentLower.includes('imediato')) {
      priority = 'high';
    }
    
    if (documentLower.includes('intimação') || documentLower.includes('citação') || documentLower.includes('notificação')) {
      type = 'legal_notice';
    } else if (documentLower.includes('contrato') || documentLower.includes('acordo')) {
      type = 'contract';
    } else if (documentLower.includes('processo') || documentLower.includes('judicial')) {
      type = 'legal_proceeding';
    }
    
    return {
      type,
      priority,
      confidence: 0.85,
      keywords: ['documento', 'legal']
    };
  }

  /**
   * Processa uma ramificação condicional no fluxo
   */
  private async handleConditionalBranch(step: WorkflowStep, context: Record<string, any>): Promise<any> {
    const { condition, trueStep, falseStep } = step.parameters;
    
    if (!condition || !trueStep || !falseStep) {
      throw new Error('Parâmetros de ramificação condicional incompletos');
    }
    
    // Avaliar a condição
    const variableValue = this.getNestedValue(context, condition.variable);
    const conditionMet = condition.equals !== undefined ? variableValue === condition.equals : false;
    
    // Retornar o próximo passo com base na condição
    return {
      nextStep: conditionMet ? trueStep : falseStep,
      conditionResult: conditionMet
    };
  }

  /**
   * Arquiva um documento com base na classificação
   */
  private async fileDocument(step: WorkflowStep, context: Record<string, any>): Promise<any> {
    const { documentVariable, classification, notifyUsers: shouldNotify, notificationPriority } = step.parameters;
    
    if (!documentVariable || !classification) {
      throw new Error('Parâmetros de arquivamento incompletos');
    }
    
    const documentText = this.getNestedValue(context, documentVariable);
    if (!documentText) {
      throw new Error(`Documento não encontrado na variável ${documentVariable}`);
    }
    
    const classificationData = this.getNestedValue(context, classification);
    
    // Simular arquivamento de documento
    console.log(`Arquivando documento como ${classificationData?.type || 'geral'}`);
    
    // Notificar usuários, se solicitado
    if (shouldNotify) {
      await notifyUsers({
        title: 'Documento Arquivado',
        message: `Um documento foi classificado como ${classificationData?.type || 'geral'} e arquivado automaticamente.`,
        type: notificationPriority || 'info',
        data: { documentType: classificationData?.type }
      });
    }
    
    return {
      success: true,
      location: `/arquivos/${classificationData?.type || 'geral'}/${new Date().toISOString().split('T')[0]}/`,
      classification: classificationData
    };
  }

  /**
   * Substitui placeholders em uma string com valores do contexto
   */
  private replacePlaceholders(text: string, context: Record<string, any>): string {
    if (!text) return '';
    
    return text.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
      const value = this.getNestedValue(context, path.trim());
      return value !== undefined ? String(value) : match;
    });
  }

  /**
   * Obtém todas as regras de processamento de documentos
   */
  getDocumentRules(): DocumentProcessingRule[] {
    return Array.from(this.documentRules.values());
  }

  /**
   * Obtém uma regra de processamento de documento específica pelo ID
   */
  getDocumentRule(ruleId: string): DocumentProcessingRule | undefined {
    return this.documentRules.get(ruleId);
  }

  /**
   * Cria uma nova regra de processamento de documento
   */
  createDocumentRule(rule: Omit<DocumentProcessingRule, 'id' | 'createdAt'>): DocumentProcessingRule {
    const newRule: DocumentProcessingRule = {
      ...rule,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    
    this.documentRules.set(newRule.id, newRule);
    return newRule;
  }

  /**
   * Atualiza uma regra de processamento de documento existente
   */
  updateDocumentRule(ruleId: string, updates: Partial<Omit<DocumentProcessingRule, 'id' | 'createdAt'>>): DocumentProcessingRule {
    const rule = this.documentRules.get(ruleId);
    if (!rule) {
      throw new Error(`Regra de processamento com ID ${ruleId} não encontrada`);
    }
    
    const updatedRule = {
      ...rule,
      ...updates
    };
    
    this.documentRules.set(ruleId, updatedRule);
    return updatedRule;
  }

  /**
   * Exclui uma regra de processamento de documento
   */
  deleteDocumentRule(ruleId: string): boolean {
    return this.documentRules.delete(ruleId);
  }

  /**
   * Processa um documento através das regras de processamento ativas
   */
  async processDocument(documentText: string, documentType: string, metadata: Record<string, any> = {}): Promise<{
    appliedRules: string[];
    actions: any[];
    success: boolean;
  }> {
    const appliedRules: string[] = [];
    const actions: any[] = [];
    
    try {
      // Obter todas as regras ativas e ordenar por prioridade
      const activeRules = Array.from(this.documentRules.values())
        .filter(rule => rule.enabled && rule.documentTypes.includes(documentType))
        .sort((a, b) => b.priority - a.priority);
      
      // Aplicar cada regra que corresponda às condições
      for (const rule of activeRules) {
        const conditionsMet = this.evaluateDocumentRuleConditions(rule, documentText, metadata);
        
        if (conditionsMet) {
          appliedRules.push(rule.id);
          
          // Executar as ações da regra
          for (const action of rule.actions) {
            const actionResult = await this.executeDocumentRuleAction(action, documentText, metadata);
            actions.push(actionResult);
          }
          
          // Atualizar a data da última execução da regra
          rule.lastRun = new Date();
          this.documentRules.set(rule.id, rule);
        }
      }
      
      return {
        appliedRules,
        actions,
        success: true
      };
    } catch (error) {
      console.error('Erro ao processar documento através das regras:', error);
      return {
        appliedRules,
        actions,
        success: false
      };
    }
  }

  /**
   * Avalia se um documento atende às condições de uma regra
   */
  private evaluateDocumentRuleConditions(rule: DocumentProcessingRule, documentText: string, metadata: Record<string, any>): boolean {
    if (rule.conditions.length === 0) return true;
    
    return rule.conditions.every(condition => {
      const { field, operator, value } = condition;
      
      // Se o campo for 'content', verificar no texto do documento
      if (field === 'content') {
        switch (operator) {
          case 'contains':
            return documentText.toLowerCase().includes(String(value).toLowerCase());
          case 'not_contains':
            return !documentText.toLowerCase().includes(String(value).toLowerCase());
          default:
            return false;
        }
      }
      
      // Caso contrário, verificar nos metadados
      const fieldValue = metadata[field];
      
      switch (operator) {
        case 'equals':
          return fieldValue === value;
        case 'not_equals':
          return fieldValue !== value;
        case 'contains':
          return typeof fieldValue === 'string' && fieldValue.toLowerCase().includes(String(value).toLowerCase());
        case 'not_contains':
          return typeof fieldValue === 'string' && !fieldValue.toLowerCase().includes(String(value).toLowerCase());
        case 'greater_than':
          return typeof fieldValue === 'number' && fieldValue > value;
        case 'less_than':
          return typeof fieldValue === 'number' && fieldValue < value;
        default:
          return false;
      }
    });
  }

  /**
   * Executa uma ação de regra de processamento de documento
   */
  private async executeDocumentRuleAction(action: DocumentProcessingRule['actions'][0], documentText: string, metadata: Record<string, any>): Promise<any> {
    switch (action.type) {
      case 'tag':
        return this.tagDocument(action.parameters, metadata);
        
      case 'categorize':
        return this.categorizeDocument(action.parameters, metadata);
        
      case 'route':
        return this.routeDocument(action.parameters, metadata);
        
      case 'extract_data':
        return this.extractDataFromDocument(action.parameters, documentText);
        
      case 'notify':
        return this.notifyAboutDocument(action.parameters, documentText, metadata);
        
      case 'custom':
        return this.executeCustomDocumentAction(action.parameters, documentText, metadata);
        
      default:
        console.log(`Tipo de ação não implementado: ${action.type}`);
        return { success: false, message: `Tipo de ação não implementado: ${action.type}` };
    }
  }

  /**
   * Adiciona tags a um documento
   */
  private tagDocument(parameters: Record<string, any>, metadata: Record<string, any>): any {
    const { tags } = parameters;
    
    if (!tags || !Array.isArray(tags)) {
      return { success: false, message: 'Tags não especificadas ou inválidas' };
    }
    
    // Adicionar tags aos metadados
    metadata.tags = [...(metadata.tags || []), ...tags];
    
    return {
      success: true,
      tags: metadata.tags
    };
  }

  /**
   * Categoriza um documento
   */
  private categorizeDocument(parameters: Record<string, any>, metadata: Record<string, any>): any {
    const { category } = parameters;
    
    if (!category) {
      return { success: false, message: 'Categoria não especificada' };
    }
    
    // Definir categoria nos metadados
    metadata.category = category;
    
    return {
      success: true,
      category
    };
  }

  /**
   * Roteia um documento para usuários ou departamentos
   */
  private routeDocument(parameters: Record<string, any>, metadata: Record<string, any>): any {
    const { destination, priority } = parameters;
    
    if (!destination) {
      return { success: false, message: 'Destino não especificado' };
    }
    
    // Simular roteamento de documento
    console.log(`Roteando documento para ${destination} com prioridade ${priority || 'normal'}`);
    
    return {
      success: true,
      destination,
      priority: priority || 'normal'
    };
  }

  /**
   * Extrai dados de um documento usando expressões regulares
   */
  private extractDataFromDocument(parameters: Record<string, any>, documentText: string): any {
    const { dataPoints, storeResults } = parameters;
    
    if (!dataPoints || !Array.isArray(dataPoints)) {
      return { success: false, message: 'Pontos de dados não especificados ou inválidos' };
    }
    
    const extractedData: Record<string, any> = {};
    
    // Extrair cada ponto de dados usando a expressão regular fornecida
    for (const dataPoint of dataPoints) {
      const { name, pattern } = dataPoint;
      
      if (!name || !pattern) continue;
      
      try {
        const regex = new RegExp(pattern, 'i');
        const match = regex.exec(documentText);
        
        if (match) {
          extractedData[name] = match.length > 1 ? match[1] : match[0];
        }
      } catch (error) {
        console.error(`Erro ao extrair ${name} usando padrão ${pattern}:`, error);
      }
    }
    
    return {
      success: Object.keys(extractedData).length > 0,
      extractedData,
      storeResults
    };
  }

  /**
   * Envia notificação sobre um documento
   */
  private async notifyAboutDocument(parameters: Record<string, any>, documentText: string, metadata: Record<string, any>): Promise<any> {
    const { title, message, includeExtractedData } = parameters;
    
    // Preparar dados adicionais para a notificação
    const notificationData: Record<string, any> = { ...metadata };
    
    // Incluir dados extraídos, se solicitado
    if (includeExtractedData && metadata.extractedData) {
      notificationData.extractedData = metadata.extractedData;
    }
    
    // Enviar notificação
    await notifyUsers({
      title: title || 'Notificação de Documento',
      message: message || 'Um documento foi processado automaticamente.',
      type: 'action',
      data: notificationData
    });
    
    return { success: true };
  }

  /**
   * Executa uma ação personalizada em um documento
   */
  private executeCustomDocumentAction(parameters: Record<string, any>, documentText: string, metadata: Record<string, any>): any {
    const { actionName } = parameters;
    
    // Simular ação personalizada
    console.log(`Executando ação personalizada: ${actionName || 'sem nome'}`);
    
    return {
      success: true,
      actionName: actionName || 'custom_action'
    };
  }

  /**
   * Obtém todas as execuções de fluxo de trabalho
   */
  getWorkflowExecutions(): WorkflowExecution[] {
    return Array.from(this.workflowExecutions.values());
  }

  /**
   * Obtém uma execução específica de fluxo de trabalho pelo ID
   */
  getWorkflowExecution(executionId: string): WorkflowExecution | undefined {
    return this.workflowExecutions.get(executionId);
  }

  /**
   * Cancela uma execução de fluxo de trabalho em andamento
   */
  cancelWorkflowExecution(executionId: string): boolean {
    const execution = this.workflowExecutions.get(executionId);
    
    if (!execution || execution.status !== 'running') {
      return false;
    }
    
    execution.status = 'cancelled';
    execution.completedAt = new Date();
    this.workflowExecutions.set(executionId, execution);
    
    return true;
  }
}

export const automationService = new AutomationService();