import React from "react";

interface BaseLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, title, description }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4">
          {title && <h1 className="text-2xl font-bold">{title}</h1>}
          {description && <p className="text-sm text-primary-foreground">{description}</p>}
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} LegalFlux. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default BaseLayout;