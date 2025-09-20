// pages/RegisterPage.tsx
import { useState } from "react";
import { RegisterForm } from "../organisms/RegisterForm";

export default function RegisterPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 text-center bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/80">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">¡Registro Exitoso!</h2>
          <p className="mt-4 text-gray-600">
            Gracias por registrarte. Ahora puedes iniciar sesión.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Crear Cuenta</h2>
          <p className="mt-2 text-sm text-gray-600">Bienvenido, empieza tu aventura</p>
        </div>
        <RegisterForm onSuccess={() => setIsSubmitted(true)} />
      </div>
    </div>
  );
}
