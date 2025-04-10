import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Check } from 'lucide-react';

type Props = {
  onSelect: (type: 'particular' | 'profissional' | 'empresa') => void;
  onNext: () => void;
};

export default function UserTypeStep({ onSelect, onNext }: Props) {
  const [selectedType, setSelectedType] = useState<'particular' | 'profissional' | 'empresa' | null>(null);

  const handleSelect = (type: 'particular' | 'profissional' | 'empresa') => {
    setSelectedType(type);
  };

  const handleNext = () => {
    if (selectedType) {
      onSelect(selectedType);
      onNext();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Tipo de Utilizador</CardTitle>
        <CardDescription className="text-center">
          Selecione o tipo de conta que deseja criar
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4">
          <Button
            variant={selectedType === 'particular' ? 'default' : 'outline'}
            className={`h-auto py-4 px-6 flex justify-between items-center ${selectedType === 'particular' ? 'border-primary' : ''}`}
            onClick={() => handleSelect('particular')}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">Particular</span>
              <span className="text-sm text-muted-foreground text-left">Para uso pessoal</span>
            </div>
            {selectedType === 'particular' && <Check className="h-5 w-5" />}
          </Button>

          <Button
            variant={selectedType === 'profissional' ? 'default' : 'outline'}
            className={`h-auto py-4 px-6 flex justify-between items-center ${selectedType === 'profissional' ? 'border-primary' : ''}`}
            onClick={() => handleSelect('profissional')}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">Profissional</span>
              <span className="text-sm text-muted-foreground text-left">Para advogados e solicitadores</span>
            </div>
            {selectedType === 'profissional' && <Check className="h-5 w-5" />}
          </Button>

          <Button
            variant={selectedType === 'empresa' ? 'default' : 'outline'}
            className={`h-auto py-4 px-6 flex justify-between items-center ${selectedType === 'empresa' ? 'border-primary' : ''}`}
            onClick={() => handleSelect('empresa')}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">Empresa</span>
              <span className="text-sm text-muted-foreground text-left">Para escritórios e empresas</span>
            </div>
            {selectedType === 'empresa' && <Check className="h-5 w-5" />}
          </Button>
        </div>

        <Button 
          onClick={handleNext} 
          disabled={!selectedType}
          className="mt-4"
        >
          Continuar
        </Button>
      </CardContent>
    </Card>
  );
}