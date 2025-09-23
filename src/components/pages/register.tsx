// pages/RegisterPage.tsx
import { useState } from "react";
import { RegisterForm } from "../organisms/RegisterForm";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Columna izquierda - Imagen */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Equipo de trabajo" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#132F56]/80 to-[#132F56]/60"></div>
            </div>
            
            {/* Contenido superpuesto */}
            <div className="relative z-10 flex flex-col justify-center h-full p-12 text-white">
              <div className="max-w-md">
                <h1 className="title-magazine text-4xl font-bold mb-6 leading-tight">
                  ¡Bienvenido a la Comunidad!
                </h1>
                <p className="paragraph-magazine text-lg mb-8 leading-relaxed opacity-90">
                  Tu registro ha sido exitoso. Ahora formas parte de nuestra comunidad de profesionales del sector minero.
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Comunidad Activa</p>
                    <p className="text-sm opacity-80">Conecta con profesionales del sector</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Mensaje de éxito */}
          <div className="flex items-center justify-center p-8">
            <div className="w-full max-w-md text-center">
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="title-magazine text-2xl font-bold text-[#132F56] mb-4">
                  ¡Registro Exitoso!
                </h2>
                <p className="paragraph-magazine text-gray-600 mb-6">
                  Gracias por registrarte. Ahora puedes acceder a todo nuestro contenido exclusivo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Columna izquierda - Imagen */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0">
            <img 
              src="/images/revista-mm.png" 
              alt="Innovación tecnológica" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#132F56]/80 to-[#132F56]/60"></div>
          </div>
          
          {/* Contenido superpuesto */}
          <div className="relative z-10 flex flex-col justify-center h-full p-12 text-white">
            <div className="max-w-md">
              <h1 className="title-magazine text-4xl font-bold mb-6 leading-tight text-white">
                Únete a Revista Meta Mining
              </h1>
              <p className="paragraph-magazine text-lg mb-8 leading-relaxed opacity-90 text-white">
                Forma parte de nuestra comunidad de profesionales y accede a contenido exclusivo, análisis especializados y networking del sector minero.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Contenido Premium</p>
                  <p className="text-sm opacity-80">Artículos y análisis exclusivos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha - Formulario */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Header del formulario */}
            <div className="text-center mb-8">
              <h2 className="title-magazine text-3xl font-bold text-[#132F56] mb-3">
                Crear Cuenta
              </h2>
              <p className="paragraph-magazine text-gray-600">
                Únete a nuestra comunidad de profesionales
              </p>
            </div>

            {/* Formulario */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <RegisterForm onSuccess={() => setIsSubmitted(true)} />
            </div>

            {/* Footer del formulario */}
            <div className="text-center mt-6">
              <p className="paragraph-magazine text-sm text-gray-600">
                ¿Ya tienes una cuenta?{" "}
                <a onClick={() => navigate("/iniciar-sesion")} className="text-[#132F56] hover:text-[#53C1A9] font-semibold transition-colors duration-300 cursor-pointer">
                  Inicia sesión aquí
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
