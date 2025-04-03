
import { Link } from "react-router-dom";
import { Video, Instagram, Linkedin, Mail, Phone, MapPin, Github } from "lucide-react";

const LandingFooter = () => {
  return (
    <footer className="bg-white text-gray-800 py-16 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-primary-900">LegalFlux</h3>
            <p className="text-gray-600">
              Sistema completo de gestão jurídica para escritórios modernos.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://vimeo.com/user119294787" target="_blank" rel="noopener noreferrer" aria-label="Vimeo" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 text-primary-900 transition-colors">
                <Video size={20} />
              </a>
              <a href="https://www.instagram.com/legalflux.pt/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 text-primary-900 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 text-primary-900 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/hubrollbox/legalflux" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 text-primary-900 transition-colors">
                <Github size={20} />
              </a>
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
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-5 text-primary-900">Aplicações</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-600">Disponível em breve para:</span>
              </li>
              <li className="text-gray-600">
                Windows • MacOS • iOS • Android
              </li>
              <li className="mt-5">
                <Link to="/#pricing" className="text-highlight hover:text-primary-900 transition-colors">
                  Saiba mais sobre os nossos planos
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
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} LegalFlux. Todos os direitos reservados.
          </p>
          <div className="flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-highlight transition-colors">
              Termos
            </Link>
            <Link to="/" className="text-gray-600 hover:text-highlight transition-colors">
              Privacidade
            </Link>
            <Link to="/" className="text-gray-600 hover:text-highlight transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
