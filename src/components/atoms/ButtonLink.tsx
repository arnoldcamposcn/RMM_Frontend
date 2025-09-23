import React from 'react';

interface ButtonLinkProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

const ButtonLink: React.FC<ButtonLinkProps> = (props) => {
  const { children, className, href, target, rel, onClick, ...rest } = props;
  
  // 🐛 DEBUG: Vamos a ver qué props llegan aquí
  const baseClasses = "bg-[#53C1A9] hover:bg-verde-codea/80 text-white py-3 px-4 rounded-md title-buttons font-normal transition-all duration-200 hover:shadow-md";
  const combinedClasses = `${baseClasses} ${className || ''}`;

  // Si hay href, renderizar como enlace
  if (href) {
    return (
      <a 
        href={href}
        target={target}
        rel={rel}
        className={combinedClasses}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={combinedClasses}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonLink;