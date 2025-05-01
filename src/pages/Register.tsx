
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "../components/ui/input";
import { validateEmail, validatePassword, validateNIF } from "../utils/validation";
import { Button } from "../components/ui/button";
import AuthLayout from "../components/auth/AuthLayout";
import { Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  nif: string;
  phone?: string;
};

type FormErrors = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
  nif?: string;
  phone?: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    nif: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'O nome de utilizador é obrigatório';
    } else if (formData.username.length < 3) {
      newErrors.username = 'O nome de utilizador deve ter pelo menos 3 caracteres';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'O email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor, introduza um email válido';
    }
    
    if (!formData.password) {
      newErrors.password = 'A senha é obrigatória';
    } else if (formData.password.length < 8) {
      newErrors.password = 'A senha deve ter pelo menos 8 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme a sua senha';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'O nome completo é obrigatório';
    }

    if (!formData.nif.trim()) {
      newErrors.nif = 'O NIF é obrigatório';
    } else if (!validateNIF(formData.nif)) {
      newErrors.nif = 'O NIF deve conter 9 dígitos';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Limpar erro quando o utilizador digita
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [id]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      // TODO: Adicionar chamada API de registo
      console.log('Formulário enviado:', formData);
      
      // Simular um registo bem-sucedido e redirecionar para o login
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Erro de registo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout 
      title="Registo LegalFlux" 
      subtitle="Crie a sua conta para aceder à plataforma"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="fullName"
          label="Nome Completo"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          required
        />
        
        <Input
          id="username"
          label="Nome de Utilizador"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          required
        />
        
        <Input
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <Input
          id="nif"
          label="NIF"
          value={formData.nif}
          onChange={handleChange}
          error={errors.nif}
          required
          maxLength={9}
        />

        <Input
          id="phone"
          label="Telemóvel (opcional)"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        
        <Input
          id="password"
          label="Senha"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        <Input
          id="confirmPassword"
          label="Confirmar Senha"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> A registar...</> : 'Registar'}
        </Button>

        <div className="text-center text-sm mt-4">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Iniciar Sessão
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
