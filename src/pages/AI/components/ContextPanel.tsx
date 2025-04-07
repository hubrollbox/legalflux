import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Settings } from 'lucide-react';
import { ContextualInfo } from '../hooks/useContextualAssistant';

interface ContextPanelProps {
  contextInfo: ContextualInfo;
  updateContext: (newContext: Partial<ContextualInfo>) => void;
  setContext: () => void;
  isContextSet: boolean;
}

const ContextPanel = ({ contextInfo, updateContext, setContext, isContextSet }: ContextPanelProps) => {
  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex items-center mb-3">
          <Settings className="h-4 w-4 mr-2" />
          <h3 className="text-sm font-medium">Configurar Contexto Jurídico</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <Label htmlFor="area" className="text-xs">Área Jurídica</Label>
            <Select 
              value={contextInfo.area} 
              onValueChange={(value) => updateContext({ area: value })}
              disabled={isContextSet}
            >
              <SelectTrigger id="area">
                <SelectValue placeholder="Selecione a área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Geral">Geral</SelectItem>
                <SelectItem value="Civil">Civil</SelectItem>
                <SelectItem value="Penal">Penal</SelectItem>
                <SelectItem value="Trabalhista">Trabalhista</SelectItem>
                <SelectItem value="Administrativo">Administrativo</SelectItem>
                <SelectItem value="Tributário">Tributário</SelectItem>
                <SelectItem value="Empresarial">Empresarial</SelectItem>
                <SelectItem value="Família">Família</SelectItem>
                <SelectItem value="Consumidor">Consumidor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="jurisdiction" className="text-xs">Jurisdição</Label>
            <Select 
              value={contextInfo.jurisdiction} 
              onValueChange={(value) => updateContext({ jurisdiction: value })}
              disabled={isContextSet}
            >
              <SelectTrigger id="jurisdiction">
                <SelectValue placeholder="Selecione a jurisdição" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Portugal">Portugal</SelectItem>
                <SelectItem value="Brasil">Brasil</SelectItem>
                <SelectItem value="União Europeia">União Europeia</SelectItem>
                <SelectItem value="Internacional">Internacional</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mb-3">
          <Label htmlFor="clientType" className="text-xs">Tipo de Cliente</Label>
          <Select 
            value={contextInfo.clientType || ''} 
            onValueChange={(value) => updateContext({ clientType: value })}
            disabled={isContextSet}
          >
            <SelectTrigger id="clientType">
              <SelectValue placeholder="Selecione o tipo de cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Pessoa Física</SelectItem>
              <SelectItem value="company">Empresa</SelectItem>
              <SelectItem value="public">Entidade Pública</SelectItem>
              <SelectItem value="nonprofit">Organização sem Fins Lucrativos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="mb-3">
          <Label htmlFor="caseDetails" className="text-xs">Detalhes do Caso (opcional)</Label>
          <Textarea 
            id="caseDetails" 
            placeholder="Descreva brevemente o caso ou situação jurídica..."
            value={contextInfo.caseDetails || ''}
            onChange={(e) => updateContext({ caseDetails: e.target.value })}
            className="h-20 resize-none"
            disabled={isContextSet}
          />
        </div>
        
        <Button 
          onClick={setContext} 
          className="w-full" 
          size="sm"
          disabled={isContextSet}
        >
          {isContextSet ? 'Contexto Configurado' : 'Aplicar Contexto'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContextPanel;