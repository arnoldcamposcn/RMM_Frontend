import { useState, useEffect } from 'react';
import { 
  getForo, 
  createForo, 
  getForoById,
  updateForo as updateForoService,
  deleteForo,
  getForoLikesList,
  toggleForoLike,
  getForoCommentsByTema
} from '../../../services/foro/foro.service';
import type { Foro, CreateForo, ForoLikes } from '../../../schema/foro/foro';

export const useForo = () => {
  const [foros, setForos] = useState<Foro[]>([]);
  const [selectedForo, setSelectedForo] = useState<Foro | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState<Record<number, ForoLikes>>({});

  // Cargar todos los temas del foro
  const loadForos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const forosData = await getForo();
      setForos(forosData);
    } catch (err) {
      setError('Error al cargar los temas del foro');
      console.error('Error loading foros:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar un tema específico
  const loadForoById = async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const foroData = await getForoById(id);
      setSelectedForo(foroData);
      
      // Cargar likes del tema
      await loadForoLikes(id);
      
      return foroData;
    } catch (err) {
      setError('Error al cargar el tema del foro');
      console.error('Error loading foro by id:', err);
    } finally {
      setLoading(false);
    }
  };

  // Crear nuevo tema
  const createNewForo = async (foroData: CreateForo) => {
    setLoading(true);
    setError(null);
    
    try {
      const newForo = await createForo(foroData);
      
      // Agregar el nuevo foro a la lista sin recargar likes innecesariamente
      setForos(prev => [newForo, ...prev]);
      
      // Cargar likes solo para el nuevo foro
      await loadForoLikes(newForo.id);
      
      return newForo;
    } catch (err) {
      setError('Error al crear el tema del foro');
      console.error('Error creating foro:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cargar likes de un tema
  const loadForoLikes = async (foroId: number) => {
    try {
      const likesData = await getForoLikesList(foroId);
      setLikes(prev => ({
        ...prev,
        [foroId]: likesData
      }));
    } catch (err) {
      console.error('Error loading foro likes:', err);
    }
  };

  // Toggle like de un tema
  const toggleForoLikes = async (foroId: number) => {
    try {
      await toggleForoLike(foroId);
      
      // Actualizar estado local
      setLikes(prev => {
        const currentLikes = prev[foroId];
        if (currentLikes) {
          return {
            ...prev,
            [foroId]: {
              ...currentLikes,
              user_liked: !currentLikes.user_liked,
              total_likes: currentLikes.user_liked 
                ? currentLikes.total_likes - 1 
                : currentLikes.total_likes + 1
            }
          };
        }
        return prev;
      });

      // Actualizar en la lista de foros
      setForos(prev => prev.map(foro => {
        if (foro.id === foroId) {
          const currentLikes = likes[foroId];
          if (currentLikes) {
            return {
              ...foro,
              likes_count: currentLikes.user_liked 
                ? currentLikes.total_likes - 1 
                : currentLikes.total_likes + 1
            };
          }
        }
        return foro;
      }));
    } catch (err) {
      setError('Error al actualizar el like');
      console.error('clicck desde aquie:', err);
    }
  };

  // Cargar comentarios de un tema
  const loadForoComments = async (foroId: number) => {
    try {
      const comments = await getForoCommentsByTema(foroId);
      return comments;
    } catch (err) {
      console.error('Error loading foro comments:', err);
      return [];
    }
  };

  // Actualizar tema del foro
  const updateForo = async (foroId: number, foroData: Partial<CreateForo>) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedForo = await updateForoService(foroId, foroData);
      
      // Actualizar el tema en la lista
      setForos(prev => prev.map(foro => 
        foro.id === foroId ? updatedForo : foro
      ));
      
      // Si es el tema seleccionado, actualizarlo también
      if (selectedForo?.id === foroId) {
        setSelectedForo(updatedForo);
      }
      
      return updatedForo;
    } catch (err) {
      setError('Error al actualizar el tema del foro');
      console.error('Error updating foro:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar tema del foro
  const removeForo = async (foroId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      await deleteForo(foroId);
      
      // Remover el tema de la lista
      setForos(prev => prev.filter(foro => foro.id !== foroId));
      
      // Si es el tema seleccionado, limpiarlo
      if (selectedForo?.id === foroId) {
        setSelectedForo(null);
      }
      
      // Remover likes del tema eliminado
      setLikes(prev => {
        const newLikes = { ...prev };
        delete newLikes[foroId];
        return newLikes;
      });
      
    } catch (err) {
      setError('Error al eliminar el tema del foro');
      console.error('Error deleting foro:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cargar likes de todos los temas
  const loadAllForoLikes = async () => {
    const promises = foros.map(foro => loadForoLikes(foro.id));
    await Promise.all(promises);
  };

  // Efecto para cargar foros al montar
  useEffect(() => {
    loadForos();
  }, []);

  // Efecto para cargar likes solo en la carga inicial
  useEffect(() => {
    if (foros.length > 0 && Object.keys(likes).length === 0) {
      // Solo cargar likes si no hay likes cargados previamente
      loadAllForoLikes();
    }
  }, [foros]);

  return {
    // Estado
    foros,
    selectedForo,
    loading,
    error,
    likes,
    
    // Acciones
    loadForos,
    loadForoById,
    createNewForo,
    updateForo,
    removeForo,
    loadForoLikes,
    toggleForoLikes,
    loadForoComments,
    setSelectedForo,
    setError
  };
};
