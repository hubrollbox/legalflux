
import React from 'react';
import { Link } from 'react-router-dom';

const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">LegalFlux</h3>
            <p className="text-gray-400 mb-4">
              Plataforma jurídica completa para escritórios modernos.
            </p>
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} LegalFlux. Todos os direitos reservados.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">Sobre Nós</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">Contacto</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">Política de Privacidade</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">Termos de Serviço</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Central de Ajuda</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/central-de-ajuda/docs" className="text-gray-400 hover:text-white">Documentação</Link>
              </li>
              <li>
                <Link to="/central-de-ajuda/faqs" className="text-gray-400 hover:text-white">FAQs</Link>
              </li>
              <li>
                <Link to="/central-de-ajuda/screenshots" className="text-gray-400 hover:text-white">Screenshots</Link>
              </li>
              <li>
                <Link to="/central-de-ajuda/support" className="text-gray-400 hover:text-white">Suporte</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
