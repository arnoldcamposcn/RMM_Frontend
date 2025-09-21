import React from 'react';
import { ForoCommentForm } from '../comments/organisms/ForoCommentForm';
import { useForoComments } from '../comments/hooks/useForoComments';

interface ForoInlineCommentFormProps {
  temaId: number;
  onCommentAdded?: () => void;
  onCancel?: () => void;
}

export const ForoInlineCommentForm: React.FC<ForoInlineCommentFormProps> = ({
  temaId,
  onCommentAdded,
  onCancel
}) => {
  const { createComment, loading } = useForoComments(temaId);

  const handleCommentAdded = async (commentData: any) => {
    try {
      await createComment(commentData.contenido, commentData.parent);
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 border-t-0 rounded-t-none">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-700">
            Escribe tu respuesta
          </h4>
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Cancelar"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <ForoCommentForm
          temaId={temaId}
          onCommentAdded={handleCommentAdded}
          placeholder="Comparte tu opinión sobre este tema..."
          loading={loading}
        />
      </div>
    </div>
  );
};
