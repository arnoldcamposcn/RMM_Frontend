// organisms/LoginForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../components/molecules/FormInput";
import { type LoginRequest, LoginRequestSchema } from "../../store/features/auth/authSchema";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { loginUser } from "../../store/features/auth/authThunks";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginRequestSchema),
  });

  const onSubmit = (data: LoginRequest) => {
    dispatch(loginUser(data)).unwrap().then(() => {
      navigate("/");
    }).catch((err) => {
      console.error("Error al iniciar sesión", err);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <FormInput
          label="Correo electrónico"
          name="email"
          type="email"
          placeholder="tu@email.com"
          register={register}
          error={errors.email}
        />
        <FormInput
          label="Contraseña"
          name="password"
          type="password"
          placeholder="********"
          register={register}
          error={errors.password}
        />
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#53C1A9] to-[#4AB39A] hover:from-[#4AB39A] hover:to-[#3FA08A] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
        disabled={loading}
      >
        {loading ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Iniciando sesión...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>Iniciar Sesión</span>
          </>
        )}
      </button>

      {/* Mensaje de error */}
      {error && (
        <div className="p-4 rounded-lg border bg-red-50 border-red-200 text-center">
          <p className="paragraph-magazine text-sm font-medium text-red-700">{error}</p>
        </div>
      )}
    </form>
  );
}
