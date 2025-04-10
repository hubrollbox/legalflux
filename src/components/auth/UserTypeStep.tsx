import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

type Props = {
  onSelect: (type: 'particular' | 'professional' | 'empresa') => void;
  onNext: () => void;
};

export default function UserTypeStep({ onSelect, onNext }: Props) {
  const router = useRouter();

  const handleSelect = (type: 'particular' | 'professional' | 'empresa') => {
    onSelect(type);
    onNext();
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center">Tipo de Registro</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button
          variant="outline"
          onClick={() => handleSelect('particular')}
        >
          Particular
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSelect('professional')}
        >
          Profissional
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSelect('empresa')}
        >
          Empresa
        </Button>
      </CardContent>
    </Card>
  );
}