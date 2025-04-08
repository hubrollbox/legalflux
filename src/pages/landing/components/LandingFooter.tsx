
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, Phone, MapPin, Github } from "lucide-react";
import { LOGO } from "@/assets";

const LandingFooter = () => {
  return (
    <footer className="bg-background border-t border-border py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={LOGO.DEFAULT} alt="LegalFlux" className="h-12" />
              <span className="font-bold">LegalFlux</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Sistema completo de gestão jurídica para escritórios modernos.
            </p>
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3">Disponível para:</h5>
              <div className="flex space-x-3 mt-2">
                <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                  <img src="/img/app-store.svg" alt="App Store" className="h-8" />
                </a>
                <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                  <img src="/img/google-play.svg" alt="Google Play" className="h-8" />
                </a>
                <a href="https://www.microsoft.com/store/apps" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                  <img src="/img/windows-store.svg" alt="Windows Store" className="h-8" />
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/#features" className="text-muted-foreground hover:text-foreground">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="text-muted-foreground hover:text-foreground">
                  Integrações
                </Link>
              </li>
              <li>
                <Link to="/subscriptions" className="text-muted-foreground hover:text-foreground">
                  Planos
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-muted-foreground hover:text-foreground">
                  Segurança
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Central de Ajuda</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/central-de-ajuda?tab=faqs" className="text-muted-foreground hover:text-foreground">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/central-de-ajuda?tab=tutorials" className="text-muted-foreground hover:text-foreground">
                  Tutoriais
                </Link>
              </li>
              <li>
                <Link to="/central-de-ajuda?tab=documentation" className="text-muted-foreground hover:text-foreground">
                  Documentação
                </Link>
              </li>
              <li>
                <Link to="/central-de-ajuda?tab=screenshots" className="text-muted-foreground hover:text-foreground">
                  Screenshots
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-foreground">
                  Suporte
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contactos</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                <span>Edifício Diplomata<br />
                  4450-075 Matosinhos<br />
                  PORTUGAL</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span>+351 220 145 169</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span>suporte@legalflux.pt</span>
              </li>
              <li className="mt-4 flex space-x-3">
                <a href="https://vimeo.com/user119294787" target="_blank" rel="noopener noreferrer" aria-label="Vimeo" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                </a>
                <a href="https://www.instagram.com/legalflux.pt/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-foreground">
                  <Instagram size={18} />
                </a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground">
                  <Linkedin size={18} />
                </a>
                <a href="https://github.com/hubrollbox/legalflux" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground">
                  <Github size={18} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-6 sm:mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-center sm:text-left">
            &copy; {new Date().getFullYear()} LegalFlux. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
            <Link to="/terms" className="text-muted-foreground hover:text-foreground">
              Termos
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
              Privacidade
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
