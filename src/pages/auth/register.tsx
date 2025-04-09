import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import AuthLayout from '@/components/layout/AuthLayout';

const RegisterPage = () => {
  return (
    <AuthLayout title="Register LegalFlux" subtitle="Create your account">
      <RegisterForm />
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login">
            <a className="text-primary hover:text-highlight font-medium">
              Log in
            </a>
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;