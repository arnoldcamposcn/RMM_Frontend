// organisms/RegisterForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { registerUser } from "../../store/features/auth/authThunks";
import { RegisterRequestSchema, type RegisterRequest } from "../../store/features/auth/authSchema";
import { FormInput } from "../../components/molecules/FormInput";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterRequestSchema),
  });

  const onSubmit = async (data: RegisterRequest) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      if (onSuccess) onSuccess(); // avisa a la página
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Failed to register: ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          error={errors.email}
          register={register}
        />

        <FormInput
          label="Contraseña"
          name="password"
          type="password"
          placeholder="********"
          error={errors.password}
          register={register}
        />

        <FormInput
          label="Confirmar contraseña"
          name="confirm_password"
          type="password"
          placeholder="********"
          error={errors.confirm_password}
          register={register}
        />
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#53C1A9] to-[#4AB39A] hover:from-[#4AB39A] hover:to-[#3FA08A] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
        disabled={loading || isSubmitting}
      >
        {loading || isSubmitting ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Creando cuenta...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span>Crear Cuenta</span>
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
