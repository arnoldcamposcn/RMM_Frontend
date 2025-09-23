// pages/LoginPage.tsx

import { LoginForm } from "../organisms/LoginForm";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Columna izquierda - Imagen */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0">
            <img 
              src="/images/revista-libro.jpg" 
              alt="Minería moderna" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#132F56]/80 to-[#132F56]/60"></div>
          </div>
          
          {/* Contenido superpuesto */}
          <div className="relative z-10 flex flex-col justify-center h-full p-12 text-white">
            <div className="max-w-md">
              <h1 className="title-magazine text-4xl font-bold mb-6 leading-tight text-white">
                Bienvenido a Revista Meta Mining
              </h1>
              <p className="paragraph-magazine text-lg mb-8 leading-relaxed opacity-90 text-white">
                Accede a contenido exclusivo, análisis especializados y la información más actualizada del sector minero.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Contenido Exclusivo</p>
                  <p className="text-sm opacity-80">Artículos y análisis especializados</p>
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
                Iniciar Sesión
              </h2>
              <p className="paragraph-magazine text-gray-600">
                Bienvenido de nuevo a nuestra comunidad
              </p>
            </div>

            {/* Formulario */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <LoginForm />
            </div>

            {/* Footer del formulario */}
            <div className="text-center mt-6 space-y-2">
              <p className="paragraph-magazine text-sm text-gray-600 ">
                ¿No tienes una cuenta?{" "}
                <a onClick={() => navigate("/registrarse")} className="text-[#132F56] hover:text-[#53C1A9] font-semibold transition-colors duration-300 cursor-pointer">
                  Regístrate aquí
                </a>
              </p>
              <p className="paragraph-magazine text-sm text-gray-600">
                ¿Olvidaste tu contraseña?{" "}
                <a onClick={() => navigate("/reset-password")} className="text-[#132F56] hover:text-[#53C1A9] font-semibold transition-colors duration-300 cursor-pointer">
                  Recupérala aquí
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
