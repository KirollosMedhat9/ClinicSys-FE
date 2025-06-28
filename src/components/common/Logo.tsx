import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', animated = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const LogoIcon = () => (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Tulip Flower */}
      <motion.div
        initial={animated ? { scale: 0, rotate: -180 } : {}}
        animate={animated ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
        className="absolute inset-0"
      >
        {/* Petals */}
        <div className="absolute inset-0">
          {/* Main petal */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-3/4 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full shadow-lg"></div>
          
          {/* Side petals */}
          <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full transform -translate-x-1/4"></div>
          <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-pink-300 to-pink-500 rounded-full transform translate-x-1/4"></div>
          
          {/* Back petals */}
          <div className="absolute top-1/3 left-1/4 w-1/3 h-1/3 bg-gradient-to-br from-pink-200 to-pink-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-gradient-to-bl from-pink-200 to-pink-400 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        {/* Stem */}
        <motion.div
          initial={animated ? { scaleY: 0 } : {}}
          animate={animated ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/6 h-3/4 bg-gradient-to-b from-green-400 to-green-600 rounded-full"
        ></motion.div>
        
        {/* Leaves */}
        <motion.div
          initial={animated ? { scale: 0, rotate: -45 } : {}}
          animate={animated ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-1/3 h-1/6 bg-gradient-to-r from-green-300 to-green-500 rounded-full"
        ></motion.div>
        
        {/* Center detail */}
        <motion.div
          initial={animated ? { scale: 0 } : {}}
          animate={animated ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/6 h-1/6 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full"
        ></motion.div>
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        initial={animated ? { opacity: 0 } : {}}
        animate={animated ? { opacity: [0, 0.3, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute inset-0 bg-pink-300 rounded-full blur-md"
      ></motion.div>
    </div>
  );

  return <LogoIcon />;
};

export default Logo; 