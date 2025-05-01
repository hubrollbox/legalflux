
import React from 'react';
import { Link } from 'react-router-dom';

const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">LegalFlux</h3>
            <p className="text-gray-300 text-sm">
              Plataforma de gestão jurídica para escritórios modernos. Simplifique seus processos, aumente sua produtividade.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-0.966 0-1.75-0.79-1.75-1.764s0.784-1.764 1.75-1.764 1.75 0.79 1.75 1.764-0.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="hover:text-primary">Gestão de Processos</Link></li>
              <li><Link to="/features" className="hover:text-primary">Gestão de Documentos</Link></li>
              <li><Link to="/features" className="hover:text-primary">Automatização</Link></li>
              <li><Link to="/features" className="hover:text-primary">Inteligência Artificial</Link></li>
              <li><Link to="/features" className="hover:text-primary">Portal do Cliente</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Central de Ajuda</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/central-de-ajuda/docs" className="hover:text-primary">Documentação</Link>
              </li>
              <li>
                <Link to="/central-de-ajuda/faqs" className="hover:text-primary">FAQs</Link>
              </li>
              <li>
                <Link to="/central-de-ajuda/screenshots" className="hover:text-primary">Screenshots</Link>
              </li>
              <li>
                <Link to="/central-de-ajuda/support" className="hover:text-primary">Suporte</Link>
              </li>
              <li>
                <Link to="/central-de-ajuda/tutorials" className="hover:text-primary">Tutoriais</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-primary">Sobre Nós</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contacto</Link></li>
              <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Termos de Serviço</Link></li>
              <li><Link to="/privacy" className="hover:text-primary">Política de Privacidade</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} LegalFlux. Todos os direitos reservados.</p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Link to="/terms" className="hover:text-white">Termos</Link>
              <Link to="/privacy" className="hover:text-white">Privacidade</Link>
              <Link to="/cookies" className="hover:text-white">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
