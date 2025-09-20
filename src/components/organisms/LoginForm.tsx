// organisms/LoginForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../components/molecules/FormInput";
import { Button } from "../../components/atoms/Button"; 
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
      <Button type="submit">{loading ? "Cargando..." : "Iniciar Sesión"}</Button>
      {error && <p className="text-xs text-red-600 text-center">{error}</p>}
    </form>
  );
}
