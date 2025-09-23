import React from 'react';
import { useFetch } from "../../hooks/useFetch"
import type { Foro } from "../../schema/foro/foro";
import { getForo } from "../../services/foro/foro.service"
import { cleanRichText } from "../../utils/cleanRichText";
import { useNavigate } from 'react-router-dom';
export const MessagesForo : React.FC = () => {
  const { data, loading, error } = useFetch<Foro[]>(getForo, []);
const router = useNavigate();
  if (loading) {
    return (
      <div className="w-full py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#53C1A9]"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-red-500 text-lg">Error al cargar el foro: {error}</div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!data || data.length === 0) {
    return (
      <div className="w-full py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-gray-500 text-lg">No hay temas en el foro aún</div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full py-8 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-0">
        {/* Header de la sección */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <h2 className="title-magazine text-3xl sm:text-4xl font-bold text-[#132F56] mb-4">
              Interactúa con nuestro foro y comparte tus opiniones
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#53C1A9] to-[#4AB39A] rounded-full mx-auto"></div>
          </div>
          <p className="paragraph-magazine text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Únete a la conversación y comparte tu perspectiva sobre los temas más relevantes de la industria minera
          </p>
        </div>

        {/* Galería de temas del foro como burbujas de comentarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map((foro) => (
            <div 
              key={foro.id}
              className="forum-bubble bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 hover:border-[#53C1A9]/30 transition-all duration-300 group cursor-pointer"
            >
              {/* Header con categoría y autor */}
              <div className="p-4 pb-3">
                {/* <div className="flex items-center justify-between mb-3">
                  <span className="bg-[#53C1A9] text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {foro.categoria_foro.nombre_categoria}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(foro.creado_en)}
                  </span>
                </div> */}
                
                {/* Avatar y nombre del autor */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 bg-[#53C1A9] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">
                      {foro.autor.usuario_unico.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    {foro.autor.usuario_unico}
                  </span>
                </div>
              </div>

              {/* Contenido principal */}
              <div className="px-4 pb-4">
                <h3 className="forum-bubble-title title-magazine text-base font-semibold mb-2 leading-tight text-[#132F56] group-hover:text-[#53C1A9] transition-colors duration-300 line-clamp-2">
                  {foro.titulo}
                </h3>
                
                <p className="forum-bubble-description paragraph-magazine text-sm leading-relaxed text-gray-600 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2 mb-3">
                  {cleanRichText(foro.contenido)}
                </p>
              </div>

              {/* Footer con estadísticas */}
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-xs text-gray-600">{foro.comentarios.length}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="text-xs text-gray-600">{foro.likes_count}</span>
                    </div>
                  </div>
                  
                  {/* Botón de participación */}
                  <div className="flex items-center space-x-1 text-[#53C1A9] group-hover:text-[#4AB39A] transition-colors duration-300">
                    <span onClick={() => router('/foro')} className="text-xs font-semibold">Participar</span>
                    <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Indicador de hover sutil */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#53C1A9] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <button onClick={() => router('/foro')} className="bg-gradient-to-r from-[#53C1A9] to-[#4AB39A] text-white px-8 py-3 rounded-lg font-semibold hover:from-[#4AB39A] hover:to-[#3FA08A] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Ver todos los temas del foro
          </button>
        </div>
      </div>
    </div>
  )
}
