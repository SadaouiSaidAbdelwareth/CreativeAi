
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-600">
        <path d="M16 3L3 9.38V22.62L16 29L29 22.62V9.38L16 3Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M16 17L3 10.62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 29V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M29 10.62L16 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22.5 7.5L9.5 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="font-bold text-xl text-gray-900 dark:text-white">CreativeAI</span>
    </div>
  );
};

export default Logo;
