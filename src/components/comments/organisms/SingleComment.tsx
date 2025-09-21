import React from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { getComment } from '../../../services/blog/blog.service';
import type { SingleCommentProps, PostComment } from '../types';
import { LoadingSpinner, ErrorMessage } from '../atoms';
import { CommentHeader, CommentContent, CommentActions } from '../molecules';

export const SingleComment: React.FC<SingleCommentProps> = ({ commentId }) => {
  const { data, loading, error } = useFetch<PostComment>(() => getComment(commentId), [commentId]);

  if (loading) return (
    <div className="flex items-center justify-center py-4">
      <LoadingSpinner size="medium" />
      <span className="ml-3 text-gray-600">Cargando comentario...</span>
    </div>
  );

  if (error) return (
    <ErrorMessage message="Error al cargar el comentario" />
  );

  if (!data) return (
    <div className="text-center py-4">
      <p className="text-gray-500">📭 No se encontró el comentario</p>
    </div>
  );

  return (
    <div className="border p-3 rounded-lg">
      <CommentHeader 
        author={data.autor.usuario_unico}
        createdAt={data.creado_en}
        size="medium"
      />
      <div className="mt-3">
        <CommentContent 
          content={data.contenido}
          size="medium"
        />
      </div>
    </div>
  );
};
