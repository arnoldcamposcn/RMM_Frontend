import { useState, useEffect } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { getCommentsByBlogId, patchComment, deleteComment } from '../../../services/blog/blog.service';
import { getProfile } from '../../../store/features/profile/profile.service';
import type { PostComment, Profile, CommentState } from '../types';

export const useComments = (blogId: number) => {
  const { data: comments, loading, error, refetch } = useFetch<PostComment[]>(
    () => getCommentsByBlogId(blogId),
    [blogId]
  );

  const { data: currentUser } = useFetch<Profile>(getProfile, []);

  const [commentState, setCommentState] = useState<CommentState>({
    editingCommentId: null,
    editContent: '',
    isUpdating: false,
    isDeleting: null,
    replyingToCommentId: null,
    expandedComments: new Set(),
    visibleCommentsCount: 3
  });

  // Función para verificar si el usuario actual es el autor del comentario
  const isCurrentUserAuthor = (comment: PostComment): boolean => {
    if (!currentUser) return false;
    return currentUser.usuario_unico === comment.autor.usuario_unico;
  };

  // Función para iniciar edición
  const handleStartEdit = (comment: PostComment) => {
    setCommentState(prev => ({
      ...prev,
      editingCommentId: comment.id,
      editContent: comment.contenido
    }));
  };

  // Función para cancelar edición
  const handleCancelEdit = () => {
    setCommentState(prev => ({
      ...prev,
      editingCommentId: null,
      editContent: ''
    }));
  };

  // Función para guardar edición
  const handleSaveEdit = async (commentId: number) => {
    try {
      setCommentState(prev => ({ ...prev, isUpdating: true }));
      await patchComment(commentId, { 
        id: commentId, 
        contenido: commentState.editContent,
        creado_en: new Date().toISOString(),
        autor: { id: 0, email: "", usuario_unico: "" }
      });
      setCommentState(prev => ({
        ...prev,
        editingCommentId: null,
        editContent: '',
        isUpdating: false
      }));
      refetch(); // Recargar comentarios
    } catch (error) {
      console.error("Error al editar comentario:", error);
      alert("Error al editar el comentario");
      setCommentState(prev => ({ ...prev, isUpdating: false }));
    }
  };

  // Función para eliminar comentario
  const handleDeleteComment = async (commentId: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este comentario?")) {
      return;
    }

    try {
      setCommentState(prev => ({ ...prev, isDeleting: commentId }));
      await deleteComment(commentId);
      refetch(); // Recargar comentarios
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
      alert("Error al eliminar el comentario");
    } finally {
      setCommentState(prev => ({ ...prev, isDeleting: null }));
    }
  };

  // Función para iniciar respuesta
  const handleStartReply = (commentId: number) => {
    setCommentState(prev => ({
      ...prev,
      replyingToCommentId: commentId
    }));
  };

  // Función para cancelar respuesta
  const handleCancelReply = () => {
    setCommentState(prev => ({
      ...prev,
      replyingToCommentId: null
    }));
  };

  // Función para alternar la visualización de respuestas
  const toggleReplies = (commentId: number) => {
    setCommentState(prev => ({
      ...prev,
      expandedComments: new Set(prev.expandedComments).has(commentId)
        ? new Set([...prev.expandedComments].filter(id => id !== commentId))
        : new Set([...prev.expandedComments, commentId])
    }));
  };

  // Función para verificar si un comentario está expandido
  const isCommentExpanded = (commentId: number): boolean => {
    return commentState.expandedComments.has(commentId);
  };

  // Función para cargar más comentarios
  const handleLoadMoreComments = () => {
    setCommentState(prev => ({
      ...prev,
      visibleCommentsCount: prev.visibleCommentsCount + 3
    }));
  };

  // Función para obtener los comentarios visibles
  const getVisibleComments = (comments: PostComment[]): PostComment[] => {
    return comments.slice(0, commentState.visibleCommentsCount);
  };

  // Función para verificar si hay más comentarios por mostrar
  const hasMoreComments = (comments: PostComment[]): boolean => {
    return comments.length > commentState.visibleCommentsCount;
  };

  // Función para obtener el número de comentarios restantes
  const getRemainingCommentsCount = (comments: PostComment[]): number => {
    return Math.max(0, comments.length - commentState.visibleCommentsCount);
  };

  // Función para manejar comentario agregado
  const handleCommentAdded = (parentId?: number) => {
    setCommentState(prev => ({
      ...prev,
      replyingToCommentId: null
    }));
    
    // Si se agregó una respuesta, expandir el comentario padre automáticamente
    if (parentId) {
      setCommentState(prev => ({
        ...prev,
        expandedComments: new Set([...prev.expandedComments, parentId])
      }));
    } else {
      // Si es un comentario principal nuevo, resetear el contador para mostrar todos los comentarios
      setCommentState(prev => ({
        ...prev,
        visibleCommentsCount: 3
      }));
    }
    
    refetch(); // Recargar comentarios
  };

  // Función para organizar comentarios en jerarquía completa
  const organizeComments = (comments: PostComment[]): { parent: PostComment; replies: PostComment[] }[] => {
    return comments.map(parent => ({
      parent,
      replies: parent.respuestas || []
    }));
  };

  // Función para aplanar comentarios anidados (para búsquedas y operaciones)
  const flattenComments = (comments: PostComment[]): PostComment[] => {
    const flattened: PostComment[] = [];
    
    const flatten = (commentList: PostComment[]) => {
      commentList.forEach(comment => {
        flattened.push(comment);
        if (comment.respuestas && comment.respuestas.length > 0) {
          flatten(comment.respuestas);
        }
      });
    };
    
    flatten(comments);
    return flattened;
  };

  return {
    comments,
    loading,
    error,
    refetch,
    currentUser,
    commentState,
    setCommentState,
    isCurrentUserAuthor,
    handleStartEdit,
    handleCancelEdit,
    handleSaveEdit,
    handleDeleteComment,
    handleStartReply,
    handleCancelReply,
    toggleReplies,
    isCommentExpanded,
    handleLoadMoreComments,
    getVisibleComments,
    hasMoreComments,
    getRemainingCommentsCount,
    handleCommentAdded,
    organizeComments,
    flattenComments
  };
};
