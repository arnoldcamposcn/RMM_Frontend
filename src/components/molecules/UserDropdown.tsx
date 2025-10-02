import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface UserDropdownProps {
  className?: string;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  
  // // Debug temporal para verificar datos del usuario
  // React.useEffect(() => {
  //   if (user) {
  //     console.log('Datos del usuario en UserDropdown:', user);
  //   }
  // }, [user]);

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center space-x-2 px-3 py-2 bg-gray-200 text-gray-500 rounded-lg animate-pulse">
          <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Cargando usuario...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Botón principal compacto y elegante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm hover:shadow-md ${
          isAuthenticated 
            ? 'bg-[#132F56] hover:bg-[#1e3a8a] focus:ring-[#132F56]' 
            : 'bg-[#53C1A9] hover:bg-[#4AB39A] focus:ring-[#53C1A9]'
        }`}
      >
        {/* Avatar o ícono de usuario */}
        {isAuthenticated ? (
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">
              {user?.usuario_unico?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
        ) : (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        )}
        
        <span className="text-sm font-medium">
          {isAuthenticated ? (user?.usuario_unico || 'Usuario') : 'Acceder'}
        </span>
        
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Menú desplegable profesional */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 backdrop-blur-sm bg-opacity-95">
          {isAuthenticated ? (
            <>
              {/* Header del dropdown para usuario autenticado */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#132F56] to-[#1e3a8a] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {user?.usuario_unico?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#132F56]">
                      {user?.usuario_unico || 'Usuario'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.email || 'usuario@email.com'}
                    </p>
                    {user?.first_name && user?.last_name && (
                      <p className="text-xs text-gray-400">
                        {user.first_name} {user.last_name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Opciones del menú para usuario autenticado */}
              <div className="py-1">
                <button
                  onClick={() => handleNavigation('/perfil')}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#132F56] hover:to-[#1e3a8a] hover:text-white transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="paragraph-magazine font-medium">Ver Perfil</span>
                  </div>
                </button>
                
                <button
                  onClick={() => handleNavigation('/perfil/editar-perfil')}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#132F56] hover:to-[#1e3a8a] hover:text-white transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span className="paragraph-magazine font-medium">Editar Perfil</span>
                  </div>
                </button>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-red-500 group-hover:text-red-700 transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="paragraph-magazine font-medium">Cerrar Sesión</span>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Header del dropdown para usuario no autenticado */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-[#132F56]">Acceso a tu cuenta</p>
                <p className="text-xs text-gray-500 mt-1">Inicia sesión o regístrate</p>
              </div>
              
              {/* Opciones del menú para usuario no autenticado */}
              <div className="py-1">
                <button
                  onClick={() => handleNavigation('/iniciar-sesion')}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#53C1A9] hover:to-[#4AB39A] hover:text-white transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="paragraph-magazine font-medium">Iniciar Sesión</span>
                  </div>
                </button>
                <button
                  onClick={() => handleNavigation('/registrarse')}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#53C1A9] hover:to-[#4AB39A] hover:text-white transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    <span className="paragraph-magazine font-medium">Registrarse</span>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
