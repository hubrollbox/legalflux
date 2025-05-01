import Image from 'next/image';
import Link from "next/link";
import React from "react";

const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ... other columns ... */}
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Central de Ajuda</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/central-de-ajuda/docs" className="hover:text-primary">Documentação</Link>
              </li>
              <li>
                <Link href="/central-de-ajuda/faqs" className="hover:text-primary">FAQs</Link>
              </li>
              <li>
                <Link href="/central-de-ajuda/screenshots" className="hover:text-primary">Screenshots</Link>
              </li>
              <li>
                <Link href="/central-de-ajuda/support" className="hover:text-primary">Suporte</Link>
              </li>
              <li>
                <Link href="/central-de-ajuda/tutorials" className="hover:text-primary">Tutoriais</Link>
              </li>
            </ul>
          </div>
          
          {/* ... other columns ... */}
          <a href="#" className="text-muted-foreground hover:text-foreground">
            <Image 
              src="/logo.png" 
              alt="Logo"
              width={100}
              height={50}
            />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            <Image 
              src="/google-play.svg" 
              alt="Google Play" 
              width={20}
              height={20}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;