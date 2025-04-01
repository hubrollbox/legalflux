
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/auth/AuthLayout";
import { Loader2, AlertCircle, Shield } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { isValidPassword } from "@/lib/utils";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      setError("Token de redefinição de senha inválido ou expirado.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!token) {
      setError("Token de redefinição de senha inválido ou expirado.");
      return;
    }
    
    if (!isValidPassword(password)) {
      setError("A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial.");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await resetPassword(token, password);
      setIsSubmitted(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Password reset error:", error);
      setError("Ocorreu um erro ao redefinir sua senha. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token && !error) {
    return (
      <AuthLayout 
        title="Redefinir Senha" 
        subtitle="Crie uma nova senha para sua conta"
      >
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-primary-600 mx-auto animate-spin" />
          <p className="mt-4">Validando o token de redefinição...</p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Redefinir Senha" 
      subtitle="Crie uma nova senha para sua conta"
    >
      {isSubmitted ? (
        <div className="space-y-4">
          <Alert className="bg-green-50 border-green-100">
            <Shield className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Senha redefinida</AlertTitle>
            <AlertDescription className="text-green-700">
              Sua senha foi redefinida com sucesso. Você será redirecionado para a página de login.
            </AlertDescription>
          </Alert>
          
          <div className="text-center mt-6">
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              Ir para login
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="password">Nova Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={!token || isLoading}
            />
            <p className="text-xs text-gray-500">
              A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={!token || isLoading}
            />
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={!token || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redefinindo...
              </>
            ) : (
              "Redefinir Senha"
            )}
          </Button>
          
          <div className="text-center mt-4">
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-800 text-sm"
            >
              Voltar para o login
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
