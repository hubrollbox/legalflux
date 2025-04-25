
/// <reference types="https://deno.land/x/types@v0.1.0/lib.deno.d.ts" />
import "https://deno.land/x/xhr@0.1.0/mod.ts";
// Replace the Deno-specific imports with standard ones
import { serve } from "https://deno.land/std@0.200.0/http/server.ts";

// Add Deno type declarations
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MODEL_MAP: Record<string, string> = {
  'basic': 'gpt-3.5-turbo',
  'standard': 'gpt-4',
  'premium': 'gpt-4-turbo'
};

// Define proper types for the request body
interface RequestBody {
  prompt: string;
  context?: string;
  role?: 'lawyer' | 'client';
  model?: 'basic' | 'standard' | 'premium';
  requestType?: 'chat' | 'document_analysis' | 'information_extraction' | 'legal_suggestions';
}

// Define response data types
interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  error?: {
    message: string;
  };
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, context, role = 'lawyer', model = 'standard', requestType = 'chat' }: RequestBody = await req.json();
    
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

    const data: OpenAIResponse = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Erro ao comunicar com a API de IA');
    }
    
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
});
