import { useState, useEffect } from 'react';

interface CurrentUser {
  id: number;
  email: string;
  usuario_unico: string;
  perfil_url?: string;
}

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga del usuario actual
    // En una aplicación real, esto vendría de un token JWT, localStorage, o API
    const loadCurrentUser = async () => {
      try {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Simular usuario actual - en una app real vendría del contexto de auth
        const user: CurrentUser = {
          id: 2, // Por ahora hardcodeado, en una app real vendría del token
          email: "usuario@example.com",
          usuario_unico: "usuario123",
          perfil_url: "https://via.placeholder.com/150"
        };
        
        setCurrentUser(user);
      } catch (error) {
        console.error('Error loading current user:', error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadCurrentUser();
  }, []);

  const isOwner = (authorId: number): boolean => {
    return currentUser?.id === authorId;
  };

  const isAuthenticated = (): boolean => {
    return currentUser !== null;
  };

  return {
    currentUser,
    loading,
    isOwner,
    isAuthenticated,
    setCurrentUser
  };
};