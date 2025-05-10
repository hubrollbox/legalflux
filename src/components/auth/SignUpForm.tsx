
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import { UserType, UserTypes } from '../../types/auth';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { validateEmail, validatePassword } from "../../utils/validation";

const SignUpForm: React.FC = () => {
  // Use useState instead of storing them directly
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<UserType>(UserTypes.CLIENT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const { register, checkEmailExists } = useAuth();

  const validateStep1 = async () => {
    // Validate name
    if (!name.trim()) {
      setError('Por favor, insira o seu nome completo');
      return false;
    }

    // Validate email
    if (!validateEmail(email)) {
      setError('Por favor, insira um email válido');
      return false;
    }

    // Check if email already exists
    try {
      if (checkEmailExists) {
        const exists = await checkEmailExists(email);
        if (exists) {
          setError('Este email já está registado. Por favor, utilize outro email ou faça login.');
          return false;
        }
      }
    } catch (err) {
      console.error('Error checking email:', err);
      setError('Ocorreu um erro ao verificar o email. Por favor, tente novamente.');
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    // Validate password
    if (!validatePassword(password)) {
      setError('A password deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial');
      return false;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setError('As passwords não coincidem');
      return false;
    }

    return true;
  };

  const handleNextStep = async () => {
    setError(null);
    
    if (step === 1) {
      const isValid = await validateStep1();
      if (isValid) {
        setStep(2);
      }
    }
  };

  const handlePrevStep = () => {
    setError(null);
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (step === 1) {
      await handleNextStep();
      return;
    }

    // Validate step 2
    const isValid = validateStep2();
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (register) {
        await register(email, password, name);
        // Redirect will be handled by the auth provider
      } else {
        throw new Error("Registration function not available");
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Ocorreu um erro durante o registo. Por favor, tente novamente.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu Nome Completo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>

            <Button
              type="button"
              className="w-full"
              onClick={handleNextStep}
              disabled={isSubmitting}
            >
              Continuar
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handlePrevStep}
                disabled={isSubmitting}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    A processar...
                  </>
                ) : (
                  "Registar"
                )}
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
