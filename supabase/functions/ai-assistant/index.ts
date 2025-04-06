
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, context, role } = await req.json();
    
    // Define o contexto do sistema com base no papel do usuário
    let systemPrompt = '';
    
    if (role === 'client') {
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
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Erro ao comunicar com a API de IA');
    }
    
    const generatedText = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro na função ai-assistant:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
