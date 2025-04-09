import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const router = useRouter();

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
      router.push(redirectPath); // Use router.push for navigation
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
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Palavra-passe</Label>
          <Link href="/forgot-password">
            <a className="text-sm text-primary hover:text-highlight">
              Esqueceu a palavra-passe?
            </a>
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            A entrar...
          </>
        ) : (
          "Entrar"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;