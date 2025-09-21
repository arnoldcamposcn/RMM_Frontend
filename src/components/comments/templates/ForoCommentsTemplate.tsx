import React from 'react';
import { useForoComments } from '../hooks/useForoComments';
import { ForoCommentThread } from '../organisms/ForoCommentThread';
import { ForoCommentForm } from '../organisms/ForoCommentForm';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { ErrorMessage } from '../atoms/ErrorMessage';
import { EmptyState } from '../atoms/EmptyState';
import { useCurrentUser } from '../../../hooks/useCurrentUser';

interface ForoCommentsTemplateProps {
  temaId: number;
}

export const ForoCommentsTemplate: React.FC<ForoCommentsTemplateProps> = ({ temaId }) => {
  const {
    comments,
    loading,
    error,
    commentLikes,
    commentState,
    createComment,
    updateComment,
    deleteComment,
    toggleCommentLike,
    startEdit,
    cancelEdit,
    startReply,
    cancelReply
  } = useForoComments(temaId);

  const { isOwner } = useCurrentUser();

  const handleCommentAdded = async (commentData: any) => {
    try {
      await createComment(commentData.contenido, commentData.parent);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEditComment = async (commentId: number, content: string) => {
    try {
      await updateComment(commentId, content);
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      try {
        await deleteComment(commentId);
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };

  const handleReply = async (parentId: number, content: string) => {
    try {
      await createComment(content, parentId);
    } catch (error) {
      console.error('Error replying to comment:', error);
    }
  };

  if (loading && comments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
          <span className="mr-2">💬</span>
          Comentarios del Tema
        </h3>
        <div className="flex justify-center py-8">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
          <span className="mr-2">💬</span>
          Comentarios del Tema
        </h3>
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
        <span className="mr-2">💬</span>
        Comentarios del Tema
        {comments.length > 0 && (
          <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {comments.length}
          </span>
        )}
      </h3>

      {/* Formulario para agregar comentario */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="text-md font-medium text-gray-900 mb-3">Agregar comentario</h4>
        <ForoCommentForm
          temaId={temaId}
          onCommentAdded={handleCommentAdded}
          placeholder="Comparte tus pensamientos sobre este tema..."
          loading={loading}
        />
      </div>

      {/* Lista de comentarios */}
      {comments.length === 0 ? (
        <EmptyState
          title="No hay comentarios aún"
          description="Sé el primero en comentar este tema"
          icon="💭"
        />
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <ForoCommentThread
              key={comment.id}
              comment={comment}
              commentLikes={commentLikes}
              commentState={commentState}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
              onReply={handleReply}
              onToggleLike={toggleCommentLike}
              onStartEdit={startEdit}
              onCancelEdit={cancelEdit}
              onStartReply={startReply}
              onCancelReply={cancelReply}
              isCurrentUserAuthor={isOwner}
              loading={loading}
            />
          ))}
        </div>
      )}

      {/* Loading overlay para operaciones */}
      {loading && comments.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <LoadingSpinner size="medium" />
            <p className="text-sm text-gray-600 mt-2">Procesando...</p>
          </div>
        </div>
      )}
    </div>
  );
};
