import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/favicon.ico" alt="LegalFlux" className="h-8 w-8" />
              <span className="font-bold">LegalFlux</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Soluções jurídicas inteligentes para o seu escritório.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/features" className="text-muted-foreground hover:text-foreground">Recursos</Link></li>
              <li><Link href="/subscriptions" className="text-muted-foreground hover:text-foreground">Preços</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground">Sobre</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Central de Ajuda</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help/docs" className="text-muted-foreground hover:text-foreground">Documentação</Link></li>
              <li><Link href="/help/faqs" className="text-muted-foreground hover:text-foreground">FAQs</Link></li>
              <li><Link href="/help/screenshots" className="text-muted-foreground hover:text-foreground">Screenshots</Link></li>
              <li><Link href="/help/support" className="text-muted-foreground hover:text-foreground">Suporte</Link></li>
              <li><Link href="/help/tutorials" className="text-muted-foreground hover:text-foreground">Tutoriais</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <address className="text-sm text-muted-foreground not-italic">
              Edifício Diplomata<br />
              4450-075 Matosinhos - Portugal
            </address>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.facebook.com" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.twitter.com" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="/img/app-store.svg" className="text-muted-foreground hover:text-foreground">
                <img src="/img/app-store.svg" alt="App Store" className="h-5 w-5" />
              </a>
              <a href="/img/google-play.svg" className="text-muted-foreground hover:text-foreground">
                <img src="/img/google-play.svg" alt="Google Play" className="h-5 w-5" />
              </a>
              <a href="/img/windows-store.svg" className="text-muted-foreground hover:text-foreground">
                <img src="/img/windows-store.svg" alt="Windows Store" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
