import React from 'react';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => (
  <div className="auth-layout">
    <h1>{title}</h1>
    {subtitle && <p>{subtitle}</p>}
    <div>{children}</div>
  </div>
);

export default AuthLayout;