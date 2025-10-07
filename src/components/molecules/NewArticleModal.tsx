import React, { useState, useEffect } from 'react';
import type { ArticleCreate } from '../../schema/article/article';

interface EditingArticle {
  id: number;
  titulo_articulo: string;
  contenido: string;
  imagen_principal: string; // Para edición, la imagen existente es una URL
  banner: string; // Para edición, el banner existente es una URL
  fecha_publicacion: string;
  categoria_articulo: number;
}

interface NewArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: ArticleCreate) => void;
  editingArticle?: EditingArticle | null;
}

const NewArticleModal: React.FC<NewArticleModalProps> = ({ isOpen, onClose, onSave, editingArticle }) => {
  const [formData, setFormData] = useState<ArticleCreate>({
    titulo_articulo: '',
    contenido: '',
    imagen_principal: null as any, // Inicializar como null, se convertirá a File
    banner: null as any, // Inicializar como null, se convertirá a File
    fecha_publicacion: '',
    categoria_articulo: 1
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  // Precargar datos cuando se está editando
  useEffect(() => {
    if (isOpen && editingArticle) {
      setFormData({
        titulo_articulo: editingArticle.titulo_articulo,
        contenido: editingArticle.contenido,
        imagen_principal: null as any, // En edición, no cargamos archivo existente
        banner: null as any, // En edición, no cargamos archivo existente
        fecha_publicacion: editingArticle.fecha_publicacion,
        categoria_articulo: editingArticle.categoria_articulo
      });
      setImagePreview(editingArticle.imagen_principal); // Mostrar imagen existente como preview
      setBannerPreview(editingArticle.banner); // Mostrar banner existente como preview
    } else if (isOpen && !editingArticle) {
      // Limpiar formulario para nuevo artículo
      setFormData({
        titulo_articulo: '',
        contenido: '',
        imagen_principal: null as any,
        banner: null as any,
        fecha_publicacion: '',
        categoria_articulo: 1
      });
      setImagePreview(null);
      setBannerPreview(null);
    }
  }, [isOpen, editingArticle]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Convertir categoria_articulo a número
    const processedValue = name === 'categoria_articulo' ? parseInt(value) || 1 : value;
    
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
        imagen_principal: file
      }));

      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        banner: file
      }));

      // Crear preview del banner
      const reader = new FileReader();
      reader.onload = (e) => {
        setBannerPreview(e.target?.result as string);
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
      console.error('Error al guardar el artículo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      titulo_articulo: '',
      contenido: '',
      imagen_principal: null as any,
      banner: null as any,
      fecha_publicacion: '',
      categoria_articulo: 1
    });
    setIsSubmitting(false);
    setImagePreview(null);
    setBannerPreview(null);
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
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header del modal */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xl">📰</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingArticle ? 'Editar Artículo' : 'Nuevo Artículo'}
                </h3>
                <p className="text-sm text-gray-600">
                  {editingArticle 
                    ? 'Modificar los datos del artículo existente' 
                    : 'Crear un nuevo artículo para la revista'
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
            {/* Título del artículo */}
            <div className="md:col-span-2">
              <label htmlFor="titulo_articulo" className="block text-sm font-medium text-gray-700 mb-2">
                Título del artículo *
              </label>
              <input
                type="text"
                id="titulo_articulo"
                name="titulo_articulo"
                value={formData.titulo_articulo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ej: La Revolución Digital en la Minería"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Categoría */}
            {/* <div className="md:col-span-1">
              <label htmlFor="categoria_articulo" className="block text-sm font-medium text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                id="categoria_articulo"
                name="categoria_articulo"
                value={formData.categoria_articulo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value={1}>Tecnología</option>
                <option value={2}>Innovación</option>
                <option value={3}>Sostenibilidad</option>
                <option value={4}>Seguridad</option>
                <option value={5}>Otros</option>
              </select>
            </div> */}

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
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Contenido completo del artículo..."
              />
            </div>

            {/* Imagen principal */}
            <div className="md:col-span-1">
              <label htmlFor="imagen_principal" className="block text-sm font-medium text-gray-700 mb-2">
                Imagen principal *
              </label>
              <input
                type="file"
                id="imagen_principal"
                name="imagen_principal"
                onChange={handleImageChange}
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Formatos: JPG, PNG, GIF, WebP
              </p>
              
              {/* Preview de la imagen principal */}
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

            {/* Banner */}
            <div className="md:col-span-1">
              <label htmlFor="banner" className="block text-sm font-medium text-gray-700 mb-2">
                Banner *
              </label>
              <input
                type="file"
                id="banner"
                name="banner"
                onChange={handleBannerChange}
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Formatos: JPG, PNG, GIF, WebP
              </p>
              
              {/* Preview del banner */}
              {bannerPreview && (
                <div className="mt-3">
                  <img
                    src={bannerPreview}
                    alt="Banner Preview"
                    className="w-full h-32 object-cover rounded-md border border-gray-200"
                  />
                </div>
              )}
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
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting 
                ? (editingArticle ? 'Actualizando...' : 'Guardando...') 
                : (editingArticle ? 'Actualizar' : 'Guardar')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewArticleModal;
