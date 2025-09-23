import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RequestPasswordResetRequestSchema,
  type RequestPasswordResetRequest,
} from "../../store/features/auth/authSchema";
import { requestPasswordResetService } from "../../store/features/auth/auth.service";
import { FormInput } from "../molecules/FormInput";

export function PasswordResetForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RequestPasswordResetRequest>({
    resolver: zodResolver(RequestPasswordResetRequestSchema),
  });

  const onSubmit = async (data: RequestPasswordResetRequest) => {
    try {
      const res = await requestPasswordResetService(data);
      setServerMessage(res.message); // tu backend devuelve { message: "..." }
    } catch (err) {
      setServerMessage("Usuario no existente. Verifica tu email o regístrate para crear una cuenta.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#53C1A9] to-[#4AB39A] rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="title-magazine text-2xl font-bold text-[#132F56] mb-2">
              Recuperar Contraseña
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#4AB39A] to-[#3FA08A] rounded-full mx-auto mb-3"></div>
            <p className="paragraph-magazine text-gray-600">
              Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              label="Email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              error={errors.email}
              register={register}
            />

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#53C1A9] to-[#4AB39A] hover:from-[#4AB39A] hover:to-[#3FA08A] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Enviando enlace...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Enviar enlace de recuperación</span>
                </>
              )}
            </button>

            {/* Mensaje del servidor */}
            {serverMessage && (
              <div className={`p-4 rounded-lg border text-center ${
                serverMessage.includes('error') || serverMessage.includes('Error') || serverMessage.includes('Usuario no existente')
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : 'bg-green-50 border-green-200 text-green-700'
              }`}>
                <p className="paragraph-magazine text-sm font-medium">{serverMessage}</p>
              </div>
            )}

            {/* Links de navegación */}
            <div className="text-center pt-4 border-t border-gray-100 space-y-3">
              <p className="paragraph-magazine text-sm text-gray-600">
                ¿Recordaste tu contraseña?{' '}
                <a 
                  href="/iniciar-sesion" 
                  className="text-[#53C1A9] hover:text-[#4AB39A] font-semibold transition-colors duration-300"
                >
                  Iniciar sesión
                </a>
              </p>
              <p className="paragraph-magazine text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <a 
                  href="/registrarse" 
                  className="text-[#53C1A9] hover:text-[#4AB39A] font-semibold transition-colors duration-300"
                >
                  Registrarse
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
