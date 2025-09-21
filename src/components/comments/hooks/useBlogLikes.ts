import { useState, useEffect } from 'react';
import { toggleLike, getBlogLikes } from '../../../services/blog/blog.service';
import type { BlogLikesState } from '../types';

export const useBlogLikes = (blogId: number) => {
  const [likesState, setLikesState] = useState<BlogLikesState>({
    isBlogLiked: false,
    likesCount: 0,
    isLikingBlog: false
  });

  // Cargar información de likes del blog al montar el componente
  useEffect(() => {
    const fetchBlogLikes = async () => {
      try {
        const likesData = await getBlogLikes(blogId);
        setLikesState(prev => ({
          ...prev,
          isBlogLiked: likesData.user_liked,
          likesCount: likesData.total_likes
        }));
      } catch (error) {
        console.error("Error al cargar likes del blog:", error);
      }
    };

    fetchBlogLikes();
  }, [blogId]);

  // Función para manejar el like del blog
  const handleToggleLike = async () => {
    if (likesState.isLikingBlog) return; // Evitar múltiples clicks
    
    setLikesState(prev => ({ ...prev, isLikingBlog: true }));
    
    try {
      await toggleLike(blogId);
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
