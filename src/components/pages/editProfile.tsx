import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { getProfile, patchProfile } from "../../store/features/profile/profile.service";
import type { Profile } from "../../store/features/profile/profileSchema";
import ButtonLink from "../atoms/ButtonLink";

const EditProfilePage = () => {
  const { data, loading, error } = useFetch<Profile>(getProfile, []);
  const [form, setForm] = useState<Partial<Profile>>({});
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setForm(data); // inicializamos formulario con datos del perfil
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (!form) return;
      setIsSaving(true);
      const updated = await patchProfile(form);
      setForm(updated);
      alert("Perfil actualizado correctamente ✅");
      navigate('/perfil'); // Redirigir al perfil después de guardar
    } catch (err) {
      console.error("Error actualizando perfil:", err);
      alert("Error al actualizar el perfil ❌");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/perfil');
  };

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Header con navegación */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Editar Perfil</h1>
            <p className="mt-2 text-gray-600">Actualiza tu información personal y profesional</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <ButtonLink
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azul-codea transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancelar
            </ButtonLink>
          </div>
        </div>

        {form && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna izquierda - Formulario */}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    <input
                      type="text"
                      name="first_name"
                      value={form.first_name ?? ""}
                      onChange={handleChange}
                      placeholder="Ingresa tu nombre"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-azul-codea focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                    <input
                      type="text"
                      name="last_name"
                      value={form.last_name ?? ""}
                      onChange={handleChange}
                      placeholder="Ingresa tu apellido"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-azul-codea focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={form.telefono ?? ""}
                      onChange={handleChange}
                      placeholder="Ej: +1 234 567 8900"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-azul-codea focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
                    <input
                      type="number"
                      name="edad"
                      value={form.edad ?? ""}
                      onChange={handleChange}
                      placeholder="Ej: 25"
                      min="1"
                      max="120"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-azul-codea focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Usuario único</label>
                    <input
                      type="text"
                      name="usuario_unico"
                      value={form.usuario_unico ?? ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-azul-codea focus:border-transparent"
                      />
                    <p className="mt-2 text-sm text-gray-500">
                      El usuario único es el que se usará para identificarte en la plataforma.
                    </p>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                    <input
                      type="text"
                      name="ciudad"
                      value={form.ciudad ?? ""}
                      onChange={handleChange}
                      placeholder="Ej: Madrid"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-azul-codea focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
                    <input
                      type="text"
                      name="pais"
                      value={form.pais ?? ""}
                      onChange={handleChange}
                      placeholder="Ej: España"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-azul-codea focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de nacimiento</label>
                    <input
                      type="date"
                      name="fecha_nacimiento"
                      value={form.fecha_nacimiento ?? ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-azul-codea focus:border-transparent"
                    />
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Biografía</label>
                  <textarea
                    name="biografia"
                    value={form.biografia ?? ""}
                    onChange={handleChange}
                    placeholder="Cuéntanos sobre ti, tu experiencia profesional, intereses, etc..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-azul-codea focus:border-transparent resize-none"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Comparte información que te ayude a conectar con otros profesionales del sector minero.
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
                
                <div className="space-y-6">
                  <div>
                    <label className="flex text-sm font-medium text-gray-700 mb-2 items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </label>
                    <input
                      type="url"
                      name="facebook_url"
                      value={form.facebook_url ?? ""}
                      onChange={handleChange}
                      placeholder="https://facebook.com/tu-perfil"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-azul-codea focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="flex text-sm font-medium text-gray-700 mb-2 items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      name="linkedin_url"
                      value={form.linkedin_url ?? ""}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/tu-perfil"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-azul-codea focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha - Vista previa y acciones */}
            <div className="lg:col-span-1 space-y-6">
              {/* Vista previa del perfil */}
              <div className="bg-white shadow-sm rounded-lg p-6 text-center">
                <div className="relative inline-block">
                  {form.perfil_url ? (
                    <img
                      src={form.perfil_url}
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
                  {form.first_name && form.last_name ? `${form.first_name} ${form.last_name}` : 'Tu nombre'}
                </h3>
                <p className="text-gray-500">@{form.usuario_unico || 'usuario'}</p>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 text-left">
                    {form.biografia || 'Tu biografía aparecerá aquí...'}
                  </p>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-azul-codea hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azul-codea disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Guardar cambios
                      </>
                    )}
                  </button>
                  
                  <ButtonLink
                    onClick={handleCancel}
                    className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azul-codea transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancelar
                  </ButtonLink>
                </div>
              </div>

              {/* Información adicional */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Consejos</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Completa todos los campos para un perfil más completo</li>
                  <li>• Agrega una biografía profesional</li>
                  <li>• Incluye tus redes sociales para mayor conectividad</li>
                  <li>• La información será visible para otros usuarios</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfilePage;
