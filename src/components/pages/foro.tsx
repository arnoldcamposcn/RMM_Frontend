import { useState } from 'react';
import { useForo } from '../comments/hooks/useForo';
import { useForoCategorias } from '../comments/hooks/useForoCategorias';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { ForoForm } from '../organisms/ForoForm';
import { ForoEditForm } from '../organisms/ForoEditForm';
import { ForoCard } from '../molecules/ForoCard';
import { LoadingSpinner } from '../comments/atoms/LoadingSpinner';
import { ErrorMessage } from '../comments/atoms/ErrorMessage';
import { Button } from '../comments/atoms/Button';
import RequireAuth from '../../hooks/RequireAuth';
import type { CreateForo } from '../../schema/foro/foro';

export const ForoPage = () => {
  const {
    foros,
    loading,
    error,
    likes,
    createNewForo,
    updateForo,
    removeForo,
    toggleForoLikes,
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<{
    show: boolean;
    type: 'create' | 'edit' | 'delete';
  }>({ show: false, type: 'create' });

  const handleCreateForo = async (foroData: CreateForo) => {
    if (!foroData.titulo?.trim() || !foroData.contenido?.trim()) {
      setFormError('El título y el contenido son obligatorios.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      await createNewForo(foroData);
      setShowCreateForm(false);
      setSuccessMessage({ show: true, type: 'create' });
      setTimeout(() => setSuccessMessage({ show: false, type: 'create' }), 3000);
    } catch (err) {
      setFormError('Error al crear el tema. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditForo = (foroId: number) => {
    setEditingForoId(foroId);
    setShowCreateForm(false); // Ocultar formulario de creación si está abierto
  };

  const handleSaveEdit = async (foroId: number, foroData: Partial<CreateForo>) => {
    if (!foroData.titulo?.trim() || !foroData.contenido?.trim()) {
      setFormError('El título y el contenido son obligatorios.');
      return;
    }
    
    setIsSubmitting(true);
    setFormError(null);

    try {
      await updateForo(foroId, foroData);
      setEditingForoId(null);
      setSuccessMessage({ show: true, type: 'edit' });
      setTimeout(() => setSuccessMessage({ show: false, type: 'edit' }), 3000);
    } catch (error) {
      setFormError('Error al actualizar el tema. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingForoId(null);
    setFormError(null);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
    setFormError(null);
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

  const handleToggleLike = async (foroId: number) => {
    await toggleForoLikes(foroId);
  };

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
          onSave={handleCreateForo}
          onCancel={handleCancelCreate}
          categorias={categorias}
          categoriasLoading={categoriasLoading}
          isSubmitting={isSubmitting}
          error={formError}
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
            isSubmitting={isSubmitting}
            error={formError}
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
