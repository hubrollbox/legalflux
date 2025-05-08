
import * as React from "react";
import { Link } from "react-router-dom";

const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Central de Ajuda</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/central-de-ajuda/docs" className="hover:text-blue-400 transition-colors">Documentação</Link>
              </li>
              <li>
                <Link to="/central-de-ajuda/faqs" className="hover:text-blue-400 transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/central-de-ajuda/screenshots" className="hover:text-blue-400 transition-colors">Screenshots</Link>
              </li>
              <li>
                <Link to="/central-de-ajuda/support" className="hover:text-blue-400 transition-colors">Suporte</Link>
              </li>
              <li>
                <Link to="/central-de-ajuda/tutorials" className="hover:text-blue-400 transition-colors">Tutoriais</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">Sobre nós</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">Contacto</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-400 transition-colors">Termos e Condições</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-400 transition-colors">Política de Privacidade</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="hover:text-blue-400 transition-colors">Funcionalidades</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-blue-400 transition-colors">Preços</Link>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">Blog</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Descarregar</h3>
            <div className="flex flex-col space-y-2">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img 
                  src="/img/app-store.svg" 
                  alt="App Store" 
                  className="h-10 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/120x40?text=App+Store";
                  }}
                />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img 
                  src="/img/google-play.svg" 
                  alt="Google Play" 
                  className="h-10 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/120x40?text=Google+Play";
                  }}
                />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} LegalFlux. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
