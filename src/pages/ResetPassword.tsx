
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../hooks/useAuth';
import { AlertCircle } from 'lucide-react';
import { isValidPassword } from '../lib/utils';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate password
    if (!isValidPassword(password)) {
      setError('A password deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.');
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError('As passwords não coincidem.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (!token) {
        throw new Error('Token inválido');
      }
      await resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError('Não foi possível redefinir a password. O link pode ter expirado.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout 
      title="Redefinir Password" 
      subtitle="Crie uma nova password para a sua conta"
    >
      {success ? (
        <div className="text-center space-y-4">
          <div className="bg-green-100 p-4 rounded-md text-green-800">
            <p>Password redefinida com sucesso!</p>
            <p className="text-sm mt-2">
              A redirecionar para a página de login...
            </p>
          </div>
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
            <Label htmlFor="password">Nova Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
            />
            <p className="text-xs text-muted-foreground">
              Mínimo de 8 caracteres, incluindo maiúsculas, números e símbolos.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'A processar...' : 'Redefinir Password'}
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

export default ResetPassword;
