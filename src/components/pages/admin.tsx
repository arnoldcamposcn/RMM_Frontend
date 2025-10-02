

import { useState } from 'react';
import AdminSidebar from '../organisms/AdminSidebar';
import RevistasTable from '../organisms/RevistasTable';
import ArticlesTable from '../organisms/ArticlesTable';
import BlogsTable from '../organisms/BlogsTable';
import DeleteConfirmationModal from '../molecules/DeleteConfirmationModal';
import DeleteArticleModal from '../molecules/DeleteArticleModal';
import DeleteBlogModal from '../molecules/DeleteBlogModal';
import NewEditionModal from '../molecules/NewEditionModal';
import NewArticleModal from '../molecules/NewArticleModal';
import NewBlogModal from '../molecules/NewBlogModal';
import Pagination from '../molecules/Pagination';
import ToastContainer from '../organisms/ToastContainer';
import { useToast } from '../../hooks/useToast';
import { createMagazine, patchMagazine, deleteMagazine } from '../../services/magazine/magazine.service';
import { createArticle, patchArticle, deleteArticle } from '../../services/articles/article.service';
import { createBlog, patchBlog, deleteBlog } from '../../services/blog/blog.service';
import type { CreateMagazine } from '../../schema/magazine/magazine';
import type { ArticleCreate } from '../../schema/article/article';
import type { CreateBlog } from '../../schema/blog/blog';
import { getMagazinesPaginated } from '../../services/magazine/magazine.service';
import { getArticlesPaginated } from '../../services/articles/article.service';
import { getBlogsPaginated } from '../../services/blog/blog.service';
import type { MagazineApiResponse } from '../../schema/magazine/magazine';
import type { ArticleApiResponse } from '../../schema/article/article';
import type { BlogApiResponse } from '../../schema/blog/blog';
import { useFetch } from '../../hooks/useFetch';

// Interfaz extendida para incluir el ID (necesario para la UI)
interface MagazineWithId extends Omit<CreateMagazine, 'imagen'> {
  id: number;
  imagen: string; // URL de la imagen desde el servicio
}

interface ArticleWithId extends Omit<ArticleCreate, 'imagen_principal' | 'banner'> {
  id: number;
  imagen_principal: string; // URL de la imagen desde el servicio
  banner: string; // URL del banner desde el servicio
}

interface BlogWithId extends Omit<CreateBlog, 'imagen_principal' | 'banner'> {
  id: number;
  imagen_principal: string; // URL de la imagen desde el servicio
  banner: string; // URL del banner desde el servicio
}

