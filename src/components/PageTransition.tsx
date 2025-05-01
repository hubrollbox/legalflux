
import { type FC, type ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const PageTransition: FC<PageTransitionProps> = ({ 
  children, 
  duration = 0.3, 
  delay = 0, 
  direction = 'none' 
}) => {
  const getAnimationClass = () => {
    switch (direction) {
      case 'up':
        return 'animate-fade-up';
      case 'down':
        return 'animate-fade-down';
      case 'left':
        return 'animate-fade-left';
      case 'right':
        return 'animate-fade-right';
      default:
        return 'animate-fade';
    }
  };

  return (
    <div
      className={getAnimationClass()}
      style={{
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
