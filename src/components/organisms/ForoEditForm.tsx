import React, { useState } from 'react';
import type { CreateForo, CategoriaForo, Foro } from '../../schema/foro/foro';
import { Button } from '../atoms/Button';
import { TextArea } from '../comments/atoms/TextArea';
import { LoadingSpinner } from '../comments/atoms/LoadingSpinner';

interface ForoEditFormProps {
  foro: Foro;
  categorias: CategoriaForo[];
  onSave: (foroId: number, foroData: Partial<CreateForo>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const ForoEditForm: React.FC<ForoEditFormProps> = ({
  foro,
  categorias,
  onSave,
  onCancel,
  loading = false
}) => {
  const [formData, setFormData] = useState<Partial<CreateForo>>({
    titulo: foro.titulo,
    contenido: foro.contenido,
    // imagen: foro.imagen || '',
    categoria_foro_id: foro.categoria_foro.id
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo?.trim() || !formData.contenido?.trim()) {
      setError('El título y contenido son obligatorios');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSave(foro.id, formData);
    } catch (err) {
      setError('Error al actualizar el tema');
      console.error('Error updating foro:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof CreateForo, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-2 border-blue-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">✏️</span>
        Editar Tema
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título */}
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
            Título *
          </label>
          <input
            id="titulo"
            type="text"
            value={formData.titulo || ''}
            onChange={(e) => handleChange('titulo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Escribe el título del tema..."
            disabled={loading || isSubmitting}
          />
        </div>

        {/* Categoría */}
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
            Categoría *
          </label>
          <select
            id="categoria"
            value={formData.categoria_foro_id || ''}
            onChange={(e) => handleChange('categoria_foro_id', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading || isSubmitting}
          >
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre_categoria}
              </option>
            ))}
          </select>
        </div>

        {/* Contenido */}
        <div>
          <label htmlFor="contenido" className="block text-sm font-medium text-gray-700 mb-1">
            Contenido *
          </label>
          <TextArea
            value={formData.contenido || ''}
            onChange={(value: string) => handleChange('contenido', value)}
            placeholder="Describe tu tema en detalle..."
            rows={6}
            disabled={loading || isSubmitting}
          />
        </div>


        {/* Error */}
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        {/* Botones */}
        <div className="flex items-center space-x-3 pt-4">
          <Button
            type="submit"
            disabled={loading || isSubmitting || !formData.titulo?.trim() || !formData.contenido?.trim()}
            className="flex-1"
          >
            {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
          
          <button
            type="button"
            onClick={onCancel}
            disabled={loading || isSubmitting}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancelar
          </button>
        </div>

        {/* Loading spinner */}
        {isSubmitting && (
          <div className="flex justify-center mt-2">
            <LoadingSpinner size="small" />
          </div>
        )}
      </form>
    </div>
  );
};
