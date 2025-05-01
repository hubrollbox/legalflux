import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { validateEmail, validatePassword, getErrorMessage } from '@/utils/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login, getRedirectPath } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Reset error message

    if (!validateEmail(email)) {
      setErrorMessage(getErrorMessage("invalidEmail"));
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage(getErrorMessage("invalidPassword"));
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
      const redirectPath = getRedirectPath();
      navigate(redirectPath); // Use navigate para navegação
    } catch (error) {
      setErrorMessage(getErrorMessage("loginError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
          {errorMessage}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
        Entrar
      </Button>
      <div className="text-center text-sm mt-2">
        Não tem uma conta?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">Cadastre-se</Link>
      </div>
    </form>
  );
};

export default LoginForm;