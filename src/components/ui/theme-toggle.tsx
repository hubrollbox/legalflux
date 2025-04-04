import React, { useEffect, useState } from 'react';
import { Sun, Moon, ZoomIn } from 'lucide-react';
import { Button } from './button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'high-contrast'>('light');

  useEffect(() => {
    // Verificar tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'high-contrast' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Verificar preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark' | 'high-contrast') => {
    const root = document.documentElement;
    
    // Remover todas as classes de tema
    root.classList.remove('light', 'dark', 'high-contrast');
    
    // Adicionar a classe do novo tema
    root.classList.add(newTheme);
    
    // Salvar no localStorage
    localStorage.setItem('theme', newTheme);
  };

  const setNewTheme = (newTheme: 'light' | 'dark' | 'high-contrast') => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          {theme === 'light' && <Sun className="h-5 w-5" />}
          {theme === 'dark' && <Moon className="h-5 w-5" />}
          {theme === 'high-contrast' && <ZoomIn className="h-5 w-5" />}
          <span className="sr-only">Alternar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setNewTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Claro</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setNewTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Escuro</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setNewTheme('high-contrast')}>
          <ZoomIn className="mr-2 h-4 w-4" />
          <span>Alto Contraste</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;