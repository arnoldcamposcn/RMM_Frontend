import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../atoms/Logo';
import UserDropdown from '../molecules/UserDropdown';

interface HeaderProps {
  className?: string;
  onSearch?: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Elementos del menú con detección automática de página activa
  const navigationItems = [
    { label: 'Inicio', href: '/', isActive: location.pathname === '/' },
    { label: 'Ediciones', href: '/ediciones', isActive: location.pathname === '/ediciones' },
    { label: 'Blog', href: '/blogs', isActive: location.pathname === '/blog' },
    { label: 'Artículos', href: '/articulos', isActive: location.pathname === '/articulos' },
    { label: 'Foro', href: '/foro', isActive: location.pathname === '/foro' },
    { label: 'Nosotros', href: '/nosotros', isActive: location.pathname === '/nosotros' },
    { label: 'Contacto', href: '/contacto', isActive: location.pathname === '/contacto' }
  ];

  return (
    <header className={`sticky top-0 z-50 ${className}`}>
      {/* Barra superior del magazine */}
      <div className="magazine-header border-b border-[#53C1A9] border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-20">
            {/* Logo prominente centrado con efectos */}
            <div className="magazine-logo transform scale-125 transition-transform duration-300 hover:scale-135">
              <Logo />
            </div>
          </div>
        </div>
      </div>

      {/* Barra de navegación principal */}
      <div className="magazine-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Navegación centrada con estilo de magazine */}
            <div className="hidden lg:flex items-center space-x-10 flex-1 justify-center">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`magazine-link relative text-[#132F56] font-semibold transition-all duration-300 hover:text-[#53C1A9] py-2 px-3 ${
                    item.isActive 
                      ? 'text-[#53C1A9] font-bold' 
                      : 'hover:scale-105'
                  }`}
                >
                  {item.label}
                  {item.isActive && (
                    <>
                      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#53C1A9] to-[#4AB39A] rounded-full"></div>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#53C1A9] rounded-full"></div>
                    </>
                  )}
                </a>
              ))}
            </div>

            {/* Menú de usuario accesible en la derecha */}
            <div className="hidden lg:block">
              <UserDropdown />
            </div>

            {/* Menú móvil - hamburguesa */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#132F56] hover:text-[#53C1A9] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#53C1A9] p-2 rounded-lg transition-all duration-200 hover:bg-gray-100"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Abrir menú principal</span>
                <svg
                  className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180 scale-110' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Menú de usuario en móvil - fácil acceso */}
            <div className="px-3 py-2 border-b border-gray-200 mb-2">
              <div className="flex items-center justify-between">
                <span className="paragraph-magazine font-medium text-[#132F56]">Acceso</span>
                <UserDropdown />
              </div>
            </div>
            
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`paragraph-magazine block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                  item.isActive
                    ? 'text-[#53C1A9] bg-[#53C1A9] bg-opacity-10 border-l-4 border-[#53C1A9]'
                    : 'text-[#132F56] hover:text-[#53C1A9] hover:bg-gray-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  {item.isActive && (
                    <div className="w-2 h-2 bg-[#53C1A9] rounded-full"></div>
                  )}
                  <span>{item.label}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
