import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { validateEmail, validatePassword, validateNIF } from '@/utils/validation';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/components/ui/use-toast";

// This is the form component that handles the multi-step registration process
const RegisterForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string>('');
  const { register } = useAuth();
  
  // Form state with all possible fields
  const [formData, setFormData] = useState({
    // Step 1: User type
    userType: '', // 'particular', 'professional', 'company'
    
    // Step 2: Personal data
    name: '',
    nif: '',
    email: '',
    phone: '', // Optional
    address: '', // Optional
    
    // Step 3: Professional data
    professionalId: '',
    professionalAddress: '',
    professionalEmail: '',
    professionalOrder: '',
    linkedToCompany: false,
    
    // Step 4: Company data
    companyName: '',
    companyNif: '',
    companyCae: '',
    companyEmail: '',
    companyPhone: '',
    companyAddress: '',
    
    // Password
    password: '',
    confirmPassword: '',
    
    // Terms
    terms: false,
  });
  
  // Form navigation logic
  const handleNextStep = () => {
    // Validation and navigation logic
    if (currentStep === 1) {
      // Validar seleção do tipo de usuário
      if (!validateStep1()) return;
      setCurrentStep(2);
    } 
    else if (currentStep === 2) {
      // Validar dados pessoais
      if (!validateStep2()) return;
      
      // Se for particular, ir para senha
      if (formData.userType === 'particular') {
        setCurrentStep(5);
      } 
      // Se for profissional, ir para dados profissionais
      else if (formData.userType === 'professional') {
        setCurrentStep(3);
      } 
      // Se for empresa, ir para dados da empresa
      else if (formData.userType === 'company') {
        setCurrentStep(4);
      }
    } 
    else if (currentStep === 3) {
      // Validar dados profissionais
      if (!validateStep3()) return;
      
      // Se estiver vinculado a uma empresa, ir para dados da empresa
      if (formData.linkedToCompany) {
        setCurrentStep(4);
      } else {
        // Caso contrário, ir para senha
        setCurrentStep(5);
      }
    } 
    else if (currentStep === 4) {
      // Validar dados da empresa
      if (!validateStep4()) return;
      setCurrentStep(5);
    } 
    else if (currentStep === 5) {
      // Validar senha
      if (!validateStep5()) return;
      setCurrentStep(6);
    }
    else if (currentStep === 6) {
      // Validar termos
      if (!validateStep6()) return;
      handleSubmitForm();
    }
  };
  
  const validateStep1 = () => {
    if (!formData.userType) {
      setError('Por favor, selecione o tipo de utilizador');
      return false;
    }
    setError('');
    return true;
  };
  
  const validateStep2 = () => {
    if (formData.userType === 'particular' || formData.userType === 'professional') {
      if (!formData.name || !formData.nif || !formData.email) {
        setError('Por favor, preencha todos os campos obrigatórios: Nome, NIF e Email');
        return false;
      }
      
      if (!validateEmail(formData.email)) {
        setError('Por favor, forneça um email válido');
        return false;
      }
      
      if (!validateNIF(formData.nif)) {
        setError('O NIF deve conter 9 dígitos');
        return false;
      }
    }
    
    setError('');
    return true;
  };
  
  const validateStep3 = () => {
    // Validar dados profissionais
    if (!formData.professionalId || !formData.professionalAddress || 
        !formData.professionalEmail || !formData.professionalOrder) {
      setError('Por favor, preencha todos os campos obrigatórios profissionais');
      return false;
    }
    
    // Verificar se o email profissional é igual ao email pessoal
    if (formData.email !== formData.professionalEmail) {
      setError('O email profissional deve ser igual ao email pessoal');
      return false;
    }
    
    setError('');
    return true;
  };
  
  const validateStep4 = () => {
    // Validar dados da empresa
    if (!formData.companyName || !formData.companyNif || !formData.companyCae || 
        !formData.companyEmail || !formData.companyPhone || !formData.companyAddress) {
      setError('Por favor, preencha todos os campos obrigatórios da empresa');
      return false;
    }
    
    // Validar NIF da empresa (9 dígitos)
    if (!/^\d{9}$/.test(formData.companyNif)) {
      setError('O NIF da empresa deve conter 9 dígitos');
      return false;
    }
    
    setError('');
    return true;
  };
  
  const validateStep5 = () => {
    // Validar senha
    if (!formData.password || !formData.confirmPassword) {
      setError('Por favor, defina uma senha e confirme-a');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }
    
    if (!validatePassword(formData.password)) {
      setError('A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial');
      return false;
    }
    
    setError('');
    return true;
  };
  
  const validateStep6 = () => {
    // Validar termos
    if (!formData.terms) {
      setError('Você deve aceitar os termos e condições para continuar');
      return false;
    }
    
    setError('');
    return true;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handlePreviousStep = () => {
    if (currentStep === 5) {
      // Voltar do passo de senha para o passo anterior apropriado
      if (formData.userType === 'particular') {
        setCurrentStep(2); // Voltar para dados pessoais
      } else if (formData.userType === 'professional' && !formData.linkedToCompany) {
        setCurrentStep(3); // Voltar para dados profissionais
      } else {
        setCurrentStep(4); // Voltar para dados da empresa
      }
    } else if (currentStep === 4 && formData.userType === 'professional') {
      setCurrentStep(3); // Voltar para dados profissionais
    } else {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmitForm = async () => {
    try {
      setError('');
      
      // Registar utilizador com Supabase/AuthProvider
      if (register) {
        await register(formData.email, formData.password, formData.name);
        // Toast de sucesso com useToast
        const { toast } = useToast();
        toast({
          title: "Registo concluído com sucesso!",
          variant: "default"
        });
        // Redirecionamento após registro bem-sucedido
        navigate('/dashboard');
      } else {
        throw new Error("Função de registro não disponível");
      }
    } catch (error: any) {
      console.error('Erro ao registrar:', error);
      setError(error.message || 'Ocorreu um erro ao processar o registro. Por favor, tente novamente.');
    }
  };
  
  // Renderização dos passos do formulário
  const renderStep1 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Selecione o tipo de utilizador</h2>
      
      <RadioGroup 
        value={formData.userType} 
        onValueChange={(value: string) => handleSelectChange('userType', value)}
        className="space-y-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="particular" id="particular" />
          <Label htmlFor="particular">Particular</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="professional" id="professional" />
          <Label htmlFor="professional">Profissional</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="company" id="company" />
          <Label htmlFor="company">Empresa</Label>
        </div>
      </RadioGroup>
      
      <Button type="button" onClick={handleNextStep} className="w-full mt-4">
        Continuar
      </Button>
    </div>
  );
  
  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        {formData.userType === 'particular' ? 'Dados Pessoais' : 'Dados do Profissional'}
      </h2>
      
      <div className="space-y-2">
        <Label htmlFor="name">Nome <span className="text-red-500">*</span></Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="nif">NIF <span className="text-red-500">*</span></Label>
        <Input
          id="nif"
          name="nif"
          value={formData.nif}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Telemóvel (opcional)</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Morada (opcional)</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="flex justify-between mt-6">
        <Button type="button" variant="outline" onClick={handlePreviousStep}>
          Voltar
        </Button>
        <Button type="button" onClick={handleNextStep}>
          Continuar
        </Button>
      </div>
    </div>
  );
  
  const renderStep3 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Dados Profissionais</h2>
      
      <div className="space-y-2">
        <Label htmlFor="professionalId">Número da Cédula Profissional <span className="text-red-500">*</span></Label>
        <Input
          id="professionalId"
          name="professionalId"
          value={formData.professionalId}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="professionalAddress">Morada Profissional <span className="text-red-500">*</span></Label>
        <Input
          id="professionalAddress"
          name="professionalAddress"
          value={formData.professionalAddress}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="professionalEmail">Email Profissional <span className="text-red-500">*</span></Label>
        <Input
          id="professionalEmail"
          name="professionalEmail"
          type="email"
          value={formData.professionalEmail}
          onChange={handleInputChange}
          required
        />
        <p className="text-sm text-muted-foreground">Deve ser igual ao email fornecido anteriormente</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="professionalOrder">Ordem Profissional <span className="text-red-500">*</span></Label>
        <Select 
          onValueChange={(value: string) => handleSelectChange('professionalOrder', value)}
          value={formData.professionalOrder}
        >
          <SelectTrigger id="professionalOrder">
            <SelectValue placeholder="Selecione a ordem profissional" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="advogados">Ordem dos Advogados</SelectItem>
            <SelectItem value="solicitadores">Ordem dos Solicitadores</SelectItem>
            <SelectItem value="notarios">Ordem dos Notários</SelectItem>
            <SelectItem value="contabilistas">Ordem dos Contabilistas</SelectItem>
            <SelectItem value="outro">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="linkedToCompany" 
            checked={formData.linkedToCompany}
            onCheckedChange={(checked: boolean) => 
              setFormData({...formData, linkedToCompany: checked as boolean})
            }
          />
          <Label htmlFor="linkedToCompany">Estou vinculado a uma empresa</Label>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button type="button" variant="outline" onClick={handlePreviousStep}>
          Voltar
        </Button>
        <Button type="button" onClick={handleNextStep}>
          Continuar
        </Button>
      </div>
    </div>
  );
  
  const renderStep4 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Dados da Empresa</h2>
      
      <div className="space-y-2">
        <Label htmlFor="companyName">Nome da Empresa <span className="text-red-500">*</span></Label>
        <Input
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyNif">NIF da Empresa <span className="text-red-500">*</span></Label>
        <Input
          id="companyNif"
          name="companyNif"
          value={formData.companyNif}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyCae">CAE <span className="text-red-500">*</span></Label>
        <Input
          id="companyCae"
          name="companyCae"
          value={formData.companyCae}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyEmail">Email da Empresa <span className="text-red-500">*</span></Label>
        <Input
          id="companyEmail"
          name="companyEmail"
          type="email"
          value={formData.companyEmail}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyPhone">Telefone/Telemóvel da Empresa <span className="text-red-500">*</span></Label>
        <Input
          id="companyPhone"
          name="companyPhone"
          value={formData.companyPhone}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyAddress">Morada da Empresa <span className="text-red-500">*</span></Label>
        <Input
          id="companyAddress"
          name="companyAddress"
          value={formData.companyAddress}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="flex justify-between mt-6">
        <Button type="button" variant="outline" onClick={handlePreviousStep}>
          Voltar
        </Button>
        <Button type="button" onClick={handleNextStep}>
          Continuar
        </Button>
      </div>
    </div>
  );
  
  const renderStep5 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Defina sua senha</h2>
      
      <div className="space-y-2">
        <Label htmlFor="password">Senha <span className="text-red-500">*</span></Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <p className="text-sm text-muted-foreground">A senha deve ter pelo menos 8 caracteres</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Senha <span className="text-red-500">*</span></Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="flex justify-between mt-6">
        <Button type="button" variant="outline" onClick={handlePreviousStep}>
          Voltar
        </Button>
        <Button type="button" onClick={handleNextStep}>
          Continuar
        </Button>
      </div>
    </div>
  );
  
  const renderStep6 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Termos e Condições</h2>
      
      <div className="space-y-4">
        <div className="border p-4 rounded h-48 overflow-y-auto">
          <h3 className="font-medium mb-2">Termos de Uso e Política de Privacidade</h3>
          <p className="text-sm text-muted-foreground">
            Ao utilizar o LegalFlux, você concorda com nossos termos de uso e política de privacidade.
            Respeitamos sua privacidade e protegemos seus dados pessoais de acordo com a LGPD e o RGPD.
            {/* Texto completo dos termos aqui */}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={formData.terms}
            onCheckedChange={(checked: boolean) => 
              setFormData({...formData, terms: checked as boolean})
            }
          />
          <Label htmlFor="terms">
            Eu li e aceito os Termos de Uso e a Política de Privacidade
          </Label>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button type="button" variant="outline" onClick={handlePreviousStep}>
          Voltar
        </Button>
        <Button type="button" onClick={handleNextStep}>
          Concluir Registro
        </Button>
      </div>
    </div>
  );
  
  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Error display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
          {error}
        </div>
      )}
      
      {/* Render the current step */}
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}
      {currentStep === 5 && renderStep5()}
      {currentStep === 6 && renderStep6()}
      
      {/* Step indicator */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Passo {currentStep} de {formData.userType === 'particular' ? 4 : (formData.userType === 'professional' && !formData.linkedToCompany) ? 5 : 6}</p>
      </div>
    </div>
  );
};

export default RegisterForm;
