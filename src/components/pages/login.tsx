// pages/LoginPage.tsx

import { LoginForm } from "../organisms/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Iniciar Sesión</h2>
          <p className="mt-2 text-sm text-gray-600">Bienvenido de nuevo</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
