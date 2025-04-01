
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/auth/AuthLayout";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { requestPasswordReset } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await requestPasswordReset(email);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Password reset request error:", error);
      setError("Ocorreu um erro ao solicitar a redefinição de senha. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Recuperar Senha" 
      subtitle="Enviaremos instruções para redefinir sua senha"
    >
      {isSubmitted ? (
        <div className="space-y-4">
          <Alert className="bg-green-50 border-green-100">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Email enviado</AlertTitle>
            <AlertDescription className="text-green-700">
              Se o email fornecido estiver registrado em nossa base de dados, enviaremos instruções para redefinir sua senha.
            </AlertDescription>
          </Alert>
          
          <div className="text-center mt-6">
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              Voltar para o login
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
          
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Recuperar Senha"
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

export default ForgotPassword;
