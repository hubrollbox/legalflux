
import * as React from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <Link to="/">
            <img
              src="/lovable-uploads/2e2650ad-d2c9-49ca-ba40-8c19627e97aa.png"
              alt="LegalFlux Logo"
              className="h-20 mb-6"
            />
          </Link>
          <h1 className="text-2xl font-bold text-center text-gray-900">{title}</h1>
          {subtitle && <p className="mt-2 text-center text-sm text-gray-600">{subtitle}</p>}
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
