
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'sonner';
import { validateEmail, validatePassword, validateNIF } from '../utils/validation';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    nif: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name) {
      setError('Nome é obrigatório');
      return false;
    }
    
    if (!formData.email || !validateEmail(formData.email)) {
      setError('Email inválido');
      return false;
    }
    
    if (!formData.password || !validatePassword(formData.password)) {
      setError('Password deve ter pelo menos 8 caracteres');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('As passwords não coincidem');
      return false;
    }
    
    if (!formData.nif || !validateNIF(formData.nif)) {
      setError('NIF inválido (deve ter 9 dígitos)');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        nif: formData.nif,
        phone: formData.phone
      });
      
      toast.success('Conta criada com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Erro no registo:', err);
      setError('Ocorreu um erro ao registar. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout 
      title="Registar Conta" 
      subtitle="Crie a sua conta para aceder à plataforma LegalFlux"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
            <div className="text-sm text-destructive">{error}</div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome completo"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu.email@exemplo.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nif">NIF</Label>
          <Input
            id="nif"
            name="nif"
            value={formData.nif}
            onChange={handleChange}
            placeholder="123456789"
            required
            maxLength={9}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telemóvel (opcional)</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+351 912345678"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            minLength={8}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            required
            minLength={8}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              A processar...
            </>
          ) : (
            'Registar'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Já tem uma conta?</span>{' '}
        <Link to="/login" className="text-primary hover:underline">
          Iniciar Sessão
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
