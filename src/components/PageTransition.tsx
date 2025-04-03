import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
// If you're seeing a TypeScript error about missing types,
// make sure to also install the types package:
// npm install @types/framer-motion
// or
// yarn add @types/framer-motion
// Note: Please install framer-motion package by running:
// npm install framer-motion
// or
// yarn add framer-motion

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;