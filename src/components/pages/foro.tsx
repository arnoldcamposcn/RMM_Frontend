import { useState } from 'react';
import { useForo } from '../comments/hooks/useForo';
import { useForoCategorias } from '../comments/hooks/useForoCategorias';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { ForoForm } from '../organisms/ForoForm';
import { ForoEditForm } from '../organisms/ForoEditForm';
import { ForoCard } from '../molecules/ForoCard';
import { ForoCommentsTemplate } from '../comments/templates/ForoCommentsTemplate';
import { LoadingSpinner } from '../comments/atoms/LoadingSpinner';
import { ErrorMessage } from '../comments/atoms/ErrorMessage';
import { Button } from '../comments/atoms/Button';
import RequireAuth from '../../hooks/RequireAuth';

export const ForoPage = () => {
  const {
    foros,
    selectedForo,
    loading,
    error,
    likes,
    createNewForo,
    updateForo,
    removeForo,
    loadForoById,
    toggleForoLikes,
    setSelectedForo
  } = useForo();

  const {
    categorias,
    loading: categoriasLoading,
    error: categoriasError
  } = useForoCategorias();

  const {
    loading: userLoading,
    isOwner
  } = useCurrentUser();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingForoId, setEditingForoId] = useState<number | null>(null);
  const [selectedForoId, setSelectedForoId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<{
    show: boolean;
    type: 'create' | 'edit' | 'delete';
  }>({ show: false, type: 'create' });

  const handleCreateForo = async (foroData: any) => {
    try {
      await createNewForo(foroData);
      // Ocultar el formulario después de crear exitosamente
      setShowCreateForm(false);
      // Mostrar mensaje de éxito específico para crear
      setSuccessMessage({ show: true, type: 'create' });
      // Ocultar mensaje después de 3 segundos
      setTimeout(() => setSuccessMessage({ show: false, type: 'create' }), 3000);
    } catch (error) {
      console.error('Error creating foro:', error);
      // Mantener el formulario abierto si hay error para que el usuario pueda intentar de nuevo
    }
  };

  const handleEditForo = (foroId: number) => {
    setEditingForoId(foroId);
    setShowCreateForm(false); // Ocultar formulario de creación si está abierto
  };

  const handleSaveEdit = async (foroId: number, foroData: any) => {
    try {
      console.log('Saving edit for foro:', foroId, 'with data:', foroData);
      await updateForo(foroId, foroData);
      console.log('Edit saved successfully');
      setEditingForoId(null);
      // Mostrar mensaje de éxito específico para editar
      setSuccessMessage({ show: true, type: 'edit' });
      setTimeout(() => setSuccessMessage({ show: false, type: 'edit' }), 3000);
    } catch (error) {
      console.error('Error updating foro:', error);
      // No mostramos error aquí porque el hook ya maneja los errores
    }
  };

  const handleCancelEdit = () => {
    setEditingForoId(null);
  };

  const handleDeleteForo = async (foroId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este tema? Esta acción no se puede deshacer.')) {
      try {
        console.log('Deleting foro:', foroId);
        await removeForo(foroId);
        console.log('Foro deleted successfully');
        
        // Limpiar el estado de edición si se estaba editando el foro eliminado
        if (editingForoId === foroId) {
          setEditingForoId(null);
        }
        
        // Mostrar mensaje de éxito específico para eliminar
        setSuccessMessage({ show: true, type: 'delete' });
        setTimeout(() => setSuccessMessage({ show: false, type: 'delete' }), 3000);
      } catch (error) {
        console.error('Error deleting foro:', error);
      }
    }
  };

  // Función helper para obtener mensajes de éxito específicos
  const getSuccessMessage = (type: 'create' | 'edit' | 'delete') => {
    switch (type) {
      case 'create':
        return {
          title: '¡Tema creado exitosamente!',
          description: 'Tu tema ha sido agregado al foro.'
        };
      case 'edit':
        return {
          title: '¡Tema actualizado exitosamente!',
          description: 'Los cambios han sido guardados correctamente.'
        };
      case 'delete':
        return {
          title: '¡Tema eliminado con éxito!',
          description: 'El tema ha sido eliminado del foro.'
        };
      default:
        return {
          title: '¡Operación exitosa!',
          description: 'La acción se ha completado correctamente.'
        };
    }
  };

  // Usar el hook para verificar si el usuario actual es propietario
  // const isCurrentUserOwner = isOwner; // Ya está disponible desde useCurrentUser

  const handleViewComments = async (foroId: number) => {
    setSelectedForoId(foroId);
    await loadForoById(foroId);
  };

  const handleToggleLike = async (foroId: number) => {
    await toggleForoLikes(foroId);
  };

  const handleBackToList = () => {
    setSelectedForoId(null);
    setSelectedForo(null);
  };

  // Si hay un tema seleccionado, mostrar sus detalles y comentarios
  if (selectedForoId && selectedForo) {
    const currentLikes = likes[selectedForo.id];
    const isLiked = currentLikes?.user_liked || false;

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Botón de regreso */}
        <Button
          onClick={handleBackToList}
          variant="secondary"
          className="mb-6"
        >
          ← Volver al Foro
        </Button>

        {/* Detalles del tema */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {selectedForo.titulo}
          </h1>
          
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span className="font-medium">{selectedForo.autor.usuario_unico}</span>
            <span className="mx-2">•</span>
            <span>{new Date(selectedForo.creado_en).toLocaleDateString('es-ES')}</span>
            <span className="mx-2">•</span>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {selectedForo.categoria_foro.nombre_categoria}
            </span>
          </div>

          {selectedForo.imagen && (
            <div className="mb-4">
              <img 
                src={selectedForo.imagen} 
                alt={selectedForo.titulo}
                className="w-full h-64 object-cover rounded-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="text-gray-700 mb-6">
            <p className="whitespace-pre-wrap">{selectedForo.contenido}</p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              onClick={() => handleToggleLike(selectedForo.id)}
              className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isLiked 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{isLiked ? '❤️' : '🤍'}</span>
              <span>{currentLikes?.total_likes || selectedForo.likes_count}</span>
            </button>

            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>💬</span>
              <span>{selectedForo.comentarios?.length || 0} comentarios</span>
            </div>
          </div>
        </div>

        {/* Comentarios del tema */}
        <ForoCommentsTemplate temaId={selectedForoId} />
      </div>
    );
  }

  // Vista principal del foro
  return (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      {/* Header con estilo magazine */}
      <div className=" py-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="mb-4">
              <h1 className="title-magazine text-4xl font-bold text-[#132F56] mb-3">
                Foro de Discusión
              </h1>
              <div className="w-24 h-1"></div>
            </div>
            <p className="paragraph-magazine text-base text-gray-600 leading-relaxed">
              Comparte ideas, haz preguntas y conecta con la comunidad minera. 
              Participa en conversaciones sobre los temas más relevantes de la industria.
            </p>
          </div>
          <RequireAuth>
          {!showCreateForm && !editingForoId && (
            <div className="ml-8">
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-[#53C1A9] to-[#4AB39A] hover:from-[#4AB39A] hover:to-[#3FA08A] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Nuevo Tema</span>
              </Button>
            </div>
          )}
          </RequireAuth>
        </div>
      </div>

      {/* Mensaje de éxito */}
      {successMessage.show && (() => {
        const message = getSuccessMessage(successMessage.type);
        return (
          <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="title-magazine text-green-800 font-semibold text-lg mb-1">{message.title}</h3>
                <p className="paragraph-magazine text-green-600">{message.description}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Formulario de creación */}
      {showCreateForm && !editingForoId && (
        <ForoForm
          onForoCreated={handleCreateForo}
          categorias={categorias}
          categoriasLoading={categoriasLoading}
        />
      )}

      {/* Formulario de edición */}
      {editingForoId && (() => {
        const foroToEdit = foros.find(f => f.id === editingForoId);
        return foroToEdit ? (
          <ForoEditForm
            foro={foroToEdit}
            categorias={categorias}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
            loading={loading}
          />
        ) : null;
      })()}

      {/* Lista de temas */}
      <div className="space-y-6">
        {(loading || userLoading) && foros.length === 0 ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="large" />
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : categoriasError ? (
          <ErrorMessage message={`Error al cargar categorías: ${categoriasError}`} />
        ) : foros.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-4xl mb-4">💭</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay temas aún
            </h3>
            <p className="text-gray-600 mb-4">
              Sé el primero en crear un tema y iniciar la conversación
            </p>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Crear Primer Tema
            </Button>
          </div>
        ) : (
          foros.map((foro) => {
            const currentLikes = likes[foro.id];
            const isLiked = currentLikes?.user_liked || false;
            const isForoOwner = isOwner(foro.autor.id);
            
            return (
              <ForoCard
                key={foro.id}
                foro={foro}
                onViewComments={handleViewComments}
                onToggleLike={handleToggleLike}
                onEdit={isForoOwner ? handleEditForo : undefined}
                onDelete={isForoOwner ? handleDeleteForo : undefined}
                isLiked={isLiked}
                isOwner={isForoOwner}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
