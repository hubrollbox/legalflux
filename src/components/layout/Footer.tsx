import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/favicon.ico" alt="LegalFlux" className="h-8 w-8" />
              <span className="font-bold">LegalFlux</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Soluções jurídicas inteligentes para o seu escritório.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features" className="text-muted-foreground hover:text-foreground">Recursos</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground">Preços</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">Sobre</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Central de Ajuda</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faqs" className="text-muted-foreground hover:text-foreground">FAQs</Link></li>
              <li><Link to="/tutorials" className="text-muted-foreground hover:text-foreground">Tutoriais</Link></li>
              <li><Link to="/docs" className="text-muted-foreground hover:text-foreground">Documentação</Link></li>
              <li><Link to="/screenshots" className="text-muted-foreground hover:text-foreground">Screenshots</Link></li>
              <li><Link to="/support" className="text-muted-foreground hover:text-foreground">Suporte</Link></li>
              <li><Link to="/links" className="text-muted-foreground hover:text-foreground">Links Úteis</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <address className="text-sm text-muted-foreground not-italic">
              Edifício Diplomata<br />
              4450-075 Matosinhos - Portugal
            </address>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};