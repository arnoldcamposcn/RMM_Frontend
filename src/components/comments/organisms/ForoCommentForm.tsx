import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { TextArea } from '../atoms/TextArea';

interface ForoCommentFormProps {
  temaId: number;
  parentId?: number;
  onCommentAdded: (comment: any) => void;
  placeholder?: string;
  loading?: boolean;
}

export const ForoCommentForm: React.FC<ForoCommentFormProps> = ({
  temaId,
  parentId,
  onCommentAdded,
  placeholder = "Escribe tu comentario...",
  loading = false
}) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      await onCommentAdded({
        tema: temaId,
        contenido: content.trim(),
        parent: parentId || ""
      });
      
      setContent(''); // Limpiar formulario
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <TextArea
        value={content}
        onChange={setContent}
        placeholder={placeholder}
        rows={4}
        disabled={loading || isSubmitting}
      />
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {content.length > 0 && `${content.length} caracteres`}
        </div>
        
        <div className="flex items-center space-x-2">
          {content.trim() && (
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={handleCancel}
              disabled={loading || isSubmitting}
            >
              Cancelar
            </Button>
          )}
          
          <Button
            type="submit"
            size="small"
            disabled={!content.trim() || loading || isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        </div>
      </div>
    </form>
  );
};