export const Adminpage = () => {
  const [activeSection, setActiveSection] = useState('revistas');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNewEditionModalOpen, setIsNewEditionModalOpen] = useState(false);
  const [isDeleteArticleModalOpen, setIsDeleteArticleModalOpen] = useState(false);
  const [isNewArticleModalOpen, setIsNewArticleModalOpen] = useState(false);
  const [isDeleteBlogModalOpen, setIsDeleteBlogModalOpen] = useState(false);
  const [isNewBlogModalOpen, setIsNewBlogModalOpen] = useState(false);
  const [revistaToDelete, setRevistaToDelete] = useState<MagazineWithId | null>(null);
  const [revistaToEdit, setRevistaToEdit] = useState<any>(null); // Usar any temporalmente para evitar conflictos de tipos
  const [articleToDelete, setArticleToDelete] = useState<ArticleWithId | null>(null);
  const [articleToEdit, setArticleToEdit] = useState<any>(null); // Usar any temporalmente para evitar conflictos de tipos
  const [blogToDelete, setBlogToDelete] = useState<BlogWithId | null>(null);
  const [blogToEdit, setBlogToEdit] = useState<any>(null); // Usar any temporalmente para evitar conflictos de tipos
  const [currentArticlePage, setCurrentArticlePage] = useState(1);
  const [currentBlogPage, setCurrentBlogPage] = useState(1);
  const [currentMagazinePage, setCurrentMagazinePage] = useState(1);
  const { toasts, removeToast, showSuccess, showInfo } = useToast();
  const { data: magazinesResponse, loading, error, refetch } = useFetch<MagazineApiResponse>(() => getMagazinesPaginated(currentMagazinePage, 6), [currentMagazinePage]);
  const { data: articlesResponse, loading: articlesLoading, error: articlesError, refetch: refetchArticles } = useFetch<ArticleApiResponse>(() => getArticlesPaginated(currentArticlePage, 6), [currentArticlePage]);
  const { data: blogsResponse, loading: blogsLoading, error: blogsError, refetch: refetchBlogs } = useFetch<BlogApiResponse>(() => getBlogsPaginated(currentBlogPage, 8), [currentBlogPage]);

  // Convertir los datos del servicio a MagazineWithId para la UI
  const revistas: MagazineWithId[] = magazinesResponse?.results?.map(magazine => ({
    id: magazine.id,
    numero_edicion: magazine.numero_edicion,
    titulo_edicion: magazine.titulo_edicion,
    contenido: magazine.contenido,
    imagen: magazine.imagen, // Usar la URL real de la imagen del servicio
    fecha_publicacion: magazine.fecha_publicacion,
    url_impresa: magazine.url_impresa
  })) || [];

  // Convertir los datos del servicio a ArticleWithId para la UI
  const articlesList: ArticleWithId[] = articlesResponse?.results?.map(article => ({
    id: article.id,
    titulo_articulo: article.titulo_articulo,
    contenido: article.contenido,
    imagen_principal: article.imagen_principal, // Usar la URL real de la imagen del servicio
    banner: article.banner, // Usar la URL real del banner del servicio
    fecha_publicacion: article.fecha_publicacion,
    categoria_articulo: 1 // Valor por defecto ya que no está en el esquema actual
  })) || [];

  // Convertir los datos del servicio a BlogWithId para la UI
  const blogsList: BlogWithId[] = blogsResponse?.results?.map(blog => ({
    id: blog.id,
    titulo_blog: blog.titulo_blog,
    contenido: blog.contenido,
    imagen_principal: blog.imagen_principal, // Usar la URL real de la imagen del servicio
    banner: blog.banner, // Usar la URL real del banner del servicio
    fecha_publicacion: blog.fecha_publicacion
  })) || [];

  const handleEditRevista = (revista: MagazineWithId) => {
    // Convertir MagazineWithId a EditingEdition para el modal
    const editingEdition = {
      id: revista.id,
      numero_edicion: revista.numero_edicion,
      titulo_edicion: revista.titulo_edicion,
      contenido: revista.contenido,
      imagen: revista.imagen, // Usar la URL real de la imagen
      fecha_publicacion: revista.fecha_publicacion,
      url_impresa: revista.url_impresa
    };
    setRevistaToEdit(editingEdition as any);
    setIsNewEditionModalOpen(true);
  };

  const handleDeleteRevista = (revista: MagazineWithId) => {
    setRevistaToDelete(revista);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (revistaToDelete) {
      try {
        // Eliminar edición usando el servicio deleteMagazine
        await deleteMagazine(revistaToDelete.id);
        showSuccess(`✅ Edición eliminada con éxito: "${revistaToDelete.titulo_edicion}"`);
        setIsDeleteModalOpen(false);
        setRevistaToDelete(null);
        // Recargar datos para reflejar los cambios
        refetch();
        // Si estamos en una página que podría estar vacía después de eliminar, volver a la página 1
        if (currentMagazinePage > 1 && revistas.length === 1) {
          setCurrentMagazinePage(1);
        }
      } catch (error) {
        console.error('Error al eliminar la edición:', error);
        showInfo('Error al eliminar la edición. Por favor, inténtalo de nuevo.');
        setIsDeleteModalOpen(false);
        setRevistaToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setRevistaToDelete(null);
  };

  const handleNewEdition = () => {
    setRevistaToEdit(null); // Asegurar que no hay revista en edición
    setIsNewEditionModalOpen(true);
  };

  // Funciones para artículos
  const handleEditArticle = (article: ArticleWithId) => {
    // Convertir ArticleWithId a EditingArticle para el modal
    const editingArticle = {
      id: article.id,
      titulo_articulo: article.titulo_articulo,
      contenido: article.contenido,
      imagen_principal: article.imagen_principal, // Usar la URL real de la imagen
      banner: article.banner, // Usar la URL real del banner
      fecha_publicacion: article.fecha_publicacion,
      categoria_articulo: article.categoria_articulo
    };
    setArticleToEdit(editingArticle as any);
    setIsNewArticleModalOpen(true);
  };

  const handleDeleteArticle = (article: ArticleWithId) => {
    setArticleToDelete(article);
    setIsDeleteArticleModalOpen(true);
  };

  const confirmDeleteArticle = async () => {
    if (articleToDelete) {
      try {
        // Eliminar artículo usando el servicio deleteArticle
        await deleteArticle(articleToDelete.id);
        showSuccess(`✅ Artículo eliminado con éxito: "${articleToDelete.titulo_articulo}"`);
        setIsDeleteArticleModalOpen(false);
        setArticleToDelete(null);
        // Recargar datos para reflejar los cambios
        refetchArticles();
        // Si estamos en una página que podría estar vacía después de eliminar, volver a la página 1
        if (currentArticlePage > 1 && articlesList.length === 1) {
          setCurrentArticlePage(1);
        }
      } catch (error) {
        console.error('Error al eliminar el artículo:', error);
        showInfo('Error al eliminar el artículo. Por favor, inténtalo de nuevo.');
        setIsDeleteArticleModalOpen(false);
        setArticleToDelete(null);
      }
    }
  };

  const cancelDeleteArticle = () => {
    setIsDeleteArticleModalOpen(false);
    setArticleToDelete(null);
  };

  const handleNewArticle = () => {
    setArticleToEdit(null); // Asegurar que no hay artículo en edición
    setIsNewArticleModalOpen(true);
  };

  // Funciones para blogs (noticias)
  const handleEditBlog = (blog: BlogWithId) => {
    // Convertir BlogWithId a EditingBlog para el modal
    const editingBlog = {
      id: blog.id,
      titulo_blog: blog.titulo_blog,
      contenido: blog.contenido,
      imagen_principal: blog.imagen_principal, // Usar la URL real de la imagen
      banner: blog.banner, // Usar la URL real del banner
      fecha_publicacion: blog.fecha_publicacion
    };
    setBlogToEdit(editingBlog as any);
    setIsNewBlogModalOpen(true);
  };

  const handleDeleteBlog = (blog: BlogWithId) => {
    setBlogToDelete(blog);
    setIsDeleteBlogModalOpen(true);
  };

  const confirmDeleteBlog = async () => {
    if (blogToDelete) {
      try {
        // Eliminar blog usando el servicio deleteBlog
        await deleteBlog(blogToDelete.id);
        showSuccess(`✅ Noticia eliminada con éxito: "${blogToDelete.titulo_blog}"`);
        setIsDeleteBlogModalOpen(false);
        setBlogToDelete(null);
        // Recargar datos para reflejar los cambios
        refetchBlogs();
        // Si estamos en una página que podría estar vacía después de eliminar, volver a la página 1
        if (currentBlogPage > 1 && blogsList.length === 1) {
          setCurrentBlogPage(1);
        }
      } catch (error) {
        console.error('Error al eliminar la noticia:', error);
        showInfo('Error al eliminar la noticia. Por favor, inténtalo de nuevo.');
        setIsDeleteBlogModalOpen(false);
        setBlogToDelete(null);
      }
    }
  };

  const cancelDeleteBlog = () => {
    setIsDeleteBlogModalOpen(false);
    setBlogToDelete(null);
  };

  const handleNewBlog = () => {
    setBlogToEdit(null); // Asegurar que no hay blog en edición
    setIsNewBlogModalOpen(true);
  };

  // Función para manejar el cambio de página en artículos
  const handleArticlePageChange = (page: number) => {
    setCurrentArticlePage(page);
  };

  // Función para manejar el cambio de página en blogs
  const handleBlogPageChange = (page: number) => {
    setCurrentBlogPage(page);
  };

  // Función para manejar el cambio de página en revistas
  const handleMagazinePageChange = (page: number) => {
    setCurrentMagazinePage(page);
  };

  const handleSaveNewBlog = async (blogData: CreateBlog) => {
    // Crear FormData para envío de archivos
    const formData = new FormData();
    formData.append('titulo_blog', blogData.titulo_blog);
    formData.append('contenido', blogData.contenido);
    formData.append('fecha_publicacion', blogData.fecha_publicacion);
    
    // Solo agregar archivos si son nuevos
    if (blogData.imagen_principal instanceof File) {
      formData.append('imagen_principal', blogData.imagen_principal);
    }
    if (blogData.banner instanceof File) {
      formData.append('banner', blogData.banner);
    }
    
    try {
      if (blogToEdit) {
        // Actualizar blog existente usando el servicio patchBlog
        await patchBlog(blogToEdit.id, formData as any);
        showSuccess(`✅ Noticia actualizada exitosamente: "${blogData.titulo_blog}"`);
      } else {
        // Crear nuevo blog usando el servicio
        await createBlog(formData as any);
        showSuccess(`✅ Nueva noticia creada exitosamente: "${blogData.titulo_blog}"`);
      }
      
      // Limpiar estado de edición
      setBlogToEdit(null);
      
      // Recargar datos para reflejar los cambios
      refetchBlogs();
      // Si estamos en una página que podría estar vacía después de eliminar, volver a la página 1
      if (currentBlogPage > 1 && blogsList.length === 1) {
        setCurrentBlogPage(1);
      }
    } catch (error) {
      console.error('Error al guardar la noticia:', error);
      showInfo('Error al guardar la noticia. Por favor, inténtalo de nuevo.');
    }
  };

  const handleSaveNewArticle = async (articleData: ArticleCreate) => {
    // Crear FormData para envío de archivos
    const formData = new FormData();
    formData.append('titulo_articulo', articleData.titulo_articulo);
    formData.append('contenido', articleData.contenido);
    formData.append('fecha_publicacion', articleData.fecha_publicacion);
    formData.append('categoria_articulo', articleData.categoria_articulo.toString());
    
    // Solo agregar archivos si son nuevos
    if (articleData.imagen_principal instanceof File) {
      formData.append('imagen_principal', articleData.imagen_principal);
    }
    if (articleData.banner instanceof File) {
      formData.append('banner', articleData.banner);
    }
    
    try {
      if (articleToEdit) {
        // Actualizar artículo existente usando el servicio patchArticle
        await patchArticle(articleToEdit.id, formData as any);
        showSuccess(`✅ Artículo actualizado exitosamente: "${articleData.titulo_articulo}"`);
      } else {
        // Crear nuevo artículo usando el servicio
        await createArticle(formData as any);
        showSuccess(`✅ Nuevo artículo creado exitosamente: "${articleData.titulo_articulo}"`);
      }
      
      // Limpiar estado de edición
      setArticleToEdit(null);
      
      // Recargar datos para reflejar los cambios
      refetchArticles();
      // Si estamos en una página que podría estar vacía después de eliminar, volver a la página 1
      if (currentArticlePage > 1 && articlesList.length === 1) {
        setCurrentArticlePage(1);
      }
    } catch (error) {
      console.error('Error al guardar el artículo:', error);
      showInfo('Error al guardar el artículo. Por favor, inténtalo de nuevo.');
    }
  };

  const handleSaveNewEdition = async (editionData: CreateMagazine) => {
    // Crear FormData para envío de archivos
    const formData = new FormData();
    formData.append('numero_edicion', editionData.numero_edicion.toString());
    formData.append('titulo_edicion', editionData.titulo_edicion);
    formData.append('contenido', editionData.contenido);
    formData.append('fecha_publicacion', editionData.fecha_publicacion);
    formData.append('url_impresa', editionData.url_impresa);
    
    // Solo agregar la imagen si es un archivo nuevo
    if (editionData.imagen instanceof File) {
      formData.append('imagen', editionData.imagen);
    }
    try {
      if (revistaToEdit) {
        // Actualizar edición existente usando el servicio patchMagazine
        await patchMagazine(revistaToEdit.id, formData);
        showSuccess(`✅ Edición actualizada exitosamente: "${editionData.titulo_edicion}"`);
      } else {
        // Crear nueva edición usando el servicio
        await createMagazine(formData);
        showSuccess(`✅ Nueva edición creada exitosamente: "${editionData.titulo_edicion}"`);
      }
      
      // Limpiar estado de edición
      setRevistaToEdit(null);
      
      // Recargar datos para reflejar los cambios
      refetch();
      // Si estamos en una página que podría estar vacía después de eliminar, volver a la página 1
      if (currentMagazinePage > 1 && revistas.length === 1) {
        setCurrentMagazinePage(1);
      }
    } catch (error) {
      console.error('Error al guardar la edición:', error);
      showInfo('Error al guardar la edición. Por favor, inténtalo de nuevo.');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'revistas':
        if (loading) {
          return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Cargando ediciones...</span>
              </div>
            </div>
          );
        }

        if (error) {
          return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Error al cargar las ediciones</h3>
                <p className="text-gray-500 mb-4">No se pudieron cargar las ediciones de la revista.</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Reintentar
                </button>
              </div>
            </div>
          );
        }

        return (
          <div>
            <RevistasTable
              revistas={revistas}
              onEdit={handleEditRevista}
              onDelete={handleDeleteRevista}
            />
            {magazinesResponse && (
              <Pagination
                currentPage={currentMagazinePage}
                totalPages={Math.ceil(magazinesResponse.count / 6)}
                totalItems={magazinesResponse.count}
                itemsPerPage={6}
                onPageChange={handleMagazinePageChange}
                loading={loading}
              />
            )}
          </div>
        );
      case 'articulos':
        if (articlesLoading) {
          return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="ml-3 text-gray-600">Cargando artículos...</span>
              </div>
            </div>
          );
        }

        if (articlesError) {
          return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Error al cargar los artículos</h3>
                <p className="text-gray-500 mb-4">No se pudieron cargar los artículos.</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Reintentar
                </button>
              </div>
            </div>
          );
        }

        return (
          <div>
            <ArticlesTable
              articles={articlesList}
              onEdit={handleEditArticle}
              onDelete={handleDeleteArticle}
            />
            {articlesResponse && (
              <Pagination
                currentPage={currentArticlePage}
                totalPages={Math.ceil(articlesResponse.count / 6)}
                totalItems={articlesResponse.count}
                itemsPerPage={6}
                onPageChange={handleArticlePageChange}
                loading={articlesLoading}
              />
            )}
          </div>
        );
      case 'noticias':
        if (blogsLoading) {
          return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <span className="ml-3 text-gray-600">Cargando noticias...</span>
              </div>
            </div>
          );
        }

        if (blogsError) {
          return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Error al cargar las noticias</h3>
                <p className="text-gray-500 mb-4">No se pudieron cargar las noticias.</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Reintentar
                </button>
              </div>
            </div>
          );
        }

        return (
          <div>
            <BlogsTable
              blogs={blogsList}
              onEdit={handleEditBlog}
              onDelete={handleDeleteBlog}
            />
            {blogsResponse && (
              <Pagination
                currentPage={currentBlogPage}
                totalPages={Math.ceil(blogsResponse.count / 8)}
                totalItems={blogsResponse.count}
                itemsPerPage={8}
                onPageChange={handleBlogPageChange}
                loading={blogsLoading}
              />
            )}
          </div>
        );
      case 'contenidos':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Listado de Contenidos</h3>
            <p className="text-gray-600">Vista general de todos los contenidos - Próximamente</p>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sección no encontrada</h3>
            <p className="text-gray-600">La sección seleccionada no existe.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <AdminSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header del dashboard */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeSection === 'revistas' && '📘 Revistas'}
                  {activeSection === 'articulos' && '📰 Artículos'}
                  {activeSection === 'noticias' && '🗞 Noticias'}
                  {activeSection === 'contenidos' && '📄 Listado de Contenidos'}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {activeSection === 'revistas' && 'Gestiona las ediciones de Meta Mining'}
                  {activeSection === 'articulos' && 'Administra los artículos de la revista'}
                  {activeSection === 'noticias' && 'Gestiona las noticias y actualizaciones'}
                  {activeSection === 'contenidos' && 'Vista general de todos los contenidos'}
                </p>
              </div>
              
              {/* Botón de acción principal */}
              {activeSection === 'revistas' && (
                <button 
                  onClick={handleNewEdition}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  + Nueva Edición
                </button>
              )}
              {activeSection === 'articulos' && (
                <button 
                  onClick={handleNewArticle}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  + Nuevo Artículo
                </button>
              )}
              {activeSection === 'noticias' && (
                <button 
                  onClick={handleNewBlog}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  + Nueva Noticia
                </button>
              )}
            </div>
          </div>

          {/* Contenido de la sección */}
          <div className="flex-1 overflow-y-auto p-6">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Confirmar Eliminación"
        itemName={revistaToDelete?.titulo_edicion  || ''}
        itemType="edición"
      />

      {/* Modal de nueva edición / edición */}
      <NewEditionModal
        isOpen={isNewEditionModalOpen}
        onClose={() => {
          setIsNewEditionModalOpen(false);
          setRevistaToEdit(null);
        }}
        onSave={handleSaveNewEdition}
        editingEdition={revistaToEdit}
      />

      {/* Modal de confirmación de eliminación de artículos */}
      <DeleteArticleModal
        isOpen={isDeleteArticleModalOpen}
        onClose={cancelDeleteArticle}
        onConfirm={confirmDeleteArticle}
        title="Confirmar Eliminación"
        itemName={articleToDelete?.titulo_articulo || ''}
        itemType="artículo"
      />

      {/* Modal de nuevo artículo / edición */}
      <NewArticleModal
        isOpen={isNewArticleModalOpen}
        onClose={() => {
          setIsNewArticleModalOpen(false);
          setArticleToEdit(null);
        }}
        onSave={handleSaveNewArticle}
        editingArticle={articleToEdit}
      />

      {/* Modal de confirmación de eliminación de noticias */}
      <DeleteBlogModal
        isOpen={isDeleteBlogModalOpen}
        onClose={cancelDeleteBlog}
        onConfirm={confirmDeleteBlog}
        title="Confirmar Eliminación"
        itemName={blogToDelete?.titulo_blog || ''}
        itemType="noticia"
      />

      {/* Modal de nueva noticia / edición */}
      <NewBlogModal
        isOpen={isNewBlogModalOpen}
        onClose={() => {
          setIsNewBlogModalOpen(false);
          setBlogToEdit(null);
        }}
        onSave={handleSaveNewBlog}
        editingBlog={blogToEdit}
      />

      {/* Contenedor de notificaciones toast */}
      <ToastContainer
        toasts={toasts}
        onRemoveToast={removeToast}
      />
    </div>
  );
};  
