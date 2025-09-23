import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getProfile } from '../store/features/profile/profile.service';
import type { Profile } from '../store/features/profile/profileSchema';

export const useAuth = () => {
  const [user, setUser] = useState<Profile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    const token = Cookies.get('accessToken');
    
    if (token) {
      try {
        // Verificar si el token no ha expirado
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        if (payload.exp && payload.exp > currentTime) {
          // Token válido, obtener datos del perfil
          try {
            const profileData = await getProfile();
            setUser(profileData);
            setIsAuthenticated(true);
          } catch (profileError) {
            // Error al obtener el perfil (token inválido o usuario no existe)
            console.warn('Error al obtener perfil:', profileError);
            clearAuth();
          }
        } else {
          // Token expirado
          clearAuth();
        }
      } catch (error) {
        // Error al decodificar el token
        console.warn('Error al decodificar token:', error);
        clearAuth();
      }
    } else {
      clearAuth();
    }
    
    setIsLoading(false);
  };

  const clearAuth = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Limpiar cookies si es necesario
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });
  };

  useEffect(() => {
    checkAuthStatus();
    
    // Escuchar cambios en las cookies
    const interval = setInterval(checkAuthStatus, 30000); // Verificar cada 30 segundos (menos frecuente para evitar llamadas excesivas al API)
    
    // También escuchar eventos de storage para cambios en otras pestañas
    const handleStorageChange = () => {
      checkAuthStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const logout = () => {
    clearAuth();
    // Redirigir a la página de inicio
    window.location.href = '/';
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
    checkAuthStatus
  };
};
