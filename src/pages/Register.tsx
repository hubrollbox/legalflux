
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/components/auth/AuthLayout";
import { Loader2 } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/types";
import { validateEmail, isValidPassword } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  officeName: string;
  taxId: string;
  country: string;
  city: string;
  username: string;
  password: string;
  confirmPassword: string;
  accountType: "particular" | "profissional" | "empresa";
  practiceArea: string;
  teamSize: string;
  currentTools: string;
  acceptTerms: boolean;
  acceptPilot: boolean;
  acceptUpdates: boolean;
}

const Register = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    phone: "",
    officeName: "",
    taxId: "",
    country: "",
    city: "",
    username: "",
    password: "",
    confirmPassword: "",
    accountType: "particular",
    practiceArea: "",
    teamSize: "",
    currentTools: "",
    acceptTerms: false,
    acceptPilot: false,
    acceptUpdates: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [role, setRole] = useState<UserRole>("client");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    taxId?: string;
    country?: string;
    city?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
    practiceArea?: string;
    acceptTerms?: string;
    acceptPilot?: string;
  }>({});

  const handleInputChange = (field: keyof RegisterFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === "email" || field === "fullName") {
      const username = field === "email" 
        ? (value as string).split("@")[0] 
        : (value as string).toLowerCase().replace(/\s+/g, ".");
      setFormData(prev => ({ ...prev, username }));
    }

    if (field === "password" && typeof value === "string") {
      setFormData(prev => ({ ...prev, password: value }));
    }
  };
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (formData.fullName.trim().length < 3) {
          newErrors.fullName = "Nome deve ter pelo menos 3 caracteres";
        }
        if (!validateEmail(formData.email)) {
          newErrors.email = "Email inválido";
        }
        if (!formData.taxId) {
          newErrors.taxId = "NIF é obrigatório";
        }
        break;

      case 2:
        if (formData.accountType !== 'particular') {
          if (!formData.phone) {
            newErrors.phone = 'Telefone é obrigatório';
          }
          if (!formData.country) {
            newErrors.country = 'País é obrigatório';
          }
          if (!formData.city) {
            newErrors.city = 'Cidade é obrigatória';
          }
        }
        break;

      case 3:
        if (!isValidPassword(formData.password)) {
          newErrors.password = "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial";
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "As senhas não coincidem";
        }
        break;

      case 4:
        if (formData.accountType !== "particular") {
          if (!formData.practiceArea) {
            newErrors.practiceArea = "Área de atuação é obrigatória";
          }
        }
        if (!formData.acceptTerms) {
          newErrors.acceptTerms = "Você deve aceitar os termos de uso";
        }
        if (!formData.acceptPilot) {
          newErrors.acceptPilot = "Você deve aceitar o acordo do programa piloto";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      // Se estiver no passo 2 e for conta particular, pular para o passo 4
      if (currentStep === 2 && formData.accountType === "particular") {
        setCurrentStep(4);
      } else {
        setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      }
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Nome deve ter pelo menos 3 caracteres";
    }
    
    if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }
    
    if (!formData.taxId) {
      newErrors.taxId = "NIF é obrigatório";
    }
    
    if (formData.accountType !== "particular") {
      if (!formData.phone) {
        newErrors.phone = "Telefone é obrigatório";
      }
      
      if (!formData.country) {
        newErrors.country = "País é obrigatório";
      }
      
      if (!formData.city) {
        newErrors.city = "Cidade é obrigatória";
      }
      
      if (!formData.practiceArea) {
        newErrors.practiceArea = "Área de atuação é obrigatória";
      }
    }
    
    if (!isValidPassword(formData.password)) {
      newErrors.password = "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Você deve aceitar os termos de uso";
    }
    
    if (!formData.acceptPilot) {
      newErrors.acceptPilot = "Você deve aceitar o acordo do programa piloto";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(formData.email, formData.password, formData.fullName);
      // Redirect based on user role
      navigate(role === 'client' ? '/client-portal' : '/dashboard');
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Criar Conta" 
      subtitle="Registre-se para começar a usar a plataforma"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between mb-6">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div
              key={step}
              className={`flex items-center ${step > 1 ? 'ml-4' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === step ? 'bg-primary text-white' : currentStep > step ? 'bg-primary/20' : 'bg-gray-200'}`}
              >
                {step}
              </div>
              {step < totalSteps && (
                <div className={`h-1 w-12 ml-2 ${currentStep > step ? 'bg-primary/20' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <Card className={currentStep !== 1 ? 'hidden' : ''}>
          <CardHeader>
            <CardTitle>1. Tipo de Conta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountType">Tipo de Conta</Label>
              <Select 
                value={formData.accountType} 
                onValueChange={(value) => handleInputChange("accountType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de conta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="particular">Particular</SelectItem>
                  <SelectItem value="profissional">Profissional</SelectItem>
                  <SelectItem value="empresa">Empresa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                required
              />
              {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Profissional</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxId">Número de Identificação Fiscal (NIF)</Label>
              <Input
                id="taxId"
                value={formData.taxId}
                onChange={(e) => handleInputChange("taxId", e.target.value)}
                required
              />
              {errors.taxId && <p className="text-red-500 text-xs">{errors.taxId}</p>}
            </div>
          </CardContent>
        </Card>

        <Card className={currentStep !== 2 ? 'hidden' : ''}>
          <CardHeader>
            <CardTitle>2. {formData.accountType === "particular" ? "Informações de Acesso" : "Dados Adicionais"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.accountType !== "particular" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="officeName">Nome do Escritório ou Empresa</Label>
                  <Input
                    id="officeName"
                    value={formData.officeName}
                    onChange={(e) => handleInputChange("officeName", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">País</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      required
                    />
                    {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                    />
                    {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                  </div>
                </div>
              </>)
            }
            <div className="space-y-2">
              <Label htmlFor="username">Nome de Utilizador</Label>
              <Input
                id="username"
                value={formData.username}
                disabled
                className="bg-gray-100"
              />
              <p className="text-xs text-muted-foreground">Gerado automaticamente com base no seu nome/email</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
            </div>
          </CardContent>
        </Card>

        <Card className={currentStep !== 3 ? 'hidden' : ''}>
          <CardHeader>
            <CardTitle>3. {formData.accountType === "particular" ? "Perfil" : "Perfil Profissional"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Tipo de Conta</Label>
              <Select 
                value={role} 
                onValueChange={(value) => setRole(value as UserRole)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um tipo de conta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lawyer">Advogado</SelectItem>
                  <SelectItem value="assistant">Solicitador/Assistente</SelectItem>
                  <SelectItem value="client">Cliente (Acesso ao Portal)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="practiceArea">Área de Atuação</Label>
              <Select 
                value={formData.practiceArea}
                onValueChange={(value) => handleInputChange("practiceArea", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione sua área de atuação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="criminal">Direito Penal</SelectItem>
                  <SelectItem value="civil">Direito Civil</SelectItem>
                  <SelectItem value="business">Direito Empresarial</SelectItem>
                  <SelectItem value="labor">Direito do Trabalho</SelectItem>
                  <SelectItem value="tax">Direito Tributário</SelectItem>
                  <SelectItem value="other">Outra Área</SelectItem>
                </SelectContent>
              </Select>
              {errors.practiceArea && <p className="text-red-500 text-xs">{errors.practiceArea}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamSize">Número de Advogados na Equipa</Label>
              <Select 
                value={formData.teamSize}
                onValueChange={(value) => handleInputChange("teamSize", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tamanho da equipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Profissional Individual</SelectItem>
                  <SelectItem value="2-5">2-5 advogados</SelectItem>
                  <SelectItem value="6-10">6-10 advogados</SelectItem>
                  <SelectItem value="11-20">11-20 advogados</SelectItem>
                  <SelectItem value="20+">Mais de 20 advogados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentTools">Ferramentas de Gestão Atualmente Utilizadas</Label>
              <Input
                id="currentTools"
                placeholder="Ex: Excel, Word, software jurídico específico"
                value={formData.currentTools}
                onChange={(e) => handleInputChange("currentTools", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={currentStep !== 4 ? 'hidden' : ''}>
          <CardHeader>
            <CardTitle>4. Consentimentos e Termos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptTerms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
              />
              <Label htmlFor="acceptTerms" className="text-sm">
                Aceito os <Link to="/terms" className="text-primary hover:underline">Termos de Uso</Link> e a{" "}
                <Link to="/privacy" className="text-primary hover:underline">Política de Privacidade</Link>
              </Label>
            </div>
            {errors.acceptTerms && <p className="text-red-500 text-xs">{errors.acceptTerms}</p>}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptPilot"
                checked={formData.acceptPilot}
                onCheckedChange={(checked) => handleInputChange("acceptPilot", checked as boolean)}
              />
              <Label htmlFor="acceptPilot" className="text-sm">
                Aceito participar do Programa Piloto do LegalFlux
              </Label>
            </div>
            {errors.acceptPilot && <p className="text-red-500 text-xs">{errors.acceptPilot}</p>}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptUpdates"
                checked={formData.acceptUpdates}
                onCheckedChange={(checked) => handleInputChange("acceptUpdates", checked as boolean)}
              />
              <Label htmlFor="acceptUpdates" className="text-sm">
                Desejo receber comunicações e atualizações sobre o LegalFlux
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between space-x-4">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevStep}
              className="w-full"
            >
              Voltar
            </Button>
          )}
          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={handleNextStep}
              className="w-full"
            >
              Próximo
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                "Registrar"
              )}
            </Button>
          )}
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="text-primary-600 hover:text-primary-800 font-medium"
          >
            Faça login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
;
export default Register;
