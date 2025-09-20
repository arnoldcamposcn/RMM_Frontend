import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img src='/images/logomm.png' alt="Logo" className="w-auto h-full" />
    </div>
  );
};

export default Logo;
