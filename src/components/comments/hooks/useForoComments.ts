import React, { useState, useEffect } from 'react';
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
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  // Estado para edición y respuestas
  const [commentState, setCommentState] = useState<Record<number, 'viewing' | 'editing' | 'replying'>>({});

  // Cargar comentarios del tema
  const loadComments = React.useCallback(async (forceReload = false) => {
    if (!temaId) return;
    
    // Evitar cargar si ya están cargados y no se fuerza la recarga
    if (commentsLoaded && !forceReload) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const commentsData = await getForoCommentsByTema(temaId);
      setComments(commentsData);
      setCommentsLoaded(true);
      
      // Solo cargar likes si hay comentarios y no se han cargado antes
      if (commentsData.length > 0) {
        await loadAllCommentLikes(commentsData);
      }
    } catch (err) {
      setError('Error al cargar los comentarios');
      console.error('Error loading foro comments:', err);
    } finally {
      setLoading(false);
    }
  }, [temaId, commentsLoaded]);

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

  // Cargar likes de todos los comentarios (solo los que no están cargados)
  const loadAllCommentLikes = async (commentsList: ComentarioForo[]) => {
    const allComments = flattenComments(commentsList);
    // Solo cargar likes de comentarios que no están ya cargados
    const commentsToLoad = allComments.filter(comment => !commentLikes[comment.id]);
    
    if (commentsToLoad.length > 0) {
      const promises = commentsToLoad.map(comment => loadCommentLikes(comment.id));
      await Promise.all(promises);
    }
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
        parent: parentId || "" // Enviar cadena vacía en lugar de null para comentarios principales
      };
      
      const newComment = await createForoComment(commentData);
      
      // Forzar recarga para obtener el nuevo comentario
      await loadComments(true);
      
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
      
      // Actualizar solo el comentario específico en lugar de recargar todo
      setComments(prev => {
        const updateCommentInList = (commentList: ComentarioForo[]): ComentarioForo[] => {
          return commentList.map(comment => {
            if (comment.id === commentId) {
              return { ...comment, contenido: content };
            }
            
            if (comment.respuestas && comment.respuestas.length > 0) {
              return {
                ...comment,
                respuestas: updateCommentInList(comment.respuestas)
              };
            }
            
            return comment;
          });
        };
        
        return updateCommentInList(prev);
      });
      
      // Cancelar estado de edición
      setCommentState(prev => ({ ...prev, [commentId]: 'viewing' }));
      
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
      
      // Eliminar solo el comentario específico en lugar de recargar todo
      setComments(prev => {
        const removeCommentFromList = (commentList: ComentarioForo[]): ComentarioForo[] => {
          return commentList.filter(comment => {
            // Si es el comentario a eliminar, no lo incluir
            if (comment.id === commentId) {
              return false;
            }
            
            // Si tiene respuestas, filtrar recursivamente
            if (comment.respuestas && comment.respuestas.length > 0) {
              return {
                ...comment,
                respuestas: removeCommentFromList(comment.respuestas)
              };
            }
            
            return true;
          });
        };
        
        return removeCommentFromList(prev);
      });
      
      // Limpiar estados relacionados al comentario eliminado
      setCommentLikes(prev => {
        const newLikes = { ...prev };
        delete newLikes[commentId];
        return newLikes;
      });
      
      setCommentState(prev => {
        const newState = { ...prev };
        delete newState[commentId];
        return newState;
      });
      
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

  // Resetear estado cuando cambia temaId
  useEffect(() => {
    setComments([]);
    setCommentLikes({});
    setCommentsLoaded(false);
    setCommentState({});
    setError(null);
  }, [temaId]);

  // Cargar comentarios al montar o cambiar temaId
  useEffect(() => {
    if (temaId) {
      loadComments();
    }
  }, [temaId, loadComments]);

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
