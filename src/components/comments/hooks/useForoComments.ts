import { useState, useEffect } from 'react';
import { 
  getForoCommentsByTema,
  createForoComment,
  updateForoComment,
  deleteForoComment,
  getForoCommentsLikesList,
  toggleForoCommentsLike
} from '../../../services/foro/foro.service';
import type { ComentarioForo, CreateForoComment, ForoCommentLikes } from '../../../schema/foro/foro';

export const useForoComments = (temaId: number) => {
  const [comments, setComments] = useState<ComentarioForo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commentLikes, setCommentLikes] = useState<Record<number, ForoCommentLikes>>({});

  // Estado para edición y respuestas
  const [commentState, setCommentState] = useState<Record<number, 'viewing' | 'editing' | 'replying'>>({});

  // Cargar comentarios del tema
  const loadComments = async () => {
    if (!temaId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const commentsData = await getForoCommentsByTema(temaId);
      setComments(commentsData);
      
      // Cargar likes de todos los comentarios
      await loadAllCommentLikes(commentsData);
    } catch (err) {
      setError('Error al cargar los comentarios');
      console.error('Error loading foro comments:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar likes de un comentario
  const loadCommentLikes = async (commentId: number) => {
    try {
      const likesData = await getForoCommentsLikesList(commentId);
      setCommentLikes(prev => ({
        ...prev,
        [commentId]: likesData
      }));
    } catch (err) {
      console.error('Error loading comment likes:', err);
    }
  };

  // Cargar likes de todos los comentarios
  const loadAllCommentLikes = async (commentsList: ComentarioForo[]) => {
    const allComments = flattenComments(commentsList);
    const promises = allComments.map(comment => loadCommentLikes(comment.id));
    await Promise.all(promises);
  };

  // Aplanar comentarios recursivamente para obtener todos los comentarios
  const flattenComments = (comments: ComentarioForo[]): ComentarioForo[] => {
    const result: ComentarioForo[] = [];
    
    const flatten = (commentList: ComentarioForo[]) => {
      commentList.forEach(comment => {
        result.push(comment);
        if (comment.respuestas && comment.respuestas.length > 0) {
          flatten(comment.respuestas);
        }
      });
    };
    
    flatten(comments);
    return result;
  };

  // Crear nuevo comentario
  const createComment = async (content: string, parentId?: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const commentData: CreateForoComment = {
        tema: temaId,
        contenido: content,
        parent: parentId || null
      };
      
      const newComment = await createForoComment(commentData);
      
      // Recargar comentarios para obtener la estructura actualizada
      await loadComments();
      
      return newComment;
    } catch (err) {
      setError('Error al crear el comentario');
      console.error('Error creating foro comment:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar comentario
  const updateComment = async (commentId: number, content: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await updateForoComment(commentId, { contenido: content });
      await loadComments(); // Recargar para obtener datos actualizados
    } catch (err) {
      setError('Error al actualizar el comentario');
      console.error('Error updating foro comment:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar comentario
  const deleteComment = async (commentId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      await deleteForoComment(commentId);
      await loadComments(); // Recargar para obtener datos actualizados
    } catch (err) {
      setError('Error al eliminar el comentario');
      console.error('Error deleting foro comment:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Toggle like de comentario
  const toggleCommentLike = async (commentId: number) => {
    try {
      await toggleForoCommentsLike(commentId);
      
      // Actualizar estado local
      setCommentLikes(prev => {
        const currentLikes = prev[commentId];
        if (currentLikes) {
          return {
            ...prev,
            [commentId]: {
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

      // Actualizar en la lista de comentarios
      setComments(prev => {
        const updateCommentLikes = (commentList: ComentarioForo[]): ComentarioForo[] => {
          return commentList.map(comment => {
            if (comment.id === commentId) {
              const currentLikes = commentLikes[commentId];
              if (currentLikes) {
                return {
                  ...comment,
                  likes_count: currentLikes.user_liked 
                    ? currentLikes.total_likes - 1 
                    : currentLikes.total_likes + 1
                };
              }
              return comment;
            }
            
            if (comment.respuestas && comment.respuestas.length > 0) {
              return {
                ...comment,
                respuestas: updateCommentLikes(comment.respuestas)
              };
            }
            
            return comment;
          });
        };
        
        return updateCommentLikes(prev);
      });
    } catch (err) {
      setError('Error al actualizar el like del comentario');
      console.error('Error toggling comment like:', err);
    }
  };

  // Funciones de estado de comentarios
  const startEdit = (commentId: number) => {
    setCommentState(prev => ({ ...prev, [commentId]: 'editing' }));
  };

  const cancelEdit = (commentId: number) => {
    setCommentState(prev => ({ ...prev, [commentId]: 'viewing' }));
  };

  const startReply = (commentId: number) => {
    setCommentState(prev => ({ ...prev, [commentId]: 'replying' }));
  };

  const cancelReply = (commentId: number) => {
    setCommentState(prev => ({ ...prev, [commentId]: 'viewing' }));
  };

  // Cargar comentarios al montar o cambiar temaId
  useEffect(() => {
    if (temaId) {
      loadComments();
    }
  }, [temaId]);

  return {
    // Estado
    comments,
    loading,
    error,
    commentLikes,
    commentState,
    
    // Acciones
    loadComments,
    createComment,
    updateComment,
    deleteComment,
    toggleCommentLike,
    startEdit,
    cancelEdit,
    startReply,
    cancelReply,
    setCommentState,
    setError
  };
};
