import { useState } from 'react';
import { useForo } from '../comments/hooks/useForo';
import { useForoCategorias } from '../comments/hooks/useForoCategorias';
import { ForoForm } from '../organisms/ForoForm';
import { ForoCard } from '../molecules/ForoCard';
import { ForoCommentsTemplate } from '../comments/templates/ForoCommentsTemplate';
import { LoadingSpinner } from '../comments/atoms/LoadingSpinner';
import { ErrorMessage } from '../comments/atoms/ErrorMessage';
import { Button } from '../comments/atoms/Button';

export const ForoPage = () => {
  const {
    foros,
    selectedForo,
    loading,
    error,
    likes,
    createNewForo,
    loadForoById,
    toggleForoLikes,
    setSelectedForo
  } = useForo();

  const {
    categorias,
    loading: categoriasLoading,
    error: categoriasError
  } = useForoCategorias();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedForoId, setSelectedForoId] = useState<number | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleCreateForo = async (foroData: any) => {
    try {
      await createNewForo(foroData);
      // Ocultar el formulario después de crear exitosamente
      setShowCreateForm(false);
      // Mostrar mensaje de éxito
      setShowSuccessMessage(true);
      // Ocultar mensaje después de 3 segundos
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Error creating foro:', error);
      // Mantener el formulario abierto si hay error para que el usuario pueda intentar de nuevo
    }
  };

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Foro</h1>
          <p className="text-gray-600 mt-2">
            Comparte ideas, haz preguntas y conecta con la comunidad
          </p>
        </div>
        
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          + Nuevo Tema
        </Button>
      </div>

      {/* Mensaje de éxito */}
      {showSuccessMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="text-green-600 text-lg mr-2">✅</div>
            <div>
              <h3 className="text-green-800 font-medium">¡Tema creado exitosamente!</h3>
              <p className="text-green-600 text-sm">Tu tema ha sido agregado al foro.</p>
            </div>
          </div>
        </div>
      )}

      {/* Formulario de creación */}
      {showCreateForm && (
        <ForoForm
          onForoCreated={handleCreateForo}
          categorias={categorias}
          categoriasLoading={categoriasLoading}
        />
      )}

      {/* Lista de temas */}
      <div className="space-y-6">
        {loading && foros.length === 0 ? (
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
            
            return (
              <ForoCard
                key={foro.id}
                foro={foro}
                onViewComments={handleViewComments}
                onToggleLike={handleToggleLike}
                isLiked={isLiked}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
