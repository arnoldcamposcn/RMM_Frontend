import React, { useState } from 'react';
import type { CreateForo, CategoriaForo } from '../../schema/foro/foro';
import { Button } from '../atoms/Button';
import { TextArea } from '../comments/atoms/TextArea';
import { LoadingSpinner } from '../comments/atoms/LoadingSpinner';

interface ForoFormProps {
  onForoCreated: (foroData: CreateForo) => Promise<void>;
  categorias: CategoriaForo[];
  categoriasLoading?: boolean;
}

export const ForoForm: React.FC<ForoFormProps> = ({ onForoCreated, categorias, categoriasLoading = false }) => {
  const [formData, setFormData] = useState<CreateForo>({
    titulo: '',
    contenido: '',
    imagen: '',
    categoria_foro_id: categorias[0]?.id || 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo.trim() || !formData.contenido.trim()) {
      setError('El título y contenido son obligatorios');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Solo pasar los datos al componente padre, no crear el foro aquí
      await onForoCreated(formData);
      
      // Limpiar formulario
      setFormData({
        titulo: '',
        contenido: '',
        imagen: '',
        categoria_foro_id: categorias[0]?.id || 1
      });
    } catch (err) {
      setError('Error al crear el tema del foro');
      console.error('Error creating foro:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof CreateForo, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Crear Nuevo Tema
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
            value={formData.titulo}
            onChange={(e) => handleChange('titulo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Escribe el título del tema..."
            disabled={loading}
          />
        </div>

        {/* Categoría */}
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
            Categoría *
          </label>
          {categoriasLoading ? (
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center">
              <LoadingSpinner size="small" />
              <span className="ml-2 text-sm text-gray-600">Cargando categorías...</span>
            </div>
          ) : (
            <select
              id="categoria"
              value={formData.categoria_foro_id}
              onChange={(e) => handleChange('categoria_foro_id', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            >
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre_categoria}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Contenido */}
        <div>
          <label htmlFor="contenido" className="block text-sm font-medium text-gray-700 mb-1">
            Contenido *
          </label>
          <TextArea
            value={formData.contenido}
            onChange={(value: string) => handleChange('contenido', value)}
            placeholder="Describe tu tema en detalle..."
            rows={6}
            disabled={loading}
          />
        </div>

        {/* Imagen (opcional) */}
        <div>
          <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-1">
            URL de Imagen (opcional)
          </label>
          <input
            id="imagen"
            type="url"
            value={formData.imagen}
            onChange={(e) => handleChange('imagen', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://ejemplo.com/imagen.jpg"
            disabled={loading}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        {/* Botón de envío */}
        <Button
          type="submit"
          disabled={loading || !formData.titulo.trim() || !formData.contenido.trim()}
          className="w-full"
        >
          {loading ? 'Creando...' : 'Crear Tema'}
        </Button>
      </form>
    </div>
  );
};
