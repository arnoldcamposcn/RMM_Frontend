import { useState, useEffect } from 'react';
import { getArticleLikes, toggleArticleLike } from '../../../services/articles/article-likes.service';
import type { BlogLikesState } from '../types';

export const useArticleLikes = (articleId: number) => {
  const [likesState, setLikesState] = useState<BlogLikesState>({
    isBlogLiked: false,
    likesCount: 0,
    isLikingBlog: false
  });

  // Cargar información de likes del artículo al montar el componente
  useEffect(() => {
    const fetchArticleLikes = async () => {
      try {
        const likesData = await getArticleLikes(articleId);
        setLikesState(prev => ({
          ...prev,
          isBlogLiked: likesData.user_liked,
          likesCount: likesData.total_likes
        }));
      } catch (error) {
        console.error("Error al cargar likes del artículo:", error);
      }
    };

    fetchArticleLikes();
  }, [articleId]);

  // Función para manejar el like del artículo
  const handleToggleLike = async () => {
    if (likesState.isLikingBlog) return; // Evitar múltiples clicks
    
    setLikesState(prev => ({ ...prev, isLikingBlog: true }));
    
    try {
      await toggleArticleLike(articleId);
      // Actualizar estado local inmediatamente para feedback visual
      setLikesState(prev => ({
        ...prev,
        isBlogLiked: !prev.isBlogLiked,
        likesCount: prev.isBlogLiked ? prev.likesCount - 1 : prev.likesCount + 1,
        isLikingBlog: false
      }));
    } catch (error) {
      console.error("Error al hacer toggle del like:", error);
      // Revertir cambios en caso de error
      setLikesState(prev => ({
        ...prev,
        isLikingBlog: false
      }));
    }
  };

  return {
    likesState,
    handleToggleLike
  };
};
