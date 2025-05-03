
import React from 'react';
import { Link } from 'react-router-dom';
import Image from '@/components/ui/Image';

const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              <Image 
                src="/lovable-uploads/2e2650ad-d2c9-49ca-ba40-8c19627e97aa.png" 
                alt="Logo"
                width={100}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
          </div>
          
          <div>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Image 
                src="/img/google-play.svg" 
                alt="Google Play" 
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
