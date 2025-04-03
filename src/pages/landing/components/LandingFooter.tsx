
import { Link } from "react-router-dom";
import { Video, Instagram, Linkedin, Mail, Phone, MapPin, Github } from "lucide-react";
import { LOGO } from "@/assets";

const LandingFooter = () => {
  return (
    <footer className="bg-white text-gray-800 py-16 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12">
          <div>
            <img src={LOGO.DEFAULT} alt="LegalFlux" className="h-12 mb-4" />
            <p className="text-gray-600">
              Sistema completo de gestão jurídica para escritórios modernos.
            </p>
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3 text-gray-900">Aplicações</h5>
              <p className="text-gray-600 text-sm">Disponível em breve para:</p>
              <p className="text-gray-600 text-sm mt-1">Windows • MacOS • iOS • Android</p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-5 text-primary-900">Produto</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/#features" className="text-gray-600 hover:text-highlight transition-colors">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="text-gray-600 hover:text-highlight transition-colors">
                  Planos
                </Link>
              </li>
              <li>
                <Link to="/screenshots" className="text-gray-600 hover:text-highlight transition-colors">
                  Capturas de Ecrã
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-highlight transition-colors">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-5 text-primary-900">Suporte</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/screenshots#support" className="text-gray-600 hover:text-highlight transition-colors">
                  Centro de Ajuda
                </Link>
              </li>
              <li>
                <Link to="/screenshots#faq" className="text-gray-600 hover:text-highlight transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/screenshots#contact" className="text-gray-600 hover:text-highlight transition-colors">
                  Contacte-nos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-5 text-primary-900">Contactos</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600">
                <MapPin size={18} className="text-highlight mt-1 flex-shrink-0" />
                <span>Edifício Diplomata<br />Matosinhos - Portugal</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Phone size={18} className="text-highlight flex-shrink-0" />
                <span>+351 220 145 169</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Mail size={18} className="text-highlight flex-shrink-0" />
                <span>suporte@legalflux.pt</span>
              </li>
              <li className="mt-4">
                <h5 className="text-sm font-semibold mb-3 text-gray-900">Redes Sociais</h5>
                <div className="flex space-x-3">
                  <a href="https://vimeo.com/user119294787" target="_blank" rel="noopener noreferrer" aria-label="Vimeo" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 text-primary transition-colors">
                    <Video size={18} />
                  </a>
                  <a href="https://www.instagram.com/legalflux.pt/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 text-primary transition-colors">
                    <Instagram size={18} />
                  </a>
                  <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 text-primary transition-colors">
                    <Linkedin size={18} />
                  </a>
                  <a href="https://github.com/hubrollbox/legalflux" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 text-primary transition-colors">
                    <Github size={18} />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} LegalFlux. Todos os direitos reservados.
          </p>
          <div className="flex space-x-8">
            <Link to="/terms" className="text-gray-600 hover:text-highlight transition-colors">
              Termos
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-highlight transition-colors">
              Privacidade
            </Link>
            <Link to="/cookies" className="text-gray-600 hover:text-highlight transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
