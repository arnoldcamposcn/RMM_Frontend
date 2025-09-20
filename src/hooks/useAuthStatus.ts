// src/hooks/useAuthStatus.tsx
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
  // Aquí puedes añadir otras propiedades de tu payload si las necesitas
  // Por ejemplo: id: string;
}

export const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      // Usamos 'accessToken' para que coincida con tu instancia de Axios
      const token = Cookies.get('accessToken');

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode<DecodedToken>(token);
        
        // Validar si el token ha expirado
        // La propiedad 'exp' de JWT está en segundos, Date.now() en milisegundos
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          console.log("Token ha expirado, eliminando...");
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken'); // Opcional, pero buena práctica
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Si hay un error al decodificar (token malformado, etc.)
        console.error("Token inválido:", error);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  return { isAuthenticated, isLoading };
};