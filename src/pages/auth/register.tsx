import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Container>
        <div className="py-12">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
              </CardHeader>
              <CardContent>
                <RegisterForm />
                
                <div className="mt-4 text-center text-sm">
                  Já tem uma conta?{' '}
                  <a href="/auth/login" className="text-primary hover:underline">
                    Entrar
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;