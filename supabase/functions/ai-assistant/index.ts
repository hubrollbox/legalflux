import "https://deno.land/x/xhr@0.1.0/mod.ts";
// Keep the import but add a type ignore comment
// @ts-ignore: Deno-specific module
import { serve } from "https://deno.land/std@0.200.0/http/server.ts";

// Improve Deno type declarations
declare global {
  const Deno: {
    env: {
      get(key: string): string | undefined;
    };
  };
}

// Secure API key handling
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

// OpenAI API response interface
interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

// CORS configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handles different types of legal requests
const MODEL_MAP: Record<string, string> = {
  'basic': 'gpt-3.5-turbo',
  'standard': 'gpt-4',
  'premium': 'gpt-4-turbo'
};

// Supports multiple request types
interface RequestBody {
  prompt: string;
  context?: string;
  role?: 'lawyer' | 'client';
  model?: 'basic' | 'standard' | 'premium';
  requestType?: 'chat' | 'document_analysis' | 'information_extraction' | 'legal_suggestions';
}



serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Fix the type error by providing a default value for the destructured object
    const requestData = await req.json().catch(() => ({}));
    const { 
      prompt = "", 
      context, 
      role = 'lawyer', 
      model = 'standard', 
      requestType = 'chat' 
    }: RequestBody = requestData as RequestBody;
    
    // Validate input
    if (!prompt) {
      throw new Error('Prompt is required');
    }

    // Get model from mapping
    const selectedModel = MODEL_MAP[model] || MODEL_MAP.standard;
    
    // Define o contexto do sistema com base no papel do usuário e tipo de solicitação
    let systemPrompt = '';
    
    if (requestType === 'document_analysis') {
      systemPrompt = `Você é um assistente jurídico especializado em análise de documentos legais.
      Analise o documento fornecido e identifique elementos-chave como partes envolvidas, obrigações, datas importantes, riscos e implicações legais.
      Forneça uma análise detalhada, estruturada e com recomendações práticas.
      Use português de Portugal e terminologia jurídica portuguesa.
      
      Contexto: ${context || 'Documento para análise'}`;
    } else if (requestType === 'information_extraction') {
      systemPrompt = `Você é um assistente jurídico especializado em extrair informações estruturadas de documentos legais.
      Extraia e organize as informações solicitadas do documento em um formato claro e estruturado.
      Identifique metadados, cláusulas importantes, entidades, datas e outros elementos relevantes.
      Use português de Portugal e terminologia jurídica portuguesa.
      
      Contexto: ${context || 'Documento para extração de informações'}`;
    } else if (requestType === 'legal_suggestions') {
      systemPrompt = `Você é um assistente jurídico especializado em fornecer sugestões e recomendações práticas.
      Com base na consulta e contexto fornecidos, gere sugestões jurídicas específicas, acionáveis e relevantes.
      Para cada sugestão, forneça título, descrição, tipo, prioridade e relevância.
      Use português de Portugal e terminologia jurídica portuguesa.
      
      Contexto: ${context || 'Contexto para sugestões jurídicas'}`;
    } else if (role === 'client') {
      systemPrompt = `Você é um assistente jurídico especializado em explicar casos jurídicos para clientes em linguagem simples e acessível. 
      Forneça respostas diretas, educativas e empáticas. Quando relevante, explique termos jurídicos. 
      Nunca dê conselhos jurídicos específicos - sempre encaminhe o cliente para falar com seu advogado para questões específicas do caso.
      Use português de Portugal em suas respostas.
      
      Contexto do caso do cliente: ${context || 'Informações do caso não fornecidas'}`;
    } else if (role === 'lawyer') {
      systemPrompt = `Você é um assistente jurídico especializado em auxiliar advogados com pesquisas e redação de documentos jurídicos.
      Forneça respostas precisas, baseadas em factos e com referências quando aplicável. Use terminologia jurídica adequada.
      Sugira abordagens, argumentos e precedentes relevantes quando apropriado.
      Use português de Portugal e terminologia jurídica portuguesa.
      
      Contexto: ${context || 'Contexto não fornecido'}`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      }),
    });

    // Fix the type error by providing a default value for data
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = (errorData as {error?: {message?: string}})?.error?.message || 
        `API request failed with status ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    
    const data: OpenAIResponse = await response.json();
    
    const generatedText = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Erro na função ai-assistant:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
},
}, { port: 8000 });
