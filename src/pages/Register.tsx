
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register } = useAuth();

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string): boolean => {
    return password.length >= 8 && 
      /[A-Z]/.test(password) && 
      /[0-9]/.test(password) && 
      /[^A-Za-z0-9]/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validations
    if (!name.trim()) {
      setError('O nome é obrigatório');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Por favor, insira um endereço de email válido');
      return;
    }

    if (!isValidPassword(password)) {
      setError('A password deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial');
      return;
    }

    if (password !== confirmPassword) {
      setError('As passwords não coincidem');
      return;
    }

    setIsSubmitting(true);

    try {
      await register(email, password, name);
    } catch (err) {
      console.error('Erro de registo:', err);
      setError('Não foi possível completar o registo. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Registo" subtitle="Crie a sua conta para aceder à plataforma LegalFlux">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
            <div className="text-sm text-destructive">{error}</div>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu Nome Completo"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu.email@exemplo.com"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
          <p className="text-xs text-gray-500">
            A password deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'A processar...' : 'Registar'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600">Já tem uma conta?</span>{' '}
        <Link to="/login" className="text-primary hover:underline">
          Iniciar Sessão
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
