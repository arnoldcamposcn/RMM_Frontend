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
          className={`title-header nav-item-hover transition-all duration-300 relative ${
            item.isActive 
              ? 'nav-item-active font-semibold pb-1' 
              : 'text-white hover:text-[#53C1A9]'
          }`}
        >
          {item.label}
          {item.isActive && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#53C1A9] rounded-full"></div>
          )}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;
