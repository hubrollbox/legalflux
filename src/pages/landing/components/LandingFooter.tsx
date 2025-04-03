
import { Link } from "react-router-dom";
import { Vimeo, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">LegalFlux</h3>
            <p className="text-gray-400">
              Sistema completo de gestão jurídica para escritórios modernos.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://vimeo.com/user119294787" target="_blank" rel="noopener noreferrer" aria-label="Vimeo" className="text-gray-400 hover:text-white">
                <Vimeo size={20} />
              </a>
              <a href="https://www.instagram.com/legalflux.pt/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/#features" className="text-gray-400 hover:text-white transition-colors">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="text-gray-400 hover:text-white transition-colors">
                  Planos
                </Link>
              </li>
              <li>
                <Link to="/screenshots" className="text-gray-400 hover:text-white transition-colors">
                  Capturas de Ecrã
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Transferências</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  App para Windows
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  App para MacOS
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  App para iOS
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  App para Android
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contactos</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} />
                <span>Edifício Diplomata<br />Matosinhos - Portugal</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={16} />
                <span>+351 220 145 169</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={16} />
                <span>suporte@legalflux.pt</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} LegalFlux. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">
              Termos
            </Link>
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">
              Privacidade
            </Link>
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
