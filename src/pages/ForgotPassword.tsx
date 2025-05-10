
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../hooks/useAuth';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast'; // Importação corrigida
import { validateEmail } from '../utils/validation';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { forgotPassword } = useAuth();
  const { toast } = useToast(); // Usando o hook corrigido

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !validateEmail(email)) {
      setError('Por favor, forneça um email válido.');
      return;
    }
    
    setIsSubmitting(true);

    try {
      await forgotPassword(email);
      setSuccess(true);
      toast({
        title: 'Email enviado com sucesso!',
        description: 'Verifique sua caixa de entrada.'
      });
    } catch (err) {
      setError('Ocorreu um erro. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout 
      title="Recuperar Password" 
      subtitle="Introduza o seu email para receber instruções de recuperação"
    >
      {success ? (
        <div className="text-center space-y-4">
          <div className="bg-green-100 p-4 rounded-md text-green-800">
            <p>Email enviado com sucesso!</p>
            <p className="text-sm mt-2">
              Se existir uma conta associada a {email}, receberá em breve um email com instruções para redefinir a sua password.
            </p>
          </div>
          <Link to="/login">
            <Button variant="link">Voltar ao Login</Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/15 p-3 rounded-md flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
              <div className="text-sm text-destructive">{error}</div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                A processar...
              </>
            ) : 'Enviar Instruções'}
          </Button>

          <div className="text-center mt-4">
            <Link to="/login" className="text-sm text-primary hover:underline">
              Voltar ao Login
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
