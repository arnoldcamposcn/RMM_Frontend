import React from 'react';
import type { BlogCommentsListProps } from '../types';
import { useComments } from '../hooks';
import { LoadingSpinner, ErrorMessage, EmptyState, Button } from '../atoms';
import { CommentForm, CommentThread } from '../organisms';
import RequireAuth from '../../../hooks/RequireAuth';


export const CommentsTemplate: React.FC<BlogCommentsListProps> = ({ blogId }) => {
  const {
    comments,
    loading,
    error,
    // refetch, // No se usa directamente
    // currentUser, // No se usa directamente
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
  } = useComments(blogId);

  // Los likes ahora se manejan en ContentSection

  // Estados de carga
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-azul-codea" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Comentarios
        </h3>
        <div className="flex items-center justify-center py-6">
          <LoadingSpinner size="medium" />
          <span className="ml-3 text-gray-600">Cargando comentarios...</span>
        </div>
      </div>
    );
  }

  // Estados de error
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Comentarios
        </h3>
        <ErrorMessage 
          message="Error al cargar los comentarios" 
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  // Estado vacío
  if (!comments || comments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
          <svg className="w-5 h-5 mr-2 text-azul-codea" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Comentarios
        </h3>
        
        <EmptyState
          title="No hay comentarios aún"
          description="Sé el primero en comentar este blog"
        >
          {/* Formulario para agregar el primer comentario */}
          <RequireAuth>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Agregar comentario</h4>
            <CommentForm
              blogId={blogId}
              parentId={null}
              onCommentAdded={() => handleCommentAdded()}
              placeholder="Escribe el primer comentario..."
            />
          </div>
          </RequireAuth>
        </EmptyState>
      </div>
    );
  }

  // Estado con comentarios
  return (
    <div className="bg-white rounded-lg shadow-sm p-2 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <svg className="w-5 h-5 mr-2 text-azul-codea" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Comentarios del blog
          <span className="ml-3 bg-azul-codea text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
            {flattenComments(comments).length}
          </span>
        </h3>
      </div>

      {/* Formulario para nuevos comentarios principales */}
      <RequireAuth>
      <div className="mb-6 pt-6 border-t border-gray-200">
        <CommentForm
          blogId={blogId}
          parentId={null}
          onCommentAdded={() => handleCommentAdded()}
          placeholder="Escribe tu comentario..."
        />
      </div>
      </RequireAuth>
      {/* Lista de comentarios */}
      <div className="space-y-6">
        {organizeComments(getVisibleComments(comments)).map(({ parent }) => (
          <div key={parent.id} className="space-y-4">
            <CommentThread
              comment={parent}
              isCurrentUserAuthor={isCurrentUserAuthor}
              commentState={commentState}
              onStartEdit={handleStartEdit}
              onCancelEdit={handleCancelEdit}
              onSaveEdit={handleSaveEdit}
              onEditContentChange={(content) => setCommentState(prev => ({ ...prev, editContent: content }))}
              onDeleteComment={handleDeleteComment}
              onStartReply={handleStartReply}
              onCancelReply={handleCancelReply}
              onToggleReplies={toggleReplies}
              isCommentExpanded={isCommentExpanded}
              blogId={blogId}
              onCommentAdded={handleCommentAdded}
              size="medium"
              level={0}
            />
          </div>
        ))}
      </div>

      {/* Botón Ver más comentarios */}
      {hasMoreComments(comments) && (
        <div className="mt-6 text-center">
          <Button
            onClick={handleLoadMoreComments}
            variant="primary"
            size="large"
            className="inline-flex items-center px-6 py-3 bg-azul-codea hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Ver más comentarios
            <span className="ml-2 bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full">
              {getRemainingCommentsCount(comments)} restantes
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};
