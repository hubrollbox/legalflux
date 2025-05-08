
import { Link } from 'react-router-dom';
import CustomImage from '@/components/ui/CustomImage';

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-gray-200">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CustomImage 
                src="/logo.png" 
                alt="Company Logo"
                width={120}
                height={40}
              />
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
              <li><Link to="/subscriptions" className="text-muted-foreground hover:text-foreground">Preços</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">Sobre</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Central de Ajuda</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help/docs" className="text-muted-foreground hover:text-foreground">Documentação</Link></li>
              <li><Link to="/help/faqs" className="text-muted-foreground hover:text-foreground">FAQs</Link></li>
              <li><Link to="/help/screenshots" className="text-muted-foreground hover:text-foreground">Screenshots</Link></li>
              <li><Link to="/help/support" className="text-muted-foreground hover:text-foreground">Suporte</Link></li>
              <li><Link to="/help/tutorials" className="text-muted-foreground hover:text-foreground">Tutoriais</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <address className="text-sm text-muted-foreground not-italic">
              Edifício Diplomata<br />
              4450-075 Matosinhos - Portugal
            </address>
            <div className="flex space-x-4 mt-4">
              <a href="/img/app-store.svg" className="text-muted-foreground hover:text-foreground">
                <CustomImage src="/img/app-store.svg" alt="App Store" width={20} height={20} className="h-5 w-5" />
              </a>
              <a href="/img/google-play.svg" className="text-muted-foreground hover:text-foreground">
                <CustomImage src="/img/google-play.svg" alt="Google Play" width={20} height={20} className="h-5 w-5" />
              </a>
              <a href="/img/windows-store.svg" className="text-muted-foreground hover:text-foreground">
                <CustomImage src="/img/windows-store.svg" alt="Windows Store" width={20} height={20} className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} LegalFlux. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
