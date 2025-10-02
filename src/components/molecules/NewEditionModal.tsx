import React, { useState, useEffect } from 'react';
import type { CreateMagazine } from '../../schema/magazine/magazine';

interface EditingEdition {
  id: number;
  numero_edicion: number;
  titulo_edicion: string;
  contenido: string;
  imagen: string; // Para edición, la imagen existente es una URL
  fecha_publicacion: string;
  url_impresa: string;
}

interface NewEditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (edition: CreateMagazine) => void;
  editingEdition?: EditingEdition | null;
}

const NewEditionModal: React.FC<NewEditionModalProps> = ({ isOpen, onClose, onSave, editingEdition }) => {
  const [formData, setFormData] = useState<CreateMagazine>({
    numero_edicion: 1,
    titulo_edicion: '',
    contenido: '',
    imagen: null as any, // Inicializar como null, se convertirá a File
    fecha_publicacion: '',
    url_impresa: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Precargar datos cuando se está editando
  useEffect(() => {
    if (isOpen && editingEdition) {
      setFormData({
        numero_edicion: editingEdition.numero_edicion,
        titulo_edicion: editingEdition.titulo_edicion,
        contenido: editingEdition.contenido,
        imagen: null as any, // En edición, no cargamos archivo existente
        fecha_publicacion: editingEdition.fecha_publicacion,
        url_impresa: editingEdition.url_impresa
      });
      setImagePreview(editingEdition.imagen); // Mostrar imagen existente como preview
    } else if (isOpen && !editingEdition) {
      // Limpiar formulario para nueva edición
      setFormData({
        numero_edicion: 1,
        titulo_edicion: '',
        contenido: '',
        imagen: null as any,
        fecha_publicacion: '',
        url_impresa: ''
      });
      setImagePreview(null);
    }
  }, [isOpen, editingEdition]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Convertir numero_edicion a número
    const processedValue = name === 'numero_edicion' ? parseInt(value) || 1 : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imagen: file
      }));

      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      await onSave(formData);
      handleClose();
    } catch (error) {
      console.error('Error al guardar la edición:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      numero_edicion: 1,
      titulo_edicion: '',
      contenido: '',
      imagen: null as any,
      fecha_publicacion: '',
      url_impresa: ''
    });
    setIsSubmitting(false);
    setImagePreview(null);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header del modal */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xl">📘</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingEdition ? 'Editar Edición' : 'Nueva Edición'}
                </h3>
                <p className="text-sm text-gray-600">
                  {editingEdition 
                    ? 'Modificar los datos de la edición existente' 
                    : 'Crear una nueva edición de Meta Mining'
                  }
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Número de edición */}
            <div className="md:col-span-1">
              <label htmlFor="numero_edicion" className="block text-sm font-medium text-gray-700 mb-2">
                Número de edición *
              </label>
              <input
                type="number"
                id="numero_edicion"
                name="numero_edicion"
                value={formData.numero_edicion}
                onChange={handleInputChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: 1, 2, 3..."
              />
            </div>

            {/* Fecha de publicación */}
            <div className="md:col-span-1">
              <label htmlFor="fecha_publicacion" className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de publicación *
              </label>
              <input
                type="date"
                id="fecha_publicacion"
                name="fecha_publicacion"
                value={formData.fecha_publicacion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Título de edición */}
            <div className="md:col-span-2">
              <label htmlFor="titulo_edicion" className="block text-sm font-medium text-gray-700 mb-2">
                Título de edición *
              </label>
              <input
                type="text"
                id="titulo_edicion"
                name="titulo_edicion"
                value={formData.titulo_edicion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Meta Mining: La Revolución Digital en la Minería"
              />
            </div>

            {/* Contenido */}
            <div className="md:col-span-2">
              <label htmlFor="contenido" className="block text-sm font-medium text-gray-700 mb-2">
                Contenido *
              </label>
              <textarea
                id="contenido"
                name="contenido"
                value={formData.contenido}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contenido completo de la edición..."
              />
            </div>

            {/* Imagen */}
            <div className="md:col-span-1">
              <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-2">
                Imagen de portada *
              </label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                onChange={handleImageChange}
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Formatos: JPG, PNG, GIF, WebP
              </p>
              
              {/* Preview de la imagen */}
              
              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md border border-gray-200"
                  />
                </div>
              )}
            </div>

            {/* URL versión impresa */}
            <div className="md:col-span-1">
              <label htmlFor="url_impresa" className="block text-sm font-medium text-gray-700 mb-2">
                URL versión impresa *
              </label>
              <input
                type="url"
                id="url_impresa"
                name="url_impresa"
                value={formData.url_impresa}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://ejemplo.com/version-impresa.pdf"
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting 
                ? (editingEdition ? 'Actualizando...' : 'Guardando...') 
                : (editingEdition ? 'Actualizar' : 'Guardar')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEditionModal;
