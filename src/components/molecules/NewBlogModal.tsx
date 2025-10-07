import React, { useState, useEffect } from 'react';
import type { CreateBlog } from '../../schema/blog/blog';
import type { Blog } from '../../schema/blog/blog';
import type { Article } from '../../schema/article/article';
import { getArticles } from '../../services/articles/article.service';
import { getBlog } from '../../services/blog/blog.service';
import { RelatedArticlesTags } from './RelatedArticlesTags';
import { AvailableArticlesToAdd } from './AvailableArticlesToAdd';

interface EditingBlog {
  id: number;
  titulo_blog: string;
  contenido: string;
  imagen_principal: string; // Para edición, la imagen existente es una URL
  banner: string; // Para edición, el banner existente es una URL
  fecha_publicacion: string;
}

interface NewBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (blog: CreateBlog) => void;
  editingBlog?: EditingBlog | null;
}

const NewBlogModal: React.FC<NewBlogModalProps> = ({ isOpen, onClose, onSave, editingBlog }) => {
  const [formData, setFormData] = useState<CreateBlog>({
    titulo_blog: '',
    contenido: '',
    imagen_principal: '',
    banner: '',
    fecha_publicacion: '',
    articulos_ids: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para manejo de artículos
  const [articles, setArticles] = useState<Article[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);

  // Cargar artículos cuando se abre el modal
  useEffect(() => {
    const loadArticles = async () => {
      if (isOpen) {
        setLoadingArticles(true);
        try {
          const articlesData = await getArticles();
          setArticles(articlesData);
        } catch (error) {
          console.error('Error al cargar artículos:', error);
          setError('Error al cargar artículos');
        } finally {
          setLoadingArticles(false);
        }
      }
    };

    loadArticles();
  }, [isOpen]);

  // Precargar datos cuando se está editando
  useEffect(() => {
    const loadBlogData = async () => {
      if (isOpen && editingBlog) {
        try {
          // Cargar el blog completo con sus artículos relacionados
          const blogData = await getBlog(editingBlog.id);
          setRelatedArticles(blogData.articulos || []);
          
          setFormData({
            titulo_blog: editingBlog.titulo_blog,
            contenido: editingBlog.contenido,
            imagen_principal: editingBlog.imagen_principal,
            banner: editingBlog.banner,
            fecha_publicacion: editingBlog.fecha_publicacion,
            articulos_ids: blogData.articulos?.map(art => art.id) || []
          });
          setImagePreview(editingBlog.imagen_principal);
          setBannerPreview(editingBlog.banner);
        } catch (error) {
          console.error('Error al cargar blog:', error);
          setError('Error al cargar datos del blog');
        }
      } else if (isOpen && !editingBlog) {
        // Limpiar formulario para nueva noticia
        setFormData({
          titulo_blog: '',
          contenido: '',
          imagen_principal: '',
          banner: '',
          fecha_publicacion: '',
          articulos_ids: []
        });
        setImagePreview(null);
        setBannerPreview(null);
        setRelatedArticles([]);
      }
    };

    loadBlogData();
  }, [isOpen, editingBlog]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      imagen_principal: value
    }));
    setImagePreview(value);
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      banner: value
    }));
    setBannerPreview(value);
  };

  // Función para agregar un artículo al blog
  const handleAddArticleToBlog = (article: Article) => {
    setFormData(prev => ({
      ...prev,
      articulos_ids: [...(prev.articulos_ids || []), article.id]
    }));
    setRelatedArticles(prev => [...prev, article]);
  };

  // Función para remover un artículo del blog
  const handleRemoveArticleFromBlog = (articleId: number) => {
    setFormData(prev => ({
      ...prev,
      articulos_ids: (prev.articulos_ids || []).filter(id => id !== articleId)
    }));
    setRelatedArticles(prev => prev.filter(art => art.id !== articleId));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpiar errores anteriores
    
    setIsSubmitting(true);
    
    try{
      await onSave(formData);
      handleClose();
    } catch (error) {
      console.error('Error al guardar la noticia:', error);
    } finally {
      setIsSubmitting(false);
    }
    }

  const handleClose = () => {
    setFormData({
      titulo_blog: '',
      contenido: '',
      imagen_principal: '',
      banner: '',
      fecha_publicacion: '',
      articulos_ids: []
    });
    setIsSubmitting(false);
    setImagePreview(null);
    setBannerPreview(null);
    setError(null);
    setArticles([]);
    setRelatedArticles([]);
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
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-xl">🗞️</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingBlog ? 'Editar Noticia' : 'Nueva Noticia'}
                </h3>
                <p className="text-sm text-gray-600">
                  {editingBlog 
                    ? 'Modificar los datos de la noticia existente' 
                    : 'Crear una nueva noticia para la revista'
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

        {/* Mensaje de error */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Título de la noticia */}
            <div className="md:col-span-2">
              <label htmlFor="titulo_blog" className="block text-sm font-medium text-gray-700 mb-2">
                Título de la noticia *
              </label>
              <input
                type="text"
                id="titulo_blog"
                name="titulo_blog"
                value={formData.titulo_blog}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ej: Nueva tecnología revoluciona la minería"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Contenido completo de la noticia..."
              />
            </div>


            {/* Imagen principal */}
            <div className="md:col-span-1">
              <label htmlFor="imagen_principal" className="block text-sm font-medium text-gray-700 mb-2">
                URL Imagen principal *
              </label>
              <input
                type="url"
                id="imagen_principal"
                name="imagen_principal"
                value={formData.imagen_principal}
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <p className="mt-1 text-xs text-gray-500">
                URL completa de la imagen
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
                URL Banner *
              </label>
              <input
                type="url"
                id="banner"
                name="banner"
                value={formData.banner}
                onChange={handleBannerChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://ejemplo.com/banner.jpg"
              />
              <p className="mt-1 text-xs text-gray-500">
                URL completa del banner
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

          {/* Sección de Artículos */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Artículos Relacionados
              </h4>
              <p className="text-sm text-gray-600">
                Selecciona los artículos que quieres asociar con este blog
              </p>
            </div>

            {/* Artículos Relacionados */}
            <div className="mb-6">
              <h5 className="text-md font-medium text-gray-700 mb-3">
                Artículos Asociados ({relatedArticles.length})
              </h5>
              <RelatedArticlesTags
                blog={{ articulos: relatedArticles } as Blog}
                onRemoveArticle={handleRemoveArticleFromBlog}
                isEditing={true}
              />
            </div>

            {/* Artículos Disponibles */}
            <div>
              <h5 className="text-md font-medium text-gray-700 mb-3">
                Artículos Disponibles para Agregar
              </h5>
              {loadingArticles ? (
                <div className="text-center py-4">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  <p className="text-sm text-gray-500 mt-2">Cargando artículos...</p>
                </div>
              ) : (
                <AvailableArticlesToAdd
                  articles={articles}
                  blog={{ articulos: relatedArticles }}
                  onAddArticle={handleAddArticleToBlog}
                />
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
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting 
                ? (editingBlog ? 'Actualizando...' : 'Guardando...') 
                : (editingBlog ? 'Actualizar' : 'Guardar')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBlogModal;
