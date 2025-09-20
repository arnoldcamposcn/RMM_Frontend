// organisms/RegisterForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { registerUser } from "../../store/features/auth/authThunks";
import { RegisterRequestSchema, type RegisterRequest } from "../../store/features/auth/authSchema";
import { FormInput } from "../../components/molecules/FormInput";
import { Button } from "../../components/atoms/Button";
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

      <Button type="submit" disabled={loading || isSubmitting}>
        {loading || isSubmitting ? "Cargando..." : "Registrarse"}
      </Button>

      {error && <p className="text-center text-red-600 text-sm pt-4">{error}</p>}
    </form>
  );
}
