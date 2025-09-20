import React from 'react';

interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface NavigationProps {
  items: NavigationItem[];
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex space-x-8 ${className}`}>
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className={`title-header hover:text-verde-codea transition-colors duration-200 ${
            item.isActive 
              ? 'text-white font-medium border-b-2 border-verde-codea pb-1' 
              : 'text-white'
          }`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;
