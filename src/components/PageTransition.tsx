import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  duration = 0.3, 
  delay = 0, 
  direction = 'none' 
}) => {
  // Configurar animações baseadas na direção
  const getAnimations = () => {
    const distance = 30;
    
    switch (direction) {
      case 'up':
        return {
          initial: { opacity: 0, y: distance },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -distance }
        };
      case 'down':
        return {
          initial: { opacity: 0, y: -distance },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: distance }
        };
      case 'left':
        return {
          initial: { opacity: 0, x: distance },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -distance }
        };
      case 'right':
        return {
          initial: { opacity: 0, x: -distance },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: distance }
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };

  const animations = getAnimations();

  return (
    <motion.div
      initial={animations.initial}
      animate={animations.animate}
      exit={animations.exit}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;