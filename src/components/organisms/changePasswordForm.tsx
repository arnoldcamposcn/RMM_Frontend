import { useState } from "react";        
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordRequestSchema,
  type ResetPasswordRequest,
} from "../../store/features/auth/authSchema";
import { resetPasswordConfirmService } from "../../store/features/auth/auth.service";
import { FormInput } from "../molecules/FormInput";
import { useSearchParams, useNavigate } from "react-router-dom"; // si usas react-router

export function ChangePasswordForm() {
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid") || "";
  const token = searchParams.get("token") || "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordRequest>({
    resolver: zodResolver(ResetPasswordRequestSchema),
    defaultValues: { uid, token },
  });

  const newPassword = watch("new_password");
  const confirmPassword = watch("confirm_password");

  const onSubmit = async (data: ResetPasswordRequest) => {
    if (newPassword !== confirmPassword) {
      setServerMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await resetPasswordConfirmService(data);
      setServerMessage(res.message);
      setTimeout(() => {
        navigate("/iniciar-sesion");
      }, 2000);
    } catch (err) {
      setServerMessage("Hubo un error al cambiar la contraseña.");
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="title-magazine text-2xl font-bold text-[#132F56] mb-2">
              Cambiar Contraseña
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#4AB39A] to-[#3FA08A] rounded-full mx-auto mb-3"></div>
            <p className="paragraph-magazine text-gray-600">
              Ingresa tu nueva contraseña para completar el proceso
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* UID y Token ocultos */}
            <input type="hidden" {...register("uid")} />
            <input type="hidden" {...register("token")} />

            <div className="space-y-4">
              <FormInput
                label="Nueva contraseña"
                name="new_password"
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                error={errors.new_password}
                register={register}
              />

              <FormInput
                label="Confirmar contraseña"
                name="confirm_password"
                type="password"
                placeholder="Confirma tu nueva contraseña"
                error={errors.confirm_password}
                register={register}
              />
            </div>

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
                  <span>Cambiando contraseña...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Cambiar contraseña</span>
                </>
              )}
            </button>


            {/* Mensaje del servidor */}
            {serverMessage && (
              <div className={`p-4 rounded-lg border text-center ${
                serverMessage.includes('error') || serverMessage.includes('Error') || serverMessage.includes('no coinciden')
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : 'bg-green-50 border-green-200 text-green-700'
              }`}>
                <p className="paragraph-magazine text-sm font-medium">{serverMessage}</p>
              </div>
            )}

            {/* Link de regreso */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="paragraph-magazine text-sm text-gray-600">
                ¿Recordaste tu contraseña?{' '}
                <a onClick={() => navigate("/iniciar-sesion")} className="text-[#53C1A9] hover:text-[#4AB39A] font-semibold transition-colors duration-300 cursor-pointer">
                  Iniciar sesión
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
