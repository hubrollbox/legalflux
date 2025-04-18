
import React from "react";
import { Video, Instagram, Linkedin, Github } from "lucide-react";

export const ContactInfo: React.FC = () => {
  return (
    <>
      <div className="flex items-start space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-highlight mt-1">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        <div>
          <h4 className="font-medium">Telefone</h4>
          <p className="text-muted-foreground">+351 220 145 169</p>
        </div>
      </div>
      
      <div className="flex items-start space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-highlight mt-1">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
        <div>
          <h4 className="font-medium">Email</h4>
          <p className="text-muted-foreground">suporte@legalflux.pt</p>
        </div>
      </div>
      
      <div className="flex items-start space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-highlight mt-1">
          <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/>
          <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/>
        </svg>
        <div>
          <h4 className="font-medium">Morada</h4>
          <p className="text-muted-foreground">
            Edifício Diplomata<br />
            Matosinhos<br />
            Portugal
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Redes Sociais</h4>
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
      </div>
    </>
  );
};
