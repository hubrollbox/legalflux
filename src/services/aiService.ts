import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AIServiceResponse {
  success: boolean;
  response?: string;
  error?: string;
}

export interface ClauseSuggestion {
  id: string;
  title: string;
  content: string;
  context: string;
  relevance: number;
  category: string;
}

export interface TextCorrection {
  original: string;
  corrected: string;
  explanation: string;
  severity: 'low' | 'medium' | 'high';
}

class AIService {
  /**
   * Solicita sugestões de cláusulas com base no contexto e tipo de documento
   */
  async suggestClauses(
    documentType: string,
    context: string,
    documentContent?: string
  ): Promise<ClauseSuggestion[]> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          prompt: `Com base no seguinte tipo de documento e contexto, sugira 3-5 cláusulas relevantes que poderiam ser incluídas:
          Tipo de documento: ${documentType}
          Contexto: ${context}
          ${documentContent ? `Conteúdo atual: ${documentContent}` : ''}
          
          Para cada cláusula, forneça: título, conteúdo completo, contexto de aplicação e relevância (0-100).`,
          context: 'O utilizador está a solicitar sugestões de cláusulas para um documento jurídico. Forneça sugestões relevantes e bem estruturadas.',
          role: 'lawyer',
          model: 'gpt-4o'
        },
      });

      if (error) throw error;

      // Processar a resposta da IA para extrair as sugestões estruturadas
      const suggestions = this.parseClauseSuggestions(data.response);
      return suggestions;
    } catch (error) {
      console.error('Erro ao obter sugestões de cláusulas:', error);
      return [];
    }
  }

  /**
   * Analisa e corrige o texto jurídico fornecido
   */
  async correctLegalText(text: string, context?: string): Promise<TextCorrection[]> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          prompt: `Analise o seguinte texto jurídico e identifique possíveis problemas, erros ou melhorias:
          ${text}
          ${context ? `Contexto: ${context}` : ''}
          
          Para cada problema encontrado, forneça: texto original, texto corrigido, explicação da correção e severidade (baixa, média, alta).`,
          context: 'O utilizador está a solicitar revisão e correção de um texto jurídico. Identifique problemas de linguagem, clareza, precisão legal e conformidade com a legislação portuguesa.',
          role: 'lawyer',
          model: 'gpt-4o'
        },
      });

      if (error) throw error;

      // Processar a resposta da IA para extrair as correções estruturadas
      const corrections = this.parseTextCorrections(data.response);
      return corrections;
    } catch (error) {
      console.error('Erro ao corrigir texto jurídico:', error);
      return [];
    }
  }

  /**
   * Gera um resumo de um documento jurídico
   */
  async summarizeDocument(documentText: string): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          prompt: `Resuma o seguinte documento jurídico, destacando os pontos principais, obrigações, direitos e informações críticas:
          ${documentText}`,
          context: 'O utilizador está a solicitar um resumo de um documento jurídico. Forneça um resumo conciso mas completo, destacando os elementos mais importantes.',
          role: 'lawyer',
          model: 'gpt-4o'
        },
      });

      if (error) throw error;

      return data.response;
    } catch (error) {
      console.error('Erro ao resumir documento:', error);
      return 'Não foi possível gerar o resumo do documento.';
    }
  }

  /**
   * Analisa a resposta da IA e extrai sugestões de cláusulas estruturadas
   */
  private parseClauseSuggestions(aiResponse: string): ClauseSuggestion[] {
    const suggestions: ClauseSuggestion[] = [];
    
    try {
      // Expressão regular para identificar cláusulas no formato esperado
      const clauseRegex = /\*\*([^*]+)\*\*\s*([\s\S]*?)(?=\*\*|$)/g;
      let match;

      while ((match = clauseRegex.exec(aiResponse)) !== null) {
        const title = match[1].trim();
        const fullText = match[2].trim();
        
        // Extrair conteúdo, contexto e relevância
        const contentMatch = /Conteúdo:\s*([\s\S]*?)(?=Contexto:|Relevância:|$)/i.exec(fullText);
        const contextMatch = /Contexto:\s*([\s\S]*?)(?=Conteúdo:|Relevância:|$)/i.exec(fullText);
        const relevanceMatch = /Relevância:\s*(\d+)/i.exec(fullText);
        
        suggestions.push({
          id: crypto.randomUUID(),
          title,
          content: contentMatch ? contentMatch[1].trim() : fullText,
          context: contextMatch ? contextMatch[1].trim() : '',
          relevance: relevanceMatch ? parseInt(relevanceMatch[1]) : 50,
          category: this.categorizeClause(title, fullText)
        });
      }

      // Se não conseguir extrair no formato esperado, tenta um formato mais simples
      if (suggestions.length === 0) {
        const sections = aiResponse.split(/\n\s*\d+\.\s+|\n\s*-\s+/).filter(Boolean);
        
        sections.forEach((section, index) => {
          const titleMatch = /^(.+?):\s*([\s\S]*)$/s.exec(section);
          
          if (titleMatch) {
            suggestions.push({
              id: crypto.randomUUID(),
              title: titleMatch[1].trim(),
              content: titleMatch[2].trim(),
              context: '',
              relevance: 50,
              category: 'geral'
            });
          } else if (section.trim()) {
            suggestions.push({
              id: crypto.randomUUID(),
              title: `Cláusula ${index + 1}`,
              content: section.trim(),
              context: '',
              relevance: 50,
              category: 'geral'
            });
          }
        });
      }
      
      return suggestions;
    } catch (error) {
      console.error('Erro ao processar sugestões de cláusulas:', error);
      return [];
    }
  }

  /**
   * Analisa a resposta da IA e extrai correções de texto estruturadas
   */
  private parseTextCorrections(aiResponse: string): TextCorrection[] {
    const corrections: TextCorrection[] = [];
    
    try {
      // Expressão regular para identificar correções no formato esperado
      const correctionRegex = /\*\*Problema\s*(\d+|[A-Z])\*\*\s*([\s\S]*?)(?=\*\*Problema|$)/gi;
      let match;

      while ((match = correctionRegex.exec(aiResponse)) !== null) {
        const fullText = match[2].trim();
        
        // Extrair texto original, corrigido, explicação e severidade
        const originalMatch = /Original:\s*"([\s\S]*?)"(?=Corrigido:|Explicação:|Severidade:|$)/i.exec(fullText);
        const correctedMatch = /Corrigido:\s*"([\s\S]*?)"(?=Original:|Explicação:|Severidade:|$)/i.exec(fullText);
        const explanationMatch = /Explicação:\s*([\s\S]*?)(?=Original:|Corrigido:|Severidade:|$)/i.exec(fullText);
        const severityMatch = /Severidade:\s*(baixa|média|alta)/i.exec(fullText);
        
        if (originalMatch && correctedMatch) {
          corrections.push({
            original: originalMatch[1].trim(),
            corrected: correctedMatch[1].trim(),
            explanation: explanationMatch ? explanationMatch[1].trim() : '',
            severity: this.mapSeverity(severityMatch ? severityMatch[1].toLowerCase() : 'média')
          });
        }
      }

      // Se não conseguir extrair no formato esperado, tenta um formato mais simples
      if (corrections.length === 0) {
        const sections = aiResponse.split(/\n\s*\d+\.\s+|\n\s*-\s+/).filter(Boolean);
        
        sections.forEach(section => {
          const originalMatch = /"([^"]+)"\s*→\s*"([^"]+)"/i.exec(section);
          
          if (originalMatch) {
            corrections.push({
              original: originalMatch[1].trim(),
              corrected: originalMatch[2].trim(),
              explanation: section.replace(originalMatch[0], '').trim(),
              severity: 'medium'
            });
          }
        });
      }
      
      return corrections;
    } catch (error) {
      console.error('Erro ao processar correções de texto:', error);
      return [];
    }
  }

  /**
   * Categoriza uma cláusula com base no título e conteúdo
   */
  private categorizeClause(title: string, content: string): string {
    const titleLower = title.toLowerCase();
    const contentLower = content.toLowerCase();
    
    if (titleLower.includes('confidencial') || contentLower.includes('confidencial') || 
        titleLower.includes('sigilo') || contentLower.includes('sigilo')) {
      return 'confidencialidade';
    }
    
    if (titleLower.includes('rescis') || contentLower.includes('rescis') ||
        titleLower.includes('termin') || contentLower.includes('termin')) {
      return 'rescisão';
    }
    
    if (titleLower.includes('pagamento') || contentLower.includes('pagamento') ||
        titleLower.includes('valor') || contentLower.includes('valor') ||
        titleLower.includes('preço') || contentLower.includes('preço')) {
      return 'pagamento';
    }
    
    if (titleLower.includes('prazo') || contentLower.includes('prazo') ||
        titleLower.includes('duração') || contentLower.includes('duração')) {
      return 'prazo';
    }
    
    if (titleLower.includes('obrigaç') || contentLower.includes('obrigaç')) {
      return 'obrigações';
    }
    
    if (titleLower.includes('direito') || contentLower.includes('direito')) {
      return 'direitos';
    }
    
    if (titleLower.includes('lei') || contentLower.includes('lei') ||
        titleLower.includes('jurisdição') || contentLower.includes('jurisdição') ||
        titleLower.includes('foro') || contentLower.includes('foro')) {
      return 'legislação';
    }
    
    return 'geral';
  }

  /**
   * Mapeia a severidade em texto para o formato esperado
   */
  private mapSeverity(severity: string): 'low' | 'medium' | 'high' {
    switch (severity) {
      case 'baixa':
        return 'low';
      case 'alta':
        return 'high';
      default:
        return 'medium';
    }
  }
}

export const aiService = new AIService();