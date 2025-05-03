
import React, { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className = "" 
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut" 
        }}
        // Apply className to a wrapper div instead of directly to motion.div
      >
        <div className={className}>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
