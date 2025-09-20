import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../store/features/profile/profile.service";
import type { Profile } from "../../store/features/profile/profileSchema";
import ButtonLink from "../atoms/ButtonLink";

const ProfilePage = () => {
  const { data, loading, error } = useFetch<Profile>(getProfile, []);
  const navigate = useNavigate();

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azul-codea mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando perfil...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Error al cargar el perfil</h2>
        <p className="text-gray-600 mb-4">No se pudo cargar la información del perfil</p>
        <ButtonLink
          onClick={() => window.location.reload()}
          className="bg-azul-codea hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
        >
          Reintentar
        </ButtonLink>
      </div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-400 text-6xl mb-4">👤</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Perfil no encontrado</h2>
        <p className="text-gray-600">No se encontró información del perfil</p>
      </div>
    </div>
  );

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No especificada';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Header con botón de editar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
            <p className="mt-2 text-gray-600">Gestiona tu información personal y profesional</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <ButtonLink
              onClick={() => navigate('/perfil/editar-perfil')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-azul-codea hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azul-codea transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar Perfil
            </ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Información personal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información básica */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-azul-codea" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Información Personal
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Nombre</label>
                  <p className="text-gray-900">{data.first_name || 'No especificado'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Apellido</label>
                  <p className="text-gray-900">{data.last_name || 'No especificado'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                  <p className="text-gray-900">{data.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Usuario único</label>
                  <p className="text-gray-900">@{data.usuario_unico}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Teléfono</label>
                  <p className="text-gray-900">{data.telefono || 'No especificado'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Edad</label>
                  <p className="text-gray-900">{data.edad ? `${data.edad} años` : 'No especificada'}</p>
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-azul-codea" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Ubicación
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Ciudad</label>
                  <p className="text-gray-900">{data.ciudad || 'No especificada'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">País</label>
                  <p className="text-gray-900">{data.pais || 'No especificado'}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Fecha de nacimiento</label>
                  <p className="text-gray-900">{formatDate(data.fecha_nacimiento)}</p>
                </div>
              </div>
            </div>

            {/* Biografía */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-azul-codea" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Sobre mí
              </h2>
              <div>
                <p className="text-gray-700 leading-relaxed">
                  {data.biografia || 'No hay información biográfica disponible. Agrega una descripción sobre ti para que otros usuarios puedan conocerte mejor.'}
                </p>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-azul-codea" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Redes Sociales
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Facebook</label>
                  {data.facebook_url ? (
                    <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Ver perfil en Facebook
                    </a>
                  ) : (
                    <p className="text-gray-500">No especificado</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">LinkedIn</label>
                  {data.linkedin_url ? (
                    <a href={data.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      Ver perfil en LinkedIn
                    </a>
                  ) : (
                    <p className="text-gray-500">No especificado</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Foto de perfil y estadísticas */}
          <div className="lg:col-span-1 space-y-6">
            {/* Foto de perfil */}
            <div className="bg-white shadow-sm rounded-lg p-6 text-center">
              <div className="relative inline-block">
                {data.perfil_url ? (
                  <img
                    src={data.perfil_url}
                    alt="Foto de perfil"
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-200"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto border-4 border-gray-200">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {data.first_name && data.last_name ? `${data.first_name} ${data.last_name}` : data.usuario_unico}
              </h3>
              <p className="text-gray-500">@{data.usuario_unico}</p>
            </div>

            {/* Estadísticas del perfil */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas del Perfil</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Perfil completo</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    data.perfil_completo 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {data.perfil_completo ? 'Completo' : 'Incompleto'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Miembro desde</span>
                  <span className="text-gray-900 font-medium">
                    {new Date(data.fecha_creacion).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Última actualización</span>
                  <span className="text-gray-900 font-medium">
                    {new Date(data.fecha_actualizacion).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Sugerencia de usuario único */}
            {data.usuario_unico_sugerido && data.usuario_unico_sugerido !== data.usuario_unico && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Sugerencia</h4>
                <p className="text-sm text-blue-700">
                  Tu usuario único sugerido es: <span className="font-mono bg-blue-100 px-1 rounded">@{data.usuario_unico_sugerido}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
