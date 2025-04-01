
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/auth/AuthLayout";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Login LegalFlux" 
      subtitle="Entre na sua conta para acessar a plataforma"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="password">Senha</Label>
            <Link
              to="/forgot-password"
              className="text-sm text-primary-600 hover:text-primary-800"
            >
              Esqueceu a senha?
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
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Link
            to="/register"
            className="text-primary-600 hover:text-primary-800 font-medium"
          >
            Registre-se
          </Link>
        </p>
      </div>

      <div className="mt-8 border-t pt-6">
        <p className="text-sm text-center text-gray-500 mb-4">
          Credenciais demo:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-2 border rounded bg-gray-50">
            <p className="font-semibold">Admin:</p>
            <p>admin@legalflux.com</p>
          </div>
          <div className="p-2 border rounded bg-gray-50">
            <p className="font-semibold">Advogado:</p>
            <p>lawyer@legalflux.com</p>
          </div>
          <div className="p-2 border rounded bg-gray-50">
            <p className="font-semibold">Advogado Sênior:</p>
            <p>senior@legalflux.com</p>
          </div>
          <div className="p-2 border rounded bg-gray-50">
            <p className="font-semibold">Cliente:</p>
            <p>client@legalflux.com</p>
          </div>
        </div>
        <p className="text-xs text-center text-gray-500 mt-4">
          Use qualquer senha para entrar com estas contas.
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
